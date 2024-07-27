import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface GlassEffectBoxProps {
  children: ReactNode
}

const GlassEffectBox = ({ children }: GlassEffectBoxProps) => {
  return (
    <Box
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly more opaque for visibility on white
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        padding: 2,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default GlassEffectBox
