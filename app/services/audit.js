const { AuditModel } = require('../models/audit');
const { sequelize } = require('../../core/db')

class AuditService {
    constructor({
        id = undefined,
        auditType = undefined,
        auditDate = undefined,
        nonConformance = undefined,
        fee = undefined,
        serialNumber = undefined,
        netTypeName = undefined,
        subjectsName = undefined,
        productName = undefined,
        accessDepartname = undefined,
        accessDepartid = undefined,
        accessStaffid = undefined,
        accessDate = undefined,
        idDesc = undefined,
        stateName = undefined,
        rejectReason = undefined,
        checkDesc = undefined,
        fineFee = undefined,
        auditStaffname = undefined,
        remarkDesc = undefined,
        cucDepartcode = undefined
    }) {
        this.id = id;
        this.auditType = auditType;
        this.auditDate = auditDate;
        this.nonConformance = nonConformance;
        this.fee = fee;
        this.serialNumber = serialNumber;
        this.netTypeName = netTypeName;
        this.subjectsName = subjectsName;
        this.productName = productName;
        this.accessDepartname = accessDepartname;
        this.accessDepartid = accessDepartid;
        this.accessStaffid = accessStaffid;
        this.accessDate = accessDate;
        this.idDesc = idDesc;
        this.stateName = stateName;
        this.rejectReason = rejectReason;
        this.checkDesc = checkDesc;
        this.fineFee = fineFee;
        this.auditStaffname = auditStaffname;
        this.remarkDesc = remarkDesc;
        this.cucDepartcode = cucDepartcode
    }

    async auditList(offset, limit, auditdate, audittype = undefined) {

        let result = await AuditModel.findAll({
            paranoid: false,
            offset: offset,
            limit: limit,
            attributes: ['id', 'audit_type', 'audit_date', 'non_conformance', 'fee', 'serial_number',
                'net_type_name', 'subjects_name', 'product_name',
                'access_departname', 'access_departid', 'access_staffid',
                'access_date', 'id_desc', 'state_name', 'reject_reason',
                'check_desc', 'fine_fee', 'audit_staffname', 'remark_desc', 'cuc_depart_code'],
            // where: {
            //     audit_date: auditdate
            // }
            where: audittype ? { audit_date: auditdate, audit_type: audittype } : { audit_date: auditdate }
        }).map((e) => e.dataValues);
        let total = await AuditModel.findAndCountAll({
            paranoid: false,
        });
        return {
            offset: offset,
            limit: limit,
            total: total.count,
            result,
        };
    }

    async auditSearch() {
        let result = await AuditModel.findAll({
            paranoid: false,
            attributes: ['id', 'audit_type', 'audit_date', 'non_conformance', 'fee', 'serial_number',
                'net_type_name', 'subjects_name', 'product_name',
                'access_departname', 'access_departid', 'access_staffid',
                'access_date', 'id_desc', 'state_name', 'reject_reason',
                'check_desc', 'fine_fee', 'audit_staffname', 'remark_desc', 'cuc_depart_code'],
            where: {
                audit_date: this.auditDate,
                serial_number: this.serialNumber
            }
        }).map(e => e.dataValues)
        return result
    }

    async auditModify() {
        let result = await AuditModel.update({
            state_name: this.stateName,
            reject_reason: this.rejectReason
        }, {
            where: {
                id: this.id,
                serial_number: this.serialNumber,
                audit_date: this.auditDate
            }
        })
        return {
            serialNumber: this.serialNumber
        }
    }

    async getAuditType() {
        let result = await sequelize
            .query(`SELECT  DISTINCT  audit_type from uni.audit`, {
                type: sequelize.QueryTypes.SELECT,
            })
        return { result }

    }

}





module.exports = {
    AuditService,
};
