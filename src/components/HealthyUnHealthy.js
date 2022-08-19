import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HealthyUnHealthyUI from './HealthyUnHealthyUI';
import { FetchAllPoles } from '../redux/PolesReducer';

export default function HealthyUnHealthy() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const poles = useSelector(({ pole }) => pole.poles);

  let healthyPoles = 0;
  const unhealthyPoles = poles == null ? 0 : poles.length - healthyPoles;
  if (poles != null) {
    poles.forEach((pole) => {
      if (pole.healthStatus === '1') {
        healthyPoles += 1;
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
    <Grid item xs={12} md={6} lg={4}>
      <HealthyUnHealthyUI
        title="Healthy Unhealty Poles"
        chartData={[
          { label: 'Healthy', value: healthyPoles },
          { label: 'Unhealthy', value: unhealthyPoles },
        ]}
        chartColors={[theme.palette.chart.blue[0], theme.palette.chart.yellow[0]]}
      />
    </Grid>
  );
}
