import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HighTrafficLocations from '../components/HighTrafficLocations';
import PenaltyStats from '../components/PenaltyStats';
import HealthyUnHealthy from '../components/HealthyUnHealthy';
import WeeklyVechilesPassed from '../components/WeeklyVechilesPassed';
import MostTrafficPoles from '../components/MostTrafficPoles';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
          </Typography>  */}

        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12} sm={12} md={12}>
            <Card sx={{ p: 4, width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}>
              <Typography sx={{ mb: 3, ml: 2 }} variant="h4">
                Top 5 High Traffic Locations
              </Typography>
              <HighTrafficLocations />
            </Card>
          </Grid>
          <Grid container spacing={2} item xs={12} sm={12} md={12}>
            <Card sx={{ p: 4, width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}>
              <Typography sx={{ mb: 3, ml: 2 }} variant="h4">
                Top 5 Traffic Poles
              </Typography>
              <MostTrafficPoles />
            </Card>
          </Grid>
          <PenaltyStats />
          <HealthyUnHealthy />
          <WeeklyVechilesPassed />
        </Grid>
      </Container>
    </Page>
  );
}
