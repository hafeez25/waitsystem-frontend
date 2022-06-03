import React, { useState, useEffect } from 'react';
import { Box, TextField, Stack, Autocomplete } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';

const AddStates = () => {
  const [jsonResults, setJsonResults] = useState();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json')
      .then((response) => response.json())
      .then((json) => setJsonResults(json.data));
  });
  const formik = useFormik();
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  return (
    <Autocomplete
      disablePortal
      id="states-autocomplete"
      getOptionLabel={(jsonResults) => `${jsonResults.state_name}`}
      options={jsonResults}
      isOptionEqualToValue={(option, value) => option.state_name === value.state_name}
      noOptionsText={'No options'}
      renderOption={(props, jsonResults) => (
        <Box component="li" {...props} key={jsonResults.id}>
          {jsonResults.state_name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          margin="dense"
          id="state"
          label="State"
          type="text"
          variant="standard"
          {...getFieldProps('state')}
          error={Boolean(touched.state && errors.state)}
          helperText={touched.state && errors.state}
        />
      )}
    />
  );
};

export default AddStates;
