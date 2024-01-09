"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.addUsuario = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    connection_1.default.query('insert into usuarios set ?', { nombre: nombre, password: hashedPassword }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({
                msg: 'add usuario',
                body: req.body
            });
        }
    });
});
exports.addUsuario = addUsuario;
const loginUser = (req, res) => {
    const { nombre, password } = req.body;
    connection_1.default.query('select * from usuarios where nombre = ' + connection_1.default.escape(nombre), (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            if (data.length == 0) {
                res.json({
                    msg: ' no existe el usuario en la base de datos'
                });
            }
            else {
                const userPassword = data[0].password;
                /* console.log(userPassword); */
                bcrypt_1.default.compare(password, userPassword).then((result) => {
                    if (result) {
                        const token = jsonwebtoken_1.default.sign({
                            nombre: nombre,
                        }, process.env.SECRET_KEY, {
                            expiresIn: '10000'
                        });
                        res.json({
                            token
                        });
                    }
                    else {
                        res.json({
                            msg: 'PASSWORD INCORRECTO'
                        });
                    }
                });
            }
        }
    });
};
exports.loginUser = loginUser;
