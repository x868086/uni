const { Sequelize, Model, Sequelize: { Op } } = require('sequelize')

const { sequelize } = require('../../core/db')

class OrganizationModel extends Model {

}

OrganizationModel.init({
    org_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        autoIncrement: true,
        primaryKey: true
    },
    channel_id: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: true
    },
    yf_code: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    is_market_group: {
        type: Sequelize.STRING(8),
        allowNull: true
    },
    parent_manager_id: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        allowNull: false
    },
    org_desc: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    scope: {
        type: Sequelize.TINYINT,
        unsigned: true,
        allowNull: false
    },
    created_by: {
        type: Sequelize.INTEGER(11),
        unsigned: true,
        allowNull: true
    },
    state_code: {
        type: Sequelize.TINYINT,
        unsigned: true,
        defaultValue: 1
    }
}, {
    sequelize,
    tableName: "organization"
})

module.exports = {
    OrganizationModel,
    Op
}

