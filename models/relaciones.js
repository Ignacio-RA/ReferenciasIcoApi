import Usuario from './usuario.js';
import Area from './area.js';
import Asignatura from './asignatura.js';
import Referencia from './referencia.js';
import Autor from './autor.js';
import AutorReferencia from './autor_referencia.js';

// Área - Asignatura (1:N)
// Una Área tiene muchas Asignaturas
Area.hasMany(Asignatura, {
    foreignKey: 'id_area',
    sourceKey: 'id_area'
});

// Una Asignatura pertenece a una sola Área
Asignatura.belongsTo(Area, {
    foreignKey: 'id_area',
    targetKey: 'id_area'
});

// Asignatura - Referencia (1:N)
// Una Asignatura tiene muchas Referencias
Asignatura.hasMany(Referencia, {
    foreignKey: 'id_asignatura',
    sourceKey: 'id_asignatura'
});

// Una Referencia pertenece a una sola Asignatura
Referencia.belongsTo(Asignatura, {
    foreignKey: 'id_asignatura',
    targetKey: 'id_asignatura'
});

// Usuario - Referencia (1:N)
// Un Usuario tiene muchas Referencias
Usuario.hasMany(Referencia, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});

// Una Referencia pertenece a un solo Usuario
Referencia.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});

// Autor - AutorReferencia (1:N)
// Un Autor tiene muchas AutorReferencias
Autor.hasMany(AutorReferencia, {
    foreignKey: 'id_autor',
    sourceKey: 'id_autor'
});

// Una AutorReferencia pertenece a un solo Autor
AutorReferencia.belongsTo(Autor, {
    foreignKey: 'id_autor',
    targetKey: 'id_autor'
});


// Referencia - AutorReferencia (1:N)
// Una Referencia tiene muchas AutorReferencias
Referencia.hasMany(AutorReferencia, {
    foreignKey: 'id_referencia',
    sourceKey: 'id_referencia'
});

// Una AutorReferencia pertenece a una sola Referencia
AutorReferencia.belongsTo(Referencia, {
    foreignKey: 'id_referencia',
    targetKey: 'id_referencia'
});


export {
    Usuario,
    Area,
    Asignatura,
    Referencia,
    Autor,
    AutorReferencia
}