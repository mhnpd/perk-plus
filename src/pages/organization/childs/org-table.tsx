import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Button
} from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUsersOrganization } from '../../../redux/slices/orgs'

const OrganizationTable = () => {
  const orgList = useSelector(selectUsersOrganization)
  console.log(orgList)
  return (
    <TableContainer component={Paper} elevation={4} sx={{ pt: 3, mt: 5 }}>
      <Typography variant="h6" marginBottom={2} sx={{ pl: 2 }}>
        All Organizations
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
                <Button component="a" target='_blank' href={org.banner}>
                  View
                </Button>
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
