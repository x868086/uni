const { CustomerModel } = require('../models/customer')

class CustomerService {
    constructor({
        id = undefined,
        brand = undefined,
        salePrice = undefined,
        contactPhone = undefined,
        customerName = undefined,
        departName = undefined,
        departid = undefined,
        desc = undefined,
        gift = undefined,
        saleDate = undefined,
        acctMonth = undefined,
        salesclerk = undefined,
        servicePhone = undefined,
        serviceType = undefined,
        currentMonth = undefined
    }) {
        this.id = id,
            this.brand = brand,
            this.salePrice = salePrice,
            this.contactPhone = contactPhone,
            this.customerName = customerName,
            this.departName = departName,
            this.departid = departid,
            this.desc = desc,
            this.gift = gift,
            this.saleDate = saleDate,
            this.acctMonth = acctMonth,
            this.salesclerk = salesclerk,
            this.servicePhone = servicePhone,
            this.serviceType = serviceType,
            this.currentMonth = currentMonth
    }

    async addCustomer() {
        let {
            customer_name = undefined,
            contact_phone = undefined,
        } = await CustomerModel.create({
            brand: this.brand,
            sale_price: this.salePrice,
            contact_phone: this.contactPhone,
            customer_name: this.customerName,
            depart_name: this.departName,
            departid: this.departid,
            gift: this.gift,
            sale_date: this.saleDate,
            acct_month: this.acctMonth,
            salesclerk: this.salesclerk,
            service_phone: this.servicePhone,
            service_type: this.serviceType,
            desc: this.desc
        });
        return {
            customerName: customer_name,
            contactPhone: contact_phone,
        };
    }

    async getList(offset, limit) {
        let currentMonthResult = await CustomerModel.findAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "brand",
                "sale_price",
                "contact_phone",
                "customer_name",
                "gift",
                "sale_date",
                "acct_month",
                "departid",
                "depart_name",
                "salesclerk",
                "service_phone",
                "service_type",
                "desc"
            ],
            where: {
                acct_month: this.currentMonth
            }
            // let abc = split('-').slice(0,2).join("")
        }).map((e) => e.dataValues)
        let totalResult = await CustomerModel.findAll({

        }).map(e => e.dataValues)
        return {
            totalResult: totalResult,
            currentMonthResult: currentMonthResult
        }
    }
}


module.exports = {
    CustomerService,
};
