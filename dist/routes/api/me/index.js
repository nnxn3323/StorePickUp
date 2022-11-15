import { clearCookie } from "../../../lib/cookies.js";
import requireAuthPlugin from "../../../plugins/requireAuthPlugin.js";
import userService from "../../../services/user.service.js";
import { getAccountSchema, unregisterSchema, updatePasswordSchema, } from "./schema.js";
export const meRoute = async (fastify) => {
    fastify.register(requireAuthPlugin);
    fastify.get("/", { schema: getAccountSchema }, async (request) => {
        return request.user;
    });
    fastify.post("/change-password", { schema: updatePasswordSchema }, async (request, reply) => {
        const { oldPassword, newPassword } = request.body;
        await userService.changePassword({
            oldPassword,
            newPassword,
            userId: request.user?.userId,
        });
        reply.status(204);
    });
    fastify.delete("/", {
        schema: unregisterSchema,
    }, async (request, reply) => {
        await userService.unregister(request.user?.userId);
        reply.status(204);
        clearCookie(reply);
    });
};
//# sourceMappingURL=index.js.map