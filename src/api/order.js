import req from "@/utils/ReqRes";
export const getOrderList = (state) => {
    return req.get('/order/list', {
        params: {
            state
        }
    })
}