import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizations, selectUsersOrganization } from '../redux/slices/orgs'
import { fetchUserProfile, getDefaultOrg, setDefaultOrganizationId } from '../redux/slices/user'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { Container, Stack } from '@mui/material'
import { fetchCard } from '../redux/slices/cards'

interface DataLoaderProps {
  children: React.ReactNode
}

const DataLoader: React.FC<DataLoaderProps> = ({
  children
}) => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const organizations = useSelector(selectUsersOrganization)
  const [loading, setLoading] = useState<boolean>(true)


  const setDefaultOrganization = async () => {
    await dispatch(fetchOrganizations())
    if (!defaultOrgId) {
      dispatch(setDefaultOrganizationId(organizations[0].organizationId))
    }
  }


  useEffect(() => {
    setLoading(true)
    setDefaultOrganization().then(() => {
      dispatch(fetchCard(defaultOrgId))
      dispatch(fetchUserProfile())
      setLoading(false)
    })
  }, [defaultOrgId])


  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Skeleton variant="rectangular" height={100} />
                  <Skeleton variant="rectangular" height={100} />
                  <Skeleton variant="rectangular" height={100} />
                  <Skeleton variant="rectangular" height={100} />
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Skeleton variant="rectangular" height={100} />
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={50} />
                  <Skeleton variant="rectangular" height={70} />
                  <Skeleton variant="rectangular" height={40} />
                  <Skeleton variant="rectangular" height={100} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return <>{children}</>
}

export default DataLoader