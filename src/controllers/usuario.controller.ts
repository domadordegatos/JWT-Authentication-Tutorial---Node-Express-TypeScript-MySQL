import { Request, Response } from "express";
import connection from "../db/connection";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const addUsuario = async(req: Request, res: Response) => {

    const { nombre, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    connection.query('insert into usuarios set ?', {nombre:nombre, password:hashedPassword}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                msg: 'add usuario',
                body: req.body
            })
        }
    })
}

export const loginUser = (req: Request, res: Response) =>{

    const { nombre,password } = req.body;
    connection.query('select * from usuarios where nombre = ' +  connection.escape(nombre), (err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(data.length == 0){
                res.json({
                    msg: ' no existe el usuario en la base de datos'
                })
            }else{
                const userPassword = data[0].password;
                /* console.log(userPassword); */
                bcrypt.compare(password, userPassword).then((result)=>{
                    if(result){
                        const token = jwt.sign({
                            nombre:nombre,
                        }, process.env.SECRET_KEY!, {
                            expiresIn: '10000'
                        })
                        res.json({
                            token
                        })
                    }else{
                        res.json({
                            msg: 'PASSWORD INCORRECTO'
                        })
                    }
                })
            }
        }
    })
}