import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { validateToken } from "../lib/tokens.js";
const { JsonWebTokenError } = jwt;
const authPluginAsync = async (fastify) => {
    fastify.decorateRequest("user", null);
    fastify.decorateRequest("isExpiredToken", false);
    fastify.addHook("preHandler", async (request) => {
        const token = request.headers.authorization?.split("Bearer ")[1] ??
            request.cookies.access_token;
        if (request.cookies.refresh_token && !token) {
            request.isExpiredToken = true;
            return;
        }
        if (!token)
            return;
        try {
            const decoded = await validateToken(token);
            request.user = {
                userId: decoded.userId,
                username: decoded.username,
            };
        }
        catch (e) {
            if (e instanceof JsonWebTokenError) {
                if (e.name === "TokenExpiredError") {
                    request.isExpiredToken = true;
                }
            }
        }
    });
};
export const authPlugin = fp(authPluginAsync, {
    name: "authPlugin",
});
//# sourceMappingURL=authPlugin.js.map