const sequelize = require('sequelize')
const connection = require('./database')
const { DataTypes } = require("sequelize")


const Register = connection.define('Login', {
    nome: {
        type: DataTypes.STRING,
        //allowNull: false

    },
    sobrenome: {
        type: DataTypes.STRING,
        //allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        isMail: true ,
        //allowNull: false
        
        
    },
    
    password: {
        type: DataTypes.STRING,
        //allowNull: false
    }
 
})

Register.sync({force:false}).then(() => {
    console.log('Table Created!!!')
})



module.exports = Register