import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import { Card, Stack, Avatar, Button, Container, Typography, Tab, Box, Divider, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';

export default function ViewProfile() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const authData = useSelector(({ auth }) => auth);

  const account = {
    profilePhoto: authData.user.photo,
    displayName: authData.user.name,
    email: authData.user.email,
    twofactor: authData.user.twoFactorEnabled,
  };

  const mailLink = `mailto:${account.email}`;

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

        {smUp && (
          <Card sx={{ mt: 4, mb: 2 }}>
            <img
              src="https://wallpaperaccess.com/full/3659764.jpg"
              alt="Profile Cover"
              style={{ width: '100%', height: 200, zIndex: -100, opacity: 0.5 }}
            />

            <Avatar
              src={account.profilePhoto}
              alt={account.displayName}
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

            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              sx={{
                width: '100%',
                typography: 'body1',
                mx: -4.5,
                mt: -1,
                mb: 0,
                zIndex: -1,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab
                      sx={{ mb: -1.5 }}
                      icon={<AccountCircleIcon />}
                      iconPosition="start"
                      label="Profile"
                      value="1"
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Stack>
          </Card>
        )}
        {!smUp && (
          <Card
            sx={{ mt: 1, mb: 2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <img
              src="https://wallpaperaccess.com/full/3659764.jpg"
              alt="Profile Cover "
              style={{ width: '100%', height: 200, zIndex: -100, opacity: 0.5 }}
            />

            <Avatar
              src={account.profilePhoto}
              alt={account.displayName}
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

            <Stack
              flexDirection="row"
              justifyContent="center"
              sx={{
                width: '100%',
                typography: 'body1',
                mt: -1,
                mb: 0,
                zIndex: -1,
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab
                      sx={{ mb: -1.5 }}
                      icon={<AccountCircleIcon />}
                      iconPosition="start"
                      label="Profile"
                      value="1"
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
              <Typography sx={{ ml: -0.5, mb: 2 }} variant="h4">
                About
              </Typography>
              <Stack spacing={2} direction="column" alignItems="flex-start" justifyContent="flex-end" my={2}>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start">
                  <Iconify icon="carbon:user-avatar-filled" style={{ fontSize: '24' }} />
                  <Typography variant="body1">
                    <b>{account.displayName}</b>
                  </Typography>
                </Stack>
                <Stack spacing={2.7} direction="row" alignItems="center" justifyContent="space-around">
                  <Iconify sx={{ ml: 0.3 }} icon="eos-icons:role-binding" style={{ fontSize: '24' }} />
                  <Typography variant="body1">
                    <b>Admin</b>
                  </Typography>
                </Stack>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-around">
                  <Iconify icon="clarity:email-solid" style={{ fontSize: '24' }} />

                  <Link
                    href={mailLink}
                    underline="hover"
                    variant="body1"
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                  >
                    <b>{account.email}</b>
                  </Link>
                </Stack>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-around">
                  <Iconify icon="ci:location" style={{ fontSize: '24' }} />
                  <Typography variant="body1">
                    Office at <b>Roorkee</b>
                  </Typography>
                </Stack>
              </Stack>
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
