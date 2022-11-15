import { Type } from "@sinclair/typebox";
import { routeSchema, } from "../../../lib/routeSchema.js";
import { Nullable } from "../../../lib/typebox.js";
export const ProductSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    stock: Type.Integer(),
    price: Type.Integer(),
    imageUrl: Type.String(),
});
export const getAllProductsSchema = routeSchema({
    tags: ["products"],
    response: {
        200: Type.Object({
            products: Type.Array(ProductSchema),
        }),
    },
});
export const getProductSchema = routeSchema({
    tags: ["products"],
    params: Type.Object({
        productId: Type.String(),
    }),
    response: {
        200: Type.Object({
            products: ProductSchema,
        }),
    },
});
export const deleteProductsSchema = routeSchema({
    tags: ["products"],
    params: Type.Object({
        productId: Type.String(),
    }),
    response: {
        204: Type.Null(),
    },
});
export const createProductSchema = routeSchema({
    tags: ["products"],
    body: Type.Object({
        name: Type.String(),
        stock: Type.Number(),
        imageUrl: Type.String(),
        price: Type.Number(),
    }),
    response: {
        200: { product: ProductSchema },
    },
});
export const patchProductsSchema = routeSchema({
    tags: ["products"],
    params: Type.Object({
        productId: Type.String(),
    }),
    body: Type.Object({
        name: Nullable(Type.String()),
        stock: Nullable(Type.Number()),
        price: Nullable(Type.Number()),
        imageUrl: Nullable(Type.String()),
    }),
    response: {
        204: Type.Null(),
    },
});
//# sourceMappingURL=schema.js.map