import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import Iconify from '../../../components/Iconify';

import { TwoFactor } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function TwofactorOTPForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !location.state.email || !location.state.password) {
      navigate('/login', { replace: true });
    }
  }, [location]);
  const TwofactorOTPSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: TwofactorOTPSchema,
    onSubmit: (values, actions) => {
      // console.log(values,actions)
      values.email = location.state?.email;
      values.password = location.state?.password;
      values.OTP = values.otp;
      dispatch(
        TwoFactor({
          payload: values,
          callback: (msg, data, recall) => {
            if (msg === 'error' || data.error) {
              setSubmitting(false);
              toast.error(data.error || 'Something went wrong', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // show error message data.error or Something went wrong
            }
            recall();
          },
        })
      );
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="OTP"
            {...getFieldProps('otp')}
            error={Boolean(touched.otp && errors.otp)}
            helperText={touched.otp && errors.otp}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Continue {'>'}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
