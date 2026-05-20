const checkAdmin = (req, res, next) => {
    // 1. Verificamos si existe el usuario en la petición (por seguridad)
    // 2. Comprobamos si su propiedad 'admin' es true (1 en MariaDB)
    if (req.usuario && req.usuario.admin) {
        // Si es admin, le permitimos continuar al controlador
        return next();
    }

    // Si no es admin, cortamos la petición con un error 403 (Forbidden / Prohibido)
    return res.status(403).json({
        msg: "Acceso denegada. Esta acción requiere permisos de administrador."
    });
};

export default checkAdmin;