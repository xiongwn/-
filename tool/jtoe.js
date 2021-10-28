var xlsx = require('node-xlsx')
var fs = require("fs")
var json = require("./1.js")
// import * as xlsx from 'node-xlsx'
// import * as fs from 'fs'
// import {default as json} from "./1.js"
var renderData = json.map(item=>Object.keys(json[0]).map(sub=>item[sub]))
var data = [{name:"sheet1",data:[Object.keys(json[0]),...renderData]}]
//console.log(data)
// 写xlsx
var buffer = xlsx.build(data);
fs.writeFile('./result.xls', buffer, function (err)
{
    if (err)
        throw err;
    console.log('Write to xls has finished');
    
// 读xlsx
    // var obj = xlsx.parse("./" + "resut.xls");
    // console.log(JSON.stringify(obj));
} 
);
