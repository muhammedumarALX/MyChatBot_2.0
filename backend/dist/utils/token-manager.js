import jwt from "jsonwebtoken";
//generates an access token using JWT
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
//# sourceMappingURL=token-manager.js.map