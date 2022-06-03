import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Autocomplete,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import AddStates from './AddStates';
import AddDistricts from './AddDistricts';
// reducers
import { Login } from '../../../redux/AuthReducer';
// import data from './statesAndDistricts';

// ----------------------------------------------------------------------

export default function AddNewLocationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(data);

  const AddNewLocationSchema = Yup.object().shape({
    locationName: Yup.string().required('General Name is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const formik = useFormik({
    initialValues: {
      locationName: '',
      state: '',
      district: '',
      pincode: '',
      remember: true,
    },
    validationSchema: AddNewLocationSchema,
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              id="location-name"
              label="General Name"
              type="text"
              variant="standard"
              {...getFieldProps('locationName')}
              error={Boolean(touched.locationName && errors.locationName)}
              helperText={touched.locationName && errors.locationName}
            />
            <AddStates />
            <AddDistricts />

            <TextField
              fullWidth
              margin="dense"
              id="pincode"
              label="Pin Code"
              type="text"
              variant="standard"
              {...getFieldProps('pincode')}
              error={Boolean(touched.pincode && errors.pincode)}
              helperText={touched.pincode && errors.pincode}
            />
          </Stack>
          <Stack spacing={3}>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Register Location
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
