import express from "express"
import router from "./routes/inicio_router.js"
import usuarioRouter from "./routes/usuario_routes.js";
import autorRouter from "./routes/autor_routes.js"
import db from "./config/db.js"
import './models/relaciones.js';

//Crear la aplicación
const app = express()

//accesos a los datos del formulario
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Conexión a la base de datos
const conectarDB = async () => {
    try {
        await db.authenticate();
        
        await db.sync(); 
        
        console.log("Conexion exitosa y tablas sincronizadas");
    } catch (error) {
        console.log("Error al conectar o sincronizar:", error);
    }
}

conectarDB();

//routing
app.use("/", router)
app.use("/usuarios", usuarioRouter)
app.use("/autores", autorRouter)

//definiendo el puerto
const port = 4800;
app.listen(port, () => {
  console.log(`Esperando peticiones en el puerto ${port}`)
})