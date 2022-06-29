import GoogleMapReact from 'google-map-react';
import {Box, Container, Grid, Typography,Card, CardContent, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import {AppCurrentVisits} from '../sections/@dashboard/app';
import Page from '../components/Page';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LocationAnalytics() {
  
  const theme = useTheme();

  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };


  return (
    <Page title="Location Analytics">
      <Container maxWidth="xl">
        <Card sx={{ boxShadow: 0, backgroundColor:'#F9FAFB'}}>
          <Card sx={{ boxShadow: 0, backgroundColor:'#F9FAFB'}}>
              <Typography variant="h4" mt={0} ml={3}>
                Location Analytics
              </Typography>
              {/* <IconButton sx={{paddingLeft:'1.2rem'}} disableFocusRipple>
                <ArrowBackIcon disableFocusRipple p={0}/>
              </IconButton> */}
            {/* </CardContent> */}
          </Card>
          <Grid container spacing={3} >
            <Grid item xs={12} md={8} mt={3}>
              <Card sx={{height:'350px', backgroundColor:'#D1E9FC'}} className="location_details_card">
               <Box sx={{display: "flex",flexDirection: "row"}} className="location_details_cardbox">
               <CardContent >
                  <Typography variant='h4' component='div' gutterBottom >
                    Location Details
                  </Typography>
                  <Box mt={2}>
                  <Typography component='div' variant="h6"  gutterBottom className='fixFont'>
                    Place Name -  
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>Roorkee</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                     State - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>Uttrakhand</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    District - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem', overflow:'hidden',textOverflow:'ellipsis'}}>Haridwar</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pincode - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>247667</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                     No of poles installed - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>2</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Total vehicles passed -
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>12</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Place added by - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>sagar gupta</span>
                  </Typography>
                  </Box>
              </CardContent>
              <Box
        component="img"
        sx={{
            position: "relative",
            width: "40%",
            height: "40%",
            top: "0",
            marginTop: "10%",
            marginLeft: "15%",
            borderRadius: "3px",
            left: "0",
        }}
        alt="The house from the offer."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
               </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center" mt={3}>
          <Card sx={{height:'350px'}}>
              {/* <CardContent >  */}
                 {/* <Typography variant='h4' component='div' gutterBottom>
                  Pie Chart
                </Typography> */}
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
              {/* </CardContent> */}
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
              defaultCenter={[56.2,36.1]}
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


