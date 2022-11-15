import db from "../lib/db.js";
const productsService = {
    async getAllProducts() {
        const products = await db.product.findMany({
            include: {
                Categories: true,
                likes: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { products };
    },
    async getProduct({ productId }) {
        const product = await db.product.findUniqueOrThrow({
            where: {
                id: productId,
            },
            include: {
                Categories: true,
                likes: true,
            },
        });
        return { product };
    },
    async createProduct({ stock, name, price, imageUrl, }) {
        const product = await db.product.create({
            data: {
                stock,
                name,
                price,
                imageUrl,
            },
            include: {
                Categories: true,
                likes: true,
            },
        });
        return { product };
    },
    async deleteProduct({ productId }) {
        const product = await db.product.delete({
            where: {
                id: productId,
            },
        });
        return { product };
    },
    async patchProduct({ productId, productData, }) {
        const product = await db.product.update({
            where: {
                id: productId,
            },
            data: {
                ...productData,
            },
        });
        return { product };
    },
};
export default productsService;
//# sourceMappingURL=products.service.js.map