import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Upload, 
  Download, 
  Trash2, 
  FileText, 
  Image as ImageIcon, 
  Key, 
  Check, 
  Copy, 
  AlertTriangle,
  X,
  FileCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { EncryptedFileItem } from '../types';
import { encryptFile, decryptFile, encryptText, decryptText } from '../utils/crypto';
import confetti from 'canvas-confetti';

interface EncryptedVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: EncryptedFileItem[];
  onSaveFiles: (files: EncryptedFileItem[]) => void;
}

export const EncryptedVaultModal: React.FC<EncryptedVaultModalProps> = ({
  isOpen,
  onClose,
  files,
  onSaveFiles
}) => {
  const [passkey, setPasskey] = useState<string>('world-holidays-secure-vault-2026');
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Secret encrypted messaging scratchpad
  const [secretMessage, setSecretMessage] = useState<string>('');
  const [encryptedSecretResult, setEncryptedSecretResult] = useState<string>('');
  const [inputCipherToDecrypt, setInputCipherToDecrypt] = useState<string>('');
  const [decryptedMessageResult, setDecryptedMessageResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'files' | 'messages'>('files');

  if (!isOpen) return null;

  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsEncrypting(true);

    try {
      const newItems: EncryptedFileItem[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const { encryptedData, iv, filename, mimeType, size } = await encryptFile(file, passkey);
        newItems.push({
          id: `enc-file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          filename,
          mimeType,
          size,
          encryptedData,
          iv,
          uploadedAt: new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      }

      onSaveFiles([...newItems, ...files]);
      confetti({ particleCount: 30, spread: 60 });
    } catch (err) {
      console.error('File encryption failed', err);
      alert('Encryption failed. Please check the file.');
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecryptAndDownload = async (item: EncryptedFileItem) => {
    try {
      const blob = await decryptFile(item.encryptedData, item.iv, item.mimeType, passkey);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Decryption failed. Please verify that your Master Passkey matches the key used during encryption.');
    }
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Permanently delete this encrypted file from zero-knowledge local storage?')) {
      onSaveFiles(files.filter(f => f.id !== id));
    }
  };

  const handleEncryptMessage = async () => {
    if (!secretMessage.trim()) return;
    const encrypted = await encryptText(secretMessage, passkey);
    setEncryptedSecretResult(encrypted);
  };

  const handleDecryptMessage = async () => {
    if (!inputCipherToDecrypt.trim()) return;
    const decrypted = await decryptText(inputCipherToDecrypt, passkey);
    setDecryptedMessageResult(decrypted);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-3xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Zero-Knowledge Client Storage
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span className="text-xs text-stone-500">AES-GCM 256-bit PBKDF2</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-white">
                End-to-End Encrypted Vault & Messaging
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Key Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <Key className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">Master Cryptographic Passkey:</span>
            <div className="relative flex-1 max-w-xs">
              <input
                type={showPasskey ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full py-1 px-2.5 pr-8 rounded-lg bg-white dark:bg-stone-800 border border-emerald-300 dark:border-emerald-700 text-stone-900 dark:text-stone-100 font-mono text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-2 top-1.5 text-stone-400 hover:text-stone-600"
              >
                {showPasskey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>Encrypted locally in browser. No plain text touches the server.</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 py-2.5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 bg-stone-50/50 dark:bg-stone-900/40">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'files'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Encrypted File Vault ({files.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'messages'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Confidential Message Cipher</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'files' ? (
            <div className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFileUpload(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition ${
                  dragOver
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/20'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-stone-900 dark:text-white">
                  Drop files to Encrypt & Store Securely
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Photos of celebrations, heirloom handwritten recipes, certificates, or holiday notes.
                </p>

                <div className="mt-4 flex justify-center">
                  <label className="cursor-pointer py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition">
                    <span>Select File to Encrypt</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </label>
                </div>

                {isEncrypting && (
                  <div className="mt-3 text-xs text-emerald-600 font-semibold animate-pulse">
                    Encrypting via WebCrypto AES-GCM 256-bit...
                  </div>
                )}
              </div>

              {/* Encrypted Files List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-500" />
                    <span>Your Encrypted Files ({files.length})</span>
                  </h4>
                  <span className="text-[11px] text-stone-400">Stored in browser local vault</span>
                </div>

                {files.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-400 text-xs">
                    No encrypted files yet. Upload a festival photo or recipe to begin.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0">
                            {file.mimeType.startsWith('image/') ? (
                              <ImageIcon className="w-4 h-4 text-stone-600 dark:text-stone-300" />
                            ) : (
                              <FileText className="w-4 h-4 text-stone-600 dark:text-stone-300" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-stone-800 dark:text-stone-200 truncate">
                              {file.filename}
                            </div>
                            <div className="text-[10px] text-stone-400 flex items-center gap-2">
                              <span>{formatFileSize(file.size)}</span>
                              <span>•</span>
                              <span>{file.uploadedAt}</span>
                              <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[9px]">
                                AES-GCM
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleDecryptAndDownload(file)}
                            className="py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1 transition"
                            title="Decrypt & Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Decrypt</span>
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* TAB 2: CONFIDENTIAL MESSAGING CIPHER */
            <div className="space-y-6">
              {/* Encrypt Message Box */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                  1. Compose Secret Holiday Message or Journal Note
                </span>
                <textarea
                  rows={3}
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  placeholder="Write a confidential celebration message, private prayer, or personal heirloom note..."
                  className="w-full p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 outline-none"
                />
                <button
                  onClick={handleEncryptMessage}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Encrypt Message</span>
                </button>

                {encryptedSecretResult && (
                  <div className="p-3 rounded-xl bg-stone-900 text-stone-100 space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400">
                      <span>Encrypted Cipher (Safe to send over any network):</span>
                      <button
                        onClick={() => copyToClipboard(encryptedSecretResult, 'cipher')}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        {copiedId === 'cipher' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === 'cipher' ? 'Copied' : 'Copy Cipher'}</span>
                      </button>
                    </div>
                    <p className="font-mono text-[10px] break-all text-stone-300">
                      {encryptedSecretResult}
                    </p>
                  </div>
                )}
              </div>

              {/* Decrypt Message Box */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                  2. Decrypt Received Cipher
                </span>
                <input
                  type="text"
                  value={inputCipherToDecrypt}
                  onChange={(e) => setInputCipherToDecrypt(e.target.value)}
                  placeholder="Paste E2EE:... cipher here to decrypt with your passkey"
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-200 outline-none"
                />
                <button
                  onClick={handleDecryptMessage}
                  className="py-2 px-4 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Decrypt Cipher</span>
                </button>

                {decryptedMessageResult && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-stone-800 dark:text-stone-200">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                      Plaintext Result:
                    </span>
                    <p className="leading-relaxed">{decryptedMessageResult}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
