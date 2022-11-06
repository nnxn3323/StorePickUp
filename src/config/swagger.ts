import { SwaggerOptions } from "@fastify/swagger";

export const swaggerConfig: SwaggerOptions = {
  routePrefix: "/documentation",
  openapi: {
    info: {
      title: "Veltrends",
      description: "Veltrends API documentation",
      version: "0.1.0",
    },
    tags: [
      // { name: 'user', description: 'User related end-points' },
      // { name: 'code', description: 'Code related end-points' },
    ],
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_: any, __: any, next: any) {
      next();
    },
    preHandler: function (_: any, __: any, next: any) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
  exposeRoute: true,
};
