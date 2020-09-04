import request from '@/utils/request'

export function addCustomer(data) {
    return request({
        url: `/customer/addcustomer`,
        method: 'post',
        data
    })
}

//   export function getAuditType() {
//     return request({
//       url: `/audit/audittype`,
//       method: 'get'
//     })
//   }