import { AtBar } from '../alphaTex/alphaTex'
import { Clef, Duration, KeySignature } from '../common/common'
import { MelodyType } from '../legacy/melodies/types'

export type PlayerConfig = {
  metronomeVolume: number
  instrumentVolume: number
  isLooping: boolean
}

export type GeneratorConfig2 = {
  bars: number
  bpm: number
  clef: Clef
  keySignature: KeySignature
  notes: string[]
  noteDurations: Duration[]
  restDurations: Duration[]
  // Just for easier regeneration
  timeStamp: number
}

export type GeneratorConfig = {
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
  generator: GeneratorConfig
  melody: AtBar[]
}
