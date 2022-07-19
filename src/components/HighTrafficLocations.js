 
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  TrafficLocationsUI  from './TrafficLocationsUI';
import {FetchHighTrafficPLaces } from '../redux/locationReducer';
 

export default function HighTrafficLocations() {
 
 const dispatch = useDispatch();
 const places = useSelector(({ location }) => location.highTrafficPlaces);
 

 useEffect(() => {
    if (!places || !places.length) {
      dispatch(
        FetchHighTrafficPLaces({
          callback: (msg, data, recall) => {
            recall();
          },
        })
      );
    }
  }, []);

  return (
    <>
    <Grid container spacing={3}>
     {  
       places.map((place,idx)=>
         <Grid item xs={12} sm={6} md={3} key={idx}>
          <TrafficLocationsUI 
          title={place.name}
          subtitle1={place.district}
          subtitle2={place.pincode}
           total={place.vehiclesPassed} 
           icon={place.photo} />
         </Grid>   
       )
     }
          
    </Grid>
    </>

  );
}

 