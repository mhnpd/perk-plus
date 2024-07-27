import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ContactApp from './t2'

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    renderHeader: () => (
      <Typography variant="body1" sx={{ ml: 3 }}>
        Name
      </Typography>
    ),
    width: 300,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 3 }}>
        <Avatar src={params.row.icon} />
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: 'joined',
    headerName: 'Joined',
    width: 150,
  },
]

const rows = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234', joined: '2022-01-01', },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678', joined: '2023-02-15' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-8765', joined: '2021-05-30' },
]

export default function UserPage() {
  return (
    <Card>
      <ContactApp />
    </Card>
  )
}
