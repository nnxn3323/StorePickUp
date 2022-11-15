import db from "../lib/db.js";
import { ORDER_STATUS, QRSERVERURL } from "../constants/constants.js";
import axios from "axios";
const getQrUrl = async ({ userId, orderId, }) => {
    console.log({ userId, orderId });
    const qrurl = await axios.post(QRSERVERURL, {
        data: {
            userId,
            orderId,
        },
    });
    const url = qrurl.data.data.link;
    return url;
};
const orderService = {
    async getOrderHistory({ userId }) {
        const orderHistory = await db.order.findMany({
            where: {
                userId,
            },
            include: {
                products: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { orderHistory };
    },
    async getOrderStatus({ orderId }) {
        const order = await db.order.findUniqueOrThrow({
            where: {
                id: orderId,
            },
            include: {
                products: true,
            },
        });
        return { order };
    },
    async createOrder({ userId, cash }) {
        const userCart = await db.cart.findUniqueOrThrow({
            where: {
                userId,
            },
            include: {
                cartproducts: true,
            },
        });
        const productArr = userCart.cartproducts.map((item) => {
            return { id: item.productId };
        });
        const order_temp = await db.order.create({
            data: {
                orderStatus: ORDER_STATUS.ORDER_PAID,
                cash: cash,
                products: {
                    connect: productArr,
                },
                userId,
            },
            include: {
                products: true,
            },
        });
        const qrUrl = await getQrUrl({ userId, orderId: order_temp.id });
        const order = await db.order.update({
            where: {
                id: order_temp.id,
            },
            data: {
                qrUrl,
            },
            include: {
                products: true,
            },
        });
        await db.cart.update({
            where: {
                userId,
            },
            data: {
                cartproducts: {
                    set: [],
                },
            },
        });
        return { order };
    },
    async cancelOrder({ orderId }) {
        const order = await db.order.update({
            where: {
                id: orderId,
            },
            data: {
                orderStatus: ORDER_STATUS.ORDER_CANCELED,
            },
        });
        return { order };
    },
    async finishOrder({ orderId, userId }) {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            return null;
        const order = await db.order.update({
            where: {
                id: orderId,
            },
            data: {
                orderStatus: ORDER_STATUS.ORDER_RECEIVED,
            },
            include: {
                products: true,
            },
        });
        return { order };
    },
};
export default orderService;
//# sourceMappingURL=order.service.js.map