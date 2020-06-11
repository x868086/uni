const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class RoleRouteModel extends Model {

}

RoleRouteModel.init({
    id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        allowNull: false
    },
    route_id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'roleroute'
})

module.exports = {
    RoleRouteModel
}