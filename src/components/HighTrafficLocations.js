 
import { Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import  TrafficLocationsUI  from './TrafficLocationsUI';
import {FetchHighTrafficPlaces } from '../redux/locationReducer';
 

export default function HighTrafficLocations() {
 
 const dispatch = useDispatch();
 const places = useSelector(({ location }) => location.highTrafficPlaces);
 

 useEffect(() => {
    if (!places || !places.length) {
      dispatch(
        FetchHighTrafficPlaces({
          callback: (msg, data, recall) => {
            if (msg === 'error') {
              console.log(msg,data);
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

 
  return (

     <Stack direction="column" justifyContent="center" alignItems="space-evenly" spacing={4}>
       <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
        <TrafficLocationsUI 
          title={places[0].name}
          subtitle1={places[0].district}
          subtitle2={places[0].pincode}
           total={places[0].vehiclesPassed} 
           icon={places[0].photo} />
          
           <TrafficLocationsUI 
            title={places[1].name}
            subtitle1={places[1].district}
            subtitle2={places[1].pincode}
            total={places[1].vehiclesPassed} 
            icon={places[1].photo} />

            <TrafficLocationsUI 
            title={places[2].name}
            subtitle1={places[2].district}
            subtitle2={places[2].pincode}
            total={places[2].vehiclesPassed} 
            icon={places[2].photo} />

       </Stack>

       <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>

            <TrafficLocationsUI 
            title={places[3].name}
            subtitle1={places[3].district}
            subtitle2={places[3].pincode}
            total={places[3].vehiclesPassed} 
            icon={places[3].photo} />

            <TrafficLocationsUI 
            title={places[4].name}
            subtitle1={places[4].district}
            subtitle2={places[4].pincode}
            total={places[4].vehiclesPassed} 
            icon={places[4].photo} />

       </Stack>

     </Stack>

    


  );
}

 