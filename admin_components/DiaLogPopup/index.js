import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function DiaLogPopup(props) {
  const { message, onDialog, isOpenDiaLog } = props;
  return (
    <Dialog
      open={isOpenDiaLog}
      onClose={() => onDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => onDialog(false)}>Không đồng ý</Button>
        <Button onClick={() => onDialog(true)} autoFocus>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  )
}

DiaLogPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onDialog: PropTypes.func.isRequired,
  isOpenDiaLog: PropTypes.bool.isRequired,
};