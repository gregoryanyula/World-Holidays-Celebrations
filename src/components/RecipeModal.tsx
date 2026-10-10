import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download,
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Plus, 
  ChefHat, 
  Utensils, 
  Clock, 
  Users, 
  Flame, 
  Bookmark, 
  Sparkles,
  Share2,
  FileText
} from 'lucide-react';
import { Recipe, ShoppingListItem } from '../types';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveToShoppingList?: (items: ShoppingListItem[]) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onSaveToShoppingList
}) => {
  const [activeTab, setActiveTab] = useState<'recipe' | 'shopping'>('recipe');
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Local checklist state for shopping list mode
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [newCustomItem, setNewCustomItem] = useState('');

  if (!isOpen || !recipe) return null;

  const toggleCheck = (itemKey: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItem.trim()) return;
    setCustomItems([...customItems, newCustomItem.trim()]);
    setNewCustomItem('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      const currentServings = recipe.servings * servingMultiplier;

      // Header Banner
      doc.setFillColor(190, 30, 60); // Rose
      doc.rect(0, 0, 210, 24, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('WorldFest • Traditional Festive Heritage Recipes', 15, 11);
      
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Holiday: ${recipe.holidayName} | Region: ${recipe.origin}`, 15, 18);

      // Recipe Title
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(recipe.name, 15, 36);

      // Meta info bar
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(`Difficulty: ${recipe.difficulty}   |   Prep Time: ${recipe.prepTime}   |   Cook Time: ${recipe.cookTime}   |   Batch: ${currentServings} servings`, 15, 43);

      // Cultural significance
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
      const cultLines = doc.splitTextToSize(`Cultural Lore: ${recipe.culturalSignificance}`, 180);
      doc.text(cultLines, 15, 51);

      let yPos = 51 + (cultLines.length * 5) + 6;

      // Ingredients Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(190, 30, 60);
      doc.text('Ingredients Checklist (Scaled for Servings):', 15, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(40, 40, 40);

      recipe.ingredients.forEach((ing) => {
        if (yPos > 275) {
          doc.addPage();
          yPos = 20;
        }
        const scaled = scaleAmount(ing.amount, servingMultiplier);
        doc.text(`[  ]  ${ing.item}: ${scaled}`, 20, yPos);
        yPos += 5.5;
      });

      yPos += 5;

      // Preparation Instructions Section
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(190, 30, 60);
      doc.text('Traditional Culinary Method:', 15, yPos);
      yPos += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(40, 40, 40);

      recipe.instructions.forEach((step, idx) => {
        const stepLines = doc.splitTextToSize(`${idx + 1}. ${step}`, 175);
        if (yPos + (stepLines.length * 5) > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(stepLines, 20, yPos);
        yPos += (stepLines.length * 5) + 3;
      });

      // Tips if any
      if (recipe.chefTips && recipe.chefTips.length > 0) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        yPos += 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(180, 100, 30);
        doc.text('Authentic Chef Secrets:', 15, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        recipe.chefTips.forEach((tip: string) => {
          const tipLines = doc.splitTextToSize(`• ${tip}`, 175);
          if (yPos + (tipLines.length * 4.5) > 280) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(tipLines, 20, yPos);
          yPos += (tipLines.length * 4.5) + 2;
        });
      }

      // Footer
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(140, 140, 140);
      doc.text('Generated by WorldFest • Preserving Cultural Heritage and Festive Delicacies', 15, 290);

      const cleanFilename = `${recipe.name.replace(/[^a-zA-Z0-9]/g, '_')}_Recipe.pdf`;
      doc.save(cleanFilename);
      confetti({ particleCount: 35, spread: 60 });
    } catch (err) {
      console.error('Failed to export PDF, falling back to window print', err);
      window.print();
    }
  };

  const handleCopyShoppingList = () => {
    const lines = [
      `🛒 Shopping List for ${recipe.name} (${recipe.servings * servingMultiplier} Servings):`,
      `Celebration: ${recipe.holidayName}`,
      '',
      '--- Ingredients ---',
      ...recipe.ingredients.map(ing => {
        const isChecked = checkedItems[ing.item] ? '[x]' : '[ ]';
        return `${isChecked} ${ing.item}: ${scaleAmount(ing.amount, servingMultiplier)}`;
      }),
      ...(customItems.length > 0 ? ['', '--- Custom Items ---', ...customItems.map(c => `[ ] ${c}`)] : ''),
      '',
      'Generated by WorldFest Global Holidays & Festive Recipes'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    confetti({ particleCount: 20, spread: 45 });
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to scale numeric amounts if found
  function scaleAmount(amountStr: string, multiplier: number): string {
    if (multiplier === 1) return amountStr;
    // Simple heuristic to multiply initial numbers or fractions
    return amountStr.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      const scaled = num * multiplier;
      return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-3xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {recipe.holidayName}
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span className="text-xs text-stone-500">{recipe.origin}</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-white leading-tight">
                {recipe.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              title="Download Printable PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
              title="Print Recipe"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs & Servings Scaler */}
        <div className="px-5 py-3 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-50/50 dark:bg-stone-900/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('recipe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'recipe'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Traditional Recipe</span>
            </button>

            <button
              onClick={() => setActiveTab('shopping')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'shopping'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Interactive Shopping List</span>
            </button>
          </div>

          {/* Servings Multiplier */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span className="font-medium">Yield Batch:</span>
            {[1, 2, 4].map(mul => (
              <button
                key={mul}
                onClick={() => setServingMultiplier(mul)}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  servingMultiplier === mul
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {mul * recipe.servings} Servings ({mul}x)
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6 printable-recipe-area">
          {/* TAB 1: FULL RECIPE */}
          {activeTab === 'recipe' && (
            <div className="space-y-6">
              {/* Recipe Header Card */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white p-5 min-h-[160px] flex flex-col justify-end">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="relative z-10 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/80 text-black text-[10px] font-bold">
                      {recipe.difficulty}
                    </span>
                    {recipe.dietary.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-[10px] font-medium text-white">
                        {d}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Cooking Metrics Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-center">
                  <Clock className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Prep Time</span>
                  <span className="font-semibold text-xs text-stone-800 dark:text-stone-200">{recipe.prepTime}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-center">
                  <Flame className="w-4 h-4 mx-auto text-rose-500 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Cook Time</span>
                  <span className="font-semibold text-xs text-stone-800 dark:text-stone-200">{recipe.cookTime}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-center">
                  <Users className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Servings</span>
                  <span className="font-semibold text-xs text-stone-800 dark:text-stone-200">{recipe.servings * servingMultiplier} Portions</span>
                </div>
              </div>

              {/* Cultural Significance & Lore */}
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-1">
                <span className="font-serif font-bold text-rose-800 dark:text-rose-300 block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Festive Heritage & Cultural Meaning
                </span>
                <p className="leading-relaxed">{recipe.culturalSignificance}</p>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-rose-500" />
                    <span>Curated Ingredients ({servingMultiplier}x Scale)</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('shopping')}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Open in Shopping Mode →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/70 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {ing.item}
                      </span>
                      <span className="font-mono text-stone-500 dark:text-stone-400 font-semibold bg-white dark:bg-stone-700 px-2 py-0.5 rounded-lg border border-stone-200 dark:border-stone-600">
                        {scaleAmount(ing.amount, servingMultiplier)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-500" />
                  <span>Culinary Preparation Steps</span>
                </h3>

                <div className="space-y-3">
                  {recipe.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Secrets */}
              {recipe.chefTips && recipe.chefTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1.5">
                  <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                    👨‍🍳 Authentic Chef Tips & Heritage Secrets:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-300">
                    {recipe.chefTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE SHOPPING LIST */}
          {activeTab === 'shopping' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-sm">
                    Interactive Grocery Checklist
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Check off ingredients as you browse aisles or market stalls.
                  </p>
                </div>
                <button
                  onClick={handleCopyShoppingList}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy List'}</span>
                </button>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Ingredients for {recipe.name} ({servingMultiplier}x Batch)
                </span>

                <div className="space-y-1.5">
                  {recipe.ingredients.map((ing, idx) => {
                    const isChecked = checkedItems[ing.item] || false;
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(ing.item)}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition ${
                          isChecked
                            ? 'bg-stone-100 dark:bg-stone-800/30 border-stone-200 dark:border-stone-800 text-stone-400 line-through'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-400 shrink-0" />
                          )}
                          <span className="font-medium">{ing.item}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-500">
                            {ing.category}
                          </span>
                        </div>

                        <span className="font-mono font-semibold text-stone-600 dark:text-stone-300">
                          {scaleAmount(ing.amount, servingMultiplier)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Add items */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Additional Market Items:
                </span>

                <form onSubmit={handleAddCustomItem} className="flex gap-2">
                  <input
                    type="text"
                    value={newCustomItem}
                    onChange={(e) => setNewCustomItem(e.target.value)}
                    placeholder="e.g. Saffron packaging, decorative serving platter, baking paper..."
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold flex items-center gap-1 hover:opacity-90 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </form>

                {customItems.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {customItems.map((custom, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs"
                      >
                        <span>{custom}</span>
                        <button
                          onClick={() => setCustomItems(customItems.filter((_, i) => i !== idx))}
                          className="text-stone-400 hover:text-rose-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            <span>Ready for the festive feast?</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Printable PDF Recipe</span>
            </button>

            <button
              onClick={handleCopyShoppingList}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Checklist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
