import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Area= db.define('area',{
    id_area: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    tableName: 'area',
    freezeTableName:true,
    timestamps: false,
});

export default Area;