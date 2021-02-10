const sequelize = require('sequelize')
const connection = new sequelize('cadastros_greyhat','root', 'brasil97', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

module.exports = connection