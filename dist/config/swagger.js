export const swaggerConfig = {
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
        onRequest: function (_, __, next) {
            next();
        },
        preHandler: function (_, __, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
};
//# sourceMappingURL=swagger.js.map