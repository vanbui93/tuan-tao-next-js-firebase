import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    withStyles,
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import { Chip, ImageList, ImageListItem, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { deletePageDetail, getPageDetail, updatePageDetail } from '../../../store/actions/page'
import { storage } from '../../../utils/firebase'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default

function AdminMedia(props) {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const pageData = useSelector(state => state.page.data)
    const dispatch = useDispatch()
    const router = useRouter()
    const refs = useRef()

    // Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [isEdit, setIsEdit] = useState(false)
    const [listImg, setListImg] = useState([])
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
                const link = pageData[key].link ? pageData[key].link : ''
                arrayPage.push({
                    id: key,
                    name,
                    link,
                })
            }
        })

    useEffect(() => {
        dispatch(getPageDetail())
    }, [])

    // Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/media_add')
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

        const blocksFromHtml = htmlToDraft(page.content)
        const { contentBlocks, entityMap } = blocksFromHtml
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap)))
    }

    // Nội dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    // Bạn có chắc chắn muốn xóa
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
        const { name } = e.target
        const { value } = e.target
        setEditPageObject(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCancel = () => {
        setIsEdit(false)
    }

    // Submit edit
    const handleEditSubmit = async () => {
        try {
            dispatch(updatePageDetail(editPageObject))
            setIsEdit(false)
            dispatch(getPageDetail())
        } catch (err) {
            console.log(err)
        }
    }

    const onEditorStateChange = editorState => {
        const currentContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setEditorState(editorState)

        setEditPageObject(prevState => ({
            ...prevState,
            content: currentContent,
        }))
    }

    const [allUrl, setAllUrl] = useState([])

    const storageRef = ref(storage, 'images')
    useEffect(() => {
        listAll(storageRef)
            .then(res => {
                let promises = res.items.map(imageRef => getDownloadURL(imageRef))
                Promise.all(promises).then(urls => {
                    setAllUrl(urls)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        }
    }

    const handleDeleteMedia = item => {
        console.log('ss', item)
        const deleteRef = ref(storage, photo)
        deleteObject(storageRef)
            .then(() => {
                console.log('File deleted successfully')
            })
            .catch(error => {
                console.log(error.message)
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
                                &nbsp;&nbsp;Thêm mới
                            </Button>
                        </Grid>
                        <ImageList sx={{ height: 450 }} variant='quilted' cols={4} rowHeight={230}>
                            {allUrl.map((item, idx) => (
                                <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                                    <ImageListItem key={idx}>
                                        <Chip
                                            label='Xóa hình'
                                            variant='outlined'
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                                background: '#fff',
                                            }}
                                            onDelete={() => handleDeleteMedia(item)}
                                        />
                                        <img {...srcset(item, 121)} loading='lazy' />
                                        <Button
                                            variant='outlined'
                                            style={{
                                                position: 'absolute',
                                                bottom: '5px',
                                                right: '5px',
                                                background: '#fff',
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(item)
                                            }}
                                        >
                                            Copy link hình
                                        </Button>
                                    </ImageListItem>
                                </div>
                            ))}
                        </ImageList>
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
                                                        embedded: {
                                                            embedCallback: embedVideoCallBack,
                                                        },
                                                        image: {
                                                            uploadCallback: uploadImageCallBack,
                                                            alt: { present: true, mandatory: false },
                                                        },
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
export default withStyles(styles)(AdminMedia)
