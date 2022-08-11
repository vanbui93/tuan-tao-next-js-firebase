import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, withStyles } from '@material-ui/core';
import { Stack } from '@mui/material';
import { addPromotionObject, getPromotions } from 'actions/promotions';
import { AdminStyle } from 'Admin/AdminStyle';
import { useState } from 'react';
import nextId, { setPrefix } from "react-id-generator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./styles";

function PromotionAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { classes } = props;

  const [promotion, setPromotion] = useState({
    promotion_text: ''
  });

  const handleEditOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPromotion(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  setPrefix("");
  const keyAdd = nextId();
  const handleSavePromotion = async () => {
    try {
      dispatch(addPromotionObject(promotion, Number(keyAdd)));
      dispatch(getPromotions());
      navigate("/dashboard/promotion", { replace: true })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCancel = () => {
    navigate("/dashboard/promotion", { replace: true })
  }

  return (
    <AdminStyle open={!opensidebar}>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            {
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tbHeadLeft} variant="head">Nội dung khuyến mãi</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      fullWidth
                      name="promotion_text"
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
          <Button variant="contained" color="secondary" onClick={handleSavePromotion}>Lưu</Button>
        </Stack>
      </Grid>
    </AdminStyle>

  )
}
export default withStyles(styles)(PromotionAdd)