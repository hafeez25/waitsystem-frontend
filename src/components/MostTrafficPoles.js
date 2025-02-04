import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TrafficLocationsUI from './TrafficLocationsUI';
import { FetchAllPoles } from '../redux/PolesReducer';
import Iconify from './Iconify';

export default function MostTrafficPoles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let poles = useSelector(({ pole }) => pole.poles);

  if (poles != null) {
    poles = poles
      .slice()
      .sort((a, b) => parseInt(b.serialno, 10) - parseInt(a.serialno, 10))
      .slice(0, 5);
  }

  console.log(poles);

  const getBgcolor = (index) => {
    switch (index) {
      case 1:
        return '#FFD700AA';
      case 2:
        return '#C0C0C0AA';
      case 3:
        return '#CD7F32AA';
      case 4:
        return '#D1E9FC';
      case 5:
        return '#D1E9FC';
      default:
        return '#D1E9FC';
    }
  };

  useEffect(() => {
    if (!poles || !poles.length) {
      dispatch(
        FetchAllPoles({
          callback: (msg, data, recall) => {
            recall();
          },
        })
      );
    }
  }, []);

  if (!poles || !poles.length) return null;

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Card sx={{ width: '100%', borderRadius: '4px' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ backgroundColor: '#19232e' }}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" noWrap textAlign={'center'}>
                    Serial No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" textAlign={'center'}>
                    Latitude
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" textAlign={'center'}>
                    Longitude
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" textAlign={'center'}>
                    Location
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {poles.map((pole, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/dashboard/pole/${pole._id}`)}
                >
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle3" textTransform={'capitalize'}>
                      #{pole.serialno}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle3" textTransform={'capitalize'}>
                      {pole.latitude}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle3" textTransform={'capitalize'}>
                      {pole.longitude}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle3" width={'100%'} textTransform={'capitalize'}>
                      {pole.location?.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  );
}
