import request from '@/utils/request'

const currentMonth = () => {
  const fullYear = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  if (month < 10) {
    return `${fullYear}0${month}`
  }
  return `${fullYear}${month}`
}

export function getAuditList({ offset = 0, limit = 20, auditdate = currentMonth(), audittype }) {
  return request({
    url: '/audit/list',
    method: 'get',
    params: {
      offset: offset,
      limit: limit,
      auditdate: auditdate,
      audittype: audittype
    }
  })
}

export function searchSerial(data) {
  return request({
    url: '/audit/search',
    method: 'post',
    data
  })
}

export function auditModify(data) {
  return request({
    url: `/audit/modify`,
    method: 'post',
    data
  })
}

export function getAuditType() {
  return request({
    url: `/audit/audittype`,
    method: 'get'
  })
}
