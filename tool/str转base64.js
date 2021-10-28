var str = "abcd"
var length = str.length%3?(3-str.length%3):0
var binary = str.split("").reduce((pre,next)=>pre+new Array(8-next.codePointAt(0).toString(2).length%8).fill("0").join("")+next.codePointAt(0).toString(2),"")+new Array(length*8).fill("0").join("")
var arr = [];
for(var i=0,len=binary.length;i<len;i+=6){
   arr.push(binary.slice(i,i+6));
}
var dic = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
arr = arr.map(item=>dic[parseInt(item,2)])
if(length){
    arr.splice(-length,length,...new Array(length).fill("="))
}

console.log(arr.join(""))