import {
  Grid,
  Card,
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrafficLocationsUI from './TrafficLocationsUI';
import { FetchHighTrafficPlaces } from '../redux/locationReducer';

export default function HighTrafficLocations() {
  const dispatch = useDispatch();
  const places = useSelector(({ location }) => location.highTrafficPlaces);
  const navigate = useNavigate();

  useEffect(() => {
    if (!places || !places.length) {
      dispatch(
        FetchHighTrafficPlaces({
          callback: (msg, data, recall) => {
            if (msg === 'error') {
              console.log(msg, data);
              toast.error(typeof data === 'string' ? data : 'Error in fetching top five locations', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              recall();
            }
          },
        })
      );
    }
  }, []);

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

  if (!places || !places.length) return null;
  return (
    <Grid container spacing={2} sx={{ mt: 8, display: 'flex', justifyContent: 'space-around' }}>
      <Card sx={{ width: '100%', borderRadius: '4px' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ backgroundColor: '#19232e', borderRadius: '4px' }}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" noWrap fontWeight="bold">
                    Serial No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    District
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Vehicles Count
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Pincode
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places.map((place, index) => (
                <TableRow
                  hover
                  key={place._id}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 'normal',
                  }}
                  onClick={() => navigate(`/dashboard/location/${place._id}`)}
                >
                  <TableCell>
                    <Typography variant="subtitle3" sx={{ textTransform: 'capitalize' }}>
                      {place.name ? place.name : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle3" sx={{ textTransform: 'capitalize' }}>
                      {place.district ? place.district : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle3" sx={{ textTransform: 'capitalize' }}>
                      {place.vehiclesPassed || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle3" sx={{ textTransform: 'capitalize' }}>
                      {place.pincode || '-'}
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
