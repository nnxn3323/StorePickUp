import { createAuthorizedRoute } from "../../../plugins/requireAuthPlugin.js";
import productsService from "../../../services/products.service.js";
import { createProductSchema, deleteProductsSchema, getAllProductsSchema, getProductSchema, patchProductsSchema, } from "./schema.js";
export const productsRoute = createAuthorizedRoute(async (fastify) => {
    fastify.post("/", { schema: createProductSchema }, async (request) => {
        const { name, price, stock, imageUrl } = request.body;
        return productsService.createProduct({
            name,
            stock,
            price,
            imageUrl,
        });
    });
    fastify.get("/all", { schema: getAllProductsSchema }, async (request) => {
        return productsService.getAllProducts();
    });
    fastify.get("/:productId", { schema: getProductSchema }, async (request) => {
        const { productId } = request.params;
        return productsService.getProduct({ productId });
    });
    fastify.delete("/:productId", { schema: deleteProductsSchema }, async (request) => {
        const { productId } = request.params;
        return productsService.deleteProduct({ productId });
    });
    fastify.patch("/:productId", { schema: patchProductsSchema }, async (request) => {
        const { productId } = request.params;
        const { price, name, stock, imageUrl } = request.body;
        const productData = {
            price: price ? price : undefined,
            name: name ? name : undefined,
            stock: stock ? stock : undefined,
            imageUrl: imageUrl ? imageUrl : undefined,
        };
        return productsService.patchProduct({ productId, productData });
    });
});
//# sourceMappingURL=index.js.map