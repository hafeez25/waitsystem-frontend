import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Skeleton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import AddPoleDialogBox from '../components/AddPoleDialogBox';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import { FetchAllPlaces } from '../redux/locationReducer';
import { DeletePole, FetchAllPoles, EditPole } from '../redux/PolesReducer';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Serial No.', alignRight: false },
  { id: 'company', label: 'Latitude', alignRight: false },
  { id: 'role', label: 'Longitude', alignRight: false },
  { id: 'isVerified', label: 'Location', alignRight: false },
  { id: 'status', label: 'Health Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.location.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  }, []);

  const poles = useSelector(({ pole }) => pole.poles);

  const [poleFetchingerror, setPoleFetchingError] = useState(false);

  const FetchPoles = () => {
    setPoleFetchingError(false);
    dispatch(
      FetchAllPoles({
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
        },
      })
    );
  };

  useEffect(() => {
    if (!poles || !poles.length) {
      FetchPoles();
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [editData, setEditData] = useState();

  const poleActions = (type, data) => {
    switch (type) {
      case 'DELETE':
        dispatch(
          DeletePole({
            payload: data,
            callback: (msg, data, recall) => {
              if (msg === 'error') {
                toast.error('Could not delete pole', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                recall();
              }
            },
          })
        );
        break;
      case 'EDIT':
        // open edit modal
        setEditData(data);
        break;
      case 'EDIT_DONE':
        setEditData(null);
        dispatch(
          EditPole({
            payload: data,
            callback: (msg, data, recall) => {
              if (msg === 'error') {
                toast.error(typeof data === 'string' ? data : 'Error in editing pole details', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                recall();
              }
            },
          })
        );
        break;
      default:
        break;
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(poles, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Manage Devices">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Devices
          </Typography>
          <AddPoleDialogBox />
          {editData && <AddPoleDialogBox data={editData} callback={poleActions} setEditData={setEditData} />}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={poles.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                {poles ? (
                  <TableBody>
                    {poles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { _id, latitude, longitude, serialno, healthStatus, batteryStatus, location } = row;
                      const status = healthStatus >= 50 ? 'good' : 'bad';
                      // const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={index}
                          tabIndex={-1}
                          // role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography sx={{ ml: 3 }} variant="subtitle2" noWrap>
                                {'#'}
                                {serialno}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{latitude}</TableCell>
                          <TableCell align="left">{longitude}</TableCell>
                          <TableCell align="left">{location.name}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={(status === 'bad' && 'error') || 'success'}>
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu callback={poleActions} data={row} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={poles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
