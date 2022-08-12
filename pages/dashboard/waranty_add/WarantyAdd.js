import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, withStyles } from '@material-ui/core';
import { Stack } from '@mui/material';
import { addWarantyObject, getWarantys } from 'actions/warantys';
import { AdminStyle } from 'Admin/AdminStyle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import nextId, { setPrefix } from "react-id-generator";
import styles from "./styles";

function WarantyAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { classes } = props;

  const [waranty, setWaranty] = useState({
    waranty_text: ''
  });

  const handleEditOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setWaranty(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  setPrefix("");
  const keyAdd = nextId();
  const handleSaveWaranty = async () => {
    try {
      dispatch(addWarantyObject(waranty, Number(keyAdd)));
      dispatch(getWarantys());
      navigate("/dashboard/waranty", { replace: true })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    navigate("/dashboard/waranty", { replace: true })
  }

  return (
    <AdminStyle open={!opensidebar}>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            {
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tbHeadLeft} variant="head">Nội dung bảo hành</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      fullWidth
                      name="waranty_text"
                      onChange={handleEditOnchange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
        <Stack spacing={2} direction="row" style={{ paddingTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleCancel}>Hủy bỏ</Button>
          <Button variant="contained" color="secondary" onClick={handleSaveWaranty}>Lưu</Button>
        </Stack>
      </Grid>
    </AdminStyle>

  )
}
export default withStyles(styles)(WarantyAdd)