const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class RouteModel extends Model {

}

RouteModel.init({
    route_id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    path: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'route'
})

module.exports = {
    RouteModel
}