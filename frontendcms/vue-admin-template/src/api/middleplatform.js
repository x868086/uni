import request from '@/utils/request';


export function getSpecialSearialList({ offset, limit }) {
    return request({
        url: '/middleplatform/specialserial-list',
        method: 'get',
        params: {
            offset,
            limit
        }
    });
}