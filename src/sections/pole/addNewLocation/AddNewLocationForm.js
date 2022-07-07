import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Box,
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
import statesJSON from './states.json';
import districtsJSON from './districts.json';
import { AddPlace } from '../../../redux/locationReducer';
// reducers
// import { AddLocation } from '../../../redux/Pole/PoleReducer';

// ----------------------------------------------------------------------

export default function AddNewLocationForm({ handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(data);

  const AddNewLocationSchema = Yup.object().shape({
    location: Yup.string().required('General Name is required'),
    // state: Yup.string().required('State is required'),
    // district: Yup.string().required('District is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const formik = useFormik({
    initialValues: {
      location: '',
      state: '',
      district: '',
      pincode: '',
      remember: true,
    },
    validationSchema: AddNewLocationSchema,
    onSubmit: (values, actions) => {
      console.log(values, state, district);
      if (state.name && district.name && values.location && values.pincode) {
        dispatch(
          AddPlace({
            payload: {
              ...values,
              name: values.location,
              state: state.name,
              district: district.name,
            },
            callback: (msg, data, recall) => {
              if (msg === 'error') {
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
              } else {
                handleClose();
                console.log(data);
                recall();
              }
            },
          })
        );
      } else {
        toast.error('Please fill all fields', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(values,actions)
      // dispatch(
      //   AddLocation({
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

  const [state, setState] = useState({ name: '' });
  const [district, setDistrict] = useState({ name: '' });
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');

  const [jsonResults, setJsonResults] = useState([]);
  const [jsonResults1, setJsonResults1] = useState([]);

  useEffect(() => {
    setJsonResults(
      statesJSON.filter((x) => x.country_code === 'IN' && x.name.toLowerCase().includes(input.toLowerCase()))
    );
  }, [input]);

  useEffect(() => {
    setJsonResults1(
      districtsJSON.filter(
        (x) =>
          x.country_code === 'IN' &&
          x.state_code === state?.state_code &&
          x.name.toLowerCase().includes(input1.toLowerCase())
      )
    );
  }, [input1, state]);

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
              {...getFieldProps('location')}
              error={Boolean(touched.location && errors.location)}
              helperText={touched.location && errors.location}
            />
            <Autocomplete
              disablePortal
              options={jsonResults}
              // value={state}
              onChange={(e, n) => {
                setState(n);
                setDistrict({ name: '' });
              }}
              id="states-autocomplete"
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
                  id="states"
                  label="State"
                  type="text"
                  variant="standard"
                  // {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={jsonResults1}
              // value={district}
              onChange={(e, n) => setDistrict(n)}
              id="districts-autocomplete"
              getOptionLabel={(jsonResults1) => `${jsonResults1.name}`}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              noOptionsText={'No options'}
              onInputChange={(event, newInputValue) => {
                setInput1(newInputValue);
              }}
              renderOption={(props, jsonResults1) => (
                <Box component="li" {...props} key={jsonResults1.id}>
                  {jsonResults1.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  margin="dense"
                  id="districts"
                  label="District"
                  type="text"
                  variant="standard"
                  // {...getFieldProps('district')}
                  error={Boolean(touched.district && errors.district)}
                  helperText={touched.district && errors.district}
                />
              )}
            />

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
