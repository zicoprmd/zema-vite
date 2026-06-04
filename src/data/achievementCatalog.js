export const achievementCatalog = [
  {
    id: "first-steps",
    icon: "🌱",
    label: "First Steps",
    description: "Explore 3 words in one category.",
    isUnlocked: ({ visitedWordsCount }) => visitedWordsCount >= 3,
  },
  {
    id: "quiz-spark",
    icon: "⚡",
    label: "Quiz Spark",
    description: "Get your first correct answer in quiz mode.",
    isUnlocked: ({ bestScore }) => bestScore >= 1,
  },
  {
    id: "streak-star",
    icon: "🔥",
    label: "Streak Star",
    description: "Reach a 3-answer correct streak.",
    isUnlocked: ({ bestStreak }) => bestStreak >= 3,
  },
  {
    id: "category-hero",
    icon: "🏆",
    label: "Category Hero",
    description: "Explore every word in the category.",
    isUnlocked: ({ visitedWordsCount, totalWords }) =>
      visitedWordsCount === totalWords,
  },
];
