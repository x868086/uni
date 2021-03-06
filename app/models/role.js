const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class RoleModel extends Model {

}

RoleModel.init({
    role_id: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    role_name: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    scope: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'role'
})

module.exports = {
    RoleModel
}