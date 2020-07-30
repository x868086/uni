const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

class AuditModel extends Model { }

AuditModel.init(
    {
        id: {
            type: Sequelize.INTEGER(),
            unsigned: true,
            autoIncrement: true,
            primaryKey: true,
        },
        audit_type: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        audit_date: {
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        non_conformance: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        fee: {
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        serial_number: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        net_type_name: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        subjects_name: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        product_name: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        access_departname: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        access_departid: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        access_staffid: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        access_date: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        id_desc: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        state_name: {
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: '待整改'
        },
        reject_reason: {
            type: Sequelize.STRING(128),
            allowNull: true,
        },
        check_desc: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        fine_fee: {
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        audit_staffname: {
            type: Sequelize.STRING(10),
            allowNull: true,
        },
        remark_desc: {
            type: Sequelize.STRING(30),
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'audit',
    }
);

module.exports = {
    AuditModel,
};
