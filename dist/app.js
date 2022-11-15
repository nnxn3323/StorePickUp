import fastifyCookie from "@fastify/cookie";
import Fastify from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import { authPlugin } from "./plugins/authPlugin.js";
import routes from "./routes/index.js";
import { swaggerConfig } from "./config/swagger.js";
import fastifySwagger from "@fastify/swagger";
const PORT = process.env.PORT || "10217";
const server = Fastify({
    logger: true,
}).withTypeProvider();
await server.register(fastifySwagger, swaggerConfig);
server.register(cors, {
    origin: /localhost/,
    allowedHeaders: ["Cookie", "Content-Type"],
    credentials: true,
});
// test code
server.get("/", async (request, reply) => {
    return { hello: "world" };
});
server.register(fastifyCookie);
server.register(authPlugin);
server.register(routes);
server.listen({ port: +PORT }, (err) => {
    if (err)
        throw err;
});
//# sourceMappingURL=app.js.map