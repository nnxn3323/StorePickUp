import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyCookie from "@fastify/cookie";
import Fastify, {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
} from "fastify";
import "dotenv/config";
import cors from "@fastify/cors";
import { authPlugin } from "./plugins/authPlugin.js";
import routes from "./routes/index.js";
import { swaggerConfig } from "./config/swagger.js";
import fastifySwagger from "@fastify/swagger";
const PORT = process.env.PORT || "8080";
const server = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
await server.register(fastifySwagger, swaggerConfig);
server.register(cors, {
  origin: /localhost/,
  allowedHeaders: ["Cookie", "Content-Type"],
  credentials: true,
});
// test code
server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" };
});
server.register(fastifyCookie);
server.register(authPlugin);
server.register(routes);
server.listen({ port: +PORT, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
});
