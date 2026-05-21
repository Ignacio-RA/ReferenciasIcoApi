import db from "../config/db.js";
import { Area, Asignatura } from "../models/relaciones.js";

//Función para registrar un nuevo area (CREATE)
const registroArea = async (req,res)=>{
    try {
        const { nombre } = req.body
        
        const nuevaArea = await Area.create({
            nombre
        })
        
        // Se responde con un mensaje de éxito y estatus 201 (Created)
        return res.status(201).json({
            msg: "Area registrada exitosamente",
            area: nuevaArea
        })
    } catch (error) {
        console.error("Error al registrar area:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Funcion para obtener todas las areas (READ)
const obtenerAreas = async (req, res) => {
    try {
        const areas = await Area.findAll({
            attributes: [
                'id_area', 
                'nombre',
                // Subconsulta SQL nativa para contar las asignaturas por área
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM asignatura AS a
                        WHERE a.id_area = area.id_area
                    )`),
                    'total_asignaturas' // La propiedad que aparecerá en tu JSON
                ]
            ],
            order: [['id_area', 'ASC']] // Ordenadas por su ID
        });

        return res.status(200).json({
            msg: "Areas obtenidas exitosamente",
            total: areas.length,
            areas
        });

    } catch (error) {
        console.error("Error al obtener áreas:", error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        });
    }
};

// Funcion para obtener un area por su ID (READ)
const obtenerArea = async (req,res)=>{
    try {
        const { id } = req.params
        const area = await Area.findByPk(id, {
            attributes: ['id_area', 'nombre']
        })

        if (!area) {
            return res.status(404).json({
                msg: "Area no encontrada"
            })
        }

        // Se responde con un mensaje de éxito, el area encontrada y estatus 200 (OK)
        return res.status(200).json({
            msg: "Area obtenida exitosamente",
            area
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para actualizar un area por su ID (UPDATE)
const actualizarArea = async (req,res)=>{
    const { id } = req.params

    try {
        const area = await Area.findByPk(id)
        if (!area) {
            return res.status(404).json({
                msg: "Area no encontrada"
            })
        }

        await area.update(req.body)
        
        // Se responde con un mensaje de éxito, el area actualizado y estatus 200 (OK)
        return res.status(200).json({
            msg: "Area actualizada exitosamente",
            area: {
                id: area.id_area,
                nombre: area.nombre
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para eliminar un area por su ID (DELETE)
const eliminarArea = async (req,res)=>{
    const { id } = req.params

    try {
        const area = await Area.findByPk(id)
        if (!area) {
            return res.status(404).json({
                msg: "Area no encontrada"
            })
        }

        await area.destroy()
        
        // Se responde con un mensaje de éxito y estatus 200 (OK)
        return res.status(200).json({
            msg: "Area eliminada exitosamente",
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

export { registroArea, obtenerAreas, obtenerArea, actualizarArea, eliminarArea }