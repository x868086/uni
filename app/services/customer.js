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
        salesclerk = undefined,
        servicePhone = undefined,
        serviceType = undefined
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
            this.salesclerk = salesclerk,
            this.servicePhone = servicePhone,
            this.serviceType = serviceType
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
}


module.exports = {
    CustomerService,
};
