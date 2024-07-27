import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUsersOrganization } from '../../../redux/slices/orgs'

const OrganizationTable = () => {
  const orgList = useSelector(selectUsersOrganization)
  return (
    <TableContainer component={Paper} elevation={4} sx={{ mt: 5, p: 2 }}>
      <Typography variant="h6" marginBottom={2}>
        Add Organization
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name </TableCell>
            <TableCell> Email </TableCell>
            <TableCell> Phone </TableCell>
            <TableCell> Banner </TableCell>
            <TableCell> Logo </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orgList.map((org, index) => (
            <TableRow key={index}>
              <TableCell>{org.name} </TableCell>
              <TableCell> {org.email} </TableCell>
              <TableCell> {org.phone} </TableCell>
              <TableCell>
                <img src={org.banner} alt="banner" width={150} />
              </TableCell>
              <TableCell>
                <Avatar src={org.logo} alt="logo" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrganizationTable
