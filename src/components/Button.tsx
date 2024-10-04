import { css } from '@emotion/css'
import { FC, PropsWithChildren } from 'react'

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  color: #ffffff;
  padding: 5px 10px;
  gap: 6px;
  cursor: pointer;
  font-size: 1.2em;
  border-radius: 20px;
  background-color: transparent;
  background-color: #00000090;
  &:hover {
    color: #ffffff;
    background-color: #00000070;
  }
  &:disabled {
    background-color: transparent;
    color: #00000050;
    cursor: not-allowed;
  }
`

export type ButtonProps = PropsWithChildren & {
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className={buttonStyle} onClick={onClick}>
      {children}
    </div>
  )
}
