import type {SxProps} from '@mui/material'

export const containerSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
  // p: 0,
  // justifyContent: 'space-between',
  fontWeight: isDone ? 'normal' : 'bold',
  opacity: isDone ? 0.5 : 1,
})
