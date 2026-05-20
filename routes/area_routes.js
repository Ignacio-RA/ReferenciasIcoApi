import express from "express"
import { registroArea,
    obtenerAreas,
    obtenerArea,
    actualizarArea,
    eliminarArea } from "../controllers/areaController.js"
import checkAuth from "../middleware/checkAuth.js"
import checkAdmin from "../middleware/checkAdmin.js"

const areaRouter = express.Router()

//Ruta para registrar un nuevo area (CREATE)
areaRouter.post('/', checkAuth, checkAdmin, registroArea)

//Ruta para obtener todas las areas (READ)
areaRouter.get('/', checkAuth, obtenerAreas) 
//Ruta para obtener un area por su ID (READ)
areaRouter.get('/:id', checkAuth, obtenerArea)

//Ruta para actualizar un area por su ID (UPDATE)
areaRouter.patch('/:id', checkAuth, checkAdmin, actualizarArea)

//Ruta para eliminar un area por su ID (DELETE)
areaRouter.delete('/:id', checkAuth, checkAdmin, eliminarArea)

export default areaRouter