import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, withStyles } from '@material-ui/core';
import { Stack } from '@mui/material';
import { addSkuObject, getSkus } from 'actions/skus';
import { AdminStyle } from 'Admin/AdminStyle';
import { useState } from 'react';
import nextId, { setPrefix } from "react-id-generator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./styles";

function SkuAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { classes } = props;

  const [sku, setSku] = useState({
    sku_name: '',
    data_sku: '',
  });

  const handleEditOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSku(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  setPrefix("");
  const keyAdd = nextId();
  const handleSaveSku = async () => {
    try { 
      dispatch(addSkuObject(sku, Number(keyAdd)));
      dispatch(getSkus());
      navigate("/dashboard/sku", { replace: true })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    navigate("/dashboard/sku", { replace: true })
  }

  return (
    <AdminStyle open={!opensidebar}>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            {
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tbHeadLeft} variant="head">Mã SKU</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      fullWidth
                      name="memory"
                      onChange={handleEditOnchange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tbHeadLeft} variant="head">Dung lượng</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      fullWidth
                      name="data_sku"
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
          <Button variant="contained" color="secondary" onClick={handleSaveSku}>Lưu</Button>
        </Stack>
      </Grid>
    </AdminStyle>

  )
}

export default withStyles(styles)(SkuAdd)