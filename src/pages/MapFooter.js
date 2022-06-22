import GoogleMapReact from 'google-map-react';
import {Box, Container, Grid, Typography,Card, CardContent, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Page from '../components/Page';

import { FetchPoleAnalytics } from '../redux/PolesReducer';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapFooter() {

  const theme = useTheme();
  const dispatch = useDispatch()
  const {poleid} = useParams()

  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  useEffect(()=>{
    if(poleid && poleid.length === 24){
      dispatch(FetchPoleAnalytics({
        payload: {poleid},
        callback: (msg, data, recall) => {
          console.log(data)
          if (msg === 'error') {
            toast.error(typeof data === 'string' ? data : 'Error in fetching pole analytics', {
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
      }))
    }
  },[poleid])

  return (
    <Page title="Pole Analytics">
      <Container maxWidth="xl">
        <Card sx={{ boxShadow: 0, backgroundColor:'#F9FAFB'}}>
          <Card sx={{ boxShadow: 0, backgroundColor:'#F9FAFB'}}>
            {/* <CardContent sx={{padding:'0'}}> */}
              <Typography variant="h4" mt={0} ml={3}>
                Pole Analytics
              </Typography>
              {/* <IconButton sx={{paddingLeft:'1.2rem'}} disableFocusRipple>
                <ArrowBackIcon disableFocusRipple p={0}/>
              </IconButton> */}
            {/* </CardContent> */}
          </Card>
          <Grid container spacing={3} >
            <Grid item xs={12} md={4} mt={3}>
              <Card sx={{height:'50vh', backgroundColor:'#D1E9FC'
              }}>
                <CardContent >
                  <Typography variant='h4' component='div' textAlign="center"  gutterBottom>
                    Pole Details
                  </Typography>
                  <Box mt={2}>
                  <Typography component='div' variant="h6"  gutterBottom>
                    Serial no. - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>33467</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Cars passed in past 24 hours - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>21</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Pole added by - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem', overflow:'hidden',textOverflow:'ellipsis'}}>sagar</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Pole last updated - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>12 hours ago</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Pole Latitude - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>36.2</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Pole longitude - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>21.2</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom>
                    Pole location - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>Rajeev Bhawan IIT Roorkee</span>
                  </Typography>
                  </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center" mt={3}>
          <Card sx={{height:'50vh' , backgroundColor:'#FFF7CD'
        }}>
              <CardContent >
                <Typography variant='h4' component='div' gutterBottom>
                  Battery Status
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center" mt={3}>
          <Card sx={{height:'50vh', backgroundColor:'#FFE7D9'}}>
              <CardContent > 
                 <Typography variant='h4' component='div' gutterBottom>
                  Health Status
                </Typography>
                {/* <Grid item xs={12} md={6} lg={4}> */}
            {/* <AppCurrentVisits 
            // sx={{padding:'0px', marginTop:'0px'}}
              title="Health status"
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
            /> */}
          {/* </Grid> */}
              </CardContent>
            </Card>
          </Grid>
      </Grid>

      <Card sx={{
        height: '40vh',
        width: '100%',
        marginTop:'3%',
        borderRadius:'10px',
      }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAd1gCmyfr8mAbDmHj09b6bhe4lEB_qffw' }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
      
      </Card>
      </Card>
      </Container>
    </Page>
  );
}


