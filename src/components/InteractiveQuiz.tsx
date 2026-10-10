import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ChevronRight, 
  BookOpen, 
  Trophy, 
  Compass, 
  Clock, 
  Check, 
  ExternalLink,
  Brain,
  Zap,
  Globe2,
  Calendar,
  ShieldCheck,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Holiday, CulturalExplorerProgress, QuizQuestion, UserPreferences } from '../types';

interface InteractiveQuizProps {
  holidays: Holiday[];
  explorerProgress: CulturalExplorerProgress;
  preferences: UserPreferences;
  onSelectHoliday: (holiday: Holiday) => void;
  onRecordQuizCompletion: (points: number, streak: number) => void;
}

// Master question bank grounded in "All Major Holidays: A Full List of Global Celebrations & Origins"
const MASTER_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-kwanzaa-origin',
    holidayId: 'kwanzaa',
    holidayName: 'Kwanzaa',
    category: 'Cultural & Historical',
    question: 'Who created the Pan-African cultural celebration of Kwanzaa, and in what year was it established?',
    options: [
      'Maulana Karenga in 1966',
      'Martin Luther King Jr. in 1963',
      'W.E.B. Du Bois in 1945',
      'Marcus Garvey in 1920'
    ],
    correctIndex: 0,
    explanation: 'Kwanzaa was created in 1966 by Maulana Karenga as a 7-day Pan-African cultural festival honoring African heritage and community values.',
    culturalInsight: 'The festival is built upon the Nguzo Saba (Seven Principles) and families light one candle per night in the ceremonial kinara.'
  },
  {
    id: 'q-cinco-misconception',
    holidayId: 'cinco-de-mayo',
    holidayName: 'Cinco de Mayo',
    category: 'Cultural & Historical',
    question: 'What historical event does Cinco de Mayo actually commemorate?',
    options: [
      'Mexico’s official Declaration of Independence from Spain',
      'The 1862 Mexican victory over the French Empire at the Battle of Puebla',
      'The end of the Mexican-American War',
      'The birth of revolutionary leader Father Miguel Hidalgo'
    ],
    correctIndex: 1,
    explanation: 'Cinco de Mayo commemorates the Mexican army’s victory over French forces at the Battle of Puebla on May 5, 1862. Mexico’s actual Independence Day is September 16!',
    culturalInsight: 'In Puebla, the day is marked with dramatic battle reenactments and festive culinary traditions including authentic mole poblano.'
  },
  {
    id: 'q-diwali-lights',
    holidayId: 'diwali-festival-of-lights',
    holidayName: 'Diwali',
    category: 'Religious',
    question: 'In Northern India, what mythological homecoming does Diwali (Festival of Lights) primarily celebrate?',
    options: [
      'Lord Krishna defeating the demon Narakasura',
      'Lord Rama’s triumphant return to Ayodhya after 14 years of exile',
      'The cosmic dance of Shiva (Nataraja)',
      'The descent of the holy river Ganges to Earth'
    ],
    correctIndex: 1,
    explanation: 'Diwali celebrates Lord Rama’s return to his kingdom of Ayodhya after defeating the demon king Ravana, celebrated by lighting millions of earthen diyas.',
    culturalInsight: 'In Bali, Indonesia, a parallel festival called Galungan honors ancestors with arched bamboo penjor poles lining village streets.'
  },
  {
    id: 'q-black-day-korea',
    holidayId: 'black-day-korea',
    holidayName: 'Black Day',
    category: 'Romantic & Love-Themed',
    question: 'In South Korea, what do singles traditionally eat on Black Day (April 14)?',
    options: [
      'Kimchi jjigae (spicy kimchi stew)',
      'Jajangmyeon (comforting black bean sauce noodles)',
      'Bibimbap with dark seaweed',
      'Tteokbokki with sweet dark glaze'
    ],
    correctIndex: 1,
    explanation: 'Following Valentine’s Day (Feb 14) and White Day (Mar 14), Black Day on April 14 is a celebration for singles who dress in black and comfort each other with bowls of hearty jajangmyeon.',
    culturalInsight: 'In East Asia, love holidays follow a monthly calendar cycle, bridging romantic reciprocity and community solidarity.'
  },
  {
    id: 'q-nowruz-haft-sin',
    holidayId: 'nowruz-persian-new-year',
    holidayName: 'Nowruz',
    category: 'Nature & Harvest',
    question: 'What is the traditional decorative centerpiece table set during Nowruz (Persian New Year)?',
    options: [
      'The Haft Sin table featuring seven symbolic items starting with the Persian letter "S"',
      'The Menorah candelabrum with sweet pomegranates',
      'The Kinara wooden candleholder with harvest grains',
      'The Ofrenda altar with marigolds and copal incense'
    ],
    correctIndex: 0,
    explanation: 'The Haft Sin table is adorned with 7 items starting with "S" (like Sabzeh for rebirth, Samanu for power, Seeb for beauty, and Sir for medicine).',
    culturalInsight: 'Nowruz marks the exact moment of the Vernal Spring Equinox and has been celebrated across Iran and Central Asia for over 3,000 years.'
  },
  {
    id: 'q-july-4-fireworks',
    holidayId: 'us-independence-day',
    holidayName: 'US Independence Day',
    category: 'National & Patriotic',
    question: 'When were fireworks first used to celebrate American independence?',
    options: [
      'In 1777 at Fort Ticonderoga and Philadelphia to mark the first anniversary',
      'In 1865 at the conclusion of the American Civil War',
      'In 1803 during the Louisiana Purchase ceremonies',
      'In 1776 immediately after the Declaration was signed'
    ],
    correctIndex: 0,
    explanation: 'The first celebratory fireworks were launched on July 4, 1777 at Fort Ticonderoga and in Philadelphia to mark the first anniversary of the Declaration of Independence.',
    culturalInsight: 'John Adams originally predicted July 2 would be the most celebrated date in history, but July 4 became the lasting national holiday.'
  },
  {
    id: 'q-bastille-symbolism',
    holidayId: 'bastille-day',
    holidayName: 'Bastille Day',
    category: 'National & Patriotic',
    question: 'Why was the storming of the Bastille on July 14, 1789 so symbolically powerful during the French Revolution?',
    options: [
      'It held the largest supply of grain in Paris during a famine',
      'It was a medieval fortress and state prison representing royal tyranny and absolute monarchy',
      'It was the home of King Louis XVI and Marie Antoinette',
      'It was the historic signing location of the French constitution'
    ],
    correctIndex: 1,
    explanation: 'The storming of the Bastille prison was a decisive turning point because the fortress stood as the ultimate symbol of the French monarchy’s arbitrary and despotic power.',
    culturalInsight: 'Today, France observes the fête nationale with a prestigious military parade along the Champs-Élysées and grand fireworks over the Eiffel Tower.'
  },
  {
    id: 'q-burns-night-food',
    holidayId: 'burns-night',
    holidayName: 'Burns Night',
    category: 'Romantic & Love-Themed',
    question: 'What national dish is piped in with bagpipes and toasted during Scotland’s Burns Night on January 25?',
    options: [
      'Haggis, accompanied by neeps and tatties and Scotch whisky',
      'Scottish Smoked Salmon on oatcakes',
      'Cullen Skink haddock soup',
      'Black bun fruitcake with highland cream'
    ],
    correctIndex: 0,
    explanation: 'Burns Night honors Scotland’s national poet Robert Burns with a ceremonial procession piping in the Haggis, followed by the dramatic reciting of "Address to a Haggis".',
    culturalInsight: 'Guests stand to toast the haggis with single malt Scotch whisky before sharing an evening of song, piping, and poetry.'
  },
  {
    id: 'q-yom-kippur-rite',
    holidayId: 'yom-kippur',
    holidayName: 'Yom Kippur',
    category: 'Religious',
    question: 'What instrument is traditionally sounded at the conclusion of the Yom Kippur fast to signal spiritual renewal?',
    options: [
      'The Shofar (curved ram’s horn)',
      'The Silver Trumpet of Zion',
      'The Temple bronze gong',
      'The Ceremonial Harp'
    ],
    correctIndex: 0,
    explanation: 'The blowing of the Shofar (ram’s horn) produces a long, piercing blast called Tekiah Gedolah, signifying the conclusion of the solemn 25-hour fast of Yom Kippur.',
    culturalInsight: 'Yom Kippur is considered the holiest day in Judaism; observers wear white garments to symbolize spiritual purity and humility.'
  },
  {
    id: 'q-mid-autumn-tang',
    holidayId: 'mid-autumn-festival',
    holidayName: 'Mid-Autumn Festival',
    category: 'Nature & Harvest',
    question: 'During which ancient Chinese dynasty did the formal celebration of the Mid-Autumn Moon Festival become a nationwide custom?',
    options: [
      'Tang Dynasty (618–907 AD)',
      'Ming Dynasty (1368–1644 AD)',
      'Qin Dynasty (221–206 BC)',
      'Shang Dynasty (1600–1046 BC)'
    ],
    correctIndex: 0,
    explanation: 'The Mid-Autumn Festival gained official nationwide celebration status during the Tang Dynasty (618–907 AD), inspired by moon-gazing banquets and poems.',
    culturalInsight: 'Ornate round Mooncakes with salted duck egg yolks represent completeness, cosmic harmony, and family reunion under the harvest full moon.'
  },
  {
    id: 'q-obon-lanterns',
    holidayId: 'obon-japan',
    holidayName: 'Obon Festival',
    category: 'Cultural & Historical',
    question: 'What is the purpose of floating lanterns (Toro Nagashi) during Japan’s Obon festival in August?',
    options: [
      'To celebrate the arrival of the summer typhoon season',
      'To gently guide ancestral spirits back to the spiritual realm after their visit',
      'To pray for abundant autumn rice harvests',
      'To honor the founding of Kyoto'
    ],
    correctIndex: 1,
    explanation: 'During Obon, families welcome ancestral spirits home with bon lanterns, and on the final evening perform Toro Nagashi (floating paper lanterns on rivers) to guide spirits peacefully back.',
    culturalInsight: 'Communities gather in summer yukata robes to dance Bon Odori in town squares to the rhythmic beat of taiko drums.'
  },
  {
    id: 'q-eid-al-fitr-etiquette',
    holidayId: 'eid-al-fitr',
    holidayName: 'Eid al-Fitr',
    category: 'Religious',
    question: 'What crucial act of charity must Muslims perform before the communal Eid morning prayer?',
    options: [
      'Zakat al-Fitr (charitable food or monetary donation to ensure the needy can celebrate)',
      'Fasting for an additional three days',
      'Undertaking a full pilgrimage to Mecca',
      'Planting an olive tree in the local community'
    ],
    correctIndex: 0,
    explanation: 'Zakat al-Fitr is a mandatory charitable donation distributed before the morning Salat al-Eid prayer, ensuring every family has ample food to participate in the festive feast.',
    culturalInsight: 'Special date-filled semolina pastries called Ma’amoul and cardamon-infused milk sweets called Sheer Khurma are prepared across the Islamic world.'
  },
  {
    id: 'q-singles-day-alibaba',
    holidayId: 'singles-day-china',
    holidayName: 'Singles’ Day',
    category: 'Gift-Giving & Commercial',
    question: 'Why was November 11 (11/11) chosen for China’s Singles’ Day celebration?',
    options: [
      'The four digits "1111" resemble four single individuals standing alone like bare sticks',
      'It marks the anniversary of China’s first post office',
      'It coincides with the ancient winter solstice shopping fair',
      'It honors the eleven emperors of the Han Dynasty'
    ],
    correctIndex: 0,
    explanation: 'November 11 consists of four "1s" (11/11), symbolizing single individuals or "bare sticks" (guanggun). It has evolved into the world’s highest-grossing 24-hour retail festival.',
    culturalInsight: 'What started as a lighthearted university celebration has transformed into a massive global retail event surpassing Black Friday and Cyber Monday combined.'
  },
  {
    id: 'q-etiquette-photos',
    holidayId: 'dia-de-los-muertos',
    holidayName: 'Cultural Etiquette',
    category: 'Cultural & Historical',
    question: 'When visiting intimate family observances like Día de los Muertos cemetery vigils or Hindu wedding rites, what is the golden rule of respectful etiquette?',
    options: [
      'Always ask permission before taking photos of private altars and family gravesites',
      'Bring bright artificial plastic flowers to replace fresh marigolds',
      'Take souvenirs from sacred shrines to remember the visit',
      'Join family dining tables uninvited to show enthusiasm'
    ],
    correctIndex: 0,
    explanation: 'Respectful cultural etiquette always requires asking permission before photographing private altars, mourning families, or sacred ceremonies.',
    culturalInsight: 'Observing local customs—such as removing shoes in temples and Japanese homes—demonstrates deep empathy and genuine cultural fluency.'
  },
  {
    id: 'q-boxing-day-origin',
    holidayId: 'boxing-day',
    holidayName: 'Boxing Day',
    category: 'Gift-Giving & Commercial',
    question: 'What is the historical origin of Boxing Day (December 26) in the UK and Commonwealth?',
    options: [
      'Victorian-era tradition where tradespeople and servants received gift boxes and bonuses from employers',
      'Prize-fighting championships held the day after Christmas',
      'Packing up Christmas tree ornaments into storage boxes',
      'Collecting cardboard boxes for community recycling'
    ],
    correctIndex: 0,
    explanation: 'Boxing Day originated in Britain as a day when employers gave servants and tradespeople "Christmas boxes" filled with money, gifts, and food, giving them the day off with their own families.',
    culturalInsight: 'In modern times, Boxing Day is famous for charitable food drives, high-stakes Premier League football fixtures, and retail sales.'
  }
];

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  holidays,
  explorerProgress,
  preferences,
  onSelectHoliday,
  onRecordQuizCompletion
}) => {
  const [quizMode, setQuizMode] = useState<'daily' | 'explored' | 'all'>('daily');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [sessionStreak, setSessionStreak] = useState<number>(0);
  const [highestStreakThisSession, setHighestStreakThisSession] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<Array<{
    question: QuizQuestion;
    userSelected: number;
    isCorrect: boolean;
  }>>([]);

  // Generate active question set
  const activeQuestions = useMemo(() => {
    if (quizMode === 'explored') {
      const viewedIds = new Set(explorerProgress.viewedHolidayIds);
      const matching = MASTER_QUIZ_QUESTIONS.filter(q => viewedIds.has(q.holidayId));
      if (matching.length >= 3) {
        return matching.slice(0, 5);
      }
    }
    if (quizMode === 'daily') {
      // Pick 5 balanced questions
      return MASTER_QUIZ_QUESTIONS.slice(0, 5);
    }
    // 'all' mode: full questions pool
    return MASTER_QUIZ_QUESTIONS;
  }, [quizMode, explorerProgress.viewedHolidayIds]);

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    const newHistory = [
      ...userAnswersHistory,
      { question: currentQ, userSelected: selectedOption, isCorrect }
    ];
    setUserAnswersHistory(newHistory);

    if (isCorrect) {
      const newStreak = sessionStreak + 1;
      setSessionStreak(newStreak);
      setHighestStreakThisSession(prev => Math.max(prev, newStreak));
      // Base points (50) + streak bonus (10 * streak)
      const earned = 50 + (newStreak * 10);
      setSessionScore(prev => prev + earned);
    } else {
      setSessionStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished!
      setQuizFinished(true);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      onRecordQuizCompletion(sessionScore, highestStreakThisSession);
    }
  };

  const handleRestart = (newMode?: 'daily' | 'explored' | 'all') => {
    if (newMode) setQuizMode(newMode);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setSessionScore(0);
    setSessionStreak(0);
    setHighestStreakThisSession(0);
    setQuizFinished(false);
    setUserAnswersHistory([]);
  };

  // Find corresponding Holiday object to view lore in modal
  const getAssociatedHoliday = (holidayId: string): Holiday | undefined => {
    return holidays.find(h => h.id.toLowerCase().includes(holidayId.toLowerCase()));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Quiz Header & Gamification Bar */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase flex items-center gap-1.5 border border-white/30">
                <Brain className="w-3.5 h-3.5 text-amber-300" />
                Cultural Explorer Academy
              </span>
              <span className="text-xs font-mono bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20">
                Daily Trivia Sprint
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
              Global Traditions Trivia Challenge
            </h1>
            <p className="text-stone-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Test your knowledge of world celebrations, historical origins, sacred rituals, and respectful etiquette. Earn bonus points toward explorer badges!
            </p>
          </div>

          {/* Player stats cards */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 text-center min-w-[95px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block">
                Bonus Points
              </span>
              <span className="text-xl sm:text-2xl font-serif font-black text-white flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {(explorerProgress.quizBonusPoints || 0) + sessionScore}
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 text-center min-w-[95px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300 block">
                Streak Flame
              </span>
              <span className="text-xl sm:text-2xl font-serif font-black text-white flex items-center justify-center gap-1">
                <Flame className={`w-4 h-4 ${sessionStreak > 0 ? 'text-amber-400 animate-bounce' : 'text-stone-400'}`} />
                {sessionStreak}x
              </span>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-xs font-semibold">
            <button
              onClick={() => handleRestart('daily')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                quizMode === 'daily'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Daily Sprint (5 Qs)</span>
            </button>

            <button
              onClick={() => handleRestart('explored')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                quizMode === 'explored'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              <span>My Explored Holidays</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-mono">
                {explorerProgress.viewedHolidayIds.length}
              </span>
            </button>

            <button
              onClick={() => handleRestart('all')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                quizMode === 'all'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Grand Compendium</span>
            </button>
          </div>

          <div className="text-xs text-white/80 font-mono">
            Quizzes Completed: <span className="font-bold text-white">{explorerProgress.quizzesCompleted || 0}</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Tracker Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {currentQ.category}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              Festival of Focus: {currentQ.holidayName}
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-black text-stone-900 dark:text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let optionStyle = 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 hover:border-amber-400 dark:hover:border-amber-500';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/20';
                } else {
                  optionStyle = 'opacity-40 bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/30';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between gap-4 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isSelected || (isAnswerSubmitted && isCorrectAnswer)
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {option}
                    </span>
                  </div>

                  {isAnswerSubmitted && (
                    <div className="shrink-0">
                      {isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                      )}
                      {isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-500 fill-rose-100 dark:fill-rose-950" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Cultural Lore Box (Revealed after submission) */}
          {isAnswerSubmitted && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  Cultural Wisdom & Origin Lore
                </span>
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Correct (+{50 + (sessionStreak * 10)} pts)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Keep Learning!
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-300/40 dark:border-amber-900/40 text-[11px] sm:text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Heritage Fact:</strong> {currentQ.culturalInsight}
                </span>
              </div>

              {/* Link to view holiday modal */}
              {(() => {
                const associated = getAssociatedHoliday(currentQ.holidayId);
                if (associated) {
                  return (
                    <div className="pt-1">
                      <button
                        onClick={() => onSelectHoliday(associated)}
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        Explore {associated.name} details & atmospheric soundscape →
                      </button>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500">
              Session Score: <strong className="text-amber-600 dark:text-amber-400 font-serif text-sm">+{sessionScore}</strong>
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="py-2.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <span>{currentQuestionIndex + 1 < activeQuestions.length ? 'Next Question' : 'View Challenge Summary'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Completion Screen */
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center mx-auto shadow-xl">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
              Challenge Complete!
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-white">
              Outstanding Cultural Mastery!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              You’ve deepened your understanding of world celebrations and expanded your global fluency.
            </p>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Bonus Points</span>
              <span className="text-xl sm:text-2xl font-serif font-black text-amber-600 dark:text-amber-400">
                +{sessionScore}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Correct Answers</span>
              <span className="text-xl sm:text-2xl font-serif font-black text-emerald-600 dark:text-emerald-400">
                {userAnswersHistory.filter(h => h.isCorrect).length} / {activeQuestions.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Max Streak</span>
              <span className="text-xl sm:text-2xl font-serif font-black text-rose-600 dark:text-rose-400">
                {highestStreakThisSession}x
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Accuracy</span>
              <span className="text-xl sm:text-2xl font-serif font-black text-indigo-600 dark:text-indigo-400">
                {Math.round((userAnswersHistory.filter(h => h.isCorrect).length / activeQuestions.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Quick Review of Questions */}
          <div className="text-left space-y-3 max-w-2xl mx-auto pt-4 border-t border-stone-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
              Questions Review:
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {userAnswersHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-stone-900 dark:text-white truncate">
                      {idx + 1}. {item.question.holidayName}
                    </span>
                    {item.isCorrect ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-bold text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {item.question.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleRestart('daily')}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Challenge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
