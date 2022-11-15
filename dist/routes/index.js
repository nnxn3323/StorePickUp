import api from "./api/index.js";
const routes = async (fastify) => {
    fastify.register(api, { prefix: "/api" });
};
export default routes;
//# sourceMappingURL=index.js.map