const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class SpecialSerialModel extends Model {

}

SpecialSerialModel.init({
    id: {
        type: Sequelize.INTEGER(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    serial_number: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false
    },
    in_date: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    rule_value: {
        type: Sequelize.SMALLINT(12),
        allowNull: false
    },
    end_date: {
        type: Sequelize.STRING(12),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'specialserial'
})

module.exports = {
    SpecialSerialModel
}