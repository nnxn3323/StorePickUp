import { Product } from "@prisma/client";
import db from "../lib/db.js";
import AppError from "../lib/AppError.js";
import { ORDER_STATUS } from "../constants/constants.js";

const cartService = {
  async addToCart({
    userId,
    productId,
    amount,
  }: {
    userId: string;
    productId: string;
    amount: number;
  }) {
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
  async getCart({ userId }: { userId: string }) {
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
  async removeFromCart({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
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
