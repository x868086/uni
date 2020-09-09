const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class CustomerModel extends Model {

}

CustomerModel.init({
    id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    brand: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    sale_price: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        allowNull: false
    },
    contact_phone: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    customer_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    depart_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    departid: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    desc: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true,
    },
    gift: {
        type: Sequelize.STRING(128),
        allowNull: false,
    },
    acct_month: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    sale_date: {
        type: Sequelize.STRING(36),
        allowNull: false
    },
    salesclerk: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    service_phone: {
        type: Sequelize.STRING(12),
        allowNull: true
    },
    service_type: {
        type: Sequelize.STRING(12),
        allowNull: true
    }

}, {
    sequelize,
    tableName: 'customer'
})

module.exports = {
    CustomerModel
}

