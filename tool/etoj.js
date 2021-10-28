var xlsx = require('node-xlsx')
var fs = require("fs")

var obj = xlsx.parse("./" + "1.xlsx");
var content = JSON.stringify(obj)
fs.writeFile("./1.json", content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('文件创建成功，地址：');
});
// let arrToObj = () => {
//     let obj = {}
//     for(let i=0;i<arr.length;i++){
//         let item = arr[i]
//         if(obj[item[0]]){
//             if(obj[item[0]][item[2]]) {
//                 obj[item[0]][item[2]].push(item[4])
//             } else {
//                 obj[item[0]][item[2]] = [item[4]]
//             }
//         } else {
//             obj[item[0]] = {[item[2]]:[item[4]]}
//         }
//     }
//     console.log(obj)
//     return obj
// }
