import db from "../lib/db.js";
const cartService = {
    async addToCart({ userId, productId, amount, }) {
        const cart = await db.cart.update({
            where: {
                userId,
            },
            data: {
                cartproducts: {
                    create: {
                        amount,
                        productId,
                    },
                },
            },
            include: {
                cartproducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return { cart };
    },
    async getCart({ userId }) {
        const cart = await db.cart.findUniqueOrThrow({
            where: {
                userId,
            },
            include: {
                cartproducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return { cart };
    },
    async removeFromCart({ userId, productId, }) {
        const cart = await db.cart.update({
            where: {
                userId,
            },
            data: {
                cartproducts: {
                    disconnect: [{ id: productId }],
                },
            },
            include: {
                cartproducts: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        return { cart };
    },
};
export default cartService;
//# sourceMappingURL=cart.service.js.map