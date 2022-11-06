import { Product } from "@prisma/client";
import db from "../lib/db.js";
import AppError from "../lib/AppError.js";
import { PatchData } from "../routes/api/products/index.js";

const productsService = {
  async getAllProducts() {
    const products = await db.product.findMany({
      include: {
        Categories: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { products };
  },
  async getProduct({ productId }: { productId: string }) {
    const product = await db.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        Categories: true,
        likes: true,
      },
    });
    return { product };
  },
  async createProduct({
    stock,
    name,
    price,
    imageUrl,
  }: {
    name: string;
    stock: number;
    price: number;
    imageUrl: string;
  }) {
    const product = await db.product.create({
      data: {
        stock,
        name,
        price,
        imageUrl,
      },
      include: {
        Categories: true,
        likes: true,
      },
    });
    return { product };
  },
  async deleteProduct({ productId }: { productId: string }) {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    return { product };
  },
  async patchProduct({
    productId,
    productData,
  }: {
    productId: string;
    productData: PatchData;
  }) {
    const product = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...productData,
      },
    });
    return { product };
  },
};

export default productsService;
