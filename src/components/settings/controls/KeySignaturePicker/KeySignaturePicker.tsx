import { FC, useMemo } from 'react'
import Select, {
  components,
  CSSObjectWithLabel,
  OptionProps,
  SelectComponentsConfig,
  SingleValueProps,
  StylesConfig,
} from 'react-select'
import { SelectItem } from '../../types'
import { defaultStyles } from '../dropdownStyles'
import { KeySignature } from '../../../../common/keySignature'
import { useKeySignatures } from './useKeySignatures'
import { isNil } from '../../../../common/utils'
import { Accidentals } from './Accidentals'

export type KeySignaturePickerProps = {
  value: KeySignature
  onChange: (value: KeySignature) => void
}

const SingleValue: FC<SingleValueProps<SelectItem<KeySignature>>> = ({
  children,
  ...props
}) => {
  const value = props.getValue()[0]!.value
  return (
    <components.SingleValue {...props}>
      {children}{' '}
      {value === KeySignature.C_MAJOR_A_MINOR ? null : (
        <>
          (<Accidentals keySignature={value} />)
        </>
      )}
    </components.SingleValue>
  )
}

const Option: FC<OptionProps<SelectItem<KeySignature>>> = ({
  children,
  ...props
}) => {
  const value = props.data.value
  return (
    <components.Option {...props}>
      {children}{' '}
      {value === KeySignature.C_MAJOR_A_MINOR ? null : (
        <>
          (<Accidentals keySignature={value} />)
        </>
      )}
    </components.Option>
  )
}

const modifiedStyles: StylesConfig<any, any, any> = {
  ...defaultStyles,
  menuList: (provided, props): CSSObjectWithLabel => ({
    ...defaultStyles?.menuList?.(provided, props),
    maxHeight: '250px',
  }),
}

export const modifiedComponents: SelectComponentsConfig<any, any, any> = {
  IndicatorSeparator: () => null,
  SingleValue,
  Option,
}

export const KeySignaturePicker: FC<KeySignaturePickerProps> = ({
  value,
  onChange: _onChange,
}) => {
  const keySignatures = useKeySignatures()

  const selectedKeySignature = useMemo(
    () => keySignatures.find((item) => item.value === value),
    [value, keySignatures],
  )

  const onChange = (item: SelectItem<KeySignature> | null) => {
    if (!isNil(item)) {
      _onChange(item.value)
    }
  }

  return (
    <Select<SelectItem<KeySignature>>
      inputId="key-signature-picker"
      value={selectedKeySignature}
      options={keySignatures}
      styles={modifiedStyles}
      components={modifiedComponents}
      onChange={onChange}
    />
  )
}
