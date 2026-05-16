import express from "express";
import { registroUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario} from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

//Ruta para registrar un nuevo usuario (CREATE)
usuarioRouter.post('/', registroUsuario)

//Ruta para obtener todos los usuarios (READ)
usuarioRouter.get('/', obtenerUsuarios)
//Ruta para obtener un usuario por su ID (READ)
usuarioRouter.get('/:id', obtenerUsuario)

//Ruta para actualizar un usuario por su ID (UPDATE)
usuarioRouter.patch('/:id', actualizarUsuario)

//Ruta para eliminar un usuario por su ID (DELETE)
usuarioRouter.delete('/:id', eliminarUsuario)

export default usuarioRouter