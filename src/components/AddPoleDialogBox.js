import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddNewPoleForm } from '../sections/pole/addNewPole';

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
        variant="contained"
        component={RouterLink}
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        New Pole
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <DialogTitle variant="h4">Add New Pole</DialogTitle>
          <Fab onClick={handleClose} size="small" sx={{ mr: 3 }} color="inherit" aria-label="edit">
            <Iconify icon="fa:close" />
          </Fab>
        </Stack>
        <DialogContent>
          <DialogContentText>Please enter the Serial Number, Latitude, Longitude and Location here.</DialogContentText>
          <AddNewPoleForm />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Add Pole</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
