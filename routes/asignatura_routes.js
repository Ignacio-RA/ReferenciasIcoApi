import express from "express"
import { registroAsignatura,
    obtenerAsignaturas, 
    obtenerAsignatura,
    actualizarAsignatura,
    eliminarAsignatura } from "../controllers/asignaturaController.js"
import checkAuth from "../middleware/checkAuth.js"
import checkAdmin from "../middleware/checkAdmin.js"


const asignaturaRouter = express.Router()

// Ruta para registrar una nueva asignatura (CREATE)
asignaturaRouter.post('/', checkAuth, checkAdmin, registroAsignatura)

// Ruta para obtener todas las asignaturas (READ)
asignaturaRouter.get('/', checkAuth, obtenerAsignaturas)
// Ruta para obtener una asignatura por su ID (READ)
asignaturaRouter.get('/:id', checkAuth, obtenerAsignatura)

// Ruta para actualizar una asignatura por su ID (UPDATE)
asignaturaRouter.patch('/:id',checkAuth, checkAdmin, actualizarAsignatura)

// Ruta para eliminar una asignatura por su ID (DELETE)
asignaturaRouter.delete('/:id', checkAuth, checkAdmin, eliminarAsignatura)

export default asignaturaRouter