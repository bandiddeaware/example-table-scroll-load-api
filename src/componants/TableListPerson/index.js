import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ListPerson from './../../apis/ListPerson'

import InfiniteScroll from "react-infinite-scroll-component";

// "id": 1862,
// "time": "2021-07-23T02:42:39.000Z",
// "entrace_name": null,
// "direction": 0,
// "card_id": 202100002,
// "name": "กัมพล",
// "surname": "สมใจรัก",
// "card_type": "VISITOR",
// "company_name": "บ.ลำปาง เค.บี. จำกัด",
// "access_result": -1

const columns = [
  { id: 'id', label: 'id', minWidth: 170 },
  { id: 'time', label: 'time', minWidth: 100 },
  {
    id: 'entrace_name',
    label: 'entrace_name',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'direction',
    label: 'direction',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'card_id',
    label: 'card_id',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'name',
    label: 'name',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'surname',
    label: 'surname',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'card_type',
    label: 'card_type',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'company_name',
    label: 'company_name',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'access_result',
    label: 'access_result',
    // minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 540,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();

  const [rows, setrows] = React.useState([])
  const [page, setpage] = React.useState(0)
  const [rowsPerPage] = React.useState(20)

  React.useEffect(() => {
    const callApi = async () => {
      console.log('first load')
      var form = new FormData();
      form.append('start_time', "2021-07-01 00:00:00")
      form.append('stop_time', "2021-07-30 23:59:59")
      form.append('limit', rowsPerPage.toString())
      form.append('offset', (page * rowsPerPage).toString())
      form.append('sort', "DESC")
      const res = await ListPerson(form)
      setpage(page + 1)
      console.log(res.data.data)
      setrows(Object.assign([], res.data.data))
    }
    callApi()
  }, [])

  const fetchMoreData = () => {
    setTimeout(async () => {
      var form = new FormData();
      form.append('start_time', "2021-07-01 00:00:00")
      form.append('stop_time', "2021-07-30 23:59:59")
      form.append('limit', rowsPerPage.toString())
      form.append('offset', (page * rowsPerPage).toString())
      form.append('sort', "DESC")
      const res = await ListPerson(form)
      var new_ = rows.concat(res.data.data)
      setrows(Object.assign([], new_))
      setpage(page + 1)
    }, 1000);
  }

  return (
    // // for test
    // <InfiniteScroll
    //   dataLength={rows.length}
    //   next={fetchMoreData}
    //   hasMore={true}
    //   loader={<h4>Loading...</h4>}
    //   height={400}
    // >
    //   {rows.map((row) => (
    //       <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
    //         {columns.map((column) => {
    //           const value = row[column.id];
    //           return (
    //             <TableCell key={column.id} align={column.align}>
    //               {column.format && typeof value === 'number' ? column.format(value) : value}
    //             </TableCell>
    //           );
    //         })}
    //       </TableRow>
    //   ))}
    // </InfiniteScroll>



    <Paper className={classes.root}>


      <InfiniteScroll
        dataLength={rows.length}
        next={fetchMoreData}
        hasMore={true}
        // loader={<h4>Loading... offset: {(page * 20).toString()} limit: 20</h4>}
        height={500}
        style={{width: '100%'}}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>api errors</b>
          </p>
        }
      >

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

          {rows.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
        ))}

          </TableBody>
        </Table>
        <center><h4>Loading... offset: {page * rowsPerPage} limit: {rowsPerPage}</h4></center>
      </InfiniteScroll>
    </Paper>
  );
}