import { Clef } from '../common/clef'
import { Duration } from '../common/duration'
import { DurationFrequency } from '../common/durationFrequency'
import { KeySignature } from '../common/keySignature'
import { HelpPageId } from '../components/help/HelpPageId'
import { SettingsPageId } from '../components/settings/SettingsPageId'
import { MelodyType } from '../legacy/melodies/types'

export const enum Language {
  Hungarian = 'hu',
  English = 'en',
}

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  chordsVolume: number
  isLooping: boolean
  isCountingIn: boolean
}

export type PagesConfig = {
  settings: SettingsPageId
  help: HelpPageId
}

export type GeneratorConfig = {
  bars: number
  tempo: number
  clef: Clef
  timeSignature: TimeSignature
  keySignature: KeySignature
  showChordsStaff: boolean
  showChordSymbols: boolean
  useSeventhChords: boolean
  notes: string[]
  noteDurations: DurationConfig
  restDurations: DurationConfig
  // Just for easier regeneration
  timeStamp: number
}

export type TimeSignature = {
  upper: number
  lower: number
}

export type DurationConfig = Partial<Record<Duration, DurationData>>

export type DurationData = {
  frequency: DurationFrequency
  cluster: number
}

export type LegacyGeneratorConfig = {
  type: MelodyType
  barCount: number
  keySignature: KeySignature
  clef: Clef
  firstFret: number
  lastFret: number
  semitones: boolean
  showNoteNames: boolean
  tuning: string[]
  bpm: number
  // Just for easier regeneration
  timestamp: number
}

export type AppState = {
  player: PlayerConfig
  pages: PagesConfig
  generator: GeneratorConfig
  language: Language | null
}
