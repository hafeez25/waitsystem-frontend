import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  Tab,
  Tabs,
  Box,
  Divider,
  Link,
  Skeleton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FetchProfileInfoViewProfile } from '../redux/ProfileReducer';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';
import ViewProfile1 from '../components/ViewProfile1';
import ViewProfile2 from '../components/ViewProfile2';
import ViewProfile3 from '../components/ViewProfile3';

export default function ViewProfile() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { userid } = useParams();

  const profileInfo = useSelector(({ profile }) => profile.profileInfo);

  const [profileFetchingerror, setProfileFetchingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const FetchProfile = (data) => {
    setProfileFetchingError(false);
    dispatch(
      FetchProfileInfoViewProfile({
        payload: { id: data },
        callback: (msg, data, recall) => {
          if (msg === 'error') {
            toast.error(typeof data === 'string' ? data : 'Something went wrong', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setProfileFetchingError(true);
          }
          recall();
          setIsLoading(true);
        },
      })
    );
  };

  useEffect(() => {
    FetchProfile(userid);
  }, []);

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Profile">
      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Your Profile
          </Typography>
        </Stack> */}

        {mdUp && (
          <Card sx={{ mt: 4, mb: 2 }}>
            <img
              src="https://wallpaperaccess.com/full/3659764.jpg"
              alt="Profile Cover"
              style={{ width: '100%', height: 200, zIndex: -100, opacity: 0.5 }}
            />
            {isLoading ? (
              <Avatar
                src={profileInfo.photo}
                alt={profileInfo.name}
                sx={{
                  width: 130,
                  height: 130,
                  ml: 10,
                  mt: -13,
                  position: 'absolute',
                  border: 2.5,
                  borderColor: 'white',
                  zIndex: 1,
                }}
              />
            ) : (
              <Skeleton
                variant="circular"
                sx={{
                  width: 130,
                  height: 130,
                  ml: 10,
                  mt: -13,
                  position: 'absolute',
                  border: 2.5,
                  borderColor: 'white',
                  zIndex: 1,
                }}
              />
            )}

            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              sx={{
                width: '100%',
                typography: 'body1',
                mx: -4.5,
                my: 0,
                zIndex: -1,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AccountCircleIcon />}
                      iconPosition="start"
                      label="Profile"
                      value="1"
                    />
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AddToQueueIcon />}
                      iconPosition="start"
                      label="Poles"
                      value="2"
                    />
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AddLocationAltIcon />}
                      iconPosition="start"
                      label="Locations"
                      value="3"
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Stack>
          </Card>
        )}
        {!mdUp && (
          <Card
            sx={{ mt: 1, mb: 2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <img
              src="https://wallpaperaccess.com/full/3659764.jpg"
              alt="Profile Cover "
              style={{ width: '100%', height: 200, zIndex: -100, opacity: 0.5 }}
            />
            {isLoading ? (
              <Avatar
                src={profileInfo.photo}
                alt={profileInfo.name}
                sx={{
                  width: 130,
                  height: 130,
                  position: 'absolute',
                  mt: -7,
                  border: 2.5,
                  borderColor: 'white',
                  zIndex: 1,
                }}
              />
            ) : (
              <Skeleton
                variant="circular"
                sx={{
                  width: 130,
                  height: 130,
                  position: 'absolute',
                  mt: -7,
                  border: 2.5,
                  borderColor: 'white',
                  zIndex: 1,
                }}
              />
            )}

            <Stack
              flexDirection="row"
              justifyContent="center"
              sx={{
                width: '100%',
                typography: 'body1',
                mt: 0,
                mb: 0,
                zIndex: -1,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AccountCircleIcon />}
                      iconPosition="start"
                      label="Profile"
                      value="1"
                    />
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AddToQueueIcon />}
                      iconPosition="start"
                      label="Poles"
                      value="2"
                    />
                    <Tab
                      sx={{ mt: -1, mb: -1.5 }}
                      icon={<AddLocationAltIcon />}
                      iconPosition="start"
                      label="Locations"
                      value="3"
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Stack>
          </Card>
        )}
        <Divider />
        <Card sx={{ my: 2, minWidth: 200, maxWidth: 700, px: 1 }}>
          <TabContext value={value}>
            <TabPanel value="1">
              <ViewProfile1 />
            </TabPanel>
          </TabContext>
        </Card>
        <Card sx={{ my: -2, minWidth: 200, px: 1 }}>
          <TabContext value={value}>
            <TabPanel value="2">
              <ViewProfile2 />
            </TabPanel>
          </TabContext>
        </Card>
        <Card sx={{ my: 2, minWidth: 200, px: 1 }}>
          <TabContext value={value}>
            <TabPanel value="3">
              <ViewProfile3 />
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
