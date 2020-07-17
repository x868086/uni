const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class PsptArpuModel extends Model {

}

PsptArpuModel.init({
    id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    pspt_id: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    arpu_value: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: '0'
    }
}, {
    sequelize,
    tableName: 'psptarpu'
})

module.exports = {
    PsptArpuModel
}