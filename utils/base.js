exports.GetCurrentDate = function (date) {
    //获取当前时间
    if (!date) {
        date = new Date()
    }
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
function doHandleMonth(month) { 
    var m = month; 
    if (month.toString().length == 1) { 
        m = "0" + month; 
    } 
    return m; 
}
exports.getDay = function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码 
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}
