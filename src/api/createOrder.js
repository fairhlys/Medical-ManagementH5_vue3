import req from "@/utils/ReqRes";
export const createGetOrder = (data) => {
    return req.get('/h5/companion', data)
}
export const createOrder = (data) => {
    return req.post('/createOrder', data)
}