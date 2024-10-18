import { css, cx } from '@emotion/css'
import { ComponentType, useMemo } from 'react'
import { PiFloppyDiskBold, PiX } from 'react-icons/pi'
import { Modal } from './Modal'
import { IconType } from 'react-icons'
import { Button } from './Button'
import { noop } from '../model/utils'
import { useTranslation } from 'react-i18next'

export type ModalPage<T = any> = {
  id: string
  name: string
  Icon: IconType
  Component: ComponentType<T>
}

export type PagedModalProps<T = any> = {
  activePage: string
  title: string
  icon: IconType
  closeOnBackdropClick?: boolean
  pageProps: T
  pages: ModalPage<T>[]
  onSave: () => void
  onClose: () => void
  setActivePage: (pageId: string) => void
}

const menuStyle = css`
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  min-width: 200px;
`

const menuHeaderStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4em;
  font-weight: bold;
  color: #000000;
  gap: 10px;
  padding: 14px 18px;
`

const headerIconStyle = css`
  position: relative;
  top: 1px;
`

const menuContainerStyle = css`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
`

const menuItemStlye = css`
  display: flex;
  align-items: center;
  color: #000000cc;
  font-size: 1.2em;
  gap: 10px;
  padding: 10px 18px;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: #00000010;
  }
`

const activeMenuItemStyle = css`
  background-color: #00000020;
  color: #000000;
  &:hover {
    color: #000000;
    background-color: #00000020;
  }
`

const contentStyle = css`
  position: relative;
  flex: 1;
  min-width: 400px;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.4) 0px 2px 29px 0px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  /* margin: 10px 10px 10px 0px; */
  /* border-radius: 10px; */
`

const contentTitleStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const contentHeaderStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4em;
  font-weight: bold;
  color: #000000;
  padding: 14px;
`

const closeIconStyle = css`
  font-size: 1.4em;
  color: #000000;
  cursor: pointer;
`

const contentContainerStyle = css`
  overflow: auto;
  width: 600px;
  height: 540px;
  padding-bottom: 20px;
`

const contentBottomGradient = css`
  position: absolute;
  pointer-events: none;
  bottom: 65px;
  left: 0px;
  right: 20px;
  height: 16px;
  background: linear-gradient(0deg, #ffffffff 0%, #ffffff00 100%);
`

const buttonContainerStyle = css`
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: all;
  padding: 14px;
  gap: 10px;
  width: 100%;
  border-bottom-right-radius: 14px;
`

export function PagedModal<T>({
  pages,
  title,
  icon: Icon,
  activePage: activePageId,
  pageProps: pageData,
  closeOnBackdropClick,
  onClose,
  onSave,
  setActivePage,
}: PagedModalProps<T>) {
  const { t } = useTranslation()

  const activePage = useMemo(
    () => pages.find((page) => page.id === activePageId)!,
    [pages, activePageId],
  )

  return (
    <Modal onBackdropClick={closeOnBackdropClick ? onClose : noop}>
      <div className={menuStyle}>
        <header className={menuHeaderStyle}>
          <Icon className={headerIconStyle} /> {title}
        </header>
        <div className={menuContainerStyle}>
          {pages.map((e) => {
            const { id, name, Icon } = e
            const className = cx(
              menuItemStlye,
              id === activePageId ? activeMenuItemStyle : null,
            )
            const onClick = () => setActivePage(e.id)
            return (
              <div key={id} className={className} onClick={onClick}>
                <Icon /> {name}
              </div>
            )
          })}
        </div>
      </div>
      <div className={contentStyle}>
        <header className={contentHeaderStyle}>
          <div className={contentTitleStyle}>
            <activePage.Icon /> {activePage.name}
          </div>
          <PiX className={closeIconStyle} onClick={onClose} />
        </header>
        <div className={contentContainerStyle}>
          {<activePage.Component {...(pageData as any)} />}
        </div>
        <div className={contentBottomGradient} />
        <div className={buttonContainerStyle}>
          <Button onClick={onSave}>
            <PiFloppyDiskBold /> {t('Settings.Save')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
