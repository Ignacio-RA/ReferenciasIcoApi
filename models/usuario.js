import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Usuario= db.define('usuario',{
    id_usuario: {
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
        allowNull:true
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    },
    fecha_registro:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    },

},{
    tableName: 'usuario',
    freezeTableName:true,
    timestamps: false,
    hooks:{
        beforeCreate:async function(usuario){
            const rep=await bcrypt.genSalt(10);
            usuario.password=await bcrypt.hash(usuario.password,rep);
        }
    }
});

Usuario.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuario;