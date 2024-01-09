import { Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


const validateToken = (req:Request, res:Response, next:NextFunction) =>{
    const headerToken = req.headers['authorization'];
    if(headerToken!= undefined && headerToken.startsWith('Bearer ')){
        const bearerToken = headerToken.slice(7)

        try {
            const tokenValido = jwt.verify(bearerToken, process.env.SECRET_KEY!)
            console.log(tokenValido);
            next()
            
        } catch (error) {
            res.status(400).json({
                error: 'token no valido'
            })
        }

    }else{
        res.status(400).json({
            error:'acceso denegado'
        })
    }
}


export default validateToken