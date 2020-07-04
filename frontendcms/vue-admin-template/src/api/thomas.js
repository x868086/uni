import request from '@/utils/request';
import axios from 'axios';

export function getUploadFileList() {
  return request({
    url: '/thomas/getlist',
    method: 'get',
  });
}

// export function getb2iserial({ offset = 0, limit = 5 }) {
//   return request({
//     url: '/b2iserial/list',
//     method: 'get',
//     params: {
//       offset: offset,
//       limit: limit,
//     },
//   });
// }
