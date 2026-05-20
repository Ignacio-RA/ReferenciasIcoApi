import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Asignatura= db.define('asignatura',{
    id_asignatura: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    clave: {
        type:DataTypes.INTEGER,
        allowNull:false,
        unique: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_area:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    tableName: 'asignatura',
    freezeTableName:true,
    timestamps: false,
});

export default Asignatura;