import { ChangeEvent, FC } from 'react'
import { TimeSignature } from '../../../../state/types'
import { Input } from '../Input/Input'
import { css } from '@emotion/css'
import Select from 'react-select'
import { SelectItem } from '../../types'
import { lowerComponents, lowerStyles } from './styling'

export type TimeSignaturePickerProps = {
  value: TimeSignature
  onChange: (value: TimeSignature) => void
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  padding: 6px 7px;
  gap: 8px;
  background-color: #00000010;
`

const inputStyle = css`
  max-width: 55px;
  height: 36px;
  padding: 6px 7px;
`

const LOWER_ITEMS: SelectItem<number>[] = [1, 2, 4, 8].map((value) => ({
  label: value.toString(),
  value,
}))

export const TimeSignaturePicker: FC<TimeSignaturePickerProps> = ({
  value,
  onChange,
}) => {
  const onUpperChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, upper: e.target.valueAsNumber })
  }

  const onLowerChange = (e: SelectItem<number> | null) => {
    onChange({ ...value, lower: e?.value ?? value.lower })
  }

  const selectedLower = LOWER_ITEMS.find((item) => item.value === value.lower)

  return (
    <div className={containerStyle}>
      <Input
        className={inputStyle}
        value={value.upper}
        onChange={onUpperChange}
        type="number"
        step={1}
        min={1}
        max={30}
      />
      /
      <Select<SelectItem<number>>
        menuPosition="fixed"
        value={selectedLower}
        options={LOWER_ITEMS}
        styles={lowerStyles}
        components={lowerComponents}
        onChange={onLowerChange}
      />
    </div>
  )
}
