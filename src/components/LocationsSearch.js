import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, Card, CardContent, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),

    overflow: 'auto',
    maxWidth: '100%',
    margin: '10px',
  },
  chip: {
    margin: theme.spacing(2),
  },
}));

export default function LocationsSearch() {
  const classes = useStyles();
  const navigate = useNavigate();

  const locations = useSelector(({ search }) => search.locations);
  if (!locations.length) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" my={1}>
        <Typography variant="body1" gutterBottom>
          No Locations found.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box className={classes.root}>
      {locations.map((location, index) => (
        <Card
          sx={{ minWidth: 330, backgroundColor: '#f2f2f2', cursor: 'pointer', mr: 2 }}
          onClick={() => navigate(`/dashboard/location/${location._id}`)}
          key={index}
        >
          <img width="100%" height="200" src={location.photo} alt={location.name} style={{ zIndex: 100 }} />
          <CardContent
            sx={{
              backgroundColor: '#f2f2f2',
              zIndex: 0,
            }}
          >
            <Card
              sx={{
                mt: -7,
                maxWidth: '100%',
                borderRadius: 0.5,
                py: 2,
                px: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={location.addedBy.photo}
                alt={location.addedBy.name}
                sx={{
                  width: 90,
                  height: 90,
                  mt: 0,
                  border: 2.5,
                  borderColor: '#0043ca',
                  zIndex: 1,
                }}
              />
              <Typography sx={{ my: 2, textTransform: 'capitalize' }} variant="caption" component="div">
                <b>Added By: {location.addedBy.name}</b>
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                {location.name}
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                {location.district}
                {', '}
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                {location.state}
              </Typography>
              <Typography sx={{ mb: 2, textTransform: 'capitalize' }} variant="subtitle2" color="text.primary">
                {'PinCode: '}
                {location.pincode}
              </Typography>
            </Card>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
