import { Type } from "@sinclair/typebox";
import { routeSchema, } from "../../../lib/routeSchema.js";
import { ProductSchema } from "../products/schema.js";
export const CartProductSchema = Type.Object({
    id: Type.String(),
    cartId: Type.String(),
    productId: Type.String(),
    amount: Type.Integer(),
    product: ProductSchema,
});
export const CartSchema = Type.Object({
    id: Type.String(),
    userId: Type.String(),
    cartproducts: Type.Array(CartProductSchema),
});
export const addToCartSchema = routeSchema({
    tags: ["cart"],
    body: Type.Object({
        productId: Type.String(),
        amount: Type.Number(),
    }),
    response: {
        200: Type.Object({ cart: CartSchema }),
    },
});
export const removeFromCartSchema = routeSchema({
    tags: ["cart"],
    body: Type.Object({
        productId: Type.String(),
    }),
    response: {
        204: Type.Null(),
    },
});
export const getCartSchema = routeSchema({
    response: {
        200: Type.Object({ cart: CartSchema }),
    },
});
//# sourceMappingURL=schema.js.map