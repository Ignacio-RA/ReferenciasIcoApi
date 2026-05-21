import express from "express";
import { registroAutor,
    obtenerAutores,
    obtenerAutor,
    actualizarAutor,
    eliminarAutor } from "../controllers/autorController.js"
import checkAuth from "../middleware/checkAuth.js"
import checkAdmin from "../middleware/checkAdmin.js"

const autorRouter = express.Router();

// Ruta para registrar un nuevo autor (CREATE)
autorRouter.post('/', checkAuth, registroAutor)

// Ruta para obtener todos los autores (READ)
autorRouter.get('/', checkAuth, obtenerAutores)
// Ruta para obtener un autor por su ID (READ)
autorRouter.get('/:id', checkAuth, obtenerAutor)

// Ruta para actualizar un autor por su ID (UPDATE)
autorRouter.patch('/:id', checkAuth, checkAdmin, actualizarAutor)

// Ruta para eliminar un autor por su ID (DELETE)
autorRouter.delete('/:id', checkAuth, checkAdmin, eliminarAutor)

export default autorRouter