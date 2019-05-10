
module.exports = {
    returnMsg: (msg = "", code = 200) => {
        /** 
        *@code 200 正确 400错误
        */
        return {
            code: code,
            msg: msg
        }
    },
    getParams: (ctx) => {
        let { query, request } = ctx;
        let params = {
            getData: query
        }
        if (request.body) {
            params['postData'] = request.body
        }
        return params
    },
    haveUndefined(Obj = {}) {
        //查找对象中是否有为空
        if (typeof Obj !== 'object') {
            return false
        }
        return Object.values(Obj).filter(x => x === "").length > 0
    },
    GetCurrentDate(date = new Date()) {
        var y = date.getYear() + 1900;
        var month = add_zero(date.getMonth() + 1),
            days = add_zero(date.getDate()),
            hours = add_zero(date.getHours());
        var minutes = add_zero(date.getMinutes()),
            seconds = add_zero(date.getSeconds());
        var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
        function add_zero(temp) {
            if (temp < 10) {
                return "0" + temp;
            }
            return temp;
        }
        return str;
    } 


}