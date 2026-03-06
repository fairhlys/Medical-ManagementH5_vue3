import req from '../utils/ReqRes'
export function login(data) {
    return req.post('/login', data)
}