const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class PermissionModel extends Model {

}

PermissionModel.init({
    id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
    },
    role_id: {
        type: Sequelize.TINYINT(11),
        unsigned: true,
    }
}, {
    sequelize,
    tableName: 'permissions'
})

module.exports = {
    PermissionModel
}