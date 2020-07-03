import axios from 'axios'
import { getAccessToken } from '@/utils/auth'
import { _encode } from '@/utils/encode-token'


export function uploadFile(data) {

    // return axios
    //   .post(`${process.env.VUE_APP_BASE_API}/actions/uploadfile`, {
    //       data:data,
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   })
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((error) => {
    //     // return error
    //     return Promise.reject(error);
    //   });

    return axios({
        url: `${process.env.VUE_APP_BASE_API}/thomas/uploadfile`,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: _encode(getAccessToken())
        },
        data
    }).then(res => {
        return res
    }).catch(error => {
        return Promise.reject(error)
    })
}
