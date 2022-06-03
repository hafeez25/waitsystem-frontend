import * as Yup from 'yup';
import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Link,
  Stack,
  Divider,
  Grid,
  Checkbox,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddNewLocationDialogBox from '../../../components/AddNewLocationDialogBox';
import Iconify from '../../../components/Iconify';
// reducers
import { Login } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function AddNewPoleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      // console.log(values,actions)
      // dispatch(
      //   Login({
      //     payload: values,
      //     callback: (msg, data, recall) => {
      //       console.log(data);
      //       if (msg === 'error' || data.error) {
      //         setSubmitting(false);
      //         toast.error(data.error || 'Something went wrong', {
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
      //   })
      // );
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <Stack spacing={3}>
            <TextField
              autoFocus
              margin="dense"
              id="standard-basic"
              label="Serial No."
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField margin="dense" id="standard-basic" label="Latitude" type="text" fullWidth variant="standard" />
            <TextField margin="dense" id="standard-basic" label="Longitude" type="text" fullWidth variant="standard" />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
              >
                {/* <Stack
                  sx={{ ml: 3 }}
                  spacing={1}
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                > */}
                <Stack
                  sx={{ ml: 3, mb: 1, mt: 1 }}
                  spacing={5}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <AddNewLocationDialogBox />
                </Stack>
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                {/* </Stack> */}
              </Select>
            </FormControl>
            {/* <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
          </Stack>
          <Stack spacing={3}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Add Pole
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
