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
        unique: true
    },
    role_name: {
        type: Sequelize.STRING(128),
        unique: true
    },
    scope: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        unique: true
    }
}, {
    sequelize,
    tableName: 'role'
})

module.exports = {
    RoleModel
}