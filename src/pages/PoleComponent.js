import { Grid, Typography,Card, Avatar, CardContent, Box } from '@mui/material'
import { breakpoints, Container } from '@mui/system'
import { useState,useEffect } from 'react'
import Masonry from 'react-masonry-css'




function PoleComponent() {
  const [poles,setPoles]= useState([])

  const breakpoints={
    default:3,
    1250:2,
    1200:3,
    1100:2,
    700:1
  }

  useEffect(()=>{
    fetch("https://amptechapi.herokuapp.com/service/search?text=o")
    .then(response => response.json())
    .then(data => setPoles(data.data.poles))
  },[])

  return (
    <div>
      <Container>
        <Typography variant="h5" sx={{color:'#0a97b7', marginBottom:5}}>
          Poles({poles.length})
        </Typography>

         
         <Masonry
           breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column" 
          >
            {poles.map((pole) =>
              (<div id={pole.id}>
              <Card sx={
                {
                display:'flex',
                justifyContent:'space-evenly',
                alignItems:'center',
                backgroundColor:"#ccffcc"
                 }}>
                {/* <Avatar sx={{ bgcolor: '#0a97b7', marginLeft:7, height:60,width:60}} > {pole.serialno}</Avatar> */}
                <Card sx={{
                  position:"relative",
                  height: 90,
                        width:90,
                        overflow:'visible',
                        borderRadius: "50%" ,
                  }}>
                  <Box
                      component="img"
                      sx={{
                        height: 90,
                        width:90,
                        margin:"auto",
                        borderRadius: "50%" ,
                      }}
                      alt="location"
                      src={pole.location.photo}
                    />
                    <Avatar alt="user" src={pole.addedBy.photo} sx={{
                        position:"absolute", 
                        right:"-10%"  ,
                        bottom:"-10%",
                        borderRadius: "50%" ,
                         
                     }}/>
                  </Card>
                  
                  
                 <CardContent sx={{maxWidth:300}}>
                 <Typography>SerialNo :  {pole.serialno}</Typography>
                  <Typography>Latitude :  {pole.latitude}</Typography>
                  <Typography>Longitude :  {pole.longitude}</Typography>
                  <Typography>Location :  {pole.location.name}</Typography>
                  <Typography>Added-By :  {pole.addedBy.name}</Typography>
                 </CardContent>
        
              </Card>
              </div>))
            }
            
         </Masonry>

      </Container>
    </div>
  )
}

export default PoleComponent