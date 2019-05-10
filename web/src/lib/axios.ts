import axios from 'axios';
axios.interceptors.response.use((res:any) => {
    const result = res || {}
    if (result.status === 200) {
        return result.data
    }

}, (err:any) => {

})
export default {
    async get(url:String, params = {}) {
        return await axios({
            method: 'get',
            url: url,
            params: params,
            withCredentials: true
        })
    },
    async post(url:String, params = {}) {
        return await axios({
            method: "post",
            url: url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            transformRequest: [
                function (data:any) {
                    let ret = '';
                    for (let it in data) {
                        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
                    }
                    return ret;
                }
            ],
            data: params
        })
    },
    async postJson(url:String, params = {}) {
        /* request payload */
        return await axios({
            method: "post",
            url: url,
            headers: {
                "Content-Type": "application/json"
            },
            transformRequest: [
                function (data:Object) {
                    return data;
                }
            ],
            data: JSON.stringify(params)
        })
    }
}
