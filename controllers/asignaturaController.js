import db from "../config/db.js"
import { Asignatura, Area, Referencia} from "../models/relaciones.js"

// Función para registrar una nueva asignatura (CREATE)
const registroAsignatura = async (req, res) => {
    try {
        const { clave, nombre, id_area } = req.body

        // Verificar si el área existe
        const existeArea = await Area.findByPk(id_area)
        if (!existeArea) {
            return res.status(404).json({
                msg: `El área con ID ${id_area} no existe. No se puede asignar la asignatura.`
            });
        }

        const nuevaAsignatura = await Asignatura.create({
            clave,
            nombre,
            id_area
        })

        return res.status(201).json({
            msg: "Asignatura registrada exitosamente",
            asignatura: nuevaAsignatura
        })

    } catch (error) {
        console.error("Error al registrar asignatura:", error)

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: "La clave de la asignatura ya se encuentra registrada."
            })
        }

        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para obtener todas las asignaturas (READ)
const obtenerAsignaturas = async (req, res) => {
    try {
        const asignaturas = await Asignatura.findAll({
            attributes: ['id_asignatura', 'clave', 'nombre', 'id_area',
                [
                    db.literal(`(
                        SELECT COUNT(*)
                        FROM referencia AS r
                        WHERE r.id_asignatura = asignatura.id_asignatura
                    )`),
                    'total_referencias'
                ]
            ],
            include: {
                model: Area,
                attributes: ['nombre']
            }
        })

        // Se responde con un mensaje de éxito, la lista de asignaturas y estatus 200 (OK)
        return res.status(200).json({
            msg: "Asignaturas obtenidas exitosamente",
            total: asignaturas.length,
            asignaturas
        })
    } catch (error) {
        console.error("Error al obtener asignaturas:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para obtener una asignatura por su ID (READ)
const obtenerAsignatura = async (req, res) => {
    try {
        const { id } = req.params
        const asignatura = await Asignatura.findByPk(id, {
            attributes: ['id_asignatura', 'clave', 'nombre', 'id_area'],
            include: {
                model: Area,
                attributes: ['nombre']
            }
        })

        if (!asignatura) {
            return res.status(404).json({
                msg: `No se encontró una asignatura con ID ${id}.`
            })
        }

        // Se responde con un mensaje de éxito, la asignatura y estatus 200 (OK)
        return res.status(200).json({
            msg: "Asignatura obtenida exitosamente",
            asignatura
        })
    } catch (error) {
        console.error("Error al obtener asignatura:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para actualizar una asignatura por su ID (UPDATE)
const actualizarAsignatura = async (req, res) => {
    const { id } = req.params

    try {
        const asignatura = await Asignatura.findByPk(id)
        if (!asignatura) {
            return res.status(404).json({
                msg: `No se encontró una asignatura con ID ${id}.`
            })
        }

        await asignatura.update(req.body)

        // Se responde con un mensaje de éxito, la asignatura actualizada y estatus 200 (OK)
        return res.status(200).json({
            msg: "Asignatura actualizada exitosamente",
            asignatura: asignatura,     
        })

    } catch (error) {
        console.error("Error al actualizar asignatura:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

// Función para eliminar una asignatura por su ID (DELETE)
const eliminarAsignatura = async (req, res) => {
    const { id } = req.params

    try {
        const asignatura = await Asignatura.findByPk(id)
        if (!asignatura) {
            return res.status(404).json({
                msg: `No se encontró una asignatura con ID ${id}.`
            })
        }

        await asignatura.destroy()

        // Se responde con un mensaje de éxito y estatus 200 (OK)
        return res.status(200).json({
            msg: "Asignatura eliminada exitosamente"
        })

    } catch (error) {
        console.error("Error al eliminar asignatura:", error)
        return res.status(500).json({
            msg: "Hubo un error en el servidor, intente más tarde."
        })
    }
}

export { registroAsignatura,
    obtenerAsignaturas, 
    obtenerAsignatura,
    actualizarAsignatura,
    eliminarAsignatura }