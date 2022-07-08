import React from 'react';
import { Grid, Card, Avatar, Stack, Typography, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function UsersSearch() {
  const navigate = useNavigate();
  const poles = useSelector(({ search }) => search.poles);
  if (!poles.length) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" my={1}>
        <Typography variant="body1" gutterBottom>
          No poles found.
        </Typography>
      </Stack>
    );
  }
  return (
    <Grid container spacing={3} direction="row" sx={{ mb: 2 }}>
      {poles.map((pole, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
          <Card
            sx={{ backgroundColor: '#D1E9FC', cursor: 'pointer', maxWidth: 600, py: 2, px: 3 }}
            onClick={() => navigate(`/dashboard/pole/${pole._id}`)}
          >
            <Stack
              spacing={{ xs: 2, sm: 2, md: 3 }}
              direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
              alignItems="center"
              justifyContent="space-around"
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={<SmallAvatar alt={pole.addedBy.name} src={pole.addedBy.photo} />}
              >
                <Avatar sx={{ height: '100px', width: '100px' }} alt={pole.location.name} src={pole.location.photo} />
              </Badge>
              <Stack direction="column" spacing={0.3}>
                <Typography variant="h6">
                  {'#'}
                  {pole.serialno}
                </Typography>
                <Typography variant="overline" sx={{ textTransform: 'capitalize' }}>
                  {pole.location.name}
                </Typography>
                <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                  {'Added By: '}
                  {pole.addedBy.name}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
