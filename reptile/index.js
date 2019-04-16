var request = require('request');
var cheerio = require('cheerio');
const query = require("../sql/index")
const sql = require("../sql/sql")
const app_url = "https://www.apple.com/cn/itunes/charts/free-apps/"
function toText(str) {
    return unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''))
}
const crawling = async () => {
    let data = await new Promise((resolve, reject) => {
        request(app_url, (err, res) => {
            if (err) {
                throw err;
            }
            var $ = cheerio.load(res.body.toString()); //利用cheerio对页面进行解析 
            let arr = []
            $("#main section ul li").each(function () {
                let obj = {}
                let name = $(this).find("h3 a").html()
                let type = $(this).find("h3 a").html()
                let sort = $(this).find("strong").html()
                obj['name'] = toText(name);
                obj['type'] = toText(type);
                obj['sort'] = toText(sort);
                arr.push(obj)
            })
            let str_json = JSON.stringify(arr);
            query(sql.insert(`'${str_json}'`))
            try {
                resolve(str_json)
            } catch (err) {
                reject(err)
            }

        })
    })
    return data
}


module.exports = {
    crawling: crawling
}