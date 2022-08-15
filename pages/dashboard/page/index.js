import {
    Button,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    withStyles,
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import DiaLogPopup from './../../../admin_components/DiaLogPopup'
import { deletePageDetail, getPageDetail, updatePageDetail } from './../../../store/actions/page'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../AdminStyle'
import styles from './styles'
import { storage } from './../../../utils/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const AdminPage = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const pageData = useSelector(state => state.page.data)
    const dispatch = useDispatch()
    const router = useRouter()
    const refs = useRef()

    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [initContent, setInitContent] = useState('')
    const [editPageObject, setEditPageObject] = useState({
        name: '',
        slug: '',
        content: '',
        isDisplay: '0',
        create_date: '',
        update_date: '',
    })

    const arrayPage = []
    pageData !== null &&
        pageData !== undefined &&
        Object.keys(pageData)?.map(element => {
            const key = element
            if (pageData[key] !== null) {
                const name = pageData[key].name ? pageData[key].name : ''
                const slug = pageData[key].slug ? pageData[key].slug : ''
                const content = pageData[key].content ? pageData[key].content : ''
                const isDisplay = pageData[key].isDisplay ? pageData[key].isDisplay : ''
                const create_date = pageData[key].create_date ? pageData[key].create_date : ''
                const update_date = pageData[key].update_date ? pageData[key].update_date : ''
                arrayPage.push({
                    id: key,
                    name: name,
                    slug: slug,
                    content: content,
                    isDisplay: isDisplay.toString(),
                    create_date: create_date,
                    update_date: update_date,
                })
            }
        })

    useEffect(() => {
        return () => {
            dispatch(getPageDetail())
        }
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/page_add')
    }

    const idPageRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idPageRef.current = id
    }

    const handleEditPage = page => {
        idPageRef.current = page.id
        setIsEdit(true)
        setEditPageObject(page)
        setInitContent(page.content)
    }

    //Nội dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    //Bạn có chắc chắn muốn xóa
    const areUSureDelete = status => {
        if (status) {
            dispatch(deletePageDetail(idPageRef.current))
            dispatch(getPageDetail())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditPageObject(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleOnChageEditor = event => {
        setEditPageObject(prevState => ({
            ...prevState,
            content: event,
        }))
    }

    const handleCancel = () => {
        setIsEdit(false)
    }

    //Submit edit
    const handleEditSubmit = async () => {
        try {
            dispatch(updatePageDetail(editPageObject))
            setIsEdit(false)
            dispatch(getPageDetail())
        } catch (err) {
            console.log(err)
        }
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = editorState => {
        setEditorState(editorState)
    }

    function uploadImageCallBack(file) {
        const imagesRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(imagesRef, file)

        return new Promise((resolve, reject) => {
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log(error)
                    reject(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        resolve({ data: { link: downloadURL } })
                    })
                }
            )
        })
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                {dialog.isOpenDiaLog && (
                    <DiaLogPopup
                        onDialog={areUSureDelete}
                        message={dialog.message}
                        isOpenDiaLog={dialog.isOpenDiaLog}
                    />
                )}
                {!isEdit ? (
                    <div>
                        <Grid style={{ paddingBottom: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleAddAccount}>
                                <AddIcon />
                                &nbsp;&nbsp;Tạo mới page
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tên page</StyledTableCell>
                                        <StyledTableCell align='left'>Link</StyledTableCell>
                                        <StyledTableCell align='left'>Ngày tạo</StyledTableCell>
                                        <StyledTableCell align='left'>Ngày chỉnh sửa</StyledTableCell>
                                        <StyledTableCell align='left'>Hiển thị</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayPage !== null &&
                                        arrayPage !== undefined &&
                                        Object.values(arrayPage)?.map((page, idx) => {
                                            return (
                                                page !== null &&
                                                page !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{page.name}</StyledTableCell>
                                                        <StyledTableCell align='left'>{page.slug}</StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.create_date}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.update_date}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.isDisplay === '1' ? 'Hiển thị' : 'Ẩn'}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEditPage(page)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(page.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <Grid ref={refs}>
                        <TableContainer component={Paper}>
                            <Table>
                                {editPageObject !== null && editPageObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Tên Page
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editPageObject.name}
                                                    name='name'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Link
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editPageObject.slug}
                                                    name='slug'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Nội dung
                                            </TableCell>
                                            <TableCell>
                                                <Editor
                                                    editorState={editorState}
                                                    toolbarClassName='toolbarClassName'
                                                    wrapperClassName='wrapperClassName'
                                                    editorClassName='editorClassName'
                                                    onEditorStateChange={onEditorStateChange}
                                                    toolbar={{
                                                        inline: { inDropdown: true },
                                                        list: { inDropdown: true },
                                                        textAlign: { inDropdown: true },
                                                        link: { inDropdown: true },
                                                        history: { inDropdown: true },
                                                        image: {
                                                            uploadCallback: uploadImageCallBack,
                                                            alt: { present: true, mandatory: false },
                                                        },
                                                        inputAccept:
                                                            'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Trạng thái hiển thị
                                            </TableCell>
                                            <TableCell>
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                                        name='isDisplay'
                                                        defaultValue={editPageObject.isDisplay === '1' ? true : false}
                                                        value={editPageObject.isDisplay}
                                                        onChange={handleEditOnchage}
                                                    >
                                                        <FormControlLabel value='1' control={<Radio />} label='Hiện' />
                                                        <FormControlLabel value='0' control={<Radio />} label='Ẩn' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleEditSubmit}>
                                Lưu
                            </Button>
                        </Stack>
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default withStyles(styles)(AdminPage)
