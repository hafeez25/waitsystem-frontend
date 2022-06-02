import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      <Button component={RouterLink} to="#" onClick={handleClickOpen}>
        Add New Location
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the Serial Number, Latitude, Longitude and Location here.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="General Name" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="District" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Pin Code" type="text" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="State" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Register Location</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
