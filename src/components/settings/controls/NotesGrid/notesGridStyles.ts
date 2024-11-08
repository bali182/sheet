import { css } from '@emotion/css'

export const tableStyle = css`
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
`

export const thStyle = css`
  font-weight: 400;
  text-align: center;
  padding: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 38px;
  font-size: 0.9em;
  border: 1px solid #00000030;
  background-color: #00000010;
  &:hover {
    background-color: #00000020 !important;
  }
`

export const topThStyle = css`
  border-bottom-color: #00000050;
`

export const leftThStyle = css`
  border-right-color: #00000050;
`

export const tdStyle = css`
  padding: 6px;
  font-size: 0.8em;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: 1px solid #00000030;
  &:hover {
    background-color: #00000050 !important;
  }
`

export const selectedStyle = css`
  background-color: #000000aa !important;
  color: #fff;
  &:hover {
    background-color: #000000cc !important;
  }
`

export const topLeftNoteStyle = css`
  position: absolute;
  top: 1px;
  left: 3px;
`

export const bottomRightNoteStyle = css`
  position: absolute;
  bottom: 1px;
  right: 3px;
`

export const lineSeparatorStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(
    calc(100% + 1px) -1px,
    calc(100% - 1px) 0px,
    0px calc(100% + 1px),
    1px calc(100% + 1px)
  );
  background-color: #00000050;
`

export const fillSeparatorStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 0px, 0px 100%, 0px 0px);
  background-color: #00000020;
`
