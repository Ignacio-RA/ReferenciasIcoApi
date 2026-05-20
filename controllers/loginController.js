import Usuario from '../models/usuario.js'
import generarJWT from '../helpers/generarJWT.js';

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validar que el cliente haya mandado ambos campos
        if (!correo || !password) {
            return res.status(400).json({
                msg: "El correo y la contraseña son obligatorios."
            });
        }

        // Buscar si el usuario existe en la base de datos
        const usuario = await Usuario.findOne({ where: { correo } });
        
        if (!usuario) {
            // Por seguridad, usamos un mensaje genérico para no dar pistas a atacantes
            return res.status(404).json({
                msg: "El correo electrónico o la contraseña son incorrectos."
            });
        }

        // Verificar si la contraseña es correcta usando el método del modelo Usuario
        const passwordCorrecto = usuario.verificarPassword(password);
        
        if (!passwordCorrecto) {
            return res.status(401).json({
                msg: "El correo electrónico o la contraseña son incorrectos."
            });
        }

        const token = generarJWT(usuario.id_usuario, usuario.admin);

        // Si todo está bien, responder con éxito
        return res.status(200).json({
            msg: "Autenticación exitosa.",
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                admin: usuario.admin,
            },
            token
        });

    } catch (error) {
        console.error("Error en el proceso de login: ", error);
        return res.status(500).json({
            msg: "Hubo un error en el servidor al intentar iniciar sesión."
        });
    }
};

export {
    login
};