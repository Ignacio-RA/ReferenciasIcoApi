import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const checkAuth = async (req, res, next) => {
    let token;

    // Verificamos si en los headers viene el token con el formato 'Bearer XXXX'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Separamos la palabra 'Bearer' del token real
            token = req.headers.authorization.split(' ')[1];

            // Decodificamos y verificamos el token con la palabra secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos al usuario en la DB usando el ID del token (quitando el password de la consulta)
            req.usuario = await Usuario.findByPk(decoded.id_usuario, {
                attributes: ['id_usuario', 'nombre', 'correo', 'admin']
            });

            // next() le dice a Express: "Todo bien, continúa al siguiente controlador"
            return next();

        } catch (error) {
            console.error("Token no válido:", error);
            return res.status(403).json({ msg: "Token no válido o expirado." });
        }
    }

    if (!token) {
        return res.status(401).json({ msg: "No autorizado, falta el token." });
    }
};

export default checkAuth;