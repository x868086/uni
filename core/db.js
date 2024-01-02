const Sequelize = require('sequelize')

const {
    dbconfig: {
        database,
        username,
        password,
        host,
        port,
        dialect
    }
} = require('../config/config.js')


const sequelize = new Sequelize(
    database,
    username,
    password, {
    host: host,
    port: port,
    logging: true,
    timezone: '+08:00',
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 30000,
        acquire: 60000
    },
    define: {
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        freezeTableName: true
    }
}
)


let loaddb = async () => {
    try {
        await sequelize.authenticate()
        global.console.log('Connection has been established successfully.')
    } catch (error) {
        global.console.error('Unable to connect to the database:', err)
    }

}

loaddb()

sequelize.sync()
// .then(() => {
//     console.log('模型已成功同步到数据库');
// }).catch(err => {
//     console.error('同步模型时出现错误：', err);
// });

module.exports = {
    sequelize
}