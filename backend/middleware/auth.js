import jwt from 'jsonwebtoken'
import {userService} from "../service/index.js";
import {status} from 'http-status'

export async function auth (req,res,next){
    const authProvider = req.headers.authorization
    if(!authProvider || !authProvider.startsWith('Bearer')){
        return res.status(status.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    const token = authProvider.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const filter={
            projection:{
                password:0
            }
        }
        console.log(decoded)
        const user = await userService.findById(decoded.id,filter);
        console.log(user)

        if(!user){
            return res.status(status.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(status.UNAUTHORIZED).json({
            success: false,
            message: 'JWT Token Expired'
        })
    }
}