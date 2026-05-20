import db from "../config/db.js";
import Usuario from "../models/usuario.js";
import "../models/relaciones.js";

//Función para registrar un nuevo usuario (CREATE)
const registroUsuario = async (req,res)=>{
    try {
        const { nombre, ap_paterno, ap_materno, correo, password, fecha_registro } = req.body
        
        const nuevoUsuario = await Usuario.create({
            nombre,
            ap_paterno,
            ap_materno,
            correo,
            password,
            fecha_registro: fecha_registro || new Date()
        })
        
        // Se responde con un mensaje de éxito y estatus 201 (Created)
        return res.status(201).json({
            msg: "Usuario registrado exitosamente",
            usuario: {
                id: nuevoUsuario.id_usuario,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                admin: nuevoUsuario.admin,
                fecha_registro: nuevoUsuario.fecha_registro
            }
        })

    } catch (error) {
        console.error("Error al registrar usuario:", error)
        
        // Si el error es por duplicado (ej. el correo ya existe)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: "El correo electrónico ya se encuentra registrado."
            })
        }

        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Funcion para obtener todos los usuarios (READ)
const obtenerUsuarios = async (req,res)=>{
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id_usuario', 'nombre', 'ap_paterno', 'ap_materno', 'correo','admin', 'fecha_registro']
        })
        // Se responde con un mensaje de éxito, la lista de usuarios y estatus 200 (OK)
        return res.status(200).json({
            msg: "Usuarios obtenidos exitosamente",
            usuarios
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Funcion para obtener un usuario por su ID (READ)
const obtenerUsuario = async (req,res)=>{
    try {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id, {
            attributes: ['id_usuario', 'nombre', 'ap_paterno', 'ap_materno', 'correo','admin', 'fecha_registro']
        })
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado."
            })
        }

        // Se responde con un mensaje de éxito, el usuario y estatus 200 (OK)
        return res.status(200).json({
            msg: "Usuario obtenido exitosamente",
            usuario
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

//Función para actualizar un usuario por su ID (UPDATE)
const actualizarUsuario = async (req,res)=>{
    const { id } = req.params

    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado."
            })
        }

        await usuario.update(req.body)
        
        // Se responde con un mensaje de éxito, el usuario actualizado y estatus 200 (OK)
        return res.status(200).json({
            msg: "Usuario actualizado exitosamente",
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                ap_paterno: usuario.ap_paterno,
                ap_materno: usuario.ap_materno,
                correo: usuario.correo,
                admin: usuario.admin,
            }
        })
    } catch (error) {
        console.error("Error al actualizar usuario:", error)
        // Si el error es por duplicado (ej. el correo ya existe)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: "El correo electrónico ya se encuentra registrado."
            })
        }
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

//Función para eliminar un usuario por su ID (DELETE)
const eliminarUsuario = async (req,res)=>{
    const { id } = req.params
    
    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado."
            })
        }

        await usuario.destroy()

        // Se responde con un mensaje de éxito y estatus 200 (OK)
        return res.status(200).json({
            msg: "Usuario eliminado exitosamente"
        })
    } catch (error) {
        console.error("Error al eliminar usuario:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

export { registroUsuario, 
    obtenerUsuarios, 
    obtenerUsuario, 
    actualizarUsuario, 
    eliminarUsuario }