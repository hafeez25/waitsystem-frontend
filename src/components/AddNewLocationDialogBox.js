import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AddNewLocationForm } from '../sections/pole/addNewLocation';
import Iconify from './Iconify';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        component={RouterLink}
        to="#"
        onMouseDown={(e) => {
          console.log('CLICK SUCCESSFUL');
          // e.stopPropagation();
          handleClickOpen();
        }}
        // onClick={handleClickOpen}
        variant="contained"
        startIcon={<Iconify icon="bx:current-location" />}
      >
        Add New Location
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <DialogTitle variant="h4">Add New Location</DialogTitle>
          <Fab onClick={handleClose} size="small" sx={{ mr: 3 }} color="inherit" aria-label="edit">
            <Iconify icon="fa:close" />
          </Fab>
        </Stack>
        <DialogContent>
          <DialogContentText>
            Please enter the General Name of the location, State, District and Pincode here.
          </DialogContentText>
          <AddNewLocationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
