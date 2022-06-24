import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Box,
  Grid,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Switch,
  Avatar,
  Input,
} from '@mui/material';
// component
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import { MakeRequest } from '../../../utils/ApiManager';
import { profileRoutes } from '../../../utils/Constants';

// reducers
// import { Login } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const authData = useSelector(({ auth }) => auth);
  const [profile, setProfile] = useState(authData.user.photo);

  const account = {
    profilePhoto: authData.user.photo,
    displayName: authData.user.name,
    email: authData.user.email,
    twofactor: authData.user.twofactorEnabled,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      photo: account.profilePhoto,
      name: account.displayName,
      email: account.email,
      location: '',
      twofactor: account.twofactor,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values, actions) => {
      // console.log(values,actions)
      // dispatch(
      //   Login({
      //     payload: values,
      //     callback: (msg, data, recall) => {
      //       console.log(data);
      //       if (msg === 'error' || data.error) {
      //         setSubmitting(false);
      //         toast.error(typeof data === 'string' ? data : 'Something went wrong', {
      //           position: 'top-right',
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //         });
      //       } else if (data && data.data && data.data.twofactorEnabled) {
      //         toast.success('OTP has been sent to your email', {
      //           position: 'top-right',
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //         });
      //         navigate('/twofactorotp', { replace: false, state: { email: values.email, password: values.password } });
      //       }
      //       recall();
      //     },
      // })
      // );
    },
  });
  // const [checked, setChecked] = useState(account.twofactor);
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  const [photoState, setPhotoState] = useState(null);
  const UploadFile = async (e) => {
    setPhotoState(e.target.files[0]);
    const resp = await MakeRequest(
      'FILE',
      {
        url: profileRoutes.image,
        file: e.target.files[0],
      },
      null
    );
    console.log(resp);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
              sx={{
                minWidth: 150,
                maxWidth: 600,
              }}
            >
              <Stack spacing={3} direction="column" justifyContent="center" alignItems="center" sx={{ my: 4 }}>
                <Avatar
                  src={!photoState ? account.profilePhoto : URL.createObjectURL(photoState)}
                  alt={account.displayName}
                  sx={{ width: 150, height: 150 }}
                />
                <label htmlFor="profile-pic">
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="profile-pic"
                    multiple
                    type="file"
                    onChange={UploadFile}
                  />
                  <Button variant="contained" component="span">
                    Change Photo
                  </Button>
                </label>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Box
              sx={{
                minWidth: 150,
                maxWidth: 600,
              }}
            >
              <Stack spacing={3} alignItems="flex-start">
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  disabled
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Office Location"
                  {...getFieldProps('location')}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />
                <FormControlLabel
                  control={<Switch {...getFieldProps('twofactor')} checked={values.twofactor} />}
                  label="Two-factor Authentication"
                  labelPlacement="start"
                />
              </Stack>

              <Stack direction="column" alignItems="flex-end" sx={{ my: 4 }}>
                <Button
                  sx={{ maxWidth: 170 }}
                  startIcon={<Iconify icon="fa-solid:save" />}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
