import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  withStyles,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import Editor from 'material-ui-editor'
import { useRouter } from 'next/router'
import { useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addPageObject, getPageDetail } from '../../../store/actions/page'
import { AdminStyle } from '../AdminStyle'
import styles from './styles'

const PageAdd = props => {
  const opensidebar = useSelector(state => state.ui.opensidebar)
  const router = useRouter()

  const dispatch = useDispatch()
  const { classes } = props

  const [addPage, setAddPage] = useState({
    name: '',
    slug: '',
    content: '',
    isDisplay: '1',
    create_date: new Date().toString().replace(/GMT.*/g, ''),
  })

  const handleEditOnchage = e => {
    let name = e.target.name
    let value = e.target.value

    setAddPage(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleOnChageEditor = event => {
    setAddPage(prevState => ({
      ...prevState,
      content: event,
    }))
  }

  setPrefix('')
  const keyAdd = nextId()
  const handleSavePage = async () => {
    try {
      dispatch(addPageObject(addPage, Number(keyAdd)))
      dispatch(getPageDetail())
      router.push('/dashboard/page')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/page')
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant='head'>
                  Tên page
                </TableCell>
                <TableCell>
                  <TextField id='outlined-size-small' size='small' fullWidth name='name' onChange={handleEditOnchage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant='head'>
                  Link
                </TableCell>
                <TableCell>
                  <TextField id='outlined-size-small' size='small' fullWidth name='link' onChange={handleEditOnchage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant='head'>
                  Noi dung
                </TableCell>
                <TableCell>
                  <Editor content={''} onChange={handleOnChageEditor} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
          <Button variant='contained' color='primary' onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button variant='contained' color='secondary' onClick={handleSavePage}>
            Lưu
          </Button>
        </Stack>
      </LayoutAdmin>
    </AdminStyle>
  )
}

export default withStyles(styles)(PageAdd)
