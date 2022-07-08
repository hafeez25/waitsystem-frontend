import React from 'react';
import { Grid, Card, Avatar, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UsersSearch() {
  const navigate = useNavigate();
  const users = useSelector(({ search }) => search.users);
  if (!users.length) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" my={1}>
        <Typography variant="body1" gutterBottom>
          No users found.
        </Typography>
      </Stack>
    );
  }
  return (
    <Grid container spacing={3} direction="row" sx={{ mb: 2 }}>
      {users.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
          <Card
            sx={{ backgroundColor: '#D1E9FC', cursor: 'pointer', maxWidth: 600, py: 2, px: 3 }}
            onClick={() => navigate(`/view-profile/${user._id}`)}
          >
            <Stack
              spacing={{ xs: 1.5, sm: 1.5, md: 3 }}
              direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Avatar sx={{ height: '130px', width: '130px' }} src={user.photo} alt={user.name} />
              <Stack direction="column">
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="caption">{user.isSuperUser ? 'Admin' : 'General User'}</Typography>
                <Typography variant="button">{user.location}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
