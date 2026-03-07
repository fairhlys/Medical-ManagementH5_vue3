import req from "@/utils/ReqRes";
export const getOrderList = (oid) => {
    return req.get('/order/detail', {
        params:{
            oid
        }
    })
}