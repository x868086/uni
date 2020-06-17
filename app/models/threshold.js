const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class ThresholdModel extends Model {

}

ThresholdModel.init({
    id: {
        type: Sequelize.SMALLINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    config_name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    state_code: {
        type: Sequelize.TINYINT,
        unsigned: true,
        allowNull: false,
        defaultValue: 1
    },
    start_date: {
        type: Sequelize.STRING(64),
        allowNull: true,
        get() {
            if (!this.getDataValue('start_date')) {
                return ''
            }
            const t = parseInt(this.getDataValue('start_date'))
            return new Date(t).toLocaleString()
        }
    },
    end_date: {
        type: Sequelize.STRING(64),
        allowNull: true,
        get() {
            if (!this.getDataValue('end_date')) {
                return ''
            }
            const t = parseInt(this.getDataValue('end_date'))
            return new Date(t).toLocaleString()
        }
    },
    operator: {
        type: Sequelize.STRING(128),
        allowNull: false,
    },
    gt: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        allowNull: false
    },
    lte: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'threshold'
})

module.exports = {
    ThresholdModel
}