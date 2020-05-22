const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { secretUtile } = require('../../core/utile')


class UserModel extends Model {

}

UserModel.init({
    user_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    org_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        unique: true
    },
    account: {
        type: Sequelize.STRING(128),
        unique: true
    },
    secret: {
        type: Sequelize.STRING(128),
        allowNull: false,
        set(val) {
            const pwd = secretUtile.generateSecret(val)
            this.setDataValue('secret', pwd)
        },
        allowNull: false,
        unique: true
    },
    nick_name: {
        type: Sequelize.STRING(128),
        allowNull: true
    },
    create_by: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        allowNull: true
    },
    state_code: {
        type: Sequelize.TINYINT,
        unsigned: true,
        defaultValue: 1
    },
    sms_code: {
        type: Sequelize.STRING(16),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'users'
})

module.exports = {
    UserModel
}