import fp from "fastify-plugin";
import AppError from "../lib/AppError.js";
const requireAuthPluginAsync = async (fastify) => {
    fastify.addHook("preHandler", async (request, reply) => {
        if (request.isExpiredToken) {
            throw new AppError("Unauthorized", {
                isExpiredToken: true,
            });
        }
        if (!request.user) {
            throw new AppError("Unauthorized", {
                isExpiredToken: false,
            });
        }
    });
};
const requireAuthPlugin = fp(requireAuthPluginAsync, {
    name: "requireAuthPlugin",
});
export function createAuthorizedRoute(plugin) {
    const wrappedPlugin = async (fastify, opts) => {
        fastify.register(requireAuthPlugin);
        return plugin(fastify, opts);
    };
    return wrappedPlugin;
}
export default requireAuthPlugin;
//# sourceMappingURL=requireAuthPlugin.js.map