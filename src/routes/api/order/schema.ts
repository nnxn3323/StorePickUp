import { Type } from "@sinclair/typebox";
import {
  createRouteSchema,
  routeSchema,
  RoutesType,
} from "../../../lib/routeSchema.js";

export const OrderSchema = Type.Object({
  id: Type.String(),
  userId: Type.String(),
  cash: Type.Integer(),
  orderStatus: Type.String(),
  createdAt: Type.Any(),
  qrUrl: Type.String(),
});
export const getOrderHistorySchema = routeSchema({
  response: {
    200: { orderHistory: Type.Array(OrderSchema) },
  },
});
export const getOrderStatusSchema = routeSchema({
  tags: ["orders"],
  params: Type.Object({
    orderId: Type.String(),
  }),
  response: {
    200: { order: OrderSchema },
  },
});
export const cancelOrderSchema = routeSchema({
  tags: ["orders"],
  params: Type.Object({
    orderId: Type.String(),
  }),
  response: {
    204: Type.Null(),
  },
});
export const finishOrderSchema = routeSchema({
  tags: ["orders"],
  params: Type.Object({
    orderId: Type.String(),
    userId: Type.String(),
  }),
  response: {
    204: { order: OrderSchema },
    409: Type.Null(),
  },
});
export const createOrderSchema = routeSchema({
  tags: ["orders"],
  body: Type.Object({
    cash: Type.Integer(),
  }),
  response: {
    200: { order: OrderSchema },
    409: Type.String(),
  },
});
