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
  createFilterOptions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddNewLocationDialogBox from '../../../components/AddNewLocationDialogBox';
import Iconify from '../../../components/Iconify';
import statesJSON from '../addNewLocation/states.json';
import { FetchAllPlaces } from '../../../redux/locationReducer';
import { AddPole } from '../../../redux/PolesReducer';

import { isValidSerialNo, isValidLatitude, isValidLongitude } from '../../../utils/validation';
// reducers

// ----------------------------------------------------------------------

export default function AddNewPoleForm({ handleClose, editing, data, callback }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const places = useSelector(({ location }) => location.Places);

  useEffect(() => {
    if (!places || !places.length) {
      dispatch(
        FetchAllPlaces({
          callback: (msg, data, recall) => {
            recall();
          },
        })
      );
    }
  }, [places]);

  const AddNewLocationSchema = Yup.object().shape({
    serialno: Yup.string().required('Serial No. is required'),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
    point1X: Yup.string().required('Required field'),
    point1Y: Yup.string().required('Required field'),
    point2X: Yup.string().required('Required field'),
    point2Y: Yup.string().required('Required field'),
    point3X: Yup.string().required('Required field'),
    point3Y: Yup.string().required('Required field'),
    point4X: Yup.string().required('Required field'),
    point4Y: Yup.string().required('Required field'),
    // location: Yup.string().required('Location is required'),
  });

  const isValidPoint = (point) => {
    if (point && point.lat && point.long) {
      return isValidLatitude(point.lat) && isValidLongitude(point.long);
    }
    return false;
  }
  const isValidPoints = (points) => {
    let valid = true;
    valid = (valid && (points.length === 4));
    if (!valid) return false;
    for (let i = 0; i < 4; i += 1) {
      valid = isValidPoint(points[i]);
      if (!valid) return false;
    }
    return valid;
  }

  const formik = useFormik({
    initialValues: {
      serialno: editing ? data.serialno : '',
      latitude: editing ? data.latitude : '',
      longitude: editing ? data.longitude : '',
      location: editing ? data.location : '',
      point1X: editing && data.points && data.points[0] && data.points[0].lat
        ? data.points[0].lat : '',
      point1Y: editing && data.points && data.points[0] && data.points[0].long
        ? data.points[0].long : '',
      point2X: editing && data.points && data.points[1] && data.points[1].lat
        ? data.points[1].lat : '',
      point2Y: editing && data.points && data.points[1] && data.points[1].long
        ? data.points[1].long : '',
      point3X: editing && data.points && data.points[2] && data.points[2].lat
        ? data.points[2].lat : '',
      point3Y: editing && data.points && data.points[2] && data.points[2].long
        ? data.points[2].long : '',
      point4X: editing && data.points && data.points[3] && data.points[3].lat
        ? data.points[3].lat : '',
      point4Y: editing && data.points && data.points[3] && data.points[3].long
        ? data.points[3].long : ''
    },
    validationSchema: AddNewLocationSchema,
    onSubmit: (values, actions) => {
      console.log(values, locationid);
      const points = [
        { lat: values.point1X, long: values.point1Y },
        { lat: values.point2X, long: values.point2Y },
        { lat: values.point3X, long: values.point3Y },
        { lat: values.point4X, long: values.point4Y }
      ];
      if (locationid && isValidSerialNo(values.serialno) &&
        isValidLongitude(values.longitude) &&
        isValidPoints(points) &&
        isValidLatitude(values.latitude) && !editing) {
        dispatch(
          AddPole({
            payload: {
              ...values,
              location: locationid,
              points,
              name: state.name,
            },
            callback: (msg, data, recall) => {
              setSubmitting(false);
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
              } else {
                handleClose();
                recall();
              }
            },
          })
        );
      } else if (!editing) {
        setSubmitting(false);
        toast.error("Invalid values in one or more field.Please fill only valid values", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else if (editing) {
        if (callback && state._id && isValidSerialNo(values.serialno) &&
          isValidLongitude(values.longitude) &&
          isValidPoints(points) &&
          isValidLatitude(values.latitude)) {
          callback('EDIT_DONE', { ...values, location: state._id, name: state.name, poleid: data._id, points });
          handleClose();
        }
        else {
          toast.error("Invalid values in one or more field.Please fill only valid values", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
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

  const [state, setState] = useState(editing ? data.location : { name: '', _id: '' });
  const [locationid, setLocationid] = useState();
  const [input, setInput] = useState('');

  const [jsonResults, setJsonResults] = useState([]);
  const filterOptions = createFilterOptions({
    limit: 5
  });

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
              disabled={editing}
              variant="standard"
              {...getFieldProps('serialno')}
              error={Boolean((touched.serialno && errors.serialno) || touched.serialno && !isValidSerialNo(values.serialno))}
              helperText={touched.serialno && errors.serialno}
            />
            <TextField
              margin="dense"
              id="standard-basic"
              label="Latitude"
              type="text"
              fullWidth
              variant="standard"
              {...getFieldProps('latitude')}
              error={Boolean((touched.latitude && errors.latitude) || touched.latitude && !isValidLatitude(values.latitude))}
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
              error={Boolean((touched.longitude && errors.longitude) || touched.longitude && !isValidLongitude(values.longitude))}
              helperText={touched.longitude && errors.longitude}
            />
            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
              <Autocomplete
                fullWidth
                disablePortal
                value={state}
                options={places}
                onChange={(e, n) => {
                  setState(n);
                  setLocationid(n?._id);
                }}
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
                filterOptions={filterOptions}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="dense"
                    id="location"
                    label="Location"
                    type="text"
                    variant="standard"
                    // {...getFieldProps('location')}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  />
                )}
              />
              <AddNewLocationDialogBox />
            </Stack>
            <Stack sx={{ display: (window.innerWidth > 500 ? "flex" : "block"), flexDirection: "row", justifyContent: "space-between" }}>
              <TextField
                margin="dense"
                id="standard-basic"
                label="Latitude-1"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point1X')}
                error={Boolean((touched.point1X && errors.point1X) || touched.point1X && !isValidLatitude(values.point1X))}
                helperText={touched.point1X && errors.point1X}
              />
              <TextField
                margin="dense"
                id="standard-basic"
                label="Longitude-1"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point1Y')}
                error={Boolean((touched.point1Y && errors.point1Y) || touched.point1Y && !isValidLongitude(values.point1Y))}
                helperText={touched.point1Y && errors.point1Y}
              />
            </Stack>
            <Stack sx={{ display: (window.innerWidth > 500 ? "flex" : "block"), flexDirection: "row", justifyContent: "space-between" }}>
              <TextField
                margin="dense"
                id="standard-basic"
                label="Latitude-2"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point2X')}
                error={Boolean((touched.point2X && errors.point2X) || touched.point2X && !isValidLatitude(values.point2X))}
                helperText={touched.point2X && errors.point2X}
              />
              <TextField
                margin="dense"
                id="standard-basic"
                label="Longitude-2"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point2Y')}
                error={Boolean((touched.point2Y && errors.point2Y) || touched.point2Y && !isValidLongitude(values.point2Y))}
                helperText={touched.point2Y && errors.point2Y}
              />
            </Stack>
            <Stack sx={{ display: (window.innerWidth > 500 ? "flex" : "block"), flexDirection: "row", justifyContent: "space-between" }}>
              <TextField
                margin="dense"
                id="standard-basic"
                label="Latitude-3"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point3X')}
                error={Boolean((touched.point3X && errors.point3X) || touched.point3X && !isValidLatitude(values.point3X))}
                helperText={touched.point3X && errors.point3X}
              />
              <TextField
                margin="dense"
                id="standard-basic"
                label="Longitude-3"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point3Y')}
                error={Boolean((touched.point3Y && errors.point3Y) || touched.point3Y && !isValidLongitude(values.point3Y))}
                helperText={touched.point3Y && errors.point3Y}
              />
            </Stack>
            <Stack sx={{ display: (window.innerWidth > 500 ? "flex" : "block"), flexDirection: "row", justifyContent: "space-between" }}>
              <TextField
                margin="dense"
                id="standard-basic"
                label="Latitude-4"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point4X')}
                error={Boolean((touched.point4X && errors.point4X) || touched.point4X && !isValidLatitude(values.point4X))}
                helperText={touched.point4X && errors.point4X}
              />
              <TextField
                margin="dense"
                id="standard-basic"
                label="Longitude-4"
                type="text"
                fullWidth={false}
                style={{ width: (window.innerWidth > 500 ? "calc(50% - 20px)" : "100%") }}
                variant="standard"
                {...getFieldProps('point4Y')}
                error={Boolean((touched.point4Y && errors.point4Y) || touched.point4Y && !isValidLongitude(values.point4Y))}
                helperText={touched.point4Y && errors.point4Y}
              />
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              {editing ? 'Update Pole' : 'Add Pole'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
