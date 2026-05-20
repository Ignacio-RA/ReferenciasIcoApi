import express from "express"
import { registroUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario} from "../controllers/usuarioController.js"
import { login } from "../controllers/loginController.js"
import checkAuth from '../middleware/checkAuth.js'
import checkAdmin from "../middleware/checkAdmin.js"

const usuarioRouter = express.Router();

//Ruta para registrar un nuevo usuario (CREATE)
//Ruta protegida, solo accesible para usuarios autenticados y con rol de admin
usuarioRouter.post('/', checkAuth, checkAdmin, registroUsuario)

//Ruta para obtener todos los usuarios (READ)
usuarioRouter.get('/', checkAuth, obtenerUsuarios) 
//Ruta para obtener un usuario por su ID (READ)
usuarioRouter.get('/:id', checkAuth, obtenerUsuario)

//Ruta para actualizar un usuario por su ID (UPDATE)
//Ruta protegida, solo accesible para usuarios autenticados y con rol de admin
usuarioRouter.patch('/:id', checkAuth, checkAdmin, actualizarUsuario)

//Ruta para eliminar un usuario por su ID (DELETE)
//Ruta protegida, solo accesible para usuarios autenticados y con rol de admin
usuarioRouter.delete('/:id', checkAuth, checkAdmin, eliminarUsuario)

//Ruta para iniciar sesión (LOGIN)
usuarioRouter.post('/login', login)

export default usuarioRouter