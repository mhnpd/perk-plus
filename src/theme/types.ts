import { Theme } from "@mui/material"
import { CustomShadowReturnType } from "./custom-shadows"
import { CustomTypography } from "./typography"
import { Palette } from "./palette"

export interface AppTheme extends Theme {
  customShadows: CustomShadowReturnType
  typography: CustomTypography
  palette: Palette
}