import { FC, useMemo } from 'react'
import {
  disabledStyle,
  selectedStyle,
  tableStyle,
  tdStyle,
  thStyle,
} from './durationGridStyles'
import { useDurationHeaders, useTypeHeaders } from './durationGridHeaders'
import { DurationHeader, TypeHeader, DurationItem } from './types'
import {
  getDurationHeaderSelection,
  getDurations,
  getTypeHeaderSelection,
  getDurationGridData,
  updateDurationHeader,
  updateItem,
  updateTypeHeader,
} from './durationGridUtils'
import { cx } from '@emotion/css'
import { noop } from '../../../../common/utils'
import { Duration } from '../../../../common/duration'

const Disabled: Duration[] = [Duration.DOTTED_WHOLE, Duration.DOTTED_SIXTEENTH]

export type DurationGridProps = {
  rests: Duration[]
  notes: Duration[]
  onChange: (notes: Duration[], rests: Duration[]) => void
}

export const DurationGrid: FC<DurationGridProps> = ({
  notes,
  rests,
  onChange,
}) => {
  const durationHeaders = useDurationHeaders()
  const typeHeaders = useTypeHeaders()

  const data = useMemo(() => getDurationGridData(notes, rests), [notes, rests])

  const durationSelection = useMemo(
    () => getDurationHeaderSelection(data, Disabled, durationHeaders),
    [data, durationHeaders],
  )

  const typeSelection = useMemo(
    () => getTypeHeaderSelection(data, Disabled, typeHeaders),
    [data, typeHeaders],
  )

  const onNoteLengthSelected = (item: DurationItem) => {
    const updatedData = updateItem(data, item)
    onChange(
      getDurations(updatedData, 'NOTE'),
      getDurations(updatedData, 'REST'),
    )
  }

  const onTypeHeaderSelected = (header: TypeHeader) => {
    const updatedData = updateTypeHeader(
      data,
      header,
      Disabled,
      typeSelection.get(header)!,
    )

    onChange(
      getDurations(updatedData, 'NOTE'),
      getDurations(updatedData, 'REST'),
    )
  }

  const onDurationHeaderSelected = (header: DurationHeader) => {
    const updatedData = updateDurationHeader(
      data,
      header,
      Disabled,
      durationSelection.get(header)!,
    )
    onChange(
      getDurations(updatedData, 'NOTE'),
      getDurations(updatedData, 'REST'),
    )
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th />
          {typeHeaders.map((header) => {
            const className = cx(
              thStyle,
              typeSelection.get(header) ? selectedStyle : undefined,
            )
            const onClick = () => onTypeHeaderSelected(header)
            return (
              <th onClick={onClick} className={className} key={header.label}>
                {header.label}
              </th>
            )
          })}
        </tr>
        {durationHeaders.map((header, i) => {
          const row = data[i]!
          const headerClassName = cx(
            thStyle,
            durationSelection.get(header) ? selectedStyle : undefined,
          )
          const onHeaderClick = () => onDurationHeaderSelected(header)

          return (
            <tr key={header.label}>
              <th className={headerClassName} onClick={onHeaderClick}>
                {header.label}
              </th>
              {row.map((item) => {
                const isDisabled = Disabled.includes(item.duration)
                const className = cx({
                  [tdStyle]: true,
                  [selectedStyle]: item.isSelected,
                  [disabledStyle]: isDisabled,
                })
                const onClick = isDisabled
                  ? noop
                  : () => onNoteLengthSelected(item)
                const key = `${item.type}-${item.duration}`
                return (
                  <td className={className} onClick={onClick} key={key}>
                    <item.Component />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </thead>
    </table>
  )
}
