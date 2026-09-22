export * from './resource'

export type PronunciationType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type PhoneticType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type LanguageType = 'en' | 'romaji' | 'zh' | 'ja' | 'code' | 'de' | 'kk' | 'hapin' | 'id'
export type LanguageCategoryType = 'en' | 'ja' | 'de' | 'code' | 'kk' | 'id'

type Pronunciation2PhoneticMap = Record<PronunciationType, PhoneticType>

export const PRONUNCIATION_PHONETIC_MAP: Pronunciation2PhoneticMap = {
  us: 'us',
  uk: 'uk',
  romaji: 'romaji',
  zh: 'zh',
  ja: 'ja',
  de: 'de',
  hapin: 'hapin',
  kk: 'kk',
  id: 'id',
}

export type Word = {
  name: string
  trans: string[]
  usphone: string
  ukphone: string
  notation?: string
  // 壹ONE SGD discussion phrase metadata
  audio?: string
  mode?: 'word' | 'sst' | 'sgd'
  category?: string
  categoryId?: string
  topic?: string
  topicIndex?: number
  speaker?: string
  gender?: 'He' | 'She' | 'Unknown'
  round?: number
  roundLabel?: string
  sequence?: number
  phraseIndexInTopic?: number
  topicPhraseCount?: number
  sourceText?: string
  noteType?: string | null
  sourcePage?: number
  // 壹ONE PTE source/context metadata
  meaningZh?: string
  referenceExamples?: string[]
  example?: string
  exampleZh?: string
  exampleZhType?: string
  exampleLocation?: string
  ttsEngine?: 'browser' | 'remote'
  questionId?: string
  questionTitle?: string
  questionNote?: string
  questionPriority?: string
  sourceType?: string
  sourcePages?: number[]
  occurrenceCount?: number
  otherOccurrences?: Array<{
    questionId: string
    questionTitle: string
    priority?: string
    sourceType?: string
    example?: string
    exampleZh?: string
    sourcePages?: number[]
  }>
  contextStatus?: 'ready' | 'pending-source'
}

export type WordWithIndex = Word & {
  // 在 chapter 中的原始索引
  index: number
}

export type InfoPanelType = 'donate' | 'vsc' | 'community' | 'redBook'

export type InfoPanelState = {
  [key in InfoPanelType]: boolean
}

export type LoopWordTimesOption = 1 | 3 | 5 | 8 | typeof Number.MAX_SAFE_INTEGER

export type WordDictationType = 'hideAll' | 'hideVowel' | 'hideConsonant' | 'randomHide'
/**
 * 标记用户是手动打开默写模式，还是通过点击 resultScreen 中的默写本章按钮打开的
 *
 * 预期行为是，在进入下一章节时，如果是手动打开的默写模式，则保持设定
 * 如果是通过点击 resultScreen 中的默写本章按钮打开的，则关闭默写模式
 */
export type WordDictationOpenBy = 'user' | 'auto'
