const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')


class StateModel extends Model {

}

StateModel.init({
    state_id: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    state_code: {
        type: Sequelize.TINYINT(),
        unsigned: true,
        unique: true
    },
    state_name: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'state'
})

module.exports = {
    StateModel
}