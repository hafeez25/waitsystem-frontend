 
import { Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import  TrafficLocationsUI  from './TrafficLocationsUI';
import {FetchHighTrafficPlaces } from '../redux/locationReducer';

 

export default function HighTrafficLocations() {
 
 const dispatch = useDispatch();
 const places = useSelector(({ location }) => location.highTrafficPlaces);
 const navigate= useNavigate();

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

  const getBgcolor= (index)=>{
       switch (index){
        case 1: return "#FFD700AA"
        case 2: return "#C0C0C0AA"
        case 3: return "#CD7F32AA"
        case 4: return "#9194309C"
        case 5: return "#9194309C"
        default: return "#9194309c"
       }
}

   if(!places || !places.length) return null;
  return (
    //   <Typography>ronak</Typography>

<Grid container  spacing={2} sx={{display:"flex" , justifyContent:"space-around"}}>
    {
      places.map((place,index)=>{
        return (
          <Grid item style={{cursor:"pointer"}} xs={12} sm={6} md={4} key={index} >
          <TrafficLocationsUI 
          title={place.name}
          subtitle1={place.district}
          subtitle2={place.pincode}
           total={place.vehiclesPassed} 
           icon={place.photo}
           bgcolor={getBgcolor(index+1)}
           id={place._id}
           color="secondary"/>
           </Grid>
        )
      })
    }
    </Grid>
   

    //  <Stack direction="column" justifyContent="center" alignItems="space-evenly" spacing={4} >
    //    <Stack direction={{ xs: 'column',sm: 'row' }} justifyContent="space-evenly" alignItems="center" spacing={2}>
    //    {places[0] && <TrafficLocationsUI 
    //       title={places[0].name}
    //       subtitle1={places[0].district}
    //       subtitle2={places[0].pincode}
    //        total={places[0].vehiclesPassed} 
    //        icon={places[0].photo}
    //        bgcolor="#FFD700AA"
    //        id={places[0]._id}
    //        color="secondary"/>
    //    }
    //    {places[1] &&
    //        <TrafficLocationsUI 
    //         title={places[1].name}
    //         subtitle1={places[1].district}
    //         subtitle2={places[1].pincode}
    //         total={places[1].vehiclesPassed} 
    //         icon={places[1].photo}
    //         bgcolor="#C0C0C0AA"
    //         id={places[1]._id}
    //          index={1} />
    //    }
    //    {places[2] &&
    //         <TrafficLocationsUI 
    //         title={places[2].name}
    //         subtitle1={places[2].district}
    //         subtitle2={places[2].pincode}
    //         total={places[2].vehiclesPassed} 
    //         icon={places[2].photo}
    //         bgcolor="#CD7F32AA"
    //         id={places[2]._id}
    //          index={2} />
    //    }
    //    </Stack>

    //    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-evenly" alignItems="center" spacing={2}>

    //       {places[3] && 
    //         <TrafficLocationsUI 
    //         title={places[3].name}
    //         subtitle1={places[3].district}
    //         subtitle2={places[3].pincode}
    //         total={places[3].vehiclesPassed} 
    //         icon={places[3].photo} 
    //         bgcolor="#9194309C"
    //         id={places[3]._id}
    //            index={3}
    //         />
    //       }

    //      {places[4] &&
    //         <TrafficLocationsUI 
    //         title={places[4].name}
    //         subtitle1={places[4].district}
    //         subtitle2={places[4].pincode}
    //         total={places[4].vehiclesPassed} 
    //         icon={places[4].photo} 
    //         bgcolor="#9194309c"
    //         id={places[4]._id}
    //            index={4}
    //         />
    //      }
    //    </Stack>

    //  </Stack>

    


  );
}

 