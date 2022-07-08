import { useEffect, useState } from 'react';
// material
import { Card, Stack, Avatar, Container, Tab, Box, Divider, Skeleton, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';

import UsersSearch from '../components/UsersSearch';
import PolesSearch from '../components/PolesSearch';
import LocationsSearch from '../components/LocationsSearch';

export default function SearchPage() {
  const location = useLocation();

  const locations = useSelector(({ search }) => search.locations);
  const users = useSelector(({ search }) => search.users);
  const poles = useSelector(({ search }) => search.poles);

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Search Results">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={2}>
          {location.state && location.state.search && <Typography variant="h4" gutterBottom>
            {`Search Results for "${location.state?.search}"`}
          </Typography>}
        </Stack>
        <Divider />
        <Stack direction="column" alignItems="flex-start" my={1}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6">
            {`Users (${users.length})`}
          </Typography>
        </Stack>
        <UsersSearch />
        <Divider />
        <Stack direction="column" alignItems="flex-start" my={1}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6">
            {`Locations (${locations.length})`}
          </Typography>
        </Stack>
        <LocationsSearch />
        <Divider />
        <Stack direction="column" alignItems="flex-start" my={1}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6">
            {`Poles (${poles.length})`}
          </Typography>
        </Stack>
        <PolesSearch />
        <Divider />
      </Container>
    </Page>
  );
}
