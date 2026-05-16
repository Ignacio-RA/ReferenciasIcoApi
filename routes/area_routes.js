import express from "express"
import { registroArea,
    obtenerAreas,
    obtenerArea,
    actualizarArea,
    eliminarArea } from "../controllers/areaController.js"

const areaRouter = express.Router()

//Ruta para registrar un nuevo area (CREATE)
areaRouter.post('/', registroArea)

//Ruta para obtener todas las areas (READ)
areaRouter.get('/', obtenerAreas) 
//Ruta para obtener un area por su ID (READ)
areaRouter.get('/:id', obtenerArea)

//Ruta para actualizar un area por su ID (UPDATE)
areaRouter.patch('/:id', actualizarArea)

//Ruta para eliminar un area por su ID (DELETE)
areaRouter.delete('/:id', eliminarArea)

export default areaRouter