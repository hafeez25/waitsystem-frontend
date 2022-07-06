import { useState, useEffect } from 'react';
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

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FetchProfileInfoViewProfile } from '../redux/ProfileReducer';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from './Iconify';

export default function ViewProfile1() {
  const dispatch = useDispatch();
  const { userid } = useParams();

  const profileInfo = useSelector(({ profile }) => profile.profileInfo[userid]);

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

  // useEffect(() => {
  //   FetchProfile(userid);
  // }, []);

  const mailLink = `mailto:${profileInfo?.email}`;
  return (
    <>
      <Typography sx={{ ml: -0.5, mb: 2 }} variant="h4">
        About
      </Typography>
      <Stack spacing={2} direction="column" alignItems="flex-start" justifyContent="flex-end" my={2}>
        {profileInfo ? (
          <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-start">
            <Iconify icon="carbon:user-avatar-filled" style={{ fontSize: '24' }} />
            <Typography variant="body1">
              <b>{profileInfo.name}</b>
            </Typography>
          </Stack>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}
        {profileInfo ? (
          <Stack spacing={2.7} direction="row" alignItems="center" justifyContent="space-around">
            <Iconify sx={{ ml: 0.3 }} icon="eos-icons:role-binding" style={{ fontSize: '24' }} />
            <Typography variant="body1">
              <b>{profileInfo.isSuperUser ? 'Admin' : 'General User'}</b>
            </Typography>
          </Stack>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}
        {profileInfo ? (
          <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-around">
            <Iconify icon="clarity:email-solid" style={{ fontSize: '24' }} />
            <Link href={mailLink} underline="hover" variant="body1" color="inherit" target="_blank" rel="noopener">
              <b>{profileInfo.email}</b>
            </Link>
          </Stack>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}
        {profileInfo ? (
          <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-around">
            <Iconify icon="ci:location" style={{ fontSize: '24' }} />
            <Typography variant="body1">
              Office at <b>{profileInfo.location}</b>
            </Typography>
          </Stack>
        ) : (
          <Skeleton variant="text" width="80%" />
        )}
      </Stack>
    </>
  );
}
