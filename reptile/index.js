var request = require('request');
var cheerio = require('cheerio');
const query = require("../sql/index")
const sql = require("../sql/sql")
const app_url = "https://www.apple.com/cn/itunes/charts/free-apps/"
function toText(str){
    return unescape(str.replace(/&#x/g,'%u').replace(/;/g,''))
}
const crawling = () => {
    request(app_url, (err, res) => {
        if (err) {
            throw err;
        }
        var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析 
        let arr = []
        $("#main section ul li").each(function(){
            let obj = {}
            let name = $(this).find("h3 a").html()
            let type = $(this).find("h3 a").html()
            let sort = $(this).find("strong").html()
            obj['name'] = toText(name);
            obj['type'] = toText(type);
            obj['sort'] = toText(sort);
            arr.push(obj)
        })
        query(sql.insert(`'${JSON.stringify(arr)}'`))
    })
}
crawling()
 
module.exports = {
     
}