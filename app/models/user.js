const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')


class User extends Model {

}

User.init({
    id: {
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
    password: {
        type: Sequelize.STRING(128),
        allowNull: false,
        // set(val) {
        //     const pwd = pwdUtils.generateSecret(val)
        //     this.setDataValue('password', pwd)
        // },
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
    User
}