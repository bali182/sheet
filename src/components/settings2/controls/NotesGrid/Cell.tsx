import { cx } from '@emotion/css'
import { FC } from 'react'
import { Note } from 'tonal'
import { beautifyNote } from './notesGridUtils'
import {
  bottomRightNoteStyle,
  selectedStyle,
  tdStyle,
  topLeftNoteStyle,
  fillSeparatorStyle,
} from './commonStyles'

export type CellProps = {
  note: string
  octave: number
  isSelected: boolean
  onClick: (note: string, octave: number) => void
}

export const Cell: FC<CellProps> = ({
  isSelected,
  note,
  octave,
  onClick: _onClick,
}) => {
  const tdFullStyle = cx(tdStyle, isSelected ? selectedStyle : undefined)
  const enharmonic = Note.enharmonic(note)
  const onClick = () => {
    _onClick(note, octave)
  }
  if (enharmonic === note) {
    return (
      <td className={tdFullStyle} onClick={onClick}>
        {beautifyNote(note)}
        {octave}
      </td>
    )
  }
  return (
    <td className={tdFullStyle} onClick={onClick}>
      <div className={fillSeparatorStyle} />
      <span className={topLeftNoteStyle}>
        {beautifyNote(note)}
        {octave}
      </span>
      <span className={bottomRightNoteStyle}>
        {beautifyNote(enharmonic)}
        {octave}
      </span>
    </td>
  )
}
