import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Autor= db.define('autor',{
    id_autor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ap_paterno:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ap_materno:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },

},{
    tableName: 'autor',
    freezeTableName:true,
    timestamps: false,
});

export default Autor;