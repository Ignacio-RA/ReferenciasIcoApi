import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Referencia= db.define('referencia',{
    id_referencia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tipo_fuente:{
        type:DataTypes.ENUM('libro','articulo','pagina_web','video'),
        allowNull:false,
    },
    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    anio_publicacion:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: 's.f.'
    },
    editorial:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    url:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    doi:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    volumen:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue: null
    },
    numero:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue: null
    },
    paginas:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    ciudad_pais:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    fecha_consulta:{
        type:DataTypes.DATE,
        allowNull:true
    },
    id_asignatura:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_usuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'referencia',
    freezeTableName:true,
    timestamps: false,
});

export default Referencia;