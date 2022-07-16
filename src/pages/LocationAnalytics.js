import GoogleMapReact from 'google-map-react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { AppCurrentVisits } from '../sections/@dashboard/app';
import Page from '../components/Page';
import { FetchLocation, FetchLocationAnalytics, FetchPolesOfLocation } from '../redux/locationReducer';
import Error from './Error';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LocationAnalytics() {
  const theme = useTheme();
  const navigate = useNavigate();
  const DEFAULT_IMAGE =
    'https://media.istockphoto.com/vectors/city-urban-streets-roads-abstract-map-vector-id1137117479?k=20&m=1137117479&s=612x612&w=0&h=56n_1vX4IdhkyNZ0Xj6NfSPA0jZSwf6Ru2K68udk4H4=';

  const { locationid } = useParams();
  const dispatch = useDispatch();

  const location = useSelector(({ location }) => location.analytics[locationid]);

  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const [Fetchingerror, setFetchingerror] = useState(false);

  useEffect(() => {
    if (locationid && locationid.length === 24) {
      dispatch(
        FetchLocation({
          payload: { id: locationid },
          callback: (msg, data, recall) => {
            console.log(msg, data);
            if (msg === 'error') {
              setFetchingerror(true);
              toast.error(typeof data === 'string' ? data : 'Error in fetching location analytics', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              dispatch(FetchLocationAnalytics({ payload: { id: locationid } }));
              dispatch(FetchPolesOfLocation({ payload: { id: locationid } }));
              recall();
            }
          },
        })
      );
    } else {
      setFetchingerror(true);
    }
  }, [locationid]);

  if (Fetchingerror) {
    return <Error />;
  }

  if (!location)
    return (
      <center style={{ marginTop: '180px' }}>
        <CircularProgress size={20} />
      </center>
    );

  return (
    <Page title="Location Analytics">
      <Container maxWidth="xl">
        <Card sx={{ boxShadow: 0, backgroundColor: '#F9FAFB' }}>
          <Card sx={{ boxShadow: 0, backgroundColor: '#F9FAFB' }}>
            <Typography variant="h4" mt={0} mb={3} ml={3}>
              Location Analytics
            </Typography>
          </Card>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={12} md={8} lg={8} xl={8}>
              <Card sx={{ backgroundColor: '#D1E9FC' }} className="location_details_card">
                <Box sx={{ display: 'flex', flexDirection: 'row' }} className="location_details_cardbox">
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      Location Details
                    </Typography>
                    <Box mt={2}>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        Place Name -<span style={{ fontWeight: 'normal', marginLeft: '1rem' }}>{location.name}</span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        State -<span style={{ fontWeight: 'normal', marginLeft: '1rem' }}>{location.state}</span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        District -
                        <span
                          style={{
                            fontWeight: 'normal',
                            marginLeft: '1rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {location.district}
                        </span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        Pincode -<span style={{ fontWeight: 'normal', marginLeft: '1rem' }}>{location.pincode}</span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        No of poles installed -
                        <span style={{ fontWeight: 'normal', marginLeft: '1rem' }}>
                          {Number.isNaN(location.poles?.length) ? '...' : location.poles?.length}
                        </span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        Total vehicles passed -
                        <span style={{ fontWeight: 'normal', marginLeft: '1rem' }}>
                          {Number.isNaN(location.analytics?.totalVehicles) ? '...' : location.analytics?.totalVehicles}
                        </span>
                      </Typography>
                      <Typography component="div" variant="h6" gutterBottom className="fixFont">
                        Place added by -
                        <span
                          role="button"
                          aria-hidden="true"
                          tabIndex={0}
                          style={{
                            fontWeight: 'normal',
                            marginLeft: '1rem',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                          onClick={() => navigate(`/view-profile/${location.addedBy._id}`)}
                        >
                          {location.addedBy.name}
                        </span>
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box
                    component="img"
                    sx={{
                      position: 'relative',
                      width: '40%',
                      height: '40%',
                      top: '0',
                      marginTop: '10%',
                      marginLeft: '15%',
                      borderRadius: '3px',
                      left: '0',
                    }}
                    alt="The house from the offer."
                    onError={(e) => {
                      e.src = DEFAULT_IMAGE;
                    }}
                    src={location.photo}
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} textAlign="center">
              <Card>
                <CardContent>
                  {location.poles?.length > 0 ? (
                    <AppCurrentVisits
                      title="Vehicles Passed"
                      chartData={[
                        { label: 'America', value: 4344 },
                        { label: 'Asia', value: 5435 },
                        { label: 'Europe', value: 1443 },
                        { label: 'Africa', value: 4443 },
                      ]}
                      chartColors={[
                        theme.palette.primary.main,
                        theme.palette.chart.blue[0],
                        theme.palette.chart.violet[0],
                        theme.palette.chart.yellow[0],
                      ]}
                    />
                  ) : (
                    <Stack direction="column" spacing={6} justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" component="div">
                        Sorry, No Data to Show!
                      </Typography>
                      <img alt="nodata" src="/static/illustrations/illustration_nodata.jpg" />
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card
            sx={{
              height: '40vh',
              width: '100%',
              marginTop: '3%',
              borderRadius: '10px',
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAd1gCmyfr8mAbDmHj09b6bhe4lEB_qffw' }}
              defaultCenter={[56.2, 36.1]}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent lat={25.2} lng={36.2} text="My Marker" />
            </GoogleMapReact>
          </Card>
        </Card>
      </Container>
    </Page>
  );
}
