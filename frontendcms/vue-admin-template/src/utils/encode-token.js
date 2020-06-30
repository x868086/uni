import { Base64 } from 'js-base64'

let _encode = (token) => {
    const result = Base64.encode(token + ':')
    // 格式：Authorization: Basic $(base64_encode({username}:{password})) 
    return 'Basic ' + result
}

export {
    _encode
}