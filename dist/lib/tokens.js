import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET ?? "DevSecretKey";
export const tokensDuration = {
    access_token: "1h",
    refresh_token: "30d",
};
if (process.env.JWT_SECRET === undefined) {
    console.warn("JWT_SECRET is not defined in .env file");
}
export function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, {
            expiresIn: tokensDuration[payload.type],
        }, (err, token) => {
            if (err || !token) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}
export function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}
//# sourceMappingURL=tokens.js.map