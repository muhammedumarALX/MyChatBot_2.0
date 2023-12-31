import jwt from "jsonwebtoken"


//generates an access token using JWT
export const createToken = (id: string, email: string, expiresIn) =>{
    const payload = {id, email}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn, 
    });

    return token;
}