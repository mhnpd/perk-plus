import { ReactNode, useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MUIThemeProvider, ThemeOptions } from '@mui/material/styles'

import { palette } from './palette'
import { shadows } from './shadows'
import { overrides } from './overrides'
import { typography } from './typography'
import { customShadows } from './custom-shadows'

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // @ts-expect-error hard to fix
  const memoizedValue:ThemeOptions = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  )

  const theme = createTheme(memoizedValue)

  // @ts-expect-error hard to fix
  theme.components = overrides(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}