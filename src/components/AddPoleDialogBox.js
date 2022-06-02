import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Iconify from './Iconify';

import AddNewLocationDialogBox from './AddNewLocationDialogBox';

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
        variant="contained"
        component={RouterLink}
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        New Pole
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <DialogTitle>Add New Pole</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the Serial Number, Latitude, Longitude and Location here.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Serial No." type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Latitude" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Longitude" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Location" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <AddNewLocationDialogBox />
          <Button onClick={handleClose}>Add Pole</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
