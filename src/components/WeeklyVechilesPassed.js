import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllPoles } from '../redux/PolesReducer';
import PenaltyStatsUI from './PenaltyStatsUI';

export default function PenaltyStats() {
  const past7Days = [...Array(7).keys()].map((index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toDateString().slice(4);
  });

  const dispatch = useDispatch();
  const poles = useSelector(({ pole }) => pole.poles);

  const vechiles = [0, 0, 0, 0, 0, 0, 0];
  if (poles != null) {
    poles.forEach((pole) => {
      for (let i = 0; i < 7; i += 1) {
        vechiles[i] += pole.pastResults[i];
      }
    });
  }

  useEffect(() => {
    if (!poles || !poles.length) {
      dispatch(
        FetchAllPoles({
          callback: (msg, data, recall) => {
            recall();
          },
        })
      );
    }
  }, []);

  return (
    <Grid item xs={12} md={6} lg={8}>
      <PenaltyStatsUI
        title="Vehicles Passed"
        subheader="(+30%) than last Week"
        chartData={[
          { label: past7Days[0], value: vechiles[0] },
          { label: past7Days[1], value: vechiles[1] },
          { label: past7Days[2], value: vechiles[2] },
          { label: past7Days[3], value: vechiles[3] },
          { label: past7Days[4], value: vechiles[4] },
          { label: past7Days[5], value: vechiles[5] },
          { label: past7Days[6], value: vechiles[6] },
        ]}
      />
    </Grid>
  );
}
