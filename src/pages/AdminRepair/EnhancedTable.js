import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { PosposAxios } from '../../utils/axiosConfig';
import Title from '../.././components/Title';
import {
  CircularProgress,
  Select,
  Grid,
  Paper,
  Toolbar,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(
  TableCell
);

function createRepairData(obj){
  return {
    serialNumber: obj.serialNumber,
    name: obj.name,
    customerName: obj.customer.firstName,
    customerPhone: obj.customer.phone,
    dateIn: obj.date_in,
    status: obj.status
  }
}

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'serialNumber', numeric: false, disablePadding: false, label: 'Serial Number' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'customerName', numeric: false, disablePadding: false, label: 'Customer Name' },
  { id: 'customerPhone', numeric: false, disablePadding: false, label: 'Customer Phone' },
  { id: 'dateIn', numeric: false, disablePadding: false, label: 'Date In' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

const statusIndex = {
  'registered': 1,
  'กำลังส่งซ่อม': 2,
  'กำลังซ่อม': 3,
  'ซ่อมเรียบร้อยแล้ว': 4
}

function EnhancedTableHead(props) {

  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead classes={classes.head}>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));


const EnhancedTableToolbar = (props) => {
  
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)} >
      <Title >Repair List</Title>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
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

  const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);


  const updateStatus = async (serialNumber, status) => {
    try {

      const response = await PosposAxios.post('/api/repair/updatestatus/',{
        serialNumber,
        status
      });
      console.log(response);
    
    } catch (e) {
      console.log(e);
    }
    
  }
 
  const handleChangeSelected = async (event,rowId) => {
    let arrBuffer = rows;
    for(let elt of arrBuffer){
      if(elt.serialNumber === rowId){
        elt.status = getKeyByValue(statusIndex, event.target.value);
        ///post new value
        await updateStatus(elt.serialNumber, elt.status);
        break;
      }
    } 
    setRows(arrBuffer);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  let fetchData = async () => {
    try {

      const response = await PosposAxios.get('/api/repair/');
 
      // LOAD DATA TO ROW
      let dataResp = response.data.message;
      let rowData = dataResp.map((elt) => {
        return createRepairData(elt);
      });
      setRows(rowData);
      console.log(rowData);

      setTimeout(() => {
        setIsLoading(false);
      }, 900);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();    
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        {
          isLoading ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '25vh' }}
            >
              <Grid item xs={3}>
                <CircularProgress />
              </Grid>
            </Grid>
          ) : (
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {

                        //const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            //role="checkbox"
                            tabIndex={-1}
                            key={row.serialNumber}
                          >
                            <TableCell component="th" id={labelId} scope="row" padding="default">
                              {row.serialNumber}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{row.customerPhone}</TableCell>
                            <TableCell align="right">{row.dateIn}</TableCell> 
                            <TableCell align="right">
                              <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={statusIndex[`${row.status}`]}
                                  onChange={(event) => {
                                    handleChangeSelected(event, row.serialNumber)
                                  }}
                                  label="Status"
                                >
                                  <MenuItem value={1}>Regisered</MenuItem>
                                  <MenuItem value={2}>กำลังส่งซ่อม</MenuItem>
                                  <MenuItem value={3}>กำลังซ่อม</MenuItem>
                                  <MenuItem value={4}>ซ่อมเรียบร้อยแล้ว</MenuItem>
                                </Select>
                              </FormControl>
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
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )
        }

      </Paper>

    </div>
  );
}

