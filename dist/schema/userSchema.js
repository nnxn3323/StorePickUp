import { Type } from "@sinclair/typebox";
export const UserSchema = Type.Object({
    userId: Type.String(),
    username: Type.String(),
});
UserSchema.example = {
    id: "1",
    username: "velopert",
};
//# sourceMappingURL=userSchema.js.map