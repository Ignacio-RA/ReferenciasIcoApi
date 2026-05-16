import express from "express";
import { registroAutor,
    obtenerAutores,
    obtenerAutor,
    actualizarAutor,
    eliminarAutor } from "../controllers/autorController.js";

const autorRouter = express.Router();

// Ruta para registrar un nuevo autor (CREATE)
autorRouter.post('/', registroAutor)

// Ruta para obtener todos los autores (READ)
autorRouter.get('/', obtenerAutores)
// Ruta para obtener un autor por su ID (READ)
autorRouter.get('/:id', obtenerAutor)

// Ruta para actualizar un autor por su ID (UPDATE)
autorRouter.patch('/:id', actualizarAutor)

// Ruta para eliminar un autor por su ID (DELETE)
autorRouter.delete('/:id', eliminarAutor)

export default autorRouter