import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ForgotPassword } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, _) => {
      //
      dispatch(
        ForgotPassword({
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
            } else {
              navigate('/enterotp', { replace: false, state: { email: values.email } });
            }
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
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Next {'>'}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
