import authRoute from "./auth/index.js";
import { cartRoute } from "./cart/index.js";
import { meRoute } from "./me/index.js";
import { ordersRoute } from "./order/index.js";
import { productsRoute } from "./products/index.js";
const api = async (fastify) => {
    fastify.register(authRoute, { prefix: "/auth" });
    fastify.register(productsRoute, { prefix: "/products" });
    fastify.register(meRoute, { prefix: "/me" });
    fastify.register(cartRoute, { prefix: "/cart" });
    fastify.register(ordersRoute, { prefix: "/order" });
};
export default api;
//# sourceMappingURL=index.js.map