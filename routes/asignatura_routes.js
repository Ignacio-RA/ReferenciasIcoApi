import express from "express"
import { registroAsignatura,
    obtenerAsignaturas, 
    obtenerAsignatura,
    actualizarAsignatura,
    eliminarAsignatura } from "../controllers/asignaturaController.js";


const asignaturaRouter = express.Router()

// Ruta para registrar una nueva asignatura (CREATE)
asignaturaRouter.post('/', registroAsignatura)

// Ruta para obtener todas las asignaturas (READ)
asignaturaRouter.get('/', obtenerAsignaturas)
// Ruta para obtener una asignatura por su ID (READ)
asignaturaRouter.get('/:id', obtenerAsignatura)

// Ruta para actualizar una asignatura por su ID (UPDATE)
asignaturaRouter.patch('/:id', actualizarAsignatura)

// Ruta para eliminar una asignatura por su ID (DELETE)
asignaturaRouter.delete('/:id', eliminarAsignatura)

export default asignaturaRouter