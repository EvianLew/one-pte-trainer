import type { Dictionary, DictionaryResource } from '@/typings/index'
import { calcChapterCount } from '@/utils'

/**
 * 壹ONE PTE 部署版词库。
 * FIB：单词听写；SST：按题目组织；SGD：按分类/Topic/Round/Speaker 固定顺序。
 */
export const dictionaryResources: DictionaryResource[] = [
  {
    id: "pte-fib-listening",
    name: "PTE FIB 听力词汇",
    description: "467 个 FIB 听力高频词｜中文释义｜原版拼写训练逻辑",
    category: "PTE",
    tags: [
  "FIB 听力",
  "听写",
  "中文释义"
],
    url: "/dicts/PTE_FIB_Listening.json",
    length: 467,
    language: 'en',
    languageCategory: 'en',
    mode: "word",
  },
  {
    id: "pte-sst-vocabulary",
    name: "PTE SST 题目词汇",
    description: "97 道 SST 按题目整理（其中 54 道 8月最高频）｜550 个重点词已匹配题目语境",
    category: "PTE",
    tags: [
  "SST",
  "按题目",
  "原文例句",
  "中文释义"
],
    url: "/dicts/PTE_SST_By_Question.json",
    length: 1181,
    language: 'en',
    languageCategory: 'en',
    mode: "sst",
    sections: [
      {
        "name": "100200 · Neolithic Stones",
        "start": 0,
        "end": 12,
        "wordCount": 12,
        "category": "8月最高频",
        "subtitle": "石器时代的石头（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100198 · The Development of Machines",
        "start": 12,
        "end": 19,
        "wordCount": 7,
        "category": "8月最高频",
        "subtitle": "机械的发展",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100197 · Worker Bees",
        "start": 19,
        "end": 23,
        "wordCount": 4,
        "category": "8月最高频",
        "subtitle": "工蜂（Jacky 老师考场确认升级答案）",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100196 · Poetry and Literature",
        "start": 23,
        "end": 33,
        "wordCount": 10,
        "category": "8月最高频",
        "subtitle": "诗歌与文学 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100194 · Bees’ Communication",
        "start": 33,
        "end": 37,
        "wordCount": 4,
        "category": "8月最高频",
        "subtitle": "蜜蜂的交流",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100192 · Social Skills and Children",
        "start": 37,
        "end": 48,
        "wordCount": 11,
        "category": "8月最高频",
        "subtitle": "社交技能与儿童（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100191 · The Internet",
        "start": 48,
        "end": 58,
        "wordCount": 10,
        "category": "8月最高频",
        "subtitle": "因特网",
        "sourceType": "题目文本"
      },
      {
        "name": "100190 · Credit Cards",
        "start": 58,
        "end": 61,
        "wordCount": 3,
        "category": "8月最高频",
        "subtitle": "信用卡（有英美差异）",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100189 · Internet Changed Journalism",
        "start": 61,
        "end": 69,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "网络改变了新闻业",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100188 · The Exposure to Emotions",
        "start": 69,
        "end": 82,
        "wordCount": 13,
        "category": "8月最高频",
        "subtitle": "情绪的表露",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100183 · Renewable Energy",
        "start": 82,
        "end": 90,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "可再生能源",
        "sourceType": "题目文本"
      },
      {
        "name": "100181 · Organization Study",
        "start": 90,
        "end": 102,
        "wordCount": 12,
        "category": "8月最高频",
        "subtitle": "组织研究（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100179 · Stock Market and Big Companies",
        "start": 102,
        "end": 111,
        "wordCount": 9,
        "category": "8月最高频",
        "subtitle": "股市与大公司（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100177 · The Stability of Mood",
        "start": 111,
        "end": 116,
        "wordCount": 5,
        "category": "8月最高频",
        "subtitle": "情绪稳定",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100175 · Leadership",
        "start": 116,
        "end": 124,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "领导阶层",
        "sourceType": "题目文本"
      },
      {
        "name": "100172 · Paper Rejection",
        "start": 124,
        "end": 129,
        "wordCount": 5,
        "category": "8月最高频",
        "subtitle": "被拒绝的论文",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100170 · Globalization and Detraditionalization",
        "start": 129,
        "end": 143,
        "wordCount": 14,
        "category": "8月最高频",
        "subtitle": "全球化去传统化 （音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100169 · The History of Software",
        "start": 143,
        "end": 157,
        "wordCount": 14,
        "category": "8月最高频",
        "subtitle": "软件的历史 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100166 · World's Globalization",
        "start": 157,
        "end": 171,
        "wordCount": 14,
        "category": "8月最高频",
        "subtitle": "世界的全球化（音频请在大西瓜独家练习网站收听）（有英美差异）",
        "sourceType": "题目文本"
      },
      {
        "name": "100163 · Luxury Brand",
        "start": 171,
        "end": 179,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "奢侈品牌",
        "sourceType": "题目文本"
      },
      {
        "name": "100139 · The Industrial Revolution Ver.1",
        "start": 179,
        "end": 200,
        "wordCount": 21,
        "category": "8月最高频",
        "subtitle": "工业革命（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100125 · Recycling Water",
        "start": 200,
        "end": 212,
        "wordCount": 12,
        "category": "8月最高频",
        "subtitle": "循环用水（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100123 · Canned Food",
        "start": 212,
        "end": 223,
        "wordCount": 11,
        "category": "8月最高频",
        "subtitle": "罐装食物（原音）Jacky 考场确认",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100121 · The Definition of Great Idea",
        "start": 223,
        "end": 232,
        "wordCount": 9,
        "category": "8月最高频",
        "subtitle": "伟大想法的定义",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100117 · English",
        "start": 232,
        "end": 239,
        "wordCount": 7,
        "category": "8月最高频",
        "subtitle": "英语（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100116 · Food Crisis",
        "start": 239,
        "end": 247,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "食物危机",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100115 · Biological Engineering",
        "start": 247,
        "end": 263,
        "wordCount": 16,
        "category": "8月最高频",
        "subtitle": "生物工程*有疑似原文",
        "sourceType": "疑似/近似原文"
      },
      {
        "name": "100114 · Natural Selection of Buildings",
        "start": 263,
        "end": 291,
        "wordCount": 28,
        "category": "8月最高频",
        "subtitle": "建筑的物竞天择*有疑似原文",
        "sourceType": "疑似/近似原文"
      },
      {
        "name": "100113 · Research on Social Science",
        "start": 291,
        "end": 303,
        "wordCount": 12,
        "category": "8月最高频",
        "subtitle": "社会科学调查",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100111 · The Online Research",
        "start": 303,
        "end": 311,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "线上调查",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100110 · The City of Rome",
        "start": 311,
        "end": 326,
        "wordCount": 15,
        "category": "8月最高频",
        "subtitle": "罗马城 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100107 · Australian Culture Diversity",
        "start": 326,
        "end": 342,
        "wordCount": 16,
        "category": "8月最高频",
        "subtitle": "澳洲多元文化",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100106 · The Separation of Powers",
        "start": 342,
        "end": 352,
        "wordCount": 10,
        "category": "8月最高频",
        "subtitle": "三权分立",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100102 · The Term ‘need’ in English Language",
        "start": 352,
        "end": 366,
        "wordCount": 14,
        "category": "8月最高频",
        "subtitle": "在英文中的含义",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100096 · Managers",
        "start": 366,
        "end": 379,
        "wordCount": 13,
        "category": "8月最高频",
        "subtitle": "经理",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100094 · Shrinking Newspaper Industry",
        "start": 379,
        "end": 392,
        "wordCount": 13,
        "category": "8月最高频",
        "subtitle": "衰弱的新闻报纸业",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100091 · The Design of Hospitals",
        "start": 392,
        "end": 414,
        "wordCount": 22,
        "category": "8月最高频",
        "subtitle": "医院的设计 考场原音原文请在【大西瓜练习官网】查看",
        "sourceType": "原音/音频题（本PDF未含原文）"
      },
      {
        "name": "100090 · Automated Vehicles",
        "start": 414,
        "end": 430,
        "wordCount": 16,
        "category": "8月最高频",
        "subtitle": "自动化汽车",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100089 · The Impacts of Hooks in Persuasive Essay",
        "start": 430,
        "end": 447,
        "wordCount": 17,
        "category": "8月最高频",
        "subtitle": "勾人的部分”与论文*近似原文！",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100088 · Chimpanzees and non-human rights",
        "start": 447,
        "end": 463,
        "wordCount": 16,
        "category": "8月最高频",
        "subtitle": "大猩猩与非人权",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100071 · Misuse of Drugs",
        "start": 463,
        "end": 471,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "误食药品 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100066 · Industrialization",
        "start": 471,
        "end": 492,
        "wordCount": 21,
        "category": "8月最高频",
        "subtitle": "工业化 （原音）（有英美差异）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100065 · Study of Genes",
        "start": 492,
        "end": 499,
        "wordCount": 7,
        "category": "8月最高频",
        "subtitle": "基因研究（音频）（有英美差异）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100060 · Brand Value and Consumers",
        "start": 499,
        "end": 518,
        "wordCount": 19,
        "category": "8月最高频",
        "subtitle": "品牌价值与消费者（音频）（有英美差异）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100059 · The Big Bang Theory",
        "start": 518,
        "end": 526,
        "wordCount": 8,
        "category": "8月最高频",
        "subtitle": "宇宙大爆炸（音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100058 · Fishing Industry in Africa",
        "start": 526,
        "end": 545,
        "wordCount": 19,
        "category": "8月最高频",
        "subtitle": "非洲渔业（音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100055 · Definition of Words",
        "start": 545,
        "end": 550,
        "wordCount": 5,
        "category": "8月最高频",
        "subtitle": "单词在字典中的定义 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100054 · Body Fat Experiment",
        "start": 550,
        "end": 551,
        "wordCount": 1,
        "category": "8月最高频",
        "subtitle": "体脂变化实验",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100052 · Decline of Bees",
        "start": 551,
        "end": 569,
        "wordCount": 18,
        "category": "8月最高频",
        "subtitle": "蜜蜂数量消亡 （音频）",
        "sourceType": "题目文本"
      },
      {
        "name": "100038 · Einstein",
        "start": 569,
        "end": 578,
        "wordCount": 9,
        "category": "8月最高频",
        "subtitle": "爱因斯坦 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100035 · Vitamin D",
        "start": 578,
        "end": 585,
        "wordCount": 7,
        "category": "8月最高频",
        "subtitle": "维他命 D （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100033 · Globalization",
        "start": 585,
        "end": 599,
        "wordCount": 14,
        "category": "8月最高频",
        "subtitle": "全球化",
        "sourceType": "题目文本"
      },
      {
        "name": "100028 · Emotions",
        "start": 599,
        "end": 620,
        "wordCount": 21,
        "category": "8月最高频",
        "subtitle": "情绪（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100027 · Smile of Mothers and Their Babies",
        "start": 620,
        "end": 625,
        "wordCount": 5,
        "category": "8月最高频",
        "subtitle": "母婴的微笑互动 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100202 · MPA V2. Fish Activities",
        "start": 625,
        "end": 634,
        "wordCount": 9,
        "category": "其他题目",
        "subtitle": "鱼类行为研究",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100201 · Ice Core",
        "start": 634,
        "end": 640,
        "wordCount": 6,
        "category": "其他题目",
        "subtitle": "冰芯（音频非原文，仅为近似参考用）",
        "sourceType": "题目文本"
      },
      {
        "name": "100199 · Climate Change as a Challenge",
        "start": 640,
        "end": 654,
        "wordCount": 14,
        "category": "其他题目",
        "subtitle": "气候变暖带来的挑战（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100195 · Food Waste in the United States",
        "start": 654,
        "end": 663,
        "wordCount": 9,
        "category": "其他题目",
        "subtitle": "美国的食物浪费",
        "sourceType": "题目文本"
      },
      {
        "name": "100193 · Social Diversity",
        "start": 663,
        "end": 667,
        "wordCount": 4,
        "category": "其他题目",
        "subtitle": "社会多样性",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100186 · The Light",
        "start": 667,
        "end": 677,
        "wordCount": 10,
        "category": "其他题目",
        "subtitle": "光（原名 A Device 一种设备）考场原音及原文请在【大西瓜练习官网】查看",
        "sourceType": "原音/音频题（本PDF未含原文）"
      },
      {
        "name": "100185 · The Internet Structure",
        "start": 677,
        "end": 687,
        "wordCount": 10,
        "category": "其他题目",
        "subtitle": "网络结构（有英美差异）考场原音请在【大西瓜练习官网】查看",
        "sourceType": "原音/音频题（本PDF未含原文）"
      },
      {
        "name": "100184 · The Travels of Sir John Mandeville",
        "start": 687,
        "end": 698,
        "wordCount": 11,
        "category": "其他题目",
        "subtitle": "（原题目为 Foreign Lands）",
        "sourceType": "题目文本"
      },
      {
        "name": "100182 · Young People Communities",
        "start": 698,
        "end": 709,
        "wordCount": 11,
        "category": "其他题目",
        "subtitle": "年轻人群",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100178 · A Good Engineer",
        "start": 709,
        "end": 719,
        "wordCount": 10,
        "category": "其他题目",
        "subtitle": "优秀的工程师（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100176 · MPA Marine Campaign",
        "start": 719,
        "end": 733,
        "wordCount": 14,
        "category": "其他题目",
        "subtitle": "保护深海环境（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100174 · Global Economy",
        "start": 733,
        "end": 742,
        "wordCount": 9,
        "category": "其他题目",
        "subtitle": "全球经济（文本仅参考，非原文，有差异）",
        "sourceType": "参考文本（非原文）"
      },
      {
        "name": "100173 · Brain and Sleep",
        "start": 742,
        "end": 747,
        "wordCount": 5,
        "category": "其他题目",
        "subtitle": "大脑与睡眠",
        "sourceType": "题目文本"
      },
      {
        "name": "100168 · Language and Vocabulary",
        "start": 747,
        "end": 759,
        "wordCount": 12,
        "category": "其他题目",
        "subtitle": "语言与词汇 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100167 · Books: The Republic",
        "start": 759,
        "end": 771,
        "wordCount": 12,
        "category": "其他题目",
        "subtitle": "柏拉图的书：理想国（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100142 · Network",
        "start": 771,
        "end": 780,
        "wordCount": 9,
        "category": "其他题目",
        "subtitle": "交通网",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100141 · Motivation",
        "start": 780,
        "end": 788,
        "wordCount": 8,
        "category": "其他题目",
        "subtitle": "动机",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100118 · Mars and Earth",
        "start": 788,
        "end": 806,
        "wordCount": 18,
        "category": "其他题目",
        "subtitle": "火星与地球",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100112 · Drop Out of School",
        "start": 806,
        "end": 818,
        "wordCount": 12,
        "category": "其他题目",
        "subtitle": "辍学（有英美差异）",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100109 · Climate and Crops",
        "start": 818,
        "end": 832,
        "wordCount": 14,
        "category": "其他题目",
        "subtitle": "气候与农作物（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100108 · Identity Theory",
        "start": 832,
        "end": 845,
        "wordCount": 13,
        "category": "其他题目",
        "subtitle": "（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100105 · Stress",
        "start": 845,
        "end": 868,
        "wordCount": 23,
        "category": "其他题目",
        "subtitle": "压力*原文",
        "sourceType": "题目文本"
      },
      {
        "name": "100101 · Lost Childhood",
        "start": 868,
        "end": 887,
        "wordCount": 19,
        "category": "其他题目",
        "subtitle": "消逝的童年",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100097 · Telescope",
        "start": 887,
        "end": 890,
        "wordCount": 3,
        "category": "其他题目",
        "subtitle": "望远镜",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100092 · Absolutism",
        "start": 890,
        "end": 897,
        "wordCount": 7,
        "category": "其他题目",
        "subtitle": "绝对主义（原音）",
        "sourceType": "原音/音频题（本PDF未含原文）"
      },
      {
        "name": "100072 · HTML",
        "start": 897,
        "end": 913,
        "wordCount": 16,
        "category": "其他题目",
        "subtitle": "（音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100068 · Abstraction",
        "start": 913,
        "end": 920,
        "wordCount": 7,
        "category": "其他题目",
        "subtitle": "抽象化（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100067 · Adam Smith",
        "start": 920,
        "end": 937,
        "wordCount": 17,
        "category": "其他题目",
        "subtitle": "亚当·史密斯（有英美差异）",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100064 · Australian House Price",
        "start": 937,
        "end": 959,
        "wordCount": 22,
        "category": "其他题目",
        "subtitle": "澳洲房价上涨（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100061 · The Human Rights Act",
        "start": 959,
        "end": 979,
        "wordCount": 20,
        "category": "其他题目",
        "subtitle": "人权法案（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100056 · Happiness",
        "start": 979,
        "end": 995,
        "wordCount": 16,
        "category": "其他题目",
        "subtitle": "幸福感 （音频）",
        "sourceType": "题目文本"
      },
      {
        "name": "100053 · Faults and Earthquakes",
        "start": 995,
        "end": 1014,
        "wordCount": 19,
        "category": "其他题目",
        "subtitle": "地震与断层（原音）（有英美差异）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100041 · Biology (DNA & RNA)",
        "start": 1014,
        "end": 1035,
        "wordCount": 21,
        "category": "其他题目",
        "subtitle": "生物 （音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100034 · Devolution of Government Powers",
        "start": 1035,
        "end": 1040,
        "wordCount": 5,
        "category": "其他题目",
        "subtitle": "政府权力下放 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100030 · Computers and Artificial Intelligence",
        "start": 1040,
        "end": 1051,
        "wordCount": 11,
        "category": "其他题目",
        "subtitle": "人工智能（有英美差异）",
        "sourceType": "题库答案/考生回忆"
      },
      {
        "name": "100026 · Children’s Literature",
        "start": 1051,
        "end": 1070,
        "wordCount": 19,
        "category": "其他题目",
        "subtitle": "儿童文学（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100023 · Spectacles",
        "start": 1070,
        "end": 1074,
        "wordCount": 4,
        "category": "其他题目",
        "subtitle": "眼镜 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100019 · Global Warming",
        "start": 1074,
        "end": 1101,
        "wordCount": 27,
        "category": "其他题目",
        "subtitle": "全球变暖（音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100018 · Language Death",
        "start": 1101,
        "end": 1110,
        "wordCount": 9,
        "category": "其他题目",
        "subtitle": "语言消亡 （原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100015 · The Kids in Museums Campaign",
        "start": 1110,
        "end": 1121,
        "wordCount": 11,
        "category": "其他题目",
        "subtitle": "（原音）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100011 · University Competition",
        "start": 1121,
        "end": 1144,
        "wordCount": 23,
        "category": "其他题目",
        "subtitle": "大学竞争（音频）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100004 · Indian Peasant’s Debts",
        "start": 1144,
        "end": 1150,
        "wordCount": 6,
        "category": "其他题目",
        "subtitle": "印度农民贷款 （原音）（有英美差异）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "100002 · Talent War Ver. 1",
        "start": 1150,
        "end": 1170,
        "wordCount": 20,
        "category": "其他题目",
        "subtitle": "人才之争 版本一 （男声版/老爷爷版）",
        "sourceType": "原音/真题原文"
      },
      {
        "name": "未匹配到当前SST资料正文",
        "start": 1170,
        "end": 1181,
        "wordCount": 11,
        "category": "待匹配",
        "subtitle": "保留重点词，不虚构出处",
        "sourceType": "未匹配"
      }
    ],
  },
  {
    id: "pte-sgd-study-skills",
    name: "SGD｜学业关卡&提分技巧类",
    description: "按 Discussion 原顺序训练 · 5 个主题 · 浏览器自然语音（原文映射待解锁）",
    category: "PTE SGD",
    tags: [
  "SGD",
  "Discussion",
  "顺序训练",
  "自然语音"
],
    url: "/dicts/PTE_SGD_Study_Skills.json",
    length: 136,
    language: 'en',
    languageCategory: 'en',
    mode: "sgd",
    sections: [
      {
        "name": "Management of Assignment",
        "start": 0,
        "end": 31,
        "wordCount": 31,
        "category": "学业关卡&提分技巧类"
      },
      {
        "name": "ask for more time to do an essay",
        "start": 31,
        "end": 59,
        "wordCount": 28,
        "category": "学业关卡&提分技巧类"
      },
      {
        "name": "how to write essays",
        "start": 59,
        "end": 83,
        "wordCount": 24,
        "category": "学业关卡&提分技巧类"
      },
      {
        "name": "Improve presentation skills",
        "start": 83,
        "end": 110,
        "wordCount": 27,
        "category": "学业关卡&提分技巧类"
      },
      {
        "name": "what they feel about a course",
        "start": 110,
        "end": 136,
        "wordCount": 26,
        "category": "学业关卡&提分技巧类"
      }
    ],
  },
  {
    id: "pte-sgd-campus-life",
    name: "SGD｜衣食住行&校园生活类",
    description: "按 Discussion 原顺序训练 · 4 个主题 · 浏览器自然语音（原文映射待解锁）",
    category: "PTE SGD",
    tags: [
  "SGD",
  "Discussion",
  "顺序训练",
  "自然语音"
],
    url: "/dicts/PTE_SGD_Campus_Life.json",
    length: 101,
    language: 'en',
    languageCategory: 'en',
    mode: "sgd",
    sections: [
      {
        "name": "Accommodation options",
        "start": 0,
        "end": 24,
        "wordCount": 24,
        "category": "衣食住行&校园生活类"
      },
      {
        "name": "project meeting place on campus",
        "start": 24,
        "end": 51,
        "wordCount": 27,
        "category": "衣食住行&校园生活类"
      },
      {
        "name": "the best ways to get to university",
        "start": 51,
        "end": 76,
        "wordCount": 25,
        "category": "衣食住行&校园生活类"
      },
      {
        "name": "housing plans",
        "start": 76,
        "end": 101,
        "wordCount": 25,
        "category": "衣食住行&校园生活类"
      }
    ],
  },
  {
    id: "pte-sgd-wellbeing",
    name: "SGD｜校园活动&身心健康类",
    description: "按 Discussion 原顺序训练 · 3 个主题 · 浏览器自然语音（原文映射待解锁）",
    category: "PTE SGD",
    tags: [
  "SGD",
  "Discussion",
  "顺序训练",
  "自然语音"
],
    url: "/dicts/PTE_SGD_Wellbeing.json",
    length: 81,
    language: 'en',
    languageCategory: 'en',
    mode: "sgd",
    sections: [
      {
        "name": "Sports",
        "start": 0,
        "end": 27,
        "wordCount": 27,
        "category": "校园活动&身心健康类"
      },
      {
        "name": "volunteering experiences",
        "start": 27,
        "end": 57,
        "wordCount": 30,
        "category": "校园活动&身心健康类"
      },
      {
        "name": "whether take part in a field trip",
        "start": 57,
        "end": 81,
        "wordCount": 24,
        "category": "校园活动&身心健康类"
      }
    ],
  },
  {
    id: "pte-sgd-edtech",
    name: "SGD｜教学科技&学术边界类",
    description: "按 Discussion 原顺序训练 · 4 个主题 · 浏览器自然语音（原文映射待解锁）",
    category: "PTE SGD",
    tags: [
  "SGD",
  "Discussion",
  "顺序训练",
  "自然语音"
],
    url: "/dicts/PTE_SGD_EdTech.json",
    length: 97,
    language: 'en',
    languageCategory: 'en',
    mode: "sgd",
    sections: [
      {
        "name": "Whether use smartphones in class",
        "start": 0,
        "end": 24,
        "wordCount": 24,
        "category": "教学科技&学术边界类"
      },
      {
        "name": "the pros and cons of online classes",
        "start": 24,
        "end": 54,
        "wordCount": 30,
        "category": "教学科技&学术边界类"
      },
      {
        "name": "free online courses",
        "start": 54,
        "end": 73,
        "wordCount": 19,
        "category": "教学科技&学术边界类"
      },
      {
        "name": "artificial intelligence as a proofreading tool",
        "start": 73,
        "end": 97,
        "wordCount": 24,
        "category": "教学科技&学术边界类"
      }
    ],
  },
  {
    id: "pte-sgd-institution",
    name: "SGD｜高校制度&宏观规划类",
    description: "按 Discussion 原顺序训练 · 4 个主题 · 浏览器自然语音（原文映射待解锁）",
    category: "PTE SGD",
    tags: [
  "SGD",
  "Discussion",
  "顺序训练",
  "自然语音"
],
    url: "/dicts/PTE_SGD_Institution.json",
    length: 110,
    language: 'en',
    languageCategory: 'en',
    mode: "sgd",
    sections: [
      {
        "name": "Find a job",
        "start": 0,
        "end": 23,
        "wordCount": 23,
        "category": "高校制度&宏观规划类"
      },
      {
        "name": "the value of final exams",
        "start": 23,
        "end": 53,
        "wordCount": 30,
        "category": "高校制度&宏观规划类"
      },
      {
        "name": "how to celebrate the mathematics department's ten-year anniversary",
        "start": 53,
        "end": 80,
        "wordCount": 27,
        "category": "高校制度&宏观规划类"
      },
      {
        "name": "applying for a student exchange programme",
        "start": 80,
        "end": 110,
        "wordCount": 30,
        "category": "高校制度&宏观规划类"
      }
    ],
  },
]

export const dictionaries: Dictionary[] = dictionaryResources.map((resource) => ({
  ...resource,
  chapterCount: resource.sections?.length ?? calcChapterCount(resource.length),
}))

export const idDictionaryMap: Record<string, Dictionary> = Object.fromEntries(dictionaries.map((dict) => [dict.id, dict]))
