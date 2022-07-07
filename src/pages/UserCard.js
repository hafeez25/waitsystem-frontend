import React from 'react';
import {Grid,Card,Avatar,CardHeader,CardActions,Button} from '@mui/material';
import Page from '../components/Page';


export const UserCard = () => {
  return (
    <Page title="User Card">
      <Grid container spacing={3}>
        <Grid item md={4}>
      <Card sx={{backgroundColor:'#D1E9FC'}}>
        <CardHeader avatar = {<Avatar sx={{height: '100px', width: '100px', marginBottom:'20px'}} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" alt="UserPhoto"/>}title="Sagar Gupta (Admin)" subheader="Roorkee, Uttrakhand"/>
        <CardActions>
        <Button size="medium" color="primary" sx={{marginLeft:"9rem"}}>
          View Profile
        </Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item md={4}>
      <Card sx={{backgroundColor:'#D1E9FC'}}>
        <CardHeader avatar = {<Avatar sx={{height: '100px', width: '100px', marginBottom:'20px'}} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" alt="UserPhoto"/>}title="Sagar Gupta" subheader="Dehradun, Uttrakhand"/>
        <CardActions>
        <Button size="medium" color="primary" sx={{marginLeft:"9rem"}}>
          View Profile
        </Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item md={4}>
      <Card sx={{backgroundColor:'#D1E9FC'}}>
        <CardHeader avatar = {<Avatar sx={{height: '100px', width: '100px', marginBottom:'20px'}} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" alt="UserPhoto"/>}title="Sagar Sharma" subheader="Gwalior, Madhya Pradesh"/>
        <CardActions>
        <Button size="medium" color="primary" sx={{marginLeft:"9rem"}}>
          View Profile
        </Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item md={4}>
      <Card sx={{backgroundColor:'#D1E9FC'}}>
        <CardHeader avatar = {<Avatar sx={{height: '100px', width: '100px', marginBottom:'20px'}} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" alt="UserPhoto"/>}title="Sagar Mishra" subheader="Roorkee, Uttrakhand"/>
        <CardActions>
        <Button size="medium" color="primary" sx={{marginLeft:"9rem"}}>
          View Profile
        </Button>
      </CardActions>
      </Card>
      </Grid>
      </Grid>
    </Page>
  )
}
