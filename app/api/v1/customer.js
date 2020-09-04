const Router = require('koa-router')
const { CustomerService } = require('../../services/customer')
const { OrganizationService } = require('../../services/organization')

const { B2iserialValidator, PriceValidator, PaginationValidator } = require('../../validators/validator')


const router = new Router({
    prefix: "/v1/customer"
})

router.post("/addcustomer", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx, { serialnumber: "contactPhone" })
    const v3 = await new PriceValidator().validate(ctx)
    let { contactPhone = undefined, customerName = undefined } = await new CustomerService({
        brand: v1.get("body.brand"),
        salePrice: v1.get("body.salePrice"),
        contactPhone: v1.get("body.contactPhone"),
        customerName: v1.get("body.customerName"),
        departName: v1.get("body.departName"),
        departid: v1.get("body.departid"),
        gift: v1.get("body.gift"),
        saleDate: v1.get("body.saleDate"),
        acctMonth: v1.get("body.acctMonth"),
        salesclerk: v1.get("body.salesclerk"),
        servicePhone: v1.get("body.servicePhone"),
        serviceType: v1.get("body.serviceType"),
        desc: v1.get("body.desc")
    }).addCustomer()
    throw new global.errs.Success(`${contactPhone}, ${customerName} 信息创建成功`)
})

router.get("/list", async (ctx, next) => {
    let channelArray = await new OrganizationService({
        org_id: ctx.auth.orgId,
    }).findChannels();
    const v1 = await new PaginationValidator().validate(ctx)
    let { totalResult = null, currentMonthResult = null } = await new CustomerService({ currentMonth: v1.get("query.acctmonth") }).getList(v1.get("query.offset"), v1.get("query.limit"))
    let currentOwnerList = currentMonthResult.filter(e => {
        return channelArray.includes(e.departid)
    })

    let totalCount = totalResult.filter(e => {
        return channelArray.includes(e.departid)
    }).length

    ctx.body = { totalCount, currentOwnerList }
})

module.exports = {
    customer: router
}
