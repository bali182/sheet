import { css } from '@emotion/css'
import { FC } from 'react'
import { Logo } from './Logo'
import { Button } from './Button'
import { PiGearBold, PiFastForwardBold, PiQuestionBold } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'
import { LanguageSwitch } from './LanguageSwitch'
import { Language } from '../state/types'

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  width: 100%;
  padding: 20px 20px;
  @media (min-width: 1080px) {
    padding: 20px 200px;
  }
`

const buttonsContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`

const toolBarButtonStyle = css`
  overflow: hidden;
  flex: 0 1 auto;
`

const toolBarButtonLabelStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 0 1 auto;
`

const toolBarButtonIconStyle = css`
  flex-shrink: 0;
`

type ToolbarProps = {
  language: Language
  onRegenerate: () => void
  onOpenSettings: () => void
  onOpenHelp: () => void
  onLanguageChange: (language: Language) => void
}

export const Toolbar: FC<ToolbarProps> = ({
  language,
  onRegenerate,
  onOpenSettings,
  onOpenHelp,
  onLanguageChange,
}) => {
  const { t } = useTranslation()
  return (
    <div className={toolbarStyle}>
      <Logo />
      <div className={buttonsContainer}>
        <Button onClick={onRegenerate} className={toolBarButtonStyle}>
          <PiFastForwardBold className={toolBarButtonIconStyle} />
          <span className={toolBarButtonLabelStyle}>
            {t('Menu.GenerateNew')}
          </span>
        </Button>
        <Button onClick={onOpenSettings} className={toolBarButtonStyle}>
          <PiGearBold className={toolBarButtonIconStyle} />
          <span className={toolBarButtonLabelStyle}> {t('Menu.Settings')}</span>
        </Button>
        <Button onClick={onOpenHelp} className={toolBarButtonStyle}>
          <PiQuestionBold className={toolBarButtonIconStyle} />
          <span className={toolBarButtonLabelStyle}> {t('Menu.Help')}</span>
        </Button>
        <LanguageSwitch onChange={onLanguageChange} language={language} />
      </div>
    </div>
  )
}
