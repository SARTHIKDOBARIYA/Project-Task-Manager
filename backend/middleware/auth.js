import jwt from 'jsonwebtoken'
import {userService} from "../service/index.js";

export async function auth (req,res,next){
    const authProvider = req.headers.authorization
    if(!authProvider || authProvider.startsWith('Bearer ')){
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    const token = authProvider.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const filter={
            projection:{
                password:0
            }
        }
        const user = await userService.findById(decoded._id,filter);

        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'JWT Token Expired'
        })
    }
}