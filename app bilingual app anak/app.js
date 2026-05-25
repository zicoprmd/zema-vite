const categories = [
  { key: "animals", label: "Animals" },
  { key: "colors", label: "Colors" },
  { key: "food", label: "Food" },
  { key: "numbers", label: "Numbers" },
  { key: "family", label: "Family" },
  { key: "body", label: "Body" },
  { key: "toys", label: "Toys" },
  { key: "actions", label: "Actions" },
  { key: "clothes", label: "Clothes" },
  { key: "home", label: "Home" },
  { key: "nature", label: "Nature" },
  { key: "feelings", label: "Feelings" },
  { key: "transport", label: "Transport" },
  { key: "shapes", label: "Shapes" },
  { key: "dailyPhrases", label: "Daily Phrases" }
];

const data = {
  animals: [
    { english: "Cat", chinese: "猫", pinyin: "mao", color: "#f6b26b", shape: "cat" },
    { english: "Dog", chinese: "狗", pinyin: "gou", color: "#b8875f", shape: "dog" },
    { english: "Bird", chinese: "鸟", pinyin: "niao", color: "#5db7de", shape: "bird" },
    { english: "Fish", chinese: "鱼", pinyin: "yu", color: "#ff8a7a", shape: "fish" },
    { english: "Rabbit", chinese: "兔子", pinyin: "tu zi", color: "#f7dbe7", shape: "rabbit" },
    { english: "Duck", chinese: "鸭子", pinyin: "ya zi", color: "#f7d84b", shape: "duck" },
    { english: "Cow", chinese: "牛", pinyin: "niu", color: "#ffffff", shape: "cow" },
    { english: "Sheep", chinese: "羊", pinyin: "yang", color: "#f6f1e8", shape: "sheep" }
  ],
  colors: [
    { english: "Red", chinese: "红色", pinyin: "hong se", color: "#ef4b5f", shape: "paint" },
    { english: "Blue", chinese: "蓝色", pinyin: "lan se", color: "#3f8ee8", shape: "paint" },
    { english: "Green", chinese: "绿色", pinyin: "lu se", color: "#4caf68", shape: "paint" },
    { english: "Yellow", chinese: "黄色", pinyin: "huang se", color: "#f4cf42", shape: "paint" },
    { english: "Pink", chinese: "粉色", pinyin: "fen se", color: "#f48fb1", shape: "paint" },
    { english: "White", chinese: "白色", pinyin: "bai se", color: "#f7f7f7", shape: "paint" },
    { english: "Black", chinese: "黑色", pinyin: "hei se", color: "#273044", shape: "paint" },
    { english: "Purple", chinese: "紫色", pinyin: "zi se", color: "#8f72d8", shape: "paint" }
  ],
  food: [
    { english: "Apple", chinese: "苹果", pinyin: "ping guo", color: "#e84c5d", shape: "apple" },
    { english: "Milk", chinese: "牛奶", pinyin: "niu nai", color: "#8ecae6", shape: "milk" },
    { english: "Rice", chinese: "米饭", pinyin: "mi fan", color: "#f5efe3", shape: "rice" },
    { english: "Banana", chinese: "香蕉", pinyin: "xiang jiao", color: "#f5cf4a", shape: "banana" },
    { english: "Bread", chinese: "面包", pinyin: "mian bao", color: "#d9a066", shape: "bread" },
    { english: "Egg", chinese: "鸡蛋", pinyin: "ji dan", color: "#fff4c2", shape: "egg" },
    { english: "Water", chinese: "水", pinyin: "shui", color: "#69c6e8", shape: "water" },
    { english: "Cake", chinese: "蛋糕", pinyin: "dan gao", color: "#ffb6c9", shape: "cake" }
  ],
  numbers: [
    { english: "One", chinese: "一", pinyin: "yi", color: "#ef4b5f", shape: "number", symbol: "1" },
    { english: "Two", chinese: "二", pinyin: "er", color: "#3f8ee8", shape: "number", symbol: "2" },
    { english: "Three", chinese: "三", pinyin: "san", color: "#4caf68", shape: "number", symbol: "3" },
    { english: "Four", chinese: "四", pinyin: "si", color: "#f4cf42", shape: "number", symbol: "4" },
    { english: "Five", chinese: "五", pinyin: "wu", color: "#e66b8f", shape: "number", symbol: "5" },
    { english: "Six", chinese: "六", pinyin: "liu", color: "#8f72d8", shape: "number", symbol: "6" },
    { english: "Seven", chinese: "七", pinyin: "qi", color: "#ff9f43", shape: "number", symbol: "7" },
    { english: "Eight", chinese: "八", pinyin: "ba", color: "#48b6a3", shape: "number", symbol: "8" },
    { english: "Nine", chinese: "九", pinyin: "jiu", color: "#6ba8e8", shape: "number", symbol: "9" },
    { english: "Ten", chinese: "十", pinyin: "shi", color: "#7c8a9b", shape: "number", symbol: "10" }
  ],
  family: [
    { english: "Mama", chinese: "妈妈", pinyin: "ma ma", color: "#f48fb1", shape: "person", symbol: "妈" },
    { english: "Papa", chinese: "爸爸", pinyin: "ba ba", color: "#6ba8e8", shape: "person", symbol: "爸" },
    { english: "Baby", chinese: "宝宝", pinyin: "bao bao", color: "#f7d84b", shape: "person", symbol: "宝" },
    { english: "Older Brother", chinese: "哥哥", pinyin: "ge ge", color: "#7bdcb5", shape: "person", symbol: "哥" },
    { english: "Older Sister", chinese: "姐姐", pinyin: "jie jie", color: "#e66b8f", shape: "person", symbol: "姐" },
    { english: "Grandma", chinese: "奶奶", pinyin: "nai nai", color: "#c9a7eb", shape: "person", symbol: "奶" },
    { english: "Grandpa", chinese: "爷爷", pinyin: "ye ye", color: "#a7c8eb", shape: "person", symbol: "爷" },
    { english: "Friend", chinese: "朋友", pinyin: "peng you", color: "#ffb38a", shape: "person", symbol: "友" }
  ],
  body: [
    { english: "Eye", chinese: "眼睛", pinyin: "yan jing", color: "#89c9ff", shape: "body", symbol: "目" },
    { english: "Ear", chinese: "耳朵", pinyin: "er duo", color: "#ffb38a", shape: "body", symbol: "耳" },
    { english: "Nose", chinese: "鼻子", pinyin: "bi zi", color: "#f6b26b", shape: "body", symbol: "鼻" },
    { english: "Mouth", chinese: "嘴巴", pinyin: "zui ba", color: "#e66b8f", shape: "body", symbol: "口" },
    { english: "Hand", chinese: "手", pinyin: "shou", color: "#ffd2a6", shape: "body", symbol: "手" },
    { english: "Foot", chinese: "脚", pinyin: "jiao", color: "#7bdcb5", shape: "body", symbol: "脚" },
    { english: "Head", chinese: "头", pinyin: "tou", color: "#f7d84b", shape: "body", symbol: "头" },
    { english: "Hair", chinese: "头发", pinyin: "tou fa", color: "#705043", shape: "body", symbol: "发" }
  ],
  toys: [
    { english: "Ball", chinese: "球", pinyin: "qiu", color: "#ef4b5f", shape: "ball" },
    { english: "Car", chinese: "车", pinyin: "che", color: "#3f8ee8", shape: "car" },
    { english: "Book", chinese: "书", pinyin: "shu", color: "#7bdcb5", shape: "book" },
    { english: "Doll", chinese: "娃娃", pinyin: "wa wa", color: "#f48fb1", shape: "doll" },
    { english: "Blocks", chinese: "积木", pinyin: "ji mu", color: "#f4cf42", shape: "blocks" },
    { english: "Train", chinese: "火车", pinyin: "huo che", color: "#8f72d8", shape: "train" },
    { english: "Kite", chinese: "风筝", pinyin: "feng zheng", color: "#ff9f43", shape: "kite" },
    { english: "Drum", chinese: "鼓", pinyin: "gu", color: "#d96b5f", shape: "drum" }
  ],
  actions: [
    { english: "Eat", chinese: "吃", pinyin: "chi", color: "#ffb38a", shape: "action", symbol: "吃" },
    { english: "Drink", chinese: "喝", pinyin: "he", color: "#69c6e8", shape: "action", symbol: "喝" },
    { english: "Sleep", chinese: "睡觉", pinyin: "shui jiao", color: "#8f72d8", shape: "action", symbol: "睡" },
    { english: "Run", chinese: "跑", pinyin: "pao", color: "#ef4b5f", shape: "action", symbol: "跑" },
    { english: "Jump", chinese: "跳", pinyin: "tiao", color: "#4caf68", shape: "action", symbol: "跳" },
    { english: "Sing", chinese: "唱歌", pinyin: "chang ge", color: "#f7d84b", shape: "action", symbol: "唱" },
    { english: "Read", chinese: "读", pinyin: "du", color: "#7bdcb5", shape: "action", symbol: "读" },
    { english: "Play", chinese: "玩", pinyin: "wan", color: "#e66b8f", shape: "action", symbol: "玩" }
  ],
  clothes: [
    { english: "Shirt", chinese: "衬衫", pinyin: "chen shan", color: "#5db7de", shape: "clothes", symbol: "衫" },
    { english: "Pants", chinese: "裤子", pinyin: "ku zi", color: "#3f8ee8", shape: "clothes", symbol: "裤" },
    { english: "Shoes", chinese: "鞋子", pinyin: "xie zi", color: "#b8875f", shape: "clothes", symbol: "鞋" },
    { english: "Socks", chinese: "袜子", pinyin: "wa zi", color: "#f48fb1", shape: "clothes", symbol: "袜" },
    { english: "Hat", chinese: "帽子", pinyin: "mao zi", color: "#f7d84b", shape: "clothes", symbol: "帽" },
    { english: "Dress", chinese: "裙子", pinyin: "qun zi", color: "#e66b8f", shape: "clothes", symbol: "裙" },
    { english: "Jacket", chinese: "夹克", pinyin: "jia ke", color: "#7bdcb5", shape: "clothes", symbol: "夹" },
    { english: "Diaper", chinese: "尿布", pinyin: "niao bu", color: "#fff4c2", shape: "clothes", symbol: "布" },
    { english: "Pajamas", chinese: "睡衣", pinyin: "shui yi", color: "#8f72d8", shape: "clothes", symbol: "衣" }
  ],
  home: [
    { english: "House", chinese: "房子", pinyin: "fang zi", color: "#ffb38a", shape: "home", symbol: "房" },
    { english: "Door", chinese: "门", pinyin: "men", color: "#b8875f", shape: "home", symbol: "门" },
    { english: "Window", chinese: "窗户", pinyin: "chuang hu", color: "#89c9ff", shape: "home", symbol: "窗" },
    { english: "Bed", chinese: "床", pinyin: "chuang", color: "#8f72d8", shape: "home", symbol: "床" },
    { english: "Chair", chinese: "椅子", pinyin: "yi zi", color: "#7bdcb5", shape: "home", symbol: "椅" },
    { english: "Table", chinese: "桌子", pinyin: "zhuo zi", color: "#d9a066", shape: "home", symbol: "桌" },
    { english: "Lamp", chinese: "灯", pinyin: "deng", color: "#f7d84b", shape: "home", symbol: "灯" },
    { english: "Bath", chinese: "洗澡", pinyin: "xi zao", color: "#69c6e8", shape: "home", symbol: "澡" },
    { english: "Toilet", chinese: "厕所", pinyin: "ce suo", color: "#f6f1e8", shape: "home", symbol: "厕" }
  ],
  nature: [
    { english: "Sun", chinese: "太阳", pinyin: "tai yang", color: "#f7d84b", shape: "nature", symbol: "日" },
    { english: "Moon", chinese: "月亮", pinyin: "yue liang", color: "#d9ddea", shape: "nature", symbol: "月" },
    { english: "Star", chinese: "星星", pinyin: "xing xing", color: "#f4cf42", shape: "nature", symbol: "星" },
    { english: "Tree", chinese: "树", pinyin: "shu", color: "#4baf72", shape: "nature", symbol: "树" },
    { english: "Flower", chinese: "花", pinyin: "hua", color: "#e66b8f", shape: "nature", symbol: "花" },
    { english: "Rain", chinese: "雨", pinyin: "yu", color: "#69c6e8", shape: "nature", symbol: "雨" },
    { english: "Cloud", chinese: "云", pinyin: "yun", color: "#ffffff", shape: "nature", symbol: "云" },
    { english: "Wind", chinese: "风", pinyin: "feng", color: "#7bdcb5", shape: "nature", symbol: "风" },
    { english: "Grass", chinese: "草", pinyin: "cao", color: "#8fd17a", shape: "nature", symbol: "草" }
  ],
  feelings: [
    { english: "Happy", chinese: "开心", pinyin: "kai xin", color: "#f7d84b", shape: "feeling", symbol: "笑" },
    { english: "Sad", chinese: "伤心", pinyin: "shang xin", color: "#89c9ff", shape: "feeling", symbol: "哭" },
    { english: "Angry", chinese: "生气", pinyin: "sheng qi", color: "#ef4b5f", shape: "feeling", symbol: "气" },
    { english: "Scared", chinese: "害怕", pinyin: "hai pa", color: "#8f72d8", shape: "feeling", symbol: "怕" },
    { english: "Tired", chinese: "累", pinyin: "lei", color: "#7c8a9b", shape: "feeling", symbol: "累" },
    { english: "Hungry", chinese: "饿", pinyin: "e", color: "#ffb38a", shape: "feeling", symbol: "饿" },
    { english: "Thirsty", chinese: "渴", pinyin: "ke", color: "#69c6e8", shape: "feeling", symbol: "渴" },
    { english: "Hot", chinese: "热", pinyin: "re", color: "#ff9f43", shape: "feeling", symbol: "热" },
    { english: "Cold", chinese: "冷", pinyin: "leng", color: "#5db7de", shape: "feeling", symbol: "冷" }
  ],
  transport: [
    { english: "Car", chinese: "汽车", pinyin: "qi che", color: "#3f8ee8", shape: "transport", symbol: "车" },
    { english: "Bus", chinese: "公交车", pinyin: "gong jiao che", color: "#f7d84b", shape: "transport", symbol: "巴" },
    { english: "Train", chinese: "火车", pinyin: "huo che", color: "#8f72d8", shape: "transport", symbol: "火" },
    { english: "Bike", chinese: "自行车", pinyin: "zi xing che", color: "#7bdcb5", shape: "transport", symbol: "自" },
    { english: "Plane", chinese: "飞机", pinyin: "fei ji", color: "#89c9ff", shape: "transport", symbol: "飞" },
    { english: "Boat", chinese: "船", pinyin: "chuan", color: "#69c6e8", shape: "transport", symbol: "船" },
    { english: "Taxi", chinese: "出租车", pinyin: "chu zu che", color: "#f4cf42", shape: "transport", symbol: "租" },
    { english: "Truck", chinese: "卡车", pinyin: "ka che", color: "#d96b5f", shape: "transport", symbol: "卡" },
    { english: "Scooter", chinese: "滑板车", pinyin: "hua ban che", color: "#e66b8f", shape: "transport", symbol: "滑" }
  ],
  shapes: [
    { english: "Circle", chinese: "圆形", pinyin: "yuan xing", color: "#ef4b5f", shape: "shapeCard", symbol: "○" },
    { english: "Square", chinese: "正方形", pinyin: "zheng fang xing", color: "#3f8ee8", shape: "shapeCard", symbol: "□" },
    { english: "Triangle", chinese: "三角形", pinyin: "san jiao xing", color: "#f7d84b", shape: "shapeCard", symbol: "△" },
    { english: "Star", chinese: "星形", pinyin: "xing xing", color: "#ff9f43", shape: "shapeCard", symbol: "★" },
    { english: "Heart", chinese: "心形", pinyin: "xin xing", color: "#e66b8f", shape: "shapeCard", symbol: "♥" },
    { english: "Line", chinese: "线", pinyin: "xian", color: "#7bdcb5", shape: "shapeCard", symbol: "━" },
    { english: "Oval", chinese: "椭圆形", pinyin: "tuo yuan xing", color: "#8f72d8", shape: "shapeCard", symbol: "⬭" },
    { english: "Diamond", chinese: "菱形", pinyin: "ling xing", color: "#48b6a3", shape: "shapeCard", symbol: "◇" },
    { english: "Rectangle", chinese: "长方形", pinyin: "chang fang xing", color: "#b8875f", shape: "shapeCard", symbol: "▭" }
  ],
  dailyPhrases: [
    { english: "Hello", chinese: "你好", pinyin: "ni hao", color: "#7bdcb5", shape: "phrase", symbol: "你" },
    { english: "Goodbye", chinese: "再见", pinyin: "zai jian", color: "#89c9ff", shape: "phrase", symbol: "见" },
    { english: "Thank you", chinese: "谢谢", pinyin: "xie xie", color: "#f7d84b", shape: "phrase", symbol: "谢" },
    { english: "You're welcome", chinese: "不客气", pinyin: "bu ke qi", color: "#ffb38a", shape: "phrase", symbol: "客" },
    { english: "Please", chinese: "请", pinyin: "qing", color: "#e66b8f", shape: "phrase", symbol: "请" },
    { english: "Sorry", chinese: "对不起", pinyin: "dui bu qi", color: "#8f72d8", shape: "phrase", symbol: "对" },
    { english: "It's okay", chinese: "没关系", pinyin: "mei guan xi", color: "#69c6e8", shape: "phrase", symbol: "没" },
    { english: "Good morning", chinese: "早上好", pinyin: "zao shang hao", color: "#f4cf42", shape: "phrase", symbol: "早" },
    { english: "Good night", chinese: "晚安", pinyin: "wan an", color: "#7c8a9b", shape: "phrase", symbol: "安" },
    { english: "I love you", chinese: "我爱你", pinyin: "wo ai ni", color: "#e66b8f", shape: "phrase", symbol: "爱" },
    { english: "I want milk", chinese: "我要牛奶", pinyin: "wo yao niu nai", color: "#8ecae6", shape: "phrase", symbol: "奶" },
    { english: "I want water", chinese: "我要水", pinyin: "wo yao shui", color: "#69c6e8", shape: "phrase", symbol: "水" },
    { english: "I am hungry", chinese: "我饿了", pinyin: "wo e le", color: "#ffb38a", shape: "phrase", symbol: "饿" },
    { english: "I am thirsty", chinese: "我渴了", pinyin: "wo ke le", color: "#5db7de", shape: "phrase", symbol: "渴" },
    { english: "I am sleepy", chinese: "我困了", pinyin: "wo kun le", color: "#8f72d8", shape: "phrase", symbol: "困" },
    { english: "Let's play", chinese: "一起玩", pinyin: "yi qi wan", color: "#7bdcb5", shape: "phrase", symbol: "玩" },
    { english: "Come here", chinese: "过来", pinyin: "guo lai", color: "#f7d84b", shape: "phrase", symbol: "来" },
    { english: "Sit down", chinese: "坐下", pinyin: "zuo xia", color: "#d9a066", shape: "phrase", symbol: "坐" },
    { english: "Stand up", chinese: "站起来", pinyin: "zhan qi lai", color: "#4caf68", shape: "phrase", symbol: "站" },
    { english: "Wash hands", chinese: "洗手", pinyin: "xi shou", color: "#69c6e8", shape: "phrase", symbol: "洗" },
    { english: "Brush teeth", chinese: "刷牙", pinyin: "shua ya", color: "#89c9ff", shape: "phrase", symbol: "牙" },
    { english: "Eat rice", chinese: "吃饭", pinyin: "chi fan", color: "#ffb38a", shape: "phrase", symbol: "饭" },
    { english: "Drink water", chinese: "喝水", pinyin: "he shui", color: "#69c6e8", shape: "phrase", symbol: "喝" },
    { english: "Go to sleep", chinese: "睡觉", pinyin: "shui jiao", color: "#8f72d8", shape: "phrase", symbol: "睡" },
    { english: "Read a book", chinese: "读书", pinyin: "du shu", color: "#7bdcb5", shape: "phrase", symbol: "读" },
    { english: "Sing a song", chinese: "唱歌", pinyin: "chang ge", color: "#f7d84b", shape: "phrase", symbol: "唱" },
    { english: "Open the door", chinese: "开门", pinyin: "kai men", color: "#b8875f", shape: "phrase", symbol: "开" },
    { english: "Close the door", chinese: "关门", pinyin: "guan men", color: "#7c8a9b", shape: "phrase", symbol: "关" },
    { english: "Very good", chinese: "很好", pinyin: "hen hao", color: "#4caf68", shape: "phrase", symbol: "好" },
    { english: "See you tomorrow", chinese: "明天见", pinyin: "ming tian jian", color: "#89c9ff", shape: "phrase", symbol: "明" }
  ]
};

const quizPraise = ["Great!", "Nice!", "Good job!", "Super!"];
const quizTryAgain = ["Try again", "Almost", "One more"];
const tabs = document.querySelector("#tabs");
const modeSwitch = document.querySelector("#modeSwitch");
const scorePill = document.querySelector("#scorePill");
const picture = document.querySelector("#picture");
const englishWord = document.querySelector("#englishWord");
const chineseWord = document.querySelector("#chineseWord");
const pinyinWord = document.querySelector("#pinyinWord");
const learningCard = document.querySelector("#learningCard");
const choiceRow = document.querySelector("#choiceRow");
const stars = document.querySelector("#stars");
const soundToggle = document.querySelector("#soundToggle");
const feedback = document.querySelector("#feedback");
const prevCardButton = document.querySelector("#prevCard");
const nextCardButton = document.querySelector("#nextCard");
const shuffleCardButton = document.querySelector("#shuffleCard");

let category = "animals";
let cardIndex = 0;
let soundOn = true;
let starCount = 0;
let mode = "flashcard";
let quizAnswered = false;
let quizOptions = [];
let quizScore = 0;
let quizTotal = 0;
let quizWrongItem = null;

function currentList() {
  return data[category];
}

function currentCard() {
  return currentList()[cardIndex];
}

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function setMode(nextMode) {
  mode = nextMode;
  quizAnswered = false;
  quizWrongItem = null;
  feedback.textContent = "";
  if (mode === "quiz") {
    makeQuizOptions();
  }
  render();
  speak();
}

function makeQuizOptions() {
  const answer = currentCard();
  const wrongAnswers = currentList().filter((item) => item !== answer);
  quizOptions = shuffleItems([answer, ...shuffleItems(wrongAnswers).slice(0, 3)]);
}

function nextQuizQuestion() {
  const list = currentList();
  cardIndex = (cardIndex + 1 + Math.floor(Math.random() * Math.max(list.length - 1, 1))) % list.length;
  quizAnswered = false;
  quizWrongItem = null;
  feedback.textContent = "";
  makeQuizOptions();
  render();
  speakPhrase(currentCard().english, "en-US");
}

function animalSvg(item) {
  if (item.shape === "cat") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Cat">
        <circle cx="110" cy="112" r="68" fill="${item.color}" />
        <path d="M62 70 L78 26 L108 61 Z" fill="${item.color}" />
        <path d="M158 70 L142 26 L112 61 Z" fill="${item.color}" />
        <circle cx="86" cy="106" r="9" fill="#273044" />
        <circle cx="134" cy="106" r="9" fill="#273044" />
        <path d="M110 120 q-12 16 -28 6" fill="none" stroke="#273044" stroke-width="7" stroke-linecap="round" />
        <path d="M110 120 q12 16 28 6" fill="none" stroke="#273044" stroke-width="7" stroke-linecap="round" />
        <circle cx="110" cy="119" r="7" fill="#e66b8f" />
      </svg>`;
  }

  if (item.shape === "dog") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Dog">
        <circle cx="110" cy="116" r="66" fill="${item.color}" />
        <ellipse cx="54" cy="100" rx="28" ry="54" fill="#835b3e" />
        <ellipse cx="166" cy="100" rx="28" ry="54" fill="#835b3e" />
        <circle cx="87" cy="104" r="8" fill="#273044" />
        <circle cx="133" cy="104" r="8" fill="#273044" />
        <ellipse cx="110" cy="128" rx="18" ry="13" fill="#273044" />
        <path d="M96 148 q14 16 28 0" fill="none" stroke="#273044" stroke-width="7" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "bird") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Bird">
        <ellipse cx="112" cy="120" rx="66" ry="58" fill="${item.color}" />
        <circle cx="130" cy="82" r="44" fill="${item.color}" />
        <path d="M164 84 L202 101 L164 118 Z" fill="#f7d84b" />
        <circle cx="140" cy="74" r="8" fill="#273044" />
        <path d="M76 120 q-34 18 -46 -14 q32 -8 62 2" fill="#89d17a" />
        <path d="M98 176 l-14 24 M122 176 l14 24" stroke="#9d6b43" stroke-width="8" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "rabbit") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Rabbit">
        <ellipse cx="82" cy="68" rx="20" ry="56" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <ellipse cx="138" cy="68" rx="20" ry="56" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <circle cx="110" cy="126" r="62" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <circle cx="88" cy="118" r="7" fill="#273044" />
        <circle cx="132" cy="118" r="7" fill="#273044" />
        <circle cx="110" cy="134" r="7" fill="#e66b8f" />
        <path d="M96 148 q14 14 28 0" fill="none" stroke="#273044" stroke-width="6" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "duck") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Duck">
        <ellipse cx="106" cy="132" rx="68" ry="48" fill="${item.color}" />
        <circle cx="126" cy="82" r="42" fill="${item.color}" />
        <path d="M158 84 h44 q-15 24 -44 20" fill="#ff9f43" />
        <circle cx="136" cy="72" r="7" fill="#273044" />
        <path d="M52 138 q-20 14 -34 -4 q26 -12 52 -4" fill="#f1c84b" />
      </svg>`;
  }

  if (item.shape === "cow") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Cow">
        <circle cx="110" cy="116" r="66" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <circle cx="82" cy="92" r="24" fill="#273044" />
        <circle cx="142" cy="132" r="28" fill="#273044" />
        <path d="M62 66 l-28 -22 M158 66 l28 -22" stroke="#9d6b43" stroke-width="10" stroke-linecap="round" />
        <circle cx="88" cy="112" r="7" fill="#273044" />
        <circle cx="132" cy="112" r="7" fill="#273044" />
        <ellipse cx="110" cy="142" rx="36" ry="22" fill="#ffb6c9" />
      </svg>`;
  }

  if (item.shape === "sheep") {
    return `
      <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Sheep">
        <circle cx="76" cy="102" r="34" fill="${item.color}" stroke="#273044" stroke-width="6" />
        <circle cx="112" cy="86" r="40" fill="${item.color}" stroke="#273044" stroke-width="6" />
        <circle cx="146" cy="112" r="38" fill="${item.color}" stroke="#273044" stroke-width="6" />
        <circle cx="110" cy="128" r="46" fill="#5d5048" />
        <circle cx="94" cy="120" r="7" fill="#ffffff" />
        <circle cx="126" cy="120" r="7" fill="#ffffff" />
      </svg>`;
  }

  return `
    <svg class="svg-animal" viewBox="0 0 220 220" role="img" aria-label="Fish">
      <ellipse cx="102" cy="112" rx="72" ry="48" fill="${item.color}" />
      <path d="M164 112 L210 72 L210 152 Z" fill="#ffb38a" />
      <circle cx="74" cy="102" r="8" fill="#273044" />
      <path d="M100 62 q20 28 0 54" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
      <path d="M86 140 q24 12 50 0" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
    </svg>`;
}

function objectSvg(item) {
  if (["clothes", "home", "nature", "feeling", "transport", "phrase"].includes(item.shape)) {
    const roof = item.shape === "home" ? `<path d="M42 112 L110 52 L178 112" fill="none" stroke="#273044" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />` : "";
    const baseShape = item.shape === "transport"
      ? `<rect x="38" y="110" width="144" height="54" rx="20" fill="${item.color}" stroke="#273044" stroke-width="8" />
         <circle cx="78" cy="166" r="16" fill="#273044" />
         <circle cx="142" cy="166" r="16" fill="#273044" />`
      : `<circle cx="110" cy="110" r="78" fill="${item.color}" stroke="#273044" stroke-width="8" />`;
    const face = item.shape === "feeling"
      ? `<circle cx="86" cy="92" r="8" fill="#273044" />
         <circle cx="134" cy="92" r="8" fill="#273044" />
         <path d="M88 126 q22 24 44 0" fill="none" stroke="#273044" stroke-width="8" stroke-linecap="round" />`
      : "";

    return `
      <svg class="svg-color" viewBox="0 0 220 220" role="img" aria-label="${item.english}">
        ${baseShape}
        ${roof}
        ${face}
        <text x="110" y="130" text-anchor="middle" font-size="58" font-weight="900" fill="#273044" font-family="Trebuchet MS, Segoe UI, sans-serif">${item.symbol}</text>
      </svg>`;
  }

  if (item.shape === "shapeCard") {
    return `
      <svg class="svg-color" viewBox="0 0 220 220" role="img" aria-label="${item.english}">
        <rect x="32" y="32" width="156" height="156" rx="28" fill="${item.color}" />
        <text x="110" y="136" text-anchor="middle" font-size="84" font-weight="900" fill="#ffffff" font-family="Trebuchet MS, Segoe UI, sans-serif">${item.symbol}</text>
      </svg>`;
  }

  if (item.shape === "number") {
    return `
      <svg class="svg-color" viewBox="0 0 220 220" role="img" aria-label="${item.english}">
        <rect x="34" y="34" width="152" height="152" rx="30" fill="${item.color}" />
        <text x="110" y="138" text-anchor="middle" font-size="86" font-weight="900" fill="#ffffff" font-family="Trebuchet MS, Segoe UI, sans-serif">${item.symbol}</text>
        <circle cx="62" cy="62" r="12" fill="rgba(255,255,255,0.38)" />
        <circle cx="158" cy="160" r="16" fill="rgba(255,255,255,0.3)" />
      </svg>`;
  }

  if (["person", "body", "action"].includes(item.shape)) {
    return `
      <svg class="svg-color" viewBox="0 0 220 220" role="img" aria-label="${item.english}">
        <circle cx="110" cy="78" r="42" fill="${item.color}" />
        <rect x="56" y="118" width="108" height="68" rx="28" fill="${item.color}" opacity="0.88" />
        <circle cx="88" cy="74" r="7" fill="#273044" />
        <circle cx="132" cy="74" r="7" fill="#273044" />
        <path d="M92 94 q18 16 36 0" fill="none" stroke="#273044" stroke-width="7" stroke-linecap="round" />
        <text x="110" y="164" text-anchor="middle" font-size="42" font-weight="900" fill="#273044" font-family="Trebuchet MS, Segoe UI, sans-serif">${item.symbol}</text>
      </svg>`;
  }

  if (item.shape === "ball") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Ball">
        <circle cx="110" cy="110" r="76" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M44 98 q66 42 132 0 M110 34 q-34 76 0 152 M56 154 q54 -34 108 0" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "car") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Car">
        <rect x="42" y="96" width="136" height="58" rx="18" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M70 96 l24 -34 h44 l24 34" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <circle cx="76" cy="158" r="18" fill="#273044" />
        <circle cx="144" cy="158" r="18" fill="#273044" />
      </svg>`;
  }

  if (item.shape === "book") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Book">
        <path d="M42 58 h68 q18 0 18 18 v94 q0 -18 -22 -18 h-64 z" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M178 58 h-68 q-18 0 -18 18 v94 q0 -18 22 -18 h64 z" fill="#89c9ff" stroke="#273044" stroke-width="8" />
        <path d="M110 70 v98" stroke="#273044" stroke-width="6" />
      </svg>`;
  }

  if (item.shape === "doll") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Doll">
        <circle cx="110" cy="78" r="44" fill="#ffd2a6" stroke="#273044" stroke-width="7" />
        <path d="M66 78 q44 -58 88 0 q-42 -20 -88 0" fill="#705043" />
        <path d="M74 186 l36 -72 l36 72 z" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <circle cx="94" cy="78" r="6" fill="#273044" />
        <circle cx="126" cy="78" r="6" fill="#273044" />
      </svg>`;
  }

  if (item.shape === "blocks") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Blocks">
        <rect x="42" y="112" width="58" height="58" rx="10" fill="${item.color}" stroke="#273044" stroke-width="7" />
        <rect x="120" y="112" width="58" height="58" rx="10" fill="#7bdcb5" stroke="#273044" stroke-width="7" />
        <rect x="82" y="52" width="58" height="58" rx="10" fill="#e66b8f" stroke="#273044" stroke-width="7" />
      </svg>`;
  }

  if (item.shape === "train") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Train">
        <rect x="42" y="86" width="132" height="66" rx="14" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <rect x="130" y="54" width="44" height="36" rx="8" fill="#89c9ff" stroke="#273044" stroke-width="7" />
        <circle cx="76" cy="158" r="16" fill="#273044" />
        <circle cx="142" cy="158" r="16" fill="#273044" />
      </svg>`;
  }

  if (item.shape === "kite") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Kite">
        <path d="M110 28 l66 72 l-66 72 l-66 -72 z" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M110 28 v144 M44 100 h132" stroke="#ffffff" stroke-width="7" />
        <path d="M110 172 q-16 22 8 42" fill="none" stroke="#273044" stroke-width="6" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "drum") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Drum">
        <ellipse cx="110" cy="74" rx="58" ry="24" fill="#ffffff" stroke="#273044" stroke-width="8" />
        <path d="M52 74 v72 q0 24 58 24 t58 -24 v-72" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M74 102 l72 42 M146 102 l-72 42" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "paint") {
    return `
      <svg class="svg-color" viewBox="0 0 220 220" role="img" aria-label="${item.english}">
        <circle cx="110" cy="110" r="78" fill="${item.color}" />
        <circle cx="78" cy="80" r="18" fill="rgba(255,255,255,0.38)" />
        <circle cx="142" cy="74" r="12" fill="rgba(255,255,255,0.34)" />
        <path d="M56 140 q55 38 108 0" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="14" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "apple") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Apple">
        <path d="M112 78 q24 -44 56 -28 q-20 30 -56 28" fill="#4baf72" />
        <path d="M109 76 q-43 -28 -70 10 q-28 41 0 86 q27 38 70 14 q43 24 72 -14 q28 -45 0 -86 q-28 -38 -72 -10" fill="${item.color}" />
        <path d="M110 74 q4 -28 20 -42" fill="none" stroke="#7b5136" stroke-width="9" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "milk") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Milk">
        <path d="M72 56 h76 l18 34 v98 h-112 v-98 z" fill="#ffffff" stroke="#273044" stroke-width="8" />
        <path d="M72 56 l22 -28 h48 l6 28" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <rect x="70" y="104" width="100" height="48" fill="${item.color}" />
      </svg>`;
  }

  if (item.shape === "rice") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Rice">
        <path d="M52 106 h116 q-8 64 -58 64 t-58 -64" fill="#8ecae6" stroke="#273044" stroke-width="8" />
        <path d="M70 104 q16 -52 42 -4 q20 -56 46 4" fill="${item.color}" stroke="#273044" stroke-width="7" stroke-linecap="round" />
        <path d="M72 128 h76" stroke="#273044" stroke-width="7" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "bread") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Bread">
        <path d="M54 100 q0 -54 56 -54 t56 54 v66 h-112 z" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M82 102 q28 -22 56 0" fill="none" stroke="#fff1d6" stroke-width="8" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "egg") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Egg">
        <ellipse cx="110" cy="112" rx="62" ry="78" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <circle cx="110" cy="122" r="30" fill="#f4cf42" />
      </svg>`;
  }

  if (item.shape === "water") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Water">
        <path d="M110 34 q58 68 58 102 q0 48 -58 48 t-58 -48 q0 -34 58 -102" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M86 132 q10 26 42 24" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
      </svg>`;
  }

  if (item.shape === "cake") {
    return `
      <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Cake">
        <rect x="48" y="98" width="124" height="72" rx="14" fill="${item.color}" stroke="#273044" stroke-width="8" />
        <path d="M48 118 q28 18 62 0 q34 18 62 0" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
        <path d="M110 92 v-34" stroke="#273044" stroke-width="8" stroke-linecap="round" />
        <circle cx="110" cy="50" r="12" fill="#f4cf42" />
      </svg>`;
  }

  return `
    <svg class="svg-food" viewBox="0 0 220 220" role="img" aria-label="Banana">
      <path d="M44 126 q78 78 146 -36 q-44 48 -116 10 q30 64 116 -10" fill="${item.color}" stroke="#273044" stroke-width="8" stroke-linejoin="round" />
      <path d="M46 126 q-10 -8 -12 -22" stroke="#7b5136" stroke-width="9" stroke-linecap="round" />
    </svg>`;
}

function renderPicture(item) {
  picture.innerHTML = category === "animals" ? animalSvg(item) : objectSvg(item);
}

function renderTabs() {
  tabs.innerHTML = "";
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.className = `tab${item.key === category ? " active" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.dataset.category = item.key;
    button.addEventListener("click", () => {
      category = item.key;
      cardIndex = 0;
      quizAnswered = false;
      quizWrongItem = null;
      feedback.textContent = "";
      if (mode === "quiz") {
        makeQuizOptions();
      }
      render();
      speak();
    });
    tabs.appendChild(button);
  });
}

function renderModeSwitch() {
  modeSwitch.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

function renderScore() {
  scorePill.textContent = mode === "quiz" ? `Score ${quizScore}/${quizTotal}` : `${currentList().length} cards`;
}

function renderChoices() {
  choiceRow.innerHTML = "";
  const choices = mode === "quiz" ? quizOptions : currentList();
  choices.forEach((item, index) => {
    const button = document.createElement("button");
    let className = "choice";
    if (mode === "flashcard" && index === cardIndex) {
      className += " active";
    }
    if (mode === "quiz" && quizAnswered && item === currentCard()) {
      className += " correct";
    }
    if (mode === "quiz" && quizAnswered && item === quizWrongItem) {
      className += " wrong";
    }
    button.className = className;
    button.type = "button";
    button.textContent = item.chinese;
    button.setAttribute("aria-label", `${item.english}, ${item.chinese}`);
    button.addEventListener("click", () => {
      if (mode === "quiz") {
        chooseQuizAnswer(item, button);
        return;
      }

      cardIndex = index;
      starCount = Math.min(starCount + 1, 5);
      feedback.textContent = "";
      render();
      speak();
    });
    choiceRow.appendChild(button);
  });
}

function chooseQuizAnswer(item, button) {
  if (quizAnswered) {
    return;
  }

  quizAnswered = true;
  quizTotal += 1;
  if (item === currentCard()) {
    quizScore += 1;
    starCount = Math.min(starCount + 1, 5);
    feedback.textContent = quizPraise[Math.floor(Math.random() * quizPraise.length)];
    speak();
  } else {
    quizWrongItem = item;
    feedback.textContent = quizTryAgain[Math.floor(Math.random() * quizTryAgain.length)];
    speakPhrase(currentCard().chinese, "zh-CN");
  }
  render();
}

function renderStars() {
  stars.innerHTML = "";
  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    stars.appendChild(star);
  }
}

function render() {
  const item = currentCard();
  englishWord.textContent = item.english;
  chineseWord.textContent = mode === "quiz" && !quizAnswered ? "?" : item.chinese;
  pinyinWord.textContent = mode === "quiz" && !quizAnswered ? "Quiz time" : item.pinyin;
  learningCard.classList.toggle("long-card", item.english.length > 12 || item.chinese.length > 4);
  renderTabs();
  renderModeSwitch();
  renderScore();
  renderPicture(item);
  if (mode === "quiz" && quizOptions.length === 0) {
    makeQuizOptions();
  }
  renderChoices();
  renderStars();
  prevCardButton.hidden = mode === "quiz";
  shuffleCardButton.textContent = mode === "quiz" ? "Reset" : "Mix";
  nextCardButton.setAttribute("aria-label", mode === "quiz" ? "Soal berikutnya" : "Kartu berikutnya");
  learningCard.classList.remove("bounce");
  window.requestAnimationFrame(() => learningCard.classList.add("bounce"));
}

function speakPhrase(text, lang) {
  if (!soundOn || !("speechSynthesis" in window)) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.76;
  utterance.pitch = 1.18;
  window.speechSynthesis.speak(utterance);
}

function speak() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  const item = currentCard();
  speakPhrase(item.english, "en-US");
  setTimeout(() => speakPhrase(item.chinese, "zh-CN"), 720);
}

function moveCard(direction) {
  const list = currentList();
  cardIndex = (cardIndex + direction + list.length) % list.length;
  starCount = Math.min(starCount + 1, 5);
  render();
}

modeSwitch.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

prevCardButton.addEventListener("click", () => {
  moveCard(-1);
  speak();
});

nextCardButton.addEventListener("click", () => {
  if (mode === "quiz") {
    nextQuizQuestion();
    return;
  }

  moveCard(1);
  speak();
});

document.querySelector("#speakCard").addEventListener("click", speak);
learningCard.addEventListener("click", speak);
learningCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    speak();
  }
});

shuffleCardButton.addEventListener("click", () => {
  if (mode === "quiz") {
    quizScore = 0;
    quizTotal = 0;
    nextQuizQuestion();
    return;
  }

  const nextIndex = Math.floor(Math.random() * currentList().length);
  cardIndex = nextIndex === cardIndex ? (nextIndex + 1) % currentList().length : nextIndex;
  render();
  speak();
});

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.classList.toggle("is-off", !soundOn);
  soundToggle.setAttribute("aria-label", soundOn ? "Suara aktif" : "Suara mati");
  if (!soundOn && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});

render();
