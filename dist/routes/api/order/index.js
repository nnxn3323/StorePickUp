import { createAuthorizedRoute } from "../../../plugins/requireAuthPlugin.js";
import orderService from "../../../services/order.service.js";
import { cancelOrderSchema, createOrderSchema, finishOrderSchema, getOrderHistorySchema, getOrderStatusSchema, } from "./schema.js";
export const ordersRoute = async (fastify) => {
    fastify.register(authordersRoute);
    fastify.post("/finish/:orderId/user/:userId", { schema: finishOrderSchema }, async (request) => {
        const { orderId, userId } = request.params;
        return orderService.finishOrder({
            orderId,
            userId,
        });
    });
};
export const authordersRoute = createAuthorizedRoute(async (fastify) => {
    fastify.post("/", { schema: createOrderSchema }, async (request) => {
        const { cash } = request.body;
        return orderService.createOrder({
            userId: request.user?.userId,
            cash,
        });
    });
    fastify.get("/history", { schema: getOrderHistorySchema }, async (request) => {
        return orderService.getOrderHistory({
            userId: request.user?.userId,
        });
    });
    fastify.get("/status/:orderId", { schema: getOrderStatusSchema }, async (request) => {
        const { orderId } = request.params;
        return orderService.getOrderStatus({
            orderId,
        });
    });
    fastify.post("/cancel/:orderId", { schema: cancelOrderSchema }, async (request) => {
        const { orderId } = request.params;
        return orderService.cancelOrder({
            orderId,
        });
    });
});
//# sourceMappingURL=index.js.map