import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, withStyles } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import { Chip, ImageList, ImageListItem, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addMediaStorage, deleteMediaStorage, getMediaStorage } from '../../../store/actions/mediaStorage'
import { storage } from '../../../utils/firebase'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

function AdminMedia(props) {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const allUrl = useSelector(state => state.mediaStorage.data)
    const dispatch = useDispatch()
    const refs = useRef()

    const { classes } = props
    const [isAddStorage, setIsAddStorage] = useState(false)
    const [file, setFile] = useState('')

    useEffect(() => {
        dispatch(getMediaStorage())
    }, [])

    const handleCancel = () => {
        setIsAddStorage(false)
    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        }
    }

    const handleDeleteMedia = itemFile => {
        dispatch(deleteMediaStorage(itemFile))
        dispatch(getMediaStorage())
    }

    const handleAddMediaStorage = () => {
        setIsAddStorage(true)
    }

    function handleAddFileStorage(e) {
        setFile(e.target.files[0])
    }

    // thêm file vào Storage
    const handleSubmitFileStorage = async () => {
        setIsAddStorage(false)
        if (!file) {
            alert('Please choose a file first!')
        }
        const storageRef = ref(storage, `/media/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

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
                        console.log(downloadURL)
                        resolve(allUrl.push({ downloadURL }))
                    })
                }
            )
        })
    }

    console.log(allUrl)

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                {!isAddStorage ? (
                    <div>
                        <Grid style={{ paddingBottom: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleAddMediaStorage}>
                                <AddIcon />
                                &nbsp;&nbsp;Thêm mới
                            </Button>
                        </Grid>
                        <ImageList sx={{ height: 450 }} variant='quilted' cols={4} rowHeight={230}>
                            {allUrl?.map((item, idx) => {
                                if ((item.split('.').pop().split('?')[0] = '.pdf')) {
                                    return (
                                        <div key={idx} style={{ marginBottom: '20px', textAlign: 'right' }}>
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
                                                <img src={'/assets/img/pdf-file-icon.jpg'} style={{ width: '100%' }} />
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
                                                    Copy link
                                                </Button>
                                            </ImageListItem>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={idx} style={{ marginBottom: '20px', textAlign: 'right' }}>
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
                                                    Copy link
                                                </Button>
                                            </ImageListItem>
                                        </div>
                                    )
                                }
                            })}
                        </ImageList>
                    </div>
                ) : (
                    <Grid ref={refs}>
                        <TableContainer component={Paper}>
                            <Table>
                                {
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Upload hình
                                            </TableCell>
                                            <TableCell>
                                                <div className={classes.imgList}>
                                                    <div
                                                        className={`${classes.imgListItem} ${classes.imgListItemBlock}`}
                                                    >
                                                        <div className={classes.imgUpload}>
                                                            <input
                                                                type='file'
                                                                accept='*'
                                                                onChange={handleAddFileStorage}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleSubmitFileStorage}>
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
