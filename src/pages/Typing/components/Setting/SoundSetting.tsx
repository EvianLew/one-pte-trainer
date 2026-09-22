import styles from './index.module.css'
import { keySoundResources } from '@/resources/soundResource'
import { hintSoundsConfigAtom, keySoundsConfigAtom, pronunciationConfigAtom } from '@/store'
import useNaturalSpeech, { sortedEnglishVoices, useSpeechVoices } from '@/hooks/useNaturalSpeech'
import type { SoundResource } from '@/typings'
import { toFixedNumber } from '@/utils'
import { playKeySoundResource } from '@/utils/sounds/keySounds'
import { Listbox, Switch, Transition } from '@headlessui/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Slider from '@radix-ui/react-slider'
import { useAtom } from 'jotai'
import { Fragment, useCallback } from 'react'
import IconCheck from '~icons/tabler/check'
import IconChevronDown from '~icons/tabler/chevron-down'
import IconEar from '~icons/tabler/ear'

export default function SoundSetting() {
  const [pronunciationConfig, setPronunciationConfig] = useAtom(pronunciationConfigAtom)
  const [keySoundsConfig, setKeySoundsConfig] = useAtom(keySoundsConfigAtom)
  const [hintSoundsConfig, setHintSoundsConfig] = useAtom(hintSoundsConfigAtom)
  const speechVoices = sortedEnglishVoices(useSpeechVoices())
  const s1Preview = useNaturalSpeech('I think we should break the task into smaller steps.', 'He', 'S1', 'sgd')
  const s2Preview = useNaturalSpeech('That sounds practical, but we also need a clear deadline.', 'She', 'S2', 'sgd')
  const s3Preview = useNaturalSpeech('I agree. Let us compare both options before we decide.', 'He', 'S3', 'sgd')

  const onTogglePronunciation = useCallback(
    (checked: boolean) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setPronunciationConfig],
  )
  const onTogglePronunciationIsTransRead = useCallback(
    (checked: boolean) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        isTransRead: checked,
      }))
    },
    [setPronunciationConfig],
  )
  const onChangePronunciationVolume = useCallback(
    (value: [number]) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [setPronunciationConfig],
  )
  const onChangePronunciationIsTransVolume = useCallback(
    (value: [number]) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        transVolume: value[0] / 100,
      }))
    },
    [setPronunciationConfig],
  )
  const onChangePronunciationRate = useCallback(
    (value: [number]) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        rate: value[0],
      }))
    },
    [setPronunciationConfig],
  )
  const onChangeSgdRate = useCallback(
    (value: [number]) => {
      setPronunciationConfig((prev) => ({
        ...prev,
        sgdRate: value[0],
      }))
    },
    [setPronunciationConfig],
  )

  const onToggleKeySounds = useCallback(
    (checked: boolean) => {
      setKeySoundsConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setKeySoundsConfig],
  )
  const onChangeKeySoundsVolume = useCallback(
    (value: [number]) => {
      setKeySoundsConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [setKeySoundsConfig],
  )

  const onChangeKeySoundsResource = useCallback(
    (key: string) => {
      const soundResource = keySoundResources.find((item: SoundResource) => item.key === key) as SoundResource
      if (!soundResource) return

      setKeySoundsConfig((prev) => ({
        ...prev,
        resource: soundResource,
      }))
    },
    [setKeySoundsConfig],
  )

  const onPlayKeySound = useCallback((soundResource: SoundResource) => {
    playKeySoundResource(soundResource)
  }, [])

  const onToggleHintSounds = useCallback(
    (checked: boolean) => {
      setHintSoundsConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setHintSoundsConfig],
  )
  const onChangeHintSoundsVolume = useCallback(
    (value: [number]) => {
      setHintSoundsConfig((prev) => ({
        ...prev,
        volume: value[0] / 100,
      }))
    },
    [setHintSoundsConfig],
  )

  return (
    <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
      <ScrollArea.Viewport className="h-full w-full px-3">
        <div className={styles.tabContent}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>单词发音</span>
            <div className={styles.switchBlock}>
              <Switch checked={pronunciationConfig.isOpen} onChange={onTogglePronunciation} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                pronunciationConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  defaultValue={[pronunciationConfig.volume * 100]}
                  max={100}
                  step={10}
                  className="slider"
                  onValueChange={onChangePronunciationVolume}
                  disabled={!pronunciationConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(pronunciationConfig.volume * 100)}%`}</span>
              </div>
            </div>

            <div className={styles.block}>
              <span className={styles.blockLabel}>倍速</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  defaultValue={[pronunciationConfig.rate ?? 1]}
                  max={4}
                  min={0.5}
                  step={0.1}
                  className="slider"
                  onValueChange={onChangePronunciationRate}
                  disabled={!pronunciationConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${toFixedNumber(pronunciationConfig.rate, 2)}`}</span>
              </div>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>PTE 自然语音</span>
              <select
                value={pronunciationConfig.ttsVoiceName || 'auto'}
                onChange={(e) => setPronunciationConfig((prev) => ({ ...prev, ttsVoiceName: e.target.value }))}
                className="w-60 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200"
              >
                <option value="auto">自动选择高质量英文声线</option>
                {speechVoices.map((voice) => (
                  <option key={`${voice.name}-${voice.lang}`} value={voice.name}>
                    {voice.name} · {voice.lang}
                  </option>
                ))}
              </select>
            </div>
            <p className="px-1 text-[11px] leading-5 text-gray-500 dark:text-gray-400">
              FIB / SST 优先使用系统高质量英文声线；自动模式会优先 Natural / Neural / Premium / Enhanced。
            </p>

            <div className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-900/50 dark:bg-indigo-950/20">
              <div className="mb-3 text-xs font-semibold text-indigo-700 dark:text-indigo-200">SGD 三人声线</div>
              {[
                { key: 'sgdVoiceS1', label: 'S1', preview: s1Preview },
                { key: 'sgdVoiceS2', label: 'S2', preview: s2Preview },
                { key: 'sgdVoiceS3', label: 'S3', preview: s3Preview },
              ].map(({ key, label, preview }) => (
                <div key={key} className="mb-2 flex items-center gap-2">
                  <span className="w-6 text-xs font-bold text-gray-600 dark:text-gray-300">{label}</span>
                  <select
                    value={String(pronunciationConfig[key as keyof typeof pronunciationConfig] || 'auto')}
                    onChange={(e) =>
                      setPronunciationConfig((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-700 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200"
                  >
                    <option value="auto">自动选择高质量声线</option>
                    {speechVoices.map((voice) => (
                      <option key={`${key}-${voice.name}-${voice.lang}`} value={voice.name}>
                        {voice.name} · {voice.lang}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={preview.play}
                    className="rounded-md bg-indigo-500 px-2 py-1 text-[11px] font-medium text-white hover:bg-indigo-400"
                  >
                    试听
                  </button>
                </div>
              ))}

              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300">
                  <span>SGD 语速</span>
                  <span>{toFixedNumber(pronunciationConfig.sgdRate ?? 0.92, 2)}x</span>
                </div>
                <Slider.Root
                  defaultValue={[pronunciationConfig.sgdRate ?? 0.92]}
                  max={1.25}
                  min={0.7}
                  step={0.05}
                  className="slider"
                  onValueChange={onChangeSgdRate}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-gray-500 dark:text-gray-400">
                自动模式会让 S1 / S2 / S3 尽量使用不同声线，并取消旧版的人为变调；如果你的系统提供 Microsoft Natural、Google 或 Apple Enhanced，建议分别试听后手动固定。
              </p>
            </div>
          </div>
          {window.speechSynthesis && (
            <div className={styles.section}>
              <span className={styles.sectionLabel}>释义发音</span>
              <div className={styles.switchBlock}>
                <Switch checked={pronunciationConfig.isTransRead} onChange={onTogglePronunciationIsTransRead} className="switch-root">
                  <span aria-hidden="true" className="switch-thumb" />
                </Switch>
                <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                  pronunciationConfig.isTransRead ? '开启' : '关闭'
                }`}</span>
              </div>
              <div className={styles.block}>
                <span className={styles.blockLabel}>音量</span>
                <div className="flex h-5 w-full items-center justify-between">
                  <Slider.Root
                    defaultValue={[pronunciationConfig.transVolume * 100]}
                    max={100}
                    step={10}
                    className="slider"
                    onValueChange={onChangePronunciationIsTransVolume}
                  >
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider.Root>
                  <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(
                    pronunciationConfig.transVolume * 100,
                  )}%`}</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.section}>
            <span className={styles.sectionLabel}>按键音</span>
            <div className={styles.switchBlock}>
              <Switch checked={keySoundsConfig.isOpen} onChange={onToggleKeySounds} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                keySoundsConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  defaultValue={[keySoundsConfig.volume * 100]}
                  max={100}
                  min={1}
                  step={10}
                  className="slider"
                  onValueChange={onChangeKeySoundsVolume}
                  disabled={!keySoundsConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(keySoundsConfig.volume * 100)}%`}</span>
              </div>
            </div>
            <div className={`${styles.block}`}>
              <span className={styles.blockLabel}>按键音效</span>
              <Listbox value={keySoundsConfig.resource.key} onChange={onChangeKeySoundsResource}>
                <div className="relative">
                  <Listbox.Button className="listbox-button w-60">
                    <span>{keySoundsConfig.resource.name}</span>
                    <span>
                      <IconChevronDown className="focus:outline-none" />
                    </span>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="listbox-options z-10">
                      {keySoundResources.map((keySoundResource) => (
                        <Listbox.Option key={keySoundResource.key} value={keySoundResource.key}>
                          {({ selected }) => (
                            <>
                              <div className="group flex cursor-pointer items-center justify-between">
                                <span>{keySoundResource.name}</span>
                                {selected ? (
                                  <span className="listbox-options-icon">
                                    <IconCheck className="focus:outline-none" />
                                  </span>
                                ) : null}
                                <IconEar
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onPlayKeySound(keySoundResource)
                                  }}
                                  className="mr-2  hidden cursor-pointer text-neutral-500 hover:text-indigo-400 group-hover:block dark:text-neutral-300"
                                />
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>效果音</span>
            <div className={styles.switchBlock}>
              <Switch checked={hintSoundsConfig.isOpen} onChange={onToggleHintSounds} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`发音已${
                hintSoundsConfig.isOpen ? '开启' : '关闭'
              }`}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.blockLabel}>音量</span>
              <div className="flex h-5 w-full items-center justify-between">
                <Slider.Root
                  defaultValue={[hintSoundsConfig.volume * 100]}
                  max={100}
                  min={1}
                  step={10}
                  className="slider"
                  onValueChange={onChangeHintSoundsVolume}
                  disabled={!hintSoundsConfig.isOpen}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider.Root>
                <span className="ml-4 w-10 text-xs font-normal text-gray-600">{`${Math.floor(hintSoundsConfig.volume * 100)}%`}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
