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
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            width="100%"
            height="auto"
            image="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/133940571/900"
            alt="green parrot"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            width="100%"
            height="auto"
            image="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/133940571/900"
            alt="green parrot"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            width="100%"
            height="auto"
            image="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/133940571/900"
            alt="green parrot"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            width="100%"
            height="auto"
            image="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/133940571/900"
            alt="green parrot"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
