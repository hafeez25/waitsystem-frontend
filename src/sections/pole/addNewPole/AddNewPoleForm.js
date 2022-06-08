import * as Yup from 'yup';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Box,
  Autocomplete,
  Button,
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
import statesJSON from '../addNewLocation/states.json';
// reducers
import { Login } from '../../../redux/AuthReducer';

// ----------------------------------------------------------------------

export default function AddNewPoleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddNewLocationSchema = Yup.object().shape({
    serialNo: Yup.string().required('Serial No. is required'),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
    location: Yup.string().required('Location is required'),
  });

  const formik = useFormik({
    initialValues: {
      serialNo: '',
      latitude: '',
      longitude: '',
      location: '',
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

  const [state, setState] = useState('');
  const [input, setInput] = useState('');

  const [jsonResults, setJsonResults] = useState([]);

  useEffect(() => {
    setJsonResults(
      statesJSON.filter((x) => x.country_code === 'IN' && x.name.toLowerCase().includes(input.toLowerCase()))
    );
  }, [input]);

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
              {...getFieldProps('serialNo')}
              error={Boolean(touched.serialNo && errors.serialNo)}
              helperText={touched.serialNo && errors.serialNo}
            />
            <TextField
              margin="dense"
              id="standard-basic"
              label="Latitude"
              type="text"
              fullWidth
              variant="standard"
              {...getFieldProps('latitude')}
              error={Boolean(touched.latitude && errors.latitude)}
              helperText={touched.latitude && errors.latitude}
            />
            <TextField
              margin="dense"
              id="standard-basic"
              label="Longitude"
              type="text"
              fullWidth
              variant="standard"
              {...getFieldProps('longitude')}
              error={Boolean(touched.longitude && errors.longitude)}
              helperText={touched.longitude && errors.longitude}
            />
            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
              <Autocomplete
                fullWidth
                disablePortal
                options={jsonResults}
                onChange={(e, n) => setState(n)}
                id="location-autocomplete"
                getOptionLabel={(jsonResults) => `${jsonResults.name}`}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                noOptionsText={'No options'}
                onInputChange={(event, newInputValue) => {
                  setInput(newInputValue);
                }}
                renderOption={(props, jsonResults) => (
                  <Box component="li" {...props} key={jsonResults.id}>
                    {jsonResults.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="dense"
                    id="location"
                    label="Location"
                    type="text"
                    variant="standard"
                    {...getFieldProps('location')}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  />
                )}
              />
              <AddNewLocationDialogBox />
            </Stack>
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
