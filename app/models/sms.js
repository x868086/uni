const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class SmsModel extends Model {

}

SmsModel.init({
    sms_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true,
    },
    account: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    sms_code: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    expires_time: {
        type: Sequelize.STRING(32),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'sms'
})

module.exports = {
    SmsModel
}