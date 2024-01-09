import { Request, Response } from "express";
import connection from "../db/connection";


export const getDefault = (req:Request, res:Response)=>{
    res.json({
        msg:'api funcionando'
    })
}