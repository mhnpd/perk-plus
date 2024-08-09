import ListItemButton from '@mui/material/ListItemButton'
import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import { usePathname } from '../../hooks/use-pathname'
import { RouterLink } from '../../shared/router-link'
import { Box, Collapse, List, ListItemSecondaryAction } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Iconify } from '../../components/iconify'
import { NavigationItem } from '../config-navigation'

export interface NavItemProps {
  item: NavigationItem
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const active = item.path === pathname

  const handleClick = () => {
    if (item.children) {
      setOpen(!open)
    }
  }

  return (
    <>
    <ListItemButton
      component={item.children ? 'div' : RouterLink}
      href={item.children ? undefined : item.path}
      onClick={handleClick}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
          }
        })
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span" >
        {item.title}{' '}
      </Box>
      <ListItemSecondaryAction>
        {item.children ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemSecondaryAction>
    </ListItemButton>
    {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, index) => (
              <ListItemButton
                key={index}
                component={RouterLink}
                href={child.path}
                sx={{
                  pl: 4,
                  typography: 'body2',
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  fontWeight: 'fontWeightMedium',
                  ...(child.path === pathname && {
                    color: 'primary.main',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
                    }
                  }),
                }}
              >
                <Box display='flex' sx={{verticalAlign: 'end'}}>
                  <Box sx={{marginRight:"10px"}}>
                    <Iconify icon='bi:arrow-return-right'/>
                  </Box>
                  {child.title}
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
