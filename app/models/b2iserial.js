const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class B2iserialModel extends Model {

}

B2iserialModel.init({
    id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    serial_number: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    yf_code: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    id_desc: {
        type: Sequelize.STRING(128),
        allowNull: true
    },
    fee: {
        type: Sequelize.TINYINT(),
        allowNull: true
    },
    dev_name: {
        type: Sequelize.STRING(128),
        allowNull: true
    },
    dev_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    contact_phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    operate_time: {
        type: Sequelize.STRING(64),
        allowNull: true,
        get() {
            if (!this.getDataValue('operate_time')) {
                return ''
            }
            const t = parseInt(this.getDataValue('operate_time'))
            return new Date(t).toLocaleString()
        }
    },
    operate: {
        type: Sequelize.STRING(20),
        allowNull: true
    }

}, {
    sequelize,
    tableName: 'b2iserial'
})

module.exports = {
    B2iserialModel
}