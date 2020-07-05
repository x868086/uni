import request from '@/utils/request'

export function getb2iserial({ offset = 0, limit = 5 }) {
  return request({
    url: '/b2iserial/list',
    method: 'get',
    params: {
      offset: offset,
      limit: limit
    }
  })
}

export function allocate(serialnumber, data) {
  return request({
    url: `/b2iserial/${serialnumber}/allocate`,
    method: 'post',
    data
  })
}

export function reject(serialnumber, data) {
  return request({
    url: `/b2iserial/${serialnumber}/reject`,
    method: 'post',
    data
  })
}

export function remove(serialnumber, data) {
  return request({
    url: `/b2iserial/${serialnumber}/remove`,
    method: 'post',
    data
  })
}

export function modify(serialnumber, data) {
  return request({
    url: `/b2iserial/${serialnumber}/modify`,
    method: 'post',
    data
  })
}
