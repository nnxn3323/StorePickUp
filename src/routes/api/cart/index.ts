import fastify from "fastify";
import { createAuthorizedRoute } from "../../../plugins/requireAuthPlugin.js";
import cartService from "../../../services/cart.service.js";
import {
  addToCartSchema,
  getCartSchema,
  removeFromCartSchema,
} from "./schema.js";

export const cartRoute = createAuthorizedRoute(async (fastify) => {
  fastify.get("/", { schema: getCartSchema }, async (request) => {
    return cartService.getCart({
      userId: request.user?.userId!,
    }) as any;
  });
  fastify.post("/add", { schema: addToCartSchema }, async (request) => {
    const { productId, amount } = request.body;
    return cartService.addToCart({
      userId: request.user?.userId!,
      productId,
      amount,
    }) as any;
  });
  fastify.post("/remove", { schema: removeFromCartSchema }, async (request) => {
    const { productId } = request.body;
    return cartService.removeFromCart({
      userId: request.user?.userId!,
      productId,
    }) as any;
  });
});
