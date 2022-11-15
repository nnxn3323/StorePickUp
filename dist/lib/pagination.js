import { Type } from '@sinclair/typebox';
import { Nullable } from './typebox.js';
export const PaginationSchema = (type) => Type.Object({
    list: Type.Array(type),
    totalCount: Type.Integer(),
    pageInfo: Type.Object({
        nextOffset: Type.Optional(Nullable(Type.Integer())),
        endCursor: Type.Optional(Nullable(Type.Integer())),
        hasNextPage: Type.Boolean(),
    }),
});
export const PaginationOptionSchema = Type.Object({
    limit: Type.Optional(Nullable(Type.Integer())),
    cursor: Type.Optional(Nullable(Type.Integer())),
});
export function createPagination(params) {
    return params;
}
//# sourceMappingURL=pagination.js.map