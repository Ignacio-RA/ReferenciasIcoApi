import express from "express"
import { registroReferencia,
    obtenerReferencias, 
    obtenerReferencia,
    actualizarReferencia,
    eliminarReferencia,
    obtenerReferenciasAsignatura,
    obtenerReferenciasAutor } from "../controllers/referenciaController.js"
import checkAuth from "../middleware/checkAuth.js";
import checkAdmin from "../middleware/checkAdmin.js";

const referenciaRouter = express.Router();

//Ruta para registrar una nueva referencia (CREATE)
referenciaRouter.post('/', checkAuth, registroReferencia)

//Ruta para obtener todas las referencias (READ)
referenciaRouter.get('/',  obtenerReferencias)
//Ruta para obtener una sola referencia por su ID (READ)
referenciaRouter.get('/:id', checkAuth, obtenerReferencia)

//Ruta para actualizar una referencia por su ID (UPDATE)
referenciaRouter.patch('/:id', checkAuth, actualizarReferencia)

//Ruta para eliminar una referencia por su ID (DELETE)
referenciaRouter.delete('/:id', checkAuth, checkAdmin, eliminarReferencia)

//Ruta para obtener referencias por asignatura
referenciaRouter.get('/asignatura/:id', obtenerReferenciasAsignatura)
//Ruta para obtener referencias por autor
referenciaRouter.get('/autor/:id', obtenerReferenciasAutor)

export default referenciaRouter