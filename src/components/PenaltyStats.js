import {  Grid } from '@mui/material';
import  PenaltyStatsUI  from './PenaltyStatsUI';


export default function PenaltyStats(){
  const past7Days=[...Array(7).keys()].map(index =>{
           const date = new Date();
           date.setDate(date.getDate()-index);
           return date.toDateString().slice(4);
  });
 
    return (
      <Grid item xs={12} md={6} lg={8}>
            <PenaltyStatsUI
              title="Penalties"
              subheader="(+43%) than last Week"
              chartData={[
                { label:  past7Days[0], value: 400 },
                { label:  past7Days[1], value: 430 },
                { label: past7Days[2], value: 470 },
                { label: past7Days[3], value: 557 },
                { label: past7Days[4], value: 600 },
                { label: past7Days[5], value: 650 },
                { label: past7Days[6], value: 790 },
              ]}
            />
          </Grid>

      );
}