import request from '@/utils/request'

export function addCustomer(data) {
  return request({
    url: `/customer/addcustomer`,
    method: 'post',
    data
  })
}

export function getList({ offset = 0, limit = 50, acctMonth = undefined }) {
  return request({
    url: `/customer/list`,
    method: 'get',
    params: {
      offset: offset,
      limit: limit,
      acctmonth: acctMonth
    }
  })
}

//   export function getAuditType() {
//     return request({
//       url: `/audit/audittype`,
//       method: 'get'
//     })
//   }
