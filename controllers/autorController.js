import db from "../config/db.js";
import Autor from "../models/autor.js";
import "../models/relaciones.js";

// Función para registrar un nuevo autor (CREATE)
const registroAutor = async (req,res)=>{
    try {
        const { nombre, ap_paterno, ap_materno } = req.body
        
        const nuevoAutor = await Autor.create({
            nombre,
            ap_paterno,
            ap_materno
        })
        
        // Se responde con un mensaje de éxito y estatus 201 (Created)
        return res.status(201).json({
            msg: "Autor registrado exitosamente",
            autor: {
                id: nuevoAutor.id_autor,
                nombre: nuevoAutor.nombre
            }
        })

    } catch (error) {
        console.error("Error al registrar autor:", error)
        
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para obtener todos los autores (READ)
const obtenerAutores = async (req, res) => {
    try {
        const autores = await Autor.findAll({
            attributes: [
                'id_autor', 
                'nombre', 
                'ap_paterno', 
                'ap_materno',
                // Subconsulta SQL nativa para contar las referencias en la tabla intermedia
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM autor_referencia AS ar
                        WHERE ar.id_autor = autor.id_autor
                    )`),
                    'total_referencias' // Nombre de la propiedad que llegará al cliente
                ]
            ],
            order: [['ap_paterno', 'ASC']] // Opcional: Ordenados alfabéticamente por apellido
        });

        return res.status(200).json({
            msg: "Autores obtenidos exitosamente",
            total: autores.length,
            autores
        });

    } catch (error) {
        console.error("Error al obtener autores:", error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        });
    }
};

// Función para obtener un autor por su ID (READ)
const obtenerAutor = async (req,res)=>{
    try {
        const { id } = req.params
        const autor = await Autor.findByPk(id, {
            attributes: ['id_autor', 'nombre', 'ap_paterno', 'ap_materno']
        })
        
        if (!autor) {
            return res.status(404).json({
                msg: "Autor no encontrado."
            })
        }

        // Se responde con un mensaje de éxito, el autor encontrado y estatus 200 (OK)
        return res.status(200).json({
            msg: "Autor obtenido exitosamente",
            autor
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para actualizar un autor por su ID (UPDATE)
const actualizarAutor = async (req,res)=>{
    const { id } = req.params

    try {
        const autor = await Autor.findByPk(id)
        if (!autor) {
            return res.status(404).json({
                msg: "Autor no encontrado."
            })
        }

        await autor.update(req.body)

        // Se responde con un mensaje de éxito, el autor actualizado y estatus 200 (OK)
        return res.status(200).json({
            msg: "Autor actualizado exitosamente",
            autor
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para eliminar un autor por su ID (DELETE)
const eliminarAutor = async (req,res)=>{
    const { id } = req.params

    try {
        const autor = await Autor.findByPk(id)
        if (!autor) {
            return res.status(404).json({
                msg: "Autor no encontrado."
            })
        }

        await autor.destroy()

        // Se responde con un mensaje de éxito y estatus 200 (OK)
        return res.status(200).json({
            msg: "Autor eliminado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
} 

export {registroAutor, 
    obtenerAutores, 
    obtenerAutor, 
    actualizarAutor, 
    eliminarAutor}