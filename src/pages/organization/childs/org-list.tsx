import { FixedSizeList as List } from 'react-window'
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton
} from '@mui/material'
import { CSSProperties } from 'react'
import { Organization } from '../../../api/orgs'

interface OrgListProps {
  orgs: Organization[]
  onSelect: (user: Organization) => void
  selectedOrgId: string | null
}

export const OrgList = ({
  orgs,
  onSelect,
  selectedOrgId
}: OrgListProps) => {
  const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
    const org = orgs[index]
    return (
      <div style={style}>
        <ListItemButton
          key={org.organizationId}
          selected={org.organizationId === selectedOrgId}
          onClick={() => onSelect(org)}
        >
          <ListItemAvatar>
            <Avatar src={org.logo as string || ''} />
          </ListItemAvatar>
          <ListItemText primary={org.name} secondary={org.website || org.email} />
        </ListItemButton>
      </div>
    )
  }
  return (

    <List
      height={500}
      itemCount={orgs.length}
      itemSize={72}
      width="100%"
    >
      {Row}
    </List>
  )
}
