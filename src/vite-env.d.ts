/// <reference types="vite/client" />

import type { CustomShadowReturnType } from "./theme/custom-shadows"
import type { CustomTypography } from "./theme/typography"

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowReturnType,
    typography: CustomTypography

  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    customProperty?: {
      myColor?: string
      myFontSize?: number
    }
  }
}