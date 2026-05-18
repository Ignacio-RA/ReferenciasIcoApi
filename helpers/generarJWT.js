import jwt from 'jsonwebtoken';

const generarJWT = (id_usuario, admin) => {
    // jwt.sign(payload, secret, options)
    return jwt.sign(
        { id_usuario, admin }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );
};

export default generarJWT;