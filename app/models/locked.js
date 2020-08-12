const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class LockedModel extends Model {

}

LockedModel.init({
    id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true,
    },
    account: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    is_locked: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    expires_time: {
        type: Sequelize.STRING(32),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'userlock'
})

module.exports = {
    LockedModel
}