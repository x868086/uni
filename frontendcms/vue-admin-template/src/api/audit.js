import request from '@/utils/request'

let currentMonth = () => {
    let fullYear = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    if (month < 10) {
        return `${fullYear}0${month}`
    }
    return `${fullYear}${month}`
}


export function getAuditList({ offset = 0, limit = 20, auditdate = currentMonth() }) {
    return request({
        url: '/audit/list',
        method: 'get',
        params: {
            offset: offset,
            limit: limit,
            auditdate: auditdate
        }
    })
}


export function searchSerial() {
    return request({
        url: '/audit/search',
        method: 'post',
        params: {
            serialNumber: serialNumber,
            auditdate: auditdate
        }
    })
}



export function auditModify(data) {
    return request({
        url: `/audit/modify`,
        method: 'post',
        data
    })
}
