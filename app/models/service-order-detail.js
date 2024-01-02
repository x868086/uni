const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class ServiceOrderModel extends Model {

}

ServiceOrderModel.init({
    id: {
        type: Sequelize.INTEGER(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    order_no: {
        type: Sequelize.STRING(32),
        unique: false,
        allowNull: true
    },
    service_result: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    result_cut1: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    result_cut2: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    result_cut3: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    result_cut4: {
        type: Sequelize.TEXT(),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'servicedetail'
})


module.exports = {
    ServiceOrderModel
}