import { useEffect, useState } from 'react';
// material
import { Card, Stack, Avatar, Container, Tab, Box, Divider, Skeleton, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import ViewProfile1 from '../components/ViewProfile1';
import ViewProfile2 from '../components/ViewProfile2';
import ViewProfile3 from '../components/ViewProfile3';

export default function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const locations = useSelector(({ search }) => search.locations);
  const users = useSelector(({ search }) => search.users);
  const poles = useSelector(({ search }) => search.poles);

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Search Results">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={3}>
          <Typography variant="h4" gutterBottom>
            {`Search Results for "${location.state.search}"`}
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="flex-start" mb={4}>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" gutterBottom>
            {`Users(${users.length})`}
          </Typography>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" gutterBottom>
            {`Locations(${locations.length})`}
          </Typography>
          <Typography sx={{ textDecoration: 'underline' }} variant="h6" gutterBottom>
            {`Poles(${poles.length})`}
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
