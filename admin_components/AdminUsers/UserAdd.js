import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, withStyles } from '@material-ui/core';
import { Stack } from '@mui/material';
import { addAccoutObject, getUser } from 'actions/account';
import { AdminStyle } from 'Admin/AdminStyle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import nextId, { setPrefix } from "react-id-generator";
import styles from "./styles";

const UserAdd = (props) => {
  const opensidebar = useSelector(state => state.ui.opensidebar);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { classes } = props;

  const [user, setUser] = useState({
    name: '',
    email: '',
    pass: '',
  });

  const handleEditOnchage = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  setPrefix("");
  const keyAdd = nextId();
  const handleSaveAccount = async () => {
    try { 
      dispatch(addAccoutObject(user, Number(keyAdd)));
      dispatch(getUser());
      navigate("/dashboard/user", { replace: true })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    navigate("/dashboard/user", { replace: true })
  }

  return (
    <AdminStyle open={!opensidebar}>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant="head">username</TableCell>
                <TableCell>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    name="name"
                    onChange={handleEditOnchage}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant="head">email</TableCell>
                <TableCell>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    name="email"
                    onChange={handleEditOnchage}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant="head">password</TableCell>
                <TableCell>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    fullWidth
                    name="pass"
                    onChange={handleEditOnchage}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} direction="row" style={{ paddingTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleCancel}>Hủy bỏ</Button>
          <Button variant="contained" color="secondary" onClick={handleSaveAccount}>Lưu</Button>
        </Stack>
      </Grid>
    </AdminStyle>
  )
}


export default withStyles(styles)(UserAdd)