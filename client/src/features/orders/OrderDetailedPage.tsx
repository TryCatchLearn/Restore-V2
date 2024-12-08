import { Link, useParams } from "react-router-dom"
import { useFetchOrderDetailedQuery } from "./orderApi";
import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { format } from "date-fns";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function OrderDetailedPage() {
    const { id } = useParams();

    const { data: order, isLoading } = useFetchOrderDetailedQuery(+id!)

    if (isLoading) return <Typography variant="h5">Loading order...</Typography>

    if (!order) return <Typography variant="h5">Order not found</Typography>

    return (
        <Card sx={{ p: 2, maxWidth: 'md', mx: 'auto' }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant="h5" align="center">
                    Order summary for #{order.id}
                </Typography>
                <Button component={Link} to='/orders' variant='outlined'>
                    Back to orders
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography variant="h6" fontWeight='bold'>
                    Billing and delivery information
                </Typography>
                <Box component='dl'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Shipping address
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {formatAddressString(order.shippingAddress)}
                    </Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Payment info
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {formatPaymentString(order.paymentSummary)}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography variant="h6" fontWeight='bold'>
                    Order details
                </Typography>
                <Box component='dl'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Email address
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {order.buyerEmail}
                    </Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Order status
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {order.orderStatus}
                    </Typography>
                </Box>
                <Box component='dl'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Order date
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {format(order.orderDate, 'dd MMM yyyy')}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <TableContainer>
                <Table>
                    <TableBody>
                        {order.orderItems.map((item) => (
                            <TableRow key={item.productId}
                                sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                <TableCell sx={{ py: 4 }}>
                                    <Box display='flex' gap={3} alignItems='center'>
                                        <img src={item.pictureUrl}
                                            alt={item.name}
                                            style={{ width: 40, height: 40 }}
                                        />
                                        <Typography>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" sx={{ p: 4 }}>
                                    x {item.quantity}
                                </TableCell>
                                <TableCell align="right" sx={{ p: 4 }}>
                                    {currencyFormat(item.price * item.quantity)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mx={3}>
                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Subtotal
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {currencyFormat(order.subtotal)}
                    </Typography>
                </Box>
                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Discount
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300' color='green'>
                        {currencyFormat(order.discount)}
                    </Typography>
                </Box>
                <Box component='dl' display='flex' justifyContent='space-between'>
                    <Typography component='dt' variant='subtitle1' fontWeight='500'>
                        Delivery fee
                    </Typography>
                    <Typography component='dd' variant='body2' fontWeight='300'>
                        {currencyFormat(order.deliveryFee)}
                    </Typography>
                </Box>

            </Box>
            <Box component='dl' display='flex' justifyContent='space-between' mx={3}>
                <Typography component='dt' variant='subtitle1' fontWeight='500'>
                    Total
                </Typography>
                <Typography component='dd' variant='body2' fontWeight='700'>
                    {currencyFormat(order.total)}
                </Typography>
            </Box>
        </Card>
    )
}