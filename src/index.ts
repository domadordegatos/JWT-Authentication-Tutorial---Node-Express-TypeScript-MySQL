import Server from "./models/server";
import dotenv  from "dotenv";

dotenv.config();
console.log(process.env.PORT);


const serve = new Server()