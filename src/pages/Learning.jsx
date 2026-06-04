/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BiBookOpen,
  BiHomeAlt,
  BiShuffle,
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";
import { achievementCatalog } from "../data/achievementCatalog";
import { categoryDetails, lessonContent } from "../data/lessonContent";
import "./Learning.scss";

const praise = ["Great!", "Nice!", "Good job!", "Super!"];
const tryAgain = ["Try again", "Almost", "One more"];

const PROGRESS_STORAGE_KEY = "little-lingua-progress-v1";
const MISTAKES_STORAGE_KEY = "little-lingua-mistakes-v1";
const APP_STORAGE_KEY = "little-lingua-app-v1";

const loadStoredState = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const clampIndex = (index, list) =>
  Math.min(Math.max(index, 0), Math.max(list.length - 1, 0));

const getItemId = (item) => `${item.english}__${item.chinese}`;

const shuffleItems = (items) => [...items].sort(() => Math.random() - 0.5);

const makeQuizOptions = (answer, list) => {
  const wrongAnswers = list.filter((item) => item !== answer);
  return shuffleItems([answer, ...shuffleItems(wrongAnswers).slice(0, 3)]);
};

const LessonPicture = ({ item }) => {
  const symbol =
    item.symbol || item.chinese?.slice(0, 1) || item.english.slice(0, 1);
  const isAnimal = [
    "cat",
    "dog",
    "bird",
    "fish",
    "rabbit",
    "duck",
    "cow",
    "sheep",
  ].includes(item.shape);
  const isTransport =
    item.shape === "transport" ||
    item.shape === "car" ||
    item.shape === "train";
  const isShape = item.shape === "shapeCard" || item.shape === "number";

  return (
    <svg
      className="learning-picture"
      viewBox="0 0 220 220"
      role="img"
      aria-label={item.english}
    >
      <circle
        className="learning-picture__glow"
        cx="110"
        cy="110"
        r="92"
        fill={item.color}
      />
      {isAnimal && (
        <>
          <path d="M70 76 L84 36 L110 68 L136 36 L150 76" fill={item.color} />
          <circle
            cx="110"
            cy="112"
            r="64"
            fill={item.color}
            stroke="#273044"
            strokeWidth="7"
          />
          <circle cx="88" cy="104" r="8" fill="#273044" />
          <circle cx="132" cy="104" r="8" fill="#273044" />
          <circle cx="110" cy="120" r="7" fill="#e66b8f" />
          <path
            d="M94 136 q16 15 32 0"
            fill="none"
            stroke="#273044"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {isTransport && (
        <>
          <rect
            x="38"
            y="98"
            width="144"
            height="58"
            rx="20"
            fill={item.color}
            stroke="#273044"
            strokeWidth="8"
          />
          <path
            d="M72 98 l24 -34 h48 l24 34"
            fill={item.color}
            stroke="#273044"
            strokeWidth="8"
          />
          <circle cx="78" cy="160" r="17" fill="#273044" />
          <circle cx="146" cy="160" r="17" fill="#273044" />
        </>
      )}
      {!isAnimal && !isTransport && (
        <>
          <rect
            x="38"
            y="38"
            width="144"
            height="144"
            rx={isShape ? "30" : "46"}
            fill={item.color}
            stroke="#273044"
            strokeWidth="8"
          />
          <circle cx="74" cy="76" r="14" fill="rgba(255,255,255,0.36)" />
          <circle cx="150" cy="152" r="18" fill="rgba(255,255,255,0.28)" />
          <text
            x="110"
            y="132"
            textAnchor="middle"
            fontSize={symbol.length > 1 ? "44" : "64"}
            fontWeight="900"
            fill={
              item.shape === "paint" || item.shape === "number"
                ? "#ffffff"
                : "#273044"
            }
            fontFamily="Trebuchet MS, Segoe UI, sans-serif"
          >
            {symbol}
          </text>
        </>
      )}
    </svg>
  );
};

const Learning = () => {
  const { categories, data } = lessonContent;
  const storedAppState = useMemo(
    () => loadStoredState(APP_STORAGE_KEY, {}),
    [],
  );
  const [savedProgress, setSavedProgress] = useState(() =>
    loadStoredState(PROGRESS_STORAGE_KEY, {}),
  );
  const [mistakeBuckets, setMistakeBuckets] = useState(() =>
    loadStoredState(MISTAKES_STORAGE_KEY, {}),
  );

  const initialCategory = data[storedAppState.lastCategory]
    ? storedAppState.lastCategory
    : "animals";
  const initialCategoryProgress = savedProgress[initialCategory] ?? {};
  const initialCardIndex = clampIndex(
    initialCategoryProgress.lastCardIndex ?? 0,
    data[initialCategory],
  );

  const [category, setCategory] = useState(initialCategory);
  const [practiceSet, setPracticeSet] = useState("all");
  const [cardIndex, setCardIndex] = useState(initialCardIndex);
  const [soundOn, setSoundOn] = useState(true);
  const [starCount, setStarCount] = useState(
    initialCategoryProgress.stars ?? 0,
  );
  const [mode, setModeState] = useState(
    initialCategoryProgress.lastMode ?? "flashcard",
  );
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizOptions, setQuizOptions] = useState(() =>
    makeQuizOptions(
      data[initialCategory][initialCardIndex],
      data[initialCategory],
    ),
  );
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizWrongItem, setQuizWrongItem] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [achievementToast, setAchievementToast] = useState(null);
  const autoNextTimeoutRef = useRef(null);
  const achievementTimeoutRef = useRef(null);

  const currentBaseList = data[category];
  const categoryMistakes = mistakeBuckets[category] ?? [];
  const mistakeList = currentBaseList.filter((item) =>
    categoryMistakes.includes(getItemId(item)),
  );
  const hasMistakes = mistakeList.length > 0;
  const usingReviewList = practiceSet === "mistakes" && hasMistakes;
  const currentList = usingReviewList ? mistakeList : currentBaseList;
  const safeCardIndex = clampIndex(cardIndex, currentList);
  const currentCard = currentList[safeCardIndex];
  const choices = mode === "quiz" ? quizOptions : currentList;
  const currentCategoryMeta = categoryDetails[category] ?? {
    title: "Vocabulary Practice",
    description:
      "Explore new words in English and Mandarin through playful repetition.",
  };
  const currentExample = {
    english: currentCard.exampleEnglish,
    chinese: currentCard.exampleChinese,
    indonesian: currentCard.exampleIndonesian,
  };

  const categoryProgress = savedProgress[category] ?? {};
  const visitedWordIds = categoryProgress.visitedWords ?? [];
  const visitedWordsCount = currentBaseList.filter((item) =>
    visitedWordIds.includes(getItemId(item)),
  ).length;
  const masteryPercent = Math.round(
    (visitedWordsCount / currentBaseList.length) * 100,
  );
  const progressPercent = Math.round(
    ((safeCardIndex + 1) / currentList.length) * 100,
  );
  const accuracy = quizTotal ? Math.round((quizScore / quizTotal) * 100) : 0;
  const bestScore = categoryProgress.bestScore ?? 0;
  const bestStreak = categoryProgress.bestStreak ?? 0;

  const unlockedBadgeIds = useMemo(
    () => categoryProgress.badges ?? [],
    [categoryProgress.badges],
  );
  const badgeMetrics = useMemo(
    () => ({
      visitedWordsCount,
      totalWords: currentBaseList.length,
      bestScore,
      bestStreak,
    }),
    [visitedWordsCount, currentBaseList.length, bestScore, bestStreak],
  );
  const achievementBadges = useMemo(
    () =>
      achievementCatalog.map((badge) => ({
        ...badge,
        unlocked: unlockedBadgeIds.includes(badge.id),
      })),
    [unlockedBadgeIds],
  );

  const practiceTips = usingReviewList
    ? [
        "Review kata yang pernah salah agar anak lebih cepat mengingat.",
        "Tekan Listen lalu minta anak menebak sebelum melihat jawabannya.",
        "Kosongkan review list jika semua kata sudah terasa mudah.",
      ]
    : mode === "quiz"
      ? [
          "Listen to the English word first before choosing the Mandarin answer.",
          "Jawaban benar akan otomatis lanjut ke soal berikutnya.",
          "Wrong answers are saved automatically into the review list.",
        ]
      : [
          "Tap the big card to hear the English word followed by Mandarin.",
          "Use the choice buttons below to jump quickly between vocabulary cards.",
          "Read the example sentence aloud in three languages.",
        ];

  const speakPhrase = (text, lang) => {
    if (!soundOn || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.76;
    utterance.pitch = 1.18;
    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    speakPhrase(currentCard.english, "en-US");
    setTimeout(() => speakPhrase(currentCard.chinese, "zh-CN"), 720);
  };

  const speakExampleSentence = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    speakPhrase(currentExample.english, "en-US");
    setTimeout(() => speakPhrase(currentExample.chinese, "zh-CN"), 1200);
    setTimeout(() => speakPhrase(currentExample.indonesian, "id-ID"), 2400);
  };

  const resetQuizFor = (answer, list) => {
    setQuizAnswered(false);
    setQuizWrongItem(null);
    setQuizOptions(makeQuizOptions(answer, list));
  };

  const clearAutoNextTimeout = () => {
    if (autoNextTimeoutRef.current) {
      window.clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearAutoNextTimeout();
      if (achievementTimeoutRef.current) {
        window.clearTimeout(achievementTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cardIndex !== safeCardIndex) {
      setCardIndex(safeCardIndex);
    }
  }, [cardIndex, safeCardIndex]);

  useEffect(() => {
    if (!currentCard) return;

    const itemId = getItemId(currentCard);
    const absoluteCardIndex = currentBaseList.indexOf(currentCard);

    setSavedProgress((previous) => {
      const previousCategory = previous[category] ?? {};
      const previousVisited = previousCategory.visitedWords ?? [];
      const nextVisited = previousVisited.includes(itemId)
        ? previousVisited
        : [...previousVisited, itemId];
      const nextBestScore = Math.max(
        previousCategory.bestScore ?? 0,
        quizScore,
      );
      const nextBestStreak = Math.max(
        previousCategory.bestStreak ?? 0,
        quizStreak,
      );
      const nextStars = Math.max(previousCategory.stars ?? 0, starCount);
      const hasChanged =
        (previousCategory.lastCardIndex ?? 0) !== absoluteCardIndex ||
        (previousCategory.lastMode ?? "flashcard") !== mode ||
        (previousCategory.bestScore ?? 0) !== nextBestScore ||
        (previousCategory.bestStreak ?? 0) !== nextBestStreak ||
        (previousCategory.stars ?? 0) !== nextStars ||
        nextVisited.length !== previousVisited.length;

      if (!hasChanged) return previous;

      return {
        ...previous,
        [category]: {
          ...previousCategory,
          lastCardIndex: absoluteCardIndex,
          lastMode: mode,
          bestScore: nextBestScore,
          bestStreak: nextBestStreak,
          stars: nextStars,
          visitedWords: nextVisited,
        },
      };
    });
  }, [
    category,
    currentBaseList,
    currentCard,
    mode,
    quizScore,
    quizStreak,
    starCount,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(savedProgress),
    );
  }, [savedProgress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      MISTAKES_STORAGE_KEY,
      JSON.stringify(mistakeBuckets),
    );
  }, [mistakeBuckets]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      APP_STORAGE_KEY,
      JSON.stringify({ lastCategory: category }),
    );
  }, [category]);

  useEffect(() => {
    if (practiceSet === "mistakes" && !hasMistakes) {
      setPracticeSet("all");
      setCardIndex(0);
      setFeedback("Review list selesai. Kembali ke semua kata.");
      resetQuizFor(currentBaseList[0], currentBaseList);
    }
  }, [practiceSet, hasMistakes, category, currentBaseList]);

  useEffect(() => {
    const newlyUnlocked = achievementCatalog.filter(
      (badge) =>
        badge.isUnlocked(badgeMetrics) && !unlockedBadgeIds.includes(badge.id),
    );

    if (!newlyUnlocked.length) return;

    const newestBadge = newlyUnlocked[0];

    setSavedProgress((previous) => {
      const previousCategory = previous[category] ?? {};
      return {
        ...previous,
        [category]: {
          ...previousCategory,
          badges: Array.from(
            new Set([
              ...(previousCategory.badges ?? []),
              ...newlyUnlocked.map((badge) => badge.id),
            ]),
          ),
        },
      };
    });

    setAchievementToast(newestBadge);

    if (achievementTimeoutRef.current) {
      window.clearTimeout(achievementTimeoutRef.current);
    }

    achievementTimeoutRef.current = window.setTimeout(() => {
      setAchievementToast(null);
      achievementTimeoutRef.current = null;
    }, 2400);
  }, [badgeMetrics, category, unlockedBadgeIds]);

  const rememberMistake = (item) => {
    const itemId = getItemId(item);

    setMistakeBuckets((previous) => {
      const currentItems = previous[category] ?? [];
      if (currentItems.includes(itemId)) return previous;

      return {
        ...previous,
        [category]: [...currentItems, itemId],
      };
    });
  };

  const selectCategory = (nextCategory) => {
    const nextList = data[nextCategory];
    const nextProgress = savedProgress[nextCategory] ?? {};
    const nextIndex = clampIndex(nextProgress.lastCardIndex ?? 0, nextList);

    clearAutoNextTimeout();
    setCategory(nextCategory);
    setPracticeSet("all");
    setCardIndex(nextIndex);
    setStarCount(nextProgress.stars ?? 0);
    setQuizStreak(0);
    setFeedback("");
    resetQuizFor(nextList[nextIndex], nextList);
  };

  const switchMode = (nextMode) => {
    clearAutoNextTimeout();
    setModeState(nextMode);
    setQuizStreak(0);
    setFeedback("");
    resetQuizFor(currentCard, currentList);
  };

  const switchPracticeSet = (nextSet) => {
    if (nextSet === practiceSet) return;

    if (nextSet === "mistakes" && !hasMistakes) {
      setFeedback("Jawab salah sekali di quiz untuk membuka review list.");
      return;
    }

    const nextList = nextSet === "mistakes" ? mistakeList : currentBaseList;
    clearAutoNextTimeout();
    setPracticeSet(nextSet);
    setCardIndex(0);
    setQuizStreak(0);
    setFeedback(
      nextSet === "mistakes"
        ? "Saatnya review kata yang masih tricky."
        : "Kembali ke semua kata.",
    );
    resetQuizFor(nextList[0], nextList);
  };

  const moveCard = (direction) => {
    const nextIndex =
      (safeCardIndex + direction + currentList.length) % currentList.length;
    clearAutoNextTimeout();
    setCardIndex(nextIndex);
    setStarCount((count) => Math.min(count + 1, 5));
    setFeedback("");
    resetQuizFor(currentList[nextIndex], currentList);
  };

  const nextQuizQuestion = () => {
    const randomJump =
      1 + Math.floor(Math.random() * Math.max(currentList.length - 1, 1));
    const nextIndex = (safeCardIndex + randomJump) % currentList.length;
    clearAutoNextTimeout();
    setCardIndex(nextIndex);
    setFeedback("");
    resetQuizFor(currentList[nextIndex], currentList);
    speakPhrase(currentList[nextIndex].english, "en-US");
  };

  const chooseAnswer = (item) => {
    if (mode === "flashcard") {
      const nextIndex = currentList.indexOf(item);
      clearAutoNextTimeout();
      setCardIndex(nextIndex);
      setStarCount((count) => Math.min(count + 1, 5));
      setFeedback("");
      return;
    }

    if (quizAnswered) return;

    clearAutoNextTimeout();
    setQuizAnswered(true);
    setQuizTotal((total) => total + 1);

    if (item === currentCard) {
      const nextStreak = quizStreak + 1;
      setQuizScore((score) => score + 1);
      setQuizStreak(nextStreak);
      setStarCount((count) => Math.min(count + 1, 5));
      setFeedback(
        `${praise[Math.floor(Math.random() * praise.length)]} · next question...`,
      );
      speak();
      autoNextTimeoutRef.current = window.setTimeout(() => {
        nextQuizQuestion();
      }, 1150);
      return;
    }

    setQuizStreak(0);
    rememberMistake(currentCard);
    setQuizWrongItem(item);
    setFeedback(
      `${tryAgain[Math.floor(Math.random() * tryAgain.length)]} · saved to review`,
    );
    speakPhrase(currentCard.chinese, "zh-CN");
  };

  const shuffleCard = () => {
    clearAutoNextTimeout();

    if (mode === "quiz") {
      setQuizScore(0);
      setQuizTotal(0);
      setQuizStreak(0);
      nextQuizQuestion();
      return;
    }

    const randomIndex = Math.floor(Math.random() * currentList.length);
    const nextIndex =
      randomIndex === safeCardIndex
        ? (randomIndex + 1) % currentList.length
        : randomIndex;
    setCardIndex(nextIndex);
    setFeedback("");
    resetQuizFor(currentList[nextIndex], currentList);
  };

  const clearReviewList = () => {
    clearAutoNextTimeout();
    setMistakeBuckets((previous) => {
      if (!previous[category]?.length) return previous;
      const nextState = { ...previous };
      delete nextState[category];
      return nextState;
    });

    setPracticeSet("all");
    setCardIndex(0);
    setQuizStreak(0);
    setFeedback("Review list dibersihkan.");
    resetQuizFor(currentBaseList[0], currentBaseList);
  };

  const toggleSound = () => {
    setSoundOn((value) => {
      if (value && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return !value;
    });
  };

  const jumpToCard = (item) => {
    const nextIndex = currentList.indexOf(item);
    clearAutoNextTimeout();
    setCardIndex(nextIndex);
    setFeedback("");
    resetQuizFor(item, currentList);
  };

  return (
    <section className="learning-page">
      <div className="learning-page__topbar">
        <Link to="/" className="learning-page__home">
          <BiHomeAlt />
          <span>Home</span>
        </Link>
        <div className="learning-page__title">
          <BiBookOpen />
          <span>Learning</span>
        </div>
      </div>

      <main
        className="learning-stage"
        aria-label="Aplikasi belajar bahasa untuk anak"
      >
        <header className="learning-header">
          <div>
            <p className="learning-eyebrow">English + Mandarin</p>
            <h1>Little Lingua</h1>
          </div>
          <button
            className={`learning-icon-button ${soundOn ? "" : "is-off"}`}
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Suara aktif" : "Suara mati"}
          >
            {soundOn ? <BiVolumeFull /> : <BiVolumeMute />}
          </button>
        </header>

        <nav className="learning-tabs" aria-label="Kategori belajar">
          {categories.map((item) => (
            <button
              key={item.key}
              className={`learning-tab ${item.key === category ? "active" : ""}`}
              type="button"
              onClick={() => selectCategory(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <section className="learning-gamebar" aria-label="Mode belajar">
          <div className="learning-mode-switch">
            {["flashcard", "quiz"].map((item) => (
              <button
                key={item}
                className={`learning-mode-button ${mode === item ? "active" : ""}`}
                type="button"
                onClick={() => switchMode(item)}
              >
                {item === "flashcard" ? "Flashcard" : "Quiz"}
              </button>
            ))}
          </div>
          <div className="learning-score-pill" aria-live="polite">
            {mode === "quiz"
              ? `Score ${quizScore}/${quizTotal}`
              : usingReviewList
                ? `${currentList.length} review cards`
                : `${currentList.length} cards`}
          </div>
        </section>

        <section className="learning-study-row" aria-label="Fokus latihan">
          <div className="learning-study-switch">
            <button
              className={`learning-study-button ${practiceSet === "all" ? "active" : ""}`}
              type="button"
              onClick={() => switchPracticeSet("all")}
            >
              All words
            </button>
            <button
              className={`learning-study-button ${practiceSet === "mistakes" ? "active" : ""}`}
              type="button"
              onClick={() => switchPracticeSet("mistakes")}
              disabled={!hasMistakes}
            >
              Review mistakes
            </button>
          </div>

          <div className="learning-study-actions">
            <div className="learning-study-pill" aria-live="polite">
              {mode === "quiz"
                ? `Streak ${quizStreak} · Accuracy ${accuracy}%`
                : hasMistakes
                  ? `${mistakeList.length} tricky words saved`
                  : "No tricky words saved yet"}
            </div>
            {hasMistakes && (
              <button
                className="learning-clear-button"
                type="button"
                onClick={clearReviewList}
              >
                Clear review
              </button>
            )}
          </div>
        </section>

        <section className="learning-overview" aria-label="Ringkasan belajar">
          <div className="learning-overview__content">
            <p className="learning-overview__eyebrow">Today&apos;s focus</p>
            <h2>{currentCategoryMeta.title}</h2>
            <p>{currentCategoryMeta.description}</p>

            <div className="learning-progress-strip">
              <div className="learning-progress-strip__label">
                <span>Saved progress</span>
                <strong>
                  {visitedWordsCount}/{currentBaseList.length} words explored
                </strong>
              </div>
              <div className="learning-progress-bar" aria-hidden="true">
                <span style={{ width: `${masteryPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="learning-overview__stats">
            <div className="learning-stat-card">
              <strong>{safeCardIndex + 1}</strong>
              <span>Current card</span>
            </div>
            <div className="learning-stat-card">
              <strong>{progressPercent}%</strong>
              <span>Deck progress</span>
            </div>
            <div className="learning-stat-card">
              <strong>{masteryPercent}%</strong>
              <span>Saved progress</span>
            </div>
            <div className="learning-stat-card">
              <strong>{bestScore || "—"}</strong>
              <span>Best quiz</span>
            </div>
          </div>
        </section>

        <section className="learning-hero-panel">
          <div className="learning-scene" aria-hidden="true">
            <div className="learning-sun" />
            <div className="learning-cloud learning-cloud-one" />
            <div className="learning-cloud learning-cloud-two" />
            <div className="learning-hill learning-hill-one" />
            <div className="learning-hill learning-hill-two" />
            <div className="learning-tree">
              <span />
              <span />
            </div>
          </div>

          <button
            className={`learning-card ${currentCard.english.length > 12 || currentCard.chinese.length > 4 ? "long-card" : ""}`}
            type="button"
            onClick={speak}
            aria-label={`${currentCard.english}, ${currentCard.chinese}`}
          >
            <div className="learning-picture-wrap">
              <LessonPicture item={currentCard} />
            </div>
            <div className="learning-words">
              <p className="learning-word-label">English</p>
              <h2>{currentCard.english}</h2>
              <p className="learning-word-label">Mandarin</p>
              <h3>
                {mode === "quiz" && !quizAnswered ? "?" : currentCard.chinese}
              </h3>
              <p className="learning-pinyin">
                {mode === "quiz" && !quizAnswered
                  ? "Quiz time"
                  : currentCard.pinyin}
              </p>
            </div>
          </button>
        </section>

        <section className="learning-controls" aria-label="Kontrol kartu">
          {mode === "flashcard" && (
            <button
              className="learning-round-action"
              type="button"
              onClick={() => moveCard(-1)}
              aria-label="Kartu sebelumnya"
            >
              ‹
            </button>
          )}
          <button
            className="learning-speak-button"
            type="button"
            onClick={speak}
          >
            <BiVolumeFull />
            <span>Listen</span>
          </button>
          <button
            className="learning-round-action"
            type="button"
            onClick={mode === "quiz" ? nextQuizQuestion : () => moveCard(1)}
            aria-label={
              mode === "quiz" ? "Soal berikutnya" : "Kartu berikutnya"
            }
          >
            ›
          </button>
        </section>

        <section className="learning-choice-row" aria-label="Pilihan kata">
          {choices.map((item) => {
            const isActive = mode === "flashcard" && item === currentCard;
            const isCorrect =
              mode === "quiz" && quizAnswered && item === currentCard;
            const isWrong =
              mode === "quiz" && quizAnswered && item === quizWrongItem;

            return (
              <button
                key={`${item.english}-${item.chinese}`}
                className={`learning-choice ${isActive ? "active" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                type="button"
                onClick={() => chooseAnswer(item)}
                aria-label={`${item.english}, ${item.chinese}`}
              >
                {item.chinese}
              </button>
            );
          })}
        </section>

        <div className="learning-feedback" aria-live="polite">
          {feedback}
        </div>

        {achievementToast && (
          <div className="learning-achievement-toast" aria-live="polite">
            <span className="learning-achievement-toast__icon">
              {achievementToast.icon}
            </span>
            <div>
              <strong>Badge unlocked!</strong>
              <p>{achievementToast.label}</p>
            </div>
          </div>
        )}

        <section
          className="learning-extra-grid"
          aria-label="Konten tambahan belajar"
        >
          <article className="learning-info-card">
            <p className="learning-info-card__eyebrow">Word lab</p>
            <h3>{currentCard.english}</h3>

            <dl className="learning-word-meta">
              <div>
                <dt>Mandarin</dt>
                <dd>
                  {mode === "quiz" && !quizAnswered
                    ? "Hidden in quiz mode"
                    : currentCard.chinese}
                </dd>
              </div>
              <div>
                <dt>Indonesia</dt>
                <dd>{currentCard.indonesian}</dd>
              </div>
              <div>
                <dt>Pinyin</dt>
                <dd>
                  {mode === "quiz" && !quizAnswered
                    ? "Reveal after answering"
                    : currentCard.pinyin}
                </dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{currentCategoryMeta.title}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>
                  {mode === "quiz" ? "Quiz challenge" : "Flashcard practice"}
                </dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{usingReviewList ? "Review mistakes" : "All words"}</dd>
              </div>
            </dl>
          </article>

          <article className="learning-info-card">
            <div className="learning-info-card__split learning-info-card__split--tight">
              <div>
                <p className="learning-info-card__eyebrow">Example sentence</p>
                <h3>Use {currentCard.english} in context</h3>
              </div>
              <button
                className="learning-inline-audio"
                type="button"
                onClick={speakExampleSentence}
                aria-label={`Dengarkan contoh kalimat ${currentCard.english}`}
              >
                <BiVolumeFull />
                <span>Play example</span>
              </button>
            </div>

            <div className="learning-example-stack">
              <div className="learning-example-line">
                <span>English</span>
                <p>{currentExample.english}</p>
              </div>

              <div className="learning-example-line learning-example-line--mandarin">
                <span>Mandarin</span>
                <p>{currentExample.chinese}</p>
              </div>

              <div className="learning-example-line">
                <span>Indonesia</span>
                <p>{currentExample.indonesian}</p>
              </div>
            </div>
          </article>

          <article className="learning-info-card">
            <p className="learning-info-card__eyebrow">Practice guide</p>
            <h3>
              {usingReviewList
                ? "Review kata yang sering salah"
                : mode === "quiz"
                  ? "How to win the quiz"
                  : "How to use the flashcards"}
            </h3>

            <ul className="learning-tip-list">
              {practiceTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>

          <article className="learning-info-card">
            <div className="learning-info-card__split">
              <div>
                <p className="learning-info-card__eyebrow">Achievements</p>
                <h3>Small wins that keep learning fun</h3>
              </div>
              <span className="learning-info-badge">
                Best streak {bestStreak}
              </span>
            </div>

            <div className="learning-badge-grid">
              {achievementBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`learning-badge-card ${badge.unlocked ? "unlocked" : "locked"}`}
                >
                  <span className="learning-badge-card__icon">
                    {badge.icon}
                  </span>
                  <strong>{badge.label}</strong>
                  <p>{badge.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="learning-info-card learning-info-card--wide">
            <div className="learning-info-card__split">
              <div>
                <p className="learning-info-card__eyebrow">
                  {usingReviewList ? "Review explorer" : "Category explorer"}
                </p>
                <h3>
                  {usingReviewList
                    ? `Words to review in ${currentCategoryMeta.title}`
                    : `More words in ${currentCategoryMeta.title}`}
                </h3>
              </div>
              <span className="learning-info-badge">
                {currentList.length} words
              </span>
            </div>

            <div className="learning-preview-list">
              {currentList.map((item) => (
                <button
                  key={`preview-${item.english}-${item.chinese}`}
                  className={`learning-preview-pill ${item === currentCard ? "active" : ""}`}
                  type="button"
                  onClick={() => jumpToCard(item)}
                  aria-label={`Buka kata ${item.english}`}
                >
                  <span>{item.english}</span>
                  <strong>{item.chinese}</strong>
                </button>
              ))}
            </div>
          </article>
        </section>

        <footer className="learning-progress-area" aria-label="Progres belajar">
          <div className="learning-stars" aria-label="Bintang progres">
            {Array.from({ length: starCount }).map((_, index) => (
              <span key={index} className="learning-star">
                ★
              </span>
            ))}
          </div>
          <button
            className="learning-mini-button"
            type="button"
            onClick={shuffleCard}
          >
            <BiShuffle />
            <span>{mode === "quiz" ? "Reset" : "Mix"}</span>
          </button>
        </footer>
      </main>
    </section>
  );
};

export default Learning;
