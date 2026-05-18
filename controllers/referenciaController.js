import { Referencia, Usuario, Asignatura, Autor, AutorReferencia } from '../models/relaciones.js'
import db from '../config/db.js'

const registroReferencia = async (req, res) => {
    const t = await db.transaction()

    try {
        const { 
            tipo_fuente, titulo, anio_publicacion, editorial, url, 
            doi, volumen, numero, paginas, ciudad_pais, fecha_consulta,
            id_asignatura, id_usuario, autores 
        } = req.body;

        // VALIDACIONES DE LLAVES FORÁNEAS (Usuario y Asignatura)
        const existeUsuario = await Usuario.findByPk(id_usuario);
        if (!existeUsuario) {
            await t.rollback();
            return res.status(404).json({ msg: "El usuario no existe." });
        }

        const existeAsignatura = await Asignatura.findByPk(id_asignatura);
        if (!existeAsignatura) {
            await t.rollback();
            return res.status(404).json({ msg: "La asignatura no existe." });
        }

        // VALIDACIÓN DE AUTORES (Asegurarnos que venga el arreglo)
        if (!autores || !Array.isArray(autores) || autores.length === 0) {
            await t.rollback();
            return res.status(400).json({ msg: "Debes asignar al menos un autor." });
        }

        // VALIDACIONES DE NEGOCIO (Campos según tipo de fuente)
        if (tipo_fuente === 'libro' && !editorial) {
            await t.rollback();
            return res.status(400).json({ msg: "Para un libro, la 'editorial' es requerida." });
        }
        if (tipo_fuente === 'articulo' && (!volumen || !paginas)) {
            await t.rollback();
            return res.status(400).json({ msg: "Para un artículo, 'volumen' y 'paginas' son requeridos." });
        }
        if (tipo_fuente === 'pagina_web' && !url) {
            await t.rollback();
            return res.status(400).json({ msg: "Para una página web, la 'url' es requerida." });
        }

        // CREAR LA REFERENCIA PRIMERO
        const nuevaReferencia = await Referencia.create({
            tipo_fuente, titulo, anio_publicacion, editorial, url, 
            doi, volumen, numero, paginas, ciudad_pais, fecha_consulta,
            id_asignatura, id_usuario
        }, { transaction: t });

        // INSERTAR EN LA TABLA INTERMEDIA (Forma Manual sin belongsToMany)
        // Mapeamos el arreglo de IDs de autores para preparar los inserts en AutorReferencia
        const registrosIntermedios = autores.map(idAutor => {
            return {
                id_referencia: nuevaReferencia.id_referencia, // El ID que se acaba de generar arriba
                id_autor: idAutor
            };
        });

        // bulkCreate inserta múltiples registros de un solo golpe en la tabla intermedia
        await AutorReferencia.bulkCreate(registrosIntermedios, { transaction: t });

        // Si todo salió bien, guardamos los cambios en la BD
        await t.commit();

        return res.status(201).json({
            msg: "Referencia y autores registrados exitosamente",
            referencia: nuevaReferencia
        });

    } catch (error) {
        await t.rollback();
        console.error("Error al registrar la referencia:", error);
        return res.status(500).json({ msg: "Hubo un error en el servidor." });
    }
};

// Función para obtener todas las referencias (READ)
const obtenerReferencias = async (req, res) => {
    try {
        const referencias = await Referencia.findAll({
            // Incluimos los modelos relacionados (Equivale a hacer LEFT JOINs en SQL)
            include: [
                {
                    model: Usuario,
                    attributes: ['id_usuario', 'nombre', 'ap_paterno'] // Solo traemos datos seguros, no el password
                },
                {
                    model: Asignatura,
                    attributes: ['id_asignatura', 'clave', 'nombre']
                },
                {
                    model: AutorReferencia,
                    attributes: ['id_autor'], // Trae la llave intermedia
                    include: [
                        {
                            model: Autor,
                            attributes: ['id_autor', 'nombre', 'ap_paterno', 'ap_materno'] // El autor real
                        }
                    ]
                }
            ],
            // Ordenamos para que las últimas referencias agregadas salgan primero
            order: [['id_referencia', 'DESC']] 
        });

        // Si la base de datos está vacía
        if (referencias.length === 0) {
            return res.status(200).json({
                msg: "No hay referencias bibliográficas registradas aún.",
                referencias: []
            });
        }

        return res.status(200).json({
            msg: "Referencias obtenidas con éxito",
            total: referencias.length,
            referencias
        });

    } catch (error) {
        console.error("Error al obtener referencias:", error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor al recuperar las referencias."
        });
    }
};

// Función para obtener una sola referencia por su ID (READ ONE)
const obtenerReferencia = async (req, res) => {
    const { id } = req.params; // Extraemos el ID desde la URL

    try {
        const referencia = await Referencia.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    attributes: ['id_usuario', 'nombre', 'ap_paterno']
                },
                {
                    model: Asignatura,
                    attributes: ['id_asignatura', 'clave', 'nombre']
                },
                {
                    model: AutorReferencia,
                    attributes: ['id_autor'],
                    include: [
                        {
                            model: Autor,
                            attributes: ['id_autor', 'nombre', 'ap_paterno', 'ap_materno']
                        }
                    ]
                }
            ]
        });

        // Validamos si la referencia existe
        if (!referencia) {
            return res.status(404).json({
                msg: `La referencia con el ID ${id} no fue encontrada.`
            });
        }

        return res.status(200).json({
            msg: "Referencia recuperada con éxito",
            referencia
        });

    } catch (error) {
        console.error(`Error al obtener la referencia ${id}:`, error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor al recuperar la referencia."
        });
    }
}

const actualizarReferencia = async (req, res) => {
    const { id } = req.params; // ID de la referencia a actualizar
    const t = await db.transaction(); // Iniciamos transacción por seguridad

    try {
        const { 
            tipo_fuente, titulo, anio_publicacion, editorial, url, 
            doi, volumen, numero, paginas, ciudad_pais, fecha_consulta,
            id_asignatura, id_usuario, autores 
        } = req.body;

        // VERIFICAR SI LA REFERENCIA EXISTE
        const referencia = await Referencia.findByPk(id);
        if (!referencia) {
            await t.rollback();
            return res.status(404).json({ msg: `La referencia con ID ${id} no existe.` });
        }

        // VALIDACIONES DE LLAVES FORÁNEAS (Si es que se intentan cambiar)
        if (id_usuario) {
            const existeUsuario = await Usuario.findByPk(id_usuario);
            if (!existeUsuario) {
                await t.rollback();
                return res.status(404).json({ msg: "El usuario especificado no existe." });
            }
        }
        if (id_asignatura) {
            const existeAsignatura = await Asignatura.findByPk(id_asignatura);
            if (!existeAsignatura) {
                await t.rollback();
                return res.status(404).json({ msg: "La asignatura especificada no existe." });
            }
        }

        // ACTUALIZAR LOS DATOS BÁSICOS DE LA REFERENCIA
        // Usamos req.body directamente; Sequelize solo cambiará los campos que vengan en la petición
        await referencia.update(req.body, { transaction: t });

        // ACTUALIZACIÓN DE AUTORES EN LA TABLA INTERMEDIA (Si viene el arreglo en la petición)
        if (autores && Array.isArray(autores)) {
            if (autores.length === 0) {
                await t.rollback();
                return res.status(400).json({ msg: "Una referencia no puede quedarse sin autores." });
            }

            // Paso A: Borramos todos los autores actuales que tenía esa referencia
            await AutorReferencia.destroy({
                where: { id_referencia: id },
                transaction: t
            });

            // Paso B: Preparamos e insertamos el nuevo arreglo de autores
            const nuevosRegistrosIntermedios = autores.map(idAutor => {
                return {
                    id_referencia: id,
                    id_autor: idAutor
                };
            });

            await AutorReferencia.bulkCreate(nuevosRegistrosIntermedios, { transaction: t });
        }

        // Si todo el proceso fue exitoso, guardamos permanentemente en la DB
        await t.commit();

        return res.status(200).json({
            msg: "Referencia actualizada exitosamente.",
            referencia
        });

    } catch (error) {
        // Si algo falla, revertimos todos los pasos para no dejar datos inconsistentes
        await t.rollback();
        console.error("Error al actualizar la referencia:", error);
        return res.status(500).json({ msg: "Hubo un error en el servidor al actualizar." });
    }
}

const eliminarReferencia = async (req, res) => {
    const { id } = req.params; // Capturamos el ID de la URL
    const t = await db.transaction(); // Iniciamos transacción

    try {
        // VERIFICAR SI LA REFERENCIA EXISTE
        const referencia = await Referencia.findByPk(id);
        if (!referencia) {
            await t.rollback();
            return res.status(404).json({
                msg: `La referencia con ID ${id} no existe.`
            });
        }

        // BORRAR PRIMERO LAS ASOCIACIONES EN LA TABLA INTERMEDIA
        // Esto evita que truene la llave foránea en MariaDB
        await AutorReferencia.destroy({
            where: { id_referencia: id },
            transaction: t
        });

        // BORRAR LA REFERENCIA DE SU TABLA
        await referencia.destroy({ transaction: t });

        // Si ambos borrados fueron exitosos, confirmamos los cambios en la DB
        await t.commit();

        return res.status(200).json({
            msg: "Referencia y sus asociaciones de autor eliminadas correctamente."
        });

    } catch (error) {
        // Si algo falla, hacemos rollback para no dejar datos corruptos
        await t.rollback();
        console.error("Error al eliminar la referencia:", error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor al intentar eliminar la referencia."
        });
    }
};

export {
    registroReferencia,
    obtenerReferencias,
    obtenerReferencia,
    actualizarReferencia,
    eliminarReferencia
}