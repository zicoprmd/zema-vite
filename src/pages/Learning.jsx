/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBookOpen, BiHomeAlt, BiShuffle, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import './Learning.scss';
import appScript from '../../app bilingual app anak/app.js?raw';

const loadLessonContent = () => {
  const contentOnly = appScript.slice(0, appScript.indexOf('const quizPraise'));
  return Function(`${contentOnly}; return { categories, data };`)();
};

const praise = ['Great!', 'Nice!', 'Good job!', 'Super!'];
const tryAgain = ['Try again', 'Almost', 'One more'];

const shuffleItems = (items) => [...items].sort(() => Math.random() - 0.5);

const makeQuizOptions = (answer, list) => {
  const wrongAnswers = list.filter((item) => item !== answer);
  return shuffleItems([answer, ...shuffleItems(wrongAnswers).slice(0, 3)]);
};

const LessonPicture = ({ item }) => {
  const symbol = item.symbol || item.chinese?.slice(0, 1) || item.english.slice(0, 1);
  const isAnimal = ['cat', 'dog', 'bird', 'fish', 'rabbit', 'duck', 'cow', 'sheep'].includes(item.shape);
  const isTransport = item.shape === 'transport' || item.shape === 'car' || item.shape === 'train';
  const isShape = item.shape === 'shapeCard' || item.shape === 'number';

  return (
    <svg className="learning-picture" viewBox="0 0 220 220" role="img" aria-label={item.english}>
      <circle className="learning-picture__glow" cx="110" cy="110" r="92" fill={item.color} />
      {isAnimal && (
        <>
          <path d="M70 76 L84 36 L110 68 L136 36 L150 76" fill={item.color} />
          <circle cx="110" cy="112" r="64" fill={item.color} stroke="#273044" strokeWidth="7" />
          <circle cx="88" cy="104" r="8" fill="#273044" />
          <circle cx="132" cy="104" r="8" fill="#273044" />
          <circle cx="110" cy="120" r="7" fill="#e66b8f" />
          <path d="M94 136 q16 15 32 0" fill="none" stroke="#273044" strokeWidth="6" strokeLinecap="round" />
        </>
      )}
      {isTransport && (
        <>
          <rect x="38" y="98" width="144" height="58" rx="20" fill={item.color} stroke="#273044" strokeWidth="8" />
          <path d="M72 98 l24 -34 h48 l24 34" fill={item.color} stroke="#273044" strokeWidth="8" />
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
            rx={isShape ? '30' : '46'}
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
            fontSize={symbol.length > 1 ? '44' : '64'}
            fontWeight="900"
            fill={item.shape === 'paint' || item.shape === 'number' ? '#ffffff' : '#273044'}
            fontFamily="Trebuchet MS, Segoe UI, sans-serif">
            {symbol}
          </text>
        </>
      )}
    </svg>
  );
};

const Learning = () => {
  const { categories, data } = useMemo(loadLessonContent, []);
  const [category, setCategory] = useState('animals');
  const [cardIndex, setCardIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [starCount, setStarCount] = useState(0);
  const [mode, setModeState] = useState('flashcard');
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizOptions, setQuizOptions] = useState(() => makeQuizOptions(data.animals[0], data.animals));
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizWrongItem, setQuizWrongItem] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentList = data[category];
  const currentCard = currentList[cardIndex];
  const choices = mode === 'quiz' ? quizOptions : currentList;

  const speakPhrase = (text, lang) => {
    if (!soundOn || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.76;
    utterance.pitch = 1.18;
    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    speakPhrase(currentCard.english, 'en-US');
    setTimeout(() => speakPhrase(currentCard.chinese, 'zh-CN'), 720);
  };

  const resetQuizFor = (answer, list) => {
    setQuizAnswered(false);
    setQuizWrongItem(null);
    setQuizOptions(makeQuizOptions(answer, list));
  };

  const selectCategory = (nextCategory) => {
    const nextList = data[nextCategory];
    setCategory(nextCategory);
    setCardIndex(0);
    setFeedback('');
    resetQuizFor(nextList[0], nextList);
  };

  const switchMode = (nextMode) => {
    setModeState(nextMode);
    setFeedback('');
    resetQuizFor(currentCard, currentList);
  };

  const moveCard = (direction) => {
    const nextIndex = (cardIndex + direction + currentList.length) % currentList.length;
    setCardIndex(nextIndex);
    setStarCount((count) => Math.min(count + 1, 5));
    setFeedback('');
    resetQuizFor(currentList[nextIndex], currentList);
  };

  const nextQuizQuestion = () => {
    const randomJump = 1 + Math.floor(Math.random() * Math.max(currentList.length - 1, 1));
    const nextIndex = (cardIndex + randomJump) % currentList.length;
    setCardIndex(nextIndex);
    setFeedback('');
    resetQuizFor(currentList[nextIndex], currentList);
    speakPhrase(currentList[nextIndex].english, 'en-US');
  };

  const chooseAnswer = (item) => {
    if (mode === 'flashcard') {
      const nextIndex = currentList.indexOf(item);
      setCardIndex(nextIndex);
      setStarCount((count) => Math.min(count + 1, 5));
      setFeedback('');
      return;
    }

    if (quizAnswered) return;
    setQuizAnswered(true);
    setQuizTotal((total) => total + 1);

    if (item === currentCard) {
      setQuizScore((score) => score + 1);
      setStarCount((count) => Math.min(count + 1, 5));
      setFeedback(praise[Math.floor(Math.random() * praise.length)]);
      speak();
      return;
    }

    setQuizWrongItem(item);
    setFeedback(tryAgain[Math.floor(Math.random() * tryAgain.length)]);
    speakPhrase(currentCard.chinese, 'zh-CN');
  };

  const shuffleCard = () => {
    if (mode === 'quiz') {
      setQuizScore(0);
      setQuizTotal(0);
      nextQuizQuestion();
      return;
    }

    const randomIndex = Math.floor(Math.random() * currentList.length);
    const nextIndex = randomIndex === cardIndex ? (randomIndex + 1) % currentList.length : randomIndex;
    setCardIndex(nextIndex);
    setFeedback('');
    resetQuizFor(currentList[nextIndex], currentList);
  };

  const toggleSound = () => {
    setSoundOn((value) => {
      if (value && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return !value;
    });
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

      <main className="learning-stage" aria-label="Aplikasi belajar bahasa untuk anak">
        <header className="learning-header">
          <div>
            <p className="learning-eyebrow">English + Mandarin</p>
            <h1>Little Lingua</h1>
          </div>
          <button
            className={`learning-icon-button ${soundOn ? '' : 'is-off'}`}
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Suara aktif' : 'Suara mati'}>
            {soundOn ? <BiVolumeFull /> : <BiVolumeMute />}
          </button>
        </header>

        <nav className="learning-tabs" aria-label="Kategori belajar">
          {categories.map((item) => (
            <button
              key={item.key}
              className={`learning-tab ${item.key === category ? 'active' : ''}`}
              type="button"
              onClick={() => selectCategory(item.key)}>
              {item.label}
            </button>
          ))}
        </nav>

        <section className="learning-gamebar" aria-label="Mode belajar">
          <div className="learning-mode-switch">
            {['flashcard', 'quiz'].map((item) => (
              <button
                key={item}
                className={`learning-mode-button ${mode === item ? 'active' : ''}`}
                type="button"
                onClick={() => switchMode(item)}>
                {item === 'flashcard' ? 'Flashcard' : 'Quiz'}
              </button>
            ))}
          </div>
          <div className="learning-score-pill" aria-live="polite">
            {mode === 'quiz' ? `Score ${quizScore}/${quizTotal}` : `${currentList.length} cards`}
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
            className={`learning-card ${currentCard.english.length > 12 || currentCard.chinese.length > 4 ? 'long-card' : ''}`}
            type="button"
            onClick={speak}
            aria-label={`${currentCard.english}, ${currentCard.chinese}`}>
            <div className="learning-picture-wrap">
              <LessonPicture item={currentCard} />
            </div>
            <div className="learning-words">
              <p className="learning-word-label">English</p>
              <h2>{currentCard.english}</h2>
              <p className="learning-word-label">Mandarin</p>
              <h3>{mode === 'quiz' && !quizAnswered ? '?' : currentCard.chinese}</h3>
              <p className="learning-pinyin">{mode === 'quiz' && !quizAnswered ? 'Quiz time' : currentCard.pinyin}</p>
            </div>
          </button>
        </section>

        <section className="learning-controls" aria-label="Kontrol kartu">
          {mode === 'flashcard' && (
            <button className="learning-round-action" type="button" onClick={() => moveCard(-1)} aria-label="Kartu sebelumnya">
              ‹
            </button>
          )}
          <button className="learning-speak-button" type="button" onClick={speak}>
            <BiVolumeFull />
            <span>Listen</span>
          </button>
          <button
            className="learning-round-action"
            type="button"
            onClick={mode === 'quiz' ? nextQuizQuestion : () => moveCard(1)}
            aria-label={mode === 'quiz' ? 'Soal berikutnya' : 'Kartu berikutnya'}>
            ›
          </button>
        </section>

        <section className="learning-choice-row" aria-label="Pilihan kata">
          {choices.map((item) => {
            const isActive = mode === 'flashcard' && item === currentCard;
            const isCorrect = mode === 'quiz' && quizAnswered && item === currentCard;
            const isWrong = mode === 'quiz' && quizAnswered && item === quizWrongItem;
            return (
              <button
                key={`${item.english}-${item.chinese}`}
                className={`learning-choice ${isActive ? 'active' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                type="button"
                onClick={() => chooseAnswer(item)}
                aria-label={`${item.english}, ${item.chinese}`}>
                {item.chinese}
              </button>
            );
          })}
        </section>

        <div className="learning-feedback" aria-live="polite">
          {feedback}
        </div>

        <footer className="learning-progress-area" aria-label="Progres belajar">
          <div className="learning-stars" aria-label="Bintang progres">
            {Array.from({ length: starCount }).map((_, index) => (
              <span key={index} className="learning-star">
                ★
              </span>
            ))}
          </div>
          <button className="learning-mini-button" type="button" onClick={shuffleCard}>
            <BiShuffle />
            <span>{mode === 'quiz' ? 'Reset' : 'Mix'}</span>
          </button>
        </footer>
      </main>
    </section>
  );
};

export default Learning;
