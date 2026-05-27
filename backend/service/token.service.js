import jwt from "jsonwebtoken";

export function createToken(id){
    const payload={
        id:id,
    }
    return jwt.sign(payload, process.env.JWT_SECRET)
}