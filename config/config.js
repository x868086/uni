const path = require('path')


const apiDirectory = path.resolve(__dirname, '../app/api')

const environment = {
    env: 'dev'
}


const dbconfig = {
    database: 'uni',
    username: 'root',
    password: 'admin',
    host: '192.168.189.8',
    port: '3306',
    dialect: 'mysql'
}

const tokenSecurity = {
    secret: 'NEYKR37jCFEH0o5tsbmxvemR7KQv3oZY0yAo',
    accessExpiresIn: '2h',
    refreshExpiresIn: '30 days'
}


module.exports = {
    apiDirectory,
    environment,
    dbconfig,
    tokenSecurity
}