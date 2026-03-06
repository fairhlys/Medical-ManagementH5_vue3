import req from "@/utils/ReqRes";
export const getHomeData = () => {
    return req.get('/Index/index')
}