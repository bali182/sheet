import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'
import { AtBar } from '../model/alphaTex'
import { generatorSlice } from './generatorSlice'
import { getRandomMelody } from '../model/getRandomMelody'
import { Note } from 'tonal'

export type SetMelodyPayload = AtBar[]

export const melodySlice = createSlice({
  name: 'melody',
  initialState: initialState.melody,
  reducers: {
    updateDisplayConfig: (_, { payload }: PayloadAction<SetMelodyPayload>) =>
      payload,
  },
  extraReducers: (builder) => {
    builder.addCase(
      generatorSlice.actions.setGeneratorConfig,
      (_state, { payload }) => getRandomMelody(payload),
    )
  },
})
