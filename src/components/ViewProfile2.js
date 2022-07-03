import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Skeleton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FetchAllPolesViewProfile } from '../redux/ProfileReducer';

const headCells = [
  {
    id: 'serialNo',
    numeric: false,
    disablePadding: true,
    label: 'Serial No.',
  },
  {
    id: 'latitude',
    numeric: false,
    disablePadding: false,
    label: 'Latitude',
  },
  {
    id: 'longitude',
    numeric: false,
    disablePadding: false,
    label: 'Longitude',
  },
  {
    id: 'Location',
    numeric: false,
    disablePadding: true,
    label: 'Location',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ViewProfile2() {
  const dispatch = useDispatch();

  const { userid } = useParams();

  const poles = useSelector(({ profile }) => profile.poles);

  const [poleFetchingerror, setPoleFetchingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const FetchPoles = (data) => {
    setPoleFetchingError(false);
    dispatch(
      FetchAllPolesViewProfile({
        payload: { id: data },
        callback: (msg, data, recall) => {
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
            setPoleFetchingError(true);
          }
          recall();
          setIsLoading(true);
        },
      })
    );
  };

  useEffect(() => {
    FetchPoles(userid);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - poles.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            px: { sm: 2 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%' }} variant="h5" id="tableTitle" component="div">
            Added Poles
          </Typography>
        </Toolbar>
        {isLoading ? (
          <>
            <TableContainer sx={{ px: 2 }}>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                <EnhancedTableHead />
                <TableBody>
                  {poles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pole, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={pole.serialno}>
                        <TableCell sx={{ pl: 1 }} component="th" id={labelId} scope="row" padding="none">
                          {'#'}
                          {pole.serialno}
                        </TableCell>
                        <TableCell align="left">{pole.latitude}</TableCell>
                        <TableCell align="left">{pole.longitude}</TableCell>
                        <TableCell align="left">{pole.location.name}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={poles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <>
            <Skeleton sx={{ my: -1 }} variant="text" height={80} />
            <Skeleton sx={{ my: -1 }} variant="text" height={80} />
            <Skeleton sx={{ my: -1 }} variant="text" height={80} />
          </>
        )}
      </Paper>
    </Box>
  );
}
