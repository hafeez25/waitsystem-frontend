import GoogleMapReact from 'google-map-react';
import {Box, Container, Grid, Typography,Card, CardContent, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Page from '../components/Page';

import { FetchPoleAnalytics } from '../redux/PolesReducer';




const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function PoleAnalytics() {

  const theme = useTheme();
  const dispatch = useDispatch()
  const {poleid} = useParams()
  const analytics = useSelector(({pole})=>pole.analytics)

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
          console.log(msg,data)
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

  const FormatTime = (date) =>{
    const diff = Math.floor((new Date() - new Date(date))/1000);
    if(diff < 5) return 'Just now'
    if(diff < 60) return `${diff}s ago`
    if(diff < 60*60) return `${Math.floor(diff/60)}m ago`
    if(diff < 3600*24) return `${Math.floor(diff/3600)}h ago`
    if(diff < 3600*24*365) return `${Math.floor(diff/(3600*24))}d ago`
    return `${Math.floor(diff/(3600*24*365))}y ago`
  }

  if(!analytics[poleid] || !analytics[poleid].pole) return null

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
              <Card sx={{height:'350px', backgroundColor:'#D1E9FC'
              }}>
                <CardContent >
                  <Typography variant='h4' component='div' textAlign="center"  gutterBottom >
                    Pole Details
                  </Typography>
                  <Box mt={2}>
                  <Typography component='div' variant="h6"  gutterBottom className='fixFont'>
                    Serial no. - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{analytics[poleid].pole.serialno}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Cars passed in past 24 hours - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{analytics[poleid].data.length}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pole added by - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem', overflow:'hidden',textOverflow:'ellipsis'}}>{analytics[poleid].pole.addedBy.name}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pole last updated - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{FormatTime(analytics[poleid].pole.lastUpdatedAt)}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pole Latitude - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{analytics[poleid].pole.latitude}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pole longitude - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{analytics[poleid].pole.longitude}</span>
                  </Typography>
                  <Typography component='div' variant="h6" gutterBottom className='fixFont'>
                    Pole location - 
                    <span style={{fontWeight:"normal", marginLeft:'1rem'}}>{analytics[poleid].pole.location?.name}</span>
                  </Typography>
                  </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center" mt={3}>
          <Card sx={{height:'350px' , backgroundColor:'#FFF7CD'
        }}>
              <CardContent >
                <Typography variant='h4' component='div' gutterBottom>
                  Battery Status
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center" mt={3}>
          <Card sx={{height:'350px', backgroundColor:'#FFE7D9'}}>
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
              defaultCenter={[analytics[poleid].pole.latitude,analytics[poleid].pole.longitude]}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent lat={analytics[poleid].pole.latitude} lng={analytics[poleid].pole.longitude} text="My Marker" />
      </GoogleMapReact>
      
      </Card>
      </Card>
      </Container>
    </Page>
  );
}


