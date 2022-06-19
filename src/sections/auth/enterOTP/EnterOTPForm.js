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
import Iconify from '../../../components/Iconify';

import { ChangePassword } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function EnterOTPForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !location.state.email) {
      navigate('/forgotpassword', { replace: true });
    }
  }, [location]);
  const EnterOTPSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: EnterOTPSchema,
    onSubmit: (values, actions) => {
      // console.log(values,actions)
      values.email = location.state?.email;
      values.OTP = values.otp;
      dispatch(
        ChangePassword({
          payload: values,
          callback: (msg, data, recall) => {
            if (msg === 'error' || data.error) {
              setSubmitting(false);
              toast.error(typeof data === 'string' ? data : 'Something went wrong', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            recall();
          },
        })
      );
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };

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

          <TextField
            fullWidth
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
          />

          <TextField
            fullWidth
            type={showPassword1 ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword1} edge="end">
                    <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
