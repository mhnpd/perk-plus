import { alpha, Box, useTheme } from "@mui/material"
import { bgGradient } from "../theme/css"
import { Logo } from "./logo"

interface BackgroundProps {
  children: React.ReactNode
  disabledLogo?: boolean
}

export function Background({ children, disabledLogo }: BackgroundProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg'
        }),
        height: 1
      }}
    >
      <Logo
        disabledLink={disabledLogo}
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 }
        }}
      />
      {children}
    </Box>
  )
}