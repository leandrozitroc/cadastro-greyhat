
const sequelize = require('sequelize')
const connection = require('./database')
const { DataTypes } = require("sequelize")



const Admin = connection.define('logins', {
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

Admin.sync().then(()=>{
    console.log('Tabela Criada')
})

module.exports = Admin