import { Type } from '@sinclair/typebox';
export const Nullable = (type) => Type.Union([type, Type.Null()]);
//# sourceMappingURL=typebox.js.map