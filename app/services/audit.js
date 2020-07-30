const { AuditModel } = require('../models/audit');

class AuditService {
    constructor({
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
        remarkDesc = undefined
    }) {
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
    }

    async auditList(offset, limit) {
        let result = await AuditModel.findAll({
            paranoid: false,
            offset: offset,
            limit: limit,
        }).map((e) => {
            return {
                // serial_number: e.serial_number,
                // product_name: e.product_name,
                // yf_code: e.yf_code,
                // id_desc: e.id_desc,
                // fee: e.fee,
                // dev_name: e.dev_name,
                // dev_phone: e.dev_phone,
                // contact_phone: e.contact_phone,
                // operate_time: e.operate_time,
                // operate: e.operate,
            };
        });
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

    async auditModify() {

    }

}





module.exports = {
    AuditService,
};
