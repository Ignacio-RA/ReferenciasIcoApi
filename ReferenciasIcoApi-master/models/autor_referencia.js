import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const AutorReferencia= db.define('autor_referencia',{
    id_autor_referencia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    id_autor:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_referencia:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'autor_referencia',
    freezeTableName:true,
    timestamps: false,
});

export default AutorReferencia;