import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Skeleton,
} from '@mui/material';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FetchAllLocationsViewProfile } from '../redux/ProfileReducer';

export default function ViewProfile3() {
  const dispatch = useDispatch();

  const { userid } = useParams();

  const locations = useSelector(({ profile }) => profile.locations);
 

  const [locationFetchingerror, setLocationFetchingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const FetchLocations = (data) => {
    setLocationFetchingError(false);
    dispatch(
      FetchAllLocationsViewProfile({
        payload: { id: data },
        callback: (msg, data, recall) => {
          if (msg === 'error') {
            toast.error(typeof data === 'string' ? data : 'Something went wrong', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLocationFetchingError(true);
          }
          recall();
          setIsLoading(true);
        },
      })
    );
  };

  useEffect(() => {
    FetchLocations(userid);
  }, []);

  return (
    <Grid container spacing={2}>
      {locations.map((location, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
          <Card sx={{ maxWidth: 500, backgroundColor: '#f2f2f2' }}>
            {isLoading ? (
              <>
                <img width="100%" height="200" src={location.photo} alt={location.name} style={{ zIndex: -100 }} />
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
              </>
            ) : (
              <Skeleton variant="rectangular" width={400} height={400} />
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
