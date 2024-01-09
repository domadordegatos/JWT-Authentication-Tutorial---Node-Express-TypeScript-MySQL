import express, {Application} from "express";
import connection from "../db/connection";
import routesProductos from '../routes/producto.routes'
import routesDefault from "../routes/default.routes"
import routesUsuario from "../routes/usuario.routes"


class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000'
        this.listen();
        this.connectDB();
        this.midlewares()
        this.routes();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor corriendo el el puerto",this.port);
            
        })
    }

    connectDB(){
        connection.connect((err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("base de datos conectada exitosamente");
                
            }
        })
    }

    routes(){
        this.app.use('/',routesDefault)
        this.app.use('/api/productos',routesProductos)
        this.app.use('/api/usuarios',routesUsuario)
    }

    midlewares(){
        this.app.use(express.json())
    }

}

export default Server;