const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')


class LoggerModel extends Model {

}

LoggerModel.init({
    id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    logger_date: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    origin: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    path: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    protocol: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    method: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    message: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    header_stringify: {
        type: Sequelize.TEXT(),
        allowNull: true,
    }
}, {
    sequelize,
    tableName: 'logs'
})

module.exports = {
    LoggerModel
}