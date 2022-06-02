import { Link as RouterLink } from 'react-router-dom';
// @mui
import GoogleMapReact from 'google-map-react';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Page404() {
  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  return (
    <Page title="Realtime Map">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAd1gCmyfr8mAbDmHj09b6bhe4lEB_qffw' }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact>
          </div>
          {/* <Typography variant="h3" paragraph>
            Realtime Map
          </Typography>

          <div>
            <iframe
              title="Realtime Map"
              width="100%"
              height="600"
              // frameborder="0"
              scrolling="no"
              // marginheight="0"
              // marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/wearable-gps/">adventure gps</a>
            </iframe>
          </div> */}

          {/* <Typography variant="h3" paragraph>
            chalbe
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button> */}
        </ContentStyle>
      </Container>
    </Page>
  );
}
