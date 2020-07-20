import request from '@/utils/request'

export function serialSearch(serial) {
  return request({
    url: `/middleplatform/${serial}/specialserial-search/`,
    method: 'get'
  })
}
