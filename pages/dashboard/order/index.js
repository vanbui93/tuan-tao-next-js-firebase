import {
    Button,
    Fab,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextareaAutosize,
    withStyles,
} from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SearchIcon from '@mui/icons-material/Search'
import { Checkbox, FormControlLabel, IconButton, InputBase, Stack, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import DiaLogPopup from './../../../admin_components/DiaLogPopup'
import PaginationButtons from './../../../admin_components/Pagination'
import { deleteOrder, getOrder, updateOrder } from './../../../store/actions/order'
import { getPromotions } from './../../../store/actions/promotions'
import { numberInputFormat } from './../../../utils/numberInputFormat'
import styles from './styles'

const AdminOrder = props => {
    //get state from redux
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const orders = useSelector(state => state.order.data)
    const allPromotions = useSelector(state => state.promotions.data)
    const { classes } = props

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    const [isView, setIsView] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [viewObject, setViewObject] = useState({
        id: '',
        cusName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        name: '',
        promotion: [],
        img: '',
        price: '',
        type: '',
        product_color: '',
        collection: '',
        newBox: '',
        fullbox: '',
        notes: '',
        create_date: '',
    })

    const [editObject, setEditObject] = useState({
        id: '',
        customer_name: '',
        customer_phone: '',
        customer_address: '',
        customer_city: '',
        customer_email: '',
        customer_notes: '',
        product_name: '',
        product_price: '',
        product_sku: '',
        product_color: '',
        product_promotion: [],
        product_newBox: '',
        product_fullbox: '',
    })

    var arrayOrder = []
    orders !== null &&
        orders !== undefined &&
        Object.keys(orders)?.map(element => {
            const key = element
            if (orders[key] !== null) {
                const productName = orders[key].product_name ? orders[key].product_name : ''
                const productImg = orders[key].product_image ? orders[key].product_image : ''
                const productPrice = orders[key].product_price ? orders[key].product_price : ''
                const productNewBox = orders[key].product_newBox ? orders[key].product_newBox : ''
                const productFullBox = orders[key].product_fullbox ? orders[key].product_fullbox : ''
                const productColor = orders[key].product_color ? orders[key].product_color : ''
                const productType = orders[key].product_sku ? orders[key].product_sku : ''
                const promotion = orders[key].product_promotion ? orders[key].product_promotion : ''
                const name = orders[key].customer_name ? orders[key].customer_name : ''
                const phone = orders[key].customer_phone ? orders[key].customer_phone : ''
                const email = orders[key].customer_email ? orders[key].customer_email : ''
                const city = orders[key].customer_city ? orders[key].customer_city : ''
                const address = orders[key].customer_address ? orders[key].customer_address : ''
                const notes = orders[key].customer_notes ? orders[key].customer_notes : ''
                const create_date = orders[key].create_date ? orders[key].create_date : ''
                arrayOrder.push({
                    id: key,
                    name: productName,
                    img: productImg,
                    price: productPrice,
                    newBox: productNewBox,
                    fullbox: productFullBox,
                    product_color: productColor,
                    type: productType,
                    promotion: promotion,
                    cusName: name,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    notes: notes,
                    create_date: create_date,
                })
            }
        })

    const idRef = useRef()

    //X??a ????n h??ng
    const handleDelete = id => {
        handleDialog('B??n c?? ch???c ch???n mu???n x??a kh??ng ?', true)
        idRef.current = id
    }

    //Thi???t l???p tr???ng th??i DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    //N???i dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    //B???n c?? ch???c ch???n mu???n x??a
    const areUSureDelete = status => {
        if (status) {
            dispatch(deleteOrder(idRef.current))
            dispatch(getOrder())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    //Ph??n trang
    const allList = [...arrayOrder].sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
    const totalLists = allList.length
    const pageLimit = 10
    const [currentList, setCurrentList] = useState([])

    const onPageChanged = value => {
        let offset = (value - 1) * pageLimit
        const currentList = [...searchResults]
            .slice(offset, offset + pageLimit)
            .sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
        setCurrentList(currentList)
    }

    useEffect(() => {
        setCurrentList([...allList].slice(0, pageLimit))
    }, [orders])

    //K???t qu??? Search
    const handleSearch = e => {
        let value = e.target.value
        setSearchTerm(value)
    }
    useEffect(() => {
        const results = arrayOrder?.filter(e => {
            return Object.values(e).join('').toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults(results)
        setCurrentList([...results].slice(0, pageLimit))
    }, [searchTerm, orders])

    //Cick ????? edit ????n h??ng
    const handleViewOrder = order => {
        setViewObject(order)
        setIsView(true)
    }

    const handleTurnBackOrder = () => {
        setIsView(false)
        setIsEdit(false)
    }

    const handleTurnBackOrderDetail = () => {
        setIsView(true)
        setIsEdit(false)
    }

    const handleCancelEditOrder = () => {
        setIsView(true)
        setIsEdit(false)
    }

    //L???c khuy???n m??i t??? b???ng promotion d???a tr??n id
    const ckPromotionId =
        editObject.product_promotion &&
        editObject.product_promotion?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    const ckPromoViewId =
        viewObject.promotion?.length &&
        viewObject.promotion?.map(item => {
            if (item !== null) {
                return item.id
            }
        })

    //Th??m/b???t promotion
    const handleChangePromotion = promotionId => e => {
        if (ckPromotionId?.includes(promotionId)) {
            //X??a promotion c?? s???n trong s???n ph???m
            const newArrWithRemovedPromotion =
                editObject.product_promotion.length &&
                editObject.product_promotion?.filter(e => {
                    return e.id !== promotionId
                })

            setEditObject(prevState => ({
                ...prevState,
                product_promotion: newArrWithRemovedPromotion,
            }))
        } else {
            //Th??m id v??o b???ng s???n ph???m
            const promotionIndex =
                allPromotions &&
                Object.values(allPromotions)?.filter(promotion => {
                    if (promotion) {
                        return promotion.id === promotionId
                    }
                })

            const newArrWithAddedPromotion = [...editObject.product_promotion, { id: promotionIndex[0].id }]

            setEditObject(prevState => ({
                ...prevState,
                product_promotion: [...newArrWithAddedPromotion],
            }))
        }
    }

    const handleEditOrder = order => {
        setIsEdit(true)
        setEditObject({
            id: order.id,
            customer_name: order.cusName,
            customer_phone: order.phone,
            customer_address: order.address ? order.address : '',
            customer_city: order.city ? order.city : '',
            customer_email: order.email ? order.email : '',
            customer_notes: order.notes ? order.notes : '',
            product_name: order.name ? order.name : '',
            product_price: order.price ? order.price : '',
            product_sku: order.type ? order.type : '',
            product_color: order.product_color,
            product_promotion: order.promotion,
            product_newBox: order.newBox,
            product_fullbox: order.fullbox,
        })
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditObject(prevState => ({
            ...prevState,
            [name]: value,
        }))

        if (name === 'product_price') {
            e.target.value = numberInputFormat(value)
        }
    }

    //Submit edit
    const handleSubmitOrder = async () => {
        try {
            dispatch(updateOrder(editObject))
            setIsEdit(false)
            dispatch(getOrder())
            setViewObject({
                id: viewObject.id,
                create_date: viewObject.create_date,
                cusName: editObject.customer_name,
                phone: editObject.customer_phone,
                address: editObject.customer_address,
                city: editObject.customer_city,
                email: editObject.customer_email,
                notes: editObject.customer_notes,
                name: editObject.product_name,
                price: editObject.product_price,
                type: editObject.product_sku,
                promotion: editObject.product_promotion,
                newBox: editObject.product_newBox,
                fullbox: editObject.product_fullbox,
            })
        } catch (err) {
            console.log(err)
        }
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
                {!isView ? (
                    <div>
                        <Paper
                            component='form'
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 400,
                                marginBottom: '10px',
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder='T??m ki???m ????n h??ng'
                                value={searchTerm}
                                inputProps={{ 'aria-label': 'T??m ki???m ????n h??ng' }}
                                onChange={handleSearch}
                            />
                            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>M?? ????N H??NG</StyledTableCell>
                                        <StyledTableCell>T??N S???N PH???M</StyledTableCell>
                                        <StyledTableCell align='left'>H??NH S???N PH???M</StyledTableCell>
                                        <StyledTableCell align='left'>GI??</StyledTableCell>
                                        <StyledTableCell align='left'>M??U S???C</StyledTableCell>
                                        <StyledTableCell align='left'>LO???I</StyledTableCell>
                                        <StyledTableCell align='left'>T??N KH??CH H??NG</StyledTableCell>
                                        <StyledTableCell align='left'>??i???n tho???i</StyledTableCell>
                                        <StyledTableCell align='left'>?????a ch???</StyledTableCell>
                                        <StyledTableCell align='left'>Ghi ch??</StyledTableCell>
                                        <StyledTableCell align='left'>Ng??y ?????t h??ng</StyledTableCell>
                                        <StyledTableCell align='right'>S???A</StyledTableCell>
                                        <StyledTableCell align='right'>X??A</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentList !== null &&
                                        currentList !== undefined &&
                                        currentList?.map((order, idx) => {
                                            return (
                                                order && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{order.id}</StyledTableCell>
                                                        <StyledTableCell className={classes.tbNameStyle}>
                                                            {order.name ? order.name : ''}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left' className={classes.thumbnail}>
                                                            <img src={order.img} alt={order.name ? order.name : ''} />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {order.price
                                                                ? `${numberInputFormat(order.price.toString())} ??`
                                                                : 'Li??n h???'}
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <span
                                                                className={classes.pColor}
                                                                style={{ backgroundColor: `${order.product_color}` }}
                                                            ></span>
                                                        </StyledTableCell>
                                                        <StyledTableCell>{order.type}</StyledTableCell>
                                                        <StyledTableCell>{order.cusName}</StyledTableCell>
                                                        <StyledTableCell>{order.phone}</StyledTableCell>
                                                        <StyledTableCell>{`${order.address}, ${order.city}`}</StyledTableCell>
                                                        <StyledTableCell>{order.notes}</StyledTableCell>
                                                        <StyledTableCell>{order.create_date}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleViewOrder(order)}
                                                            >
                                                                <RemoveRedEyeIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(order.id)}
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
                        <PaginationButtons
                            count={Math.ceil(totalLists / pageLimit)}
                            handleChangePage={value => {
                                onPageChanged(value)
                            }}
                        />
                    </div>
                ) : (
                    <Grid>
                        {!isEdit ? (
                            <div>
                                <Grid style={{ paddingBottom: '20px' }}>
                                    <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => handleEditOrder(viewObject)}
                                        >
                                            <EditIcon />
                                            S???a ????n h??ng
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={handleTurnBackOrder}>
                                            <ArrowBackIosIcon /> Danh s??ch ????n h??ng
                                        </Button>
                                    </Stack>
                                </Grid>
                                <TableContainer component={Paper}>
                                    <Table>
                                        {viewObject !== null && viewObject !== undefined && (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ID ????n h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ng??y ?????t h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.create_date}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        S??? ??i???n tho???i
                                                    </TableCell>
                                                    <TableCell>{viewObject.phone}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{viewObject.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ?????a ch???
                                                    </TableCell>
                                                    <TableCell>
                                                        {viewObject.address}, {viewObject.city}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n kh??ch h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.cusName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n s???n ph???m
                                                    </TableCell>
                                                    <TableCell>{viewObject.name}</TableCell>
                                                </TableRow>
                                                {viewObject.type ? (
                                                    <TableRow>
                                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                                            Dung l?????ng
                                                        </TableCell>
                                                        <TableCell>{viewObject.type}</TableCell>
                                                    </TableRow>
                                                ) : (
                                                    ''
                                                )}
                                                {viewObject.product_color ? (
                                                    <TableRow>
                                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                                            M??u s???c
                                                        </TableCell>
                                                        <TableCell>
                                                            <Grid style={{ display: 'flex' }}>
                                                                <span
                                                                    className={classes.colorStyle}
                                                                    style={{
                                                                        background: `${viewObject.product_color}`,
                                                                    }}
                                                                ></span>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    ''
                                                )}
                                                {ckPromoViewId ? (
                                                    <TableRow>
                                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                                            Khuy???n m??i
                                                        </TableCell>
                                                        <TableCell>
                                                            <ul>
                                                                {allPromotions !== null &&
                                                                    allPromotions !== undefined &&
                                                                    Object.values(allPromotions)?.map((item, idx) => {
                                                                        if (ckPromoViewId?.includes(item.id)) {
                                                                            return (
                                                                                <li key={idx}>
                                                                                    - {item.promotion_text}
                                                                                </li>
                                                                            )
                                                                        }
                                                                    })}
                                                            </ul>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    ''
                                                )}
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        H??nh s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <img
                                                            className={classes.thumbnail}
                                                            src={viewObject.img}
                                                            alt=''
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Gi?? s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        {numberInputFormat(viewObject.price.toString())}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??nh tr???ng m???i
                                                    </TableCell>
                                                    <TableCell>
                                                        {viewObject.fullbox === 1 ? '???? s??? d???ng' : 'Fullbox'}
                                                    </TableCell>
                                                </TableRow>
                                                {viewObject.newBox ? (
                                                    <TableRow>
                                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                                            % M???i
                                                        </TableCell>
                                                        <TableCell>{viewObject.newBox}</TableCell>
                                                    </TableRow>
                                                ) : (
                                                    ''
                                                )}
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ghi ch??
                                                    </TableCell>
                                                    <TableCell>{viewObject.notes}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            </div>
                        ) : (
                            <div>
                                <Grid style={{ paddingBottom: '20px' }}>
                                    <Button variant='contained' color='primary' onClick={handleTurnBackOrderDetail}>
                                        <ArrowBackIosIcon />
                                        Xem ????n h??ng
                                    </Button>
                                </Grid>
                                <TableContainer component={Paper}>
                                    <Table>
                                        {viewObject !== null && viewObject !== undefined && (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        S??? ??i???n tho???i
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_phone}
                                                            name='customer_phone'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_email}
                                                            name='customer_email'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ?????a ch??? chi ti???t
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_address}
                                                            name='customer_address'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Th??nh Ph???
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_city}
                                                            name='customer_city'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n kh??ch h??ng
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_name}
                                                            name='customer_name'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.product_name}
                                                            name='product_name'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Dung l?????ng
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.product_sku}
                                                            name='product_sku'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        M??u s???c
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.product_color}
                                                            name='product_color'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Khuy???n m??i
                                                    </TableCell>
                                                    <TableCell>
                                                        {allPromotions !== null &&
                                                            allPromotions !== undefined &&
                                                            Object.values(allPromotions)?.map(
                                                                (ckPromotion, idx) =>
                                                                    ckPromotion && (
                                                                        <FormControlLabel
                                                                            key={idx}
                                                                            label={ckPromotion.promotion_text}
                                                                            control={
                                                                                <Checkbox
                                                                                    defaultChecked={ckPromotionId?.includes(
                                                                                        ckPromotion.id
                                                                                    )}
                                                                                    name='ckPromotion'
                                                                                    color='primary'
                                                                                    onChange={handleChangePromotion(
                                                                                        ckPromotion.id
                                                                                    )}
                                                                                />
                                                                            }
                                                                        />
                                                                    )
                                                            )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        H??nh s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <img
                                                            className={classes.thumbnail}
                                                            src={viewObject.img}
                                                            alt=''
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Gi?? s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={2}>
                                                                <TextField
                                                                    id='outlined-size-small'
                                                                    size='small'
                                                                    fullWidth
                                                                    defaultValue={
                                                                        editObject.product_price
                                                                            ? numberInputFormat(
                                                                                  editObject.product_price.toString()
                                                                              )
                                                                            : ''
                                                                    }
                                                                    name='product_price'
                                                                    onChange={handleEditOnchage}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??nh tr???ng m???i
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl>
                                                            <Select
                                                                labelId='demo-simple-select-label'
                                                                id='demo-simple-select'
                                                                defaultValue={editObject.product_fullbox}
                                                                name='product_fullbox'
                                                                onChange={handleEditOnchage}
                                                            >
                                                                <MenuItem value={1}>???? s??? d???ng</MenuItem>
                                                                <MenuItem value={2}>Fullbox</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        % M???i
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={2}>
                                                                <TextField
                                                                    id='outlined-size-small'
                                                                    size='small'
                                                                    fullWidth
                                                                    defaultValue={editObject.product_newBox}
                                                                    name='product_newBox'
                                                                    onChange={handleEditOnchage}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ghi ch??
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextareaAutosize
                                                            id='outlined-size-small'
                                                            size='small'
                                                            defaultValue={editObject.customer_notes}
                                                            name='customer_notes'
                                                            style={{ width: '100%' }}
                                                            minRows={4}
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                                <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                                    <Button variant='contained' color='primary' onClick={handleCancelEditOrder}>
                                        H???y
                                    </Button>
                                    <Button variant='contained' color='secondary' onClick={handleSubmitOrder}>
                                        L??u
                                    </Button>
                                </Stack>
                            </div>
                        )}
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default withStyles(styles)(AdminOrder)
