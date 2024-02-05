import chouxiang from "@/module/chouxiang/chouxiang.js";


function dataEncode(data,mime) {
    let mimebin=new TextEncoder().encode(`mime:${mime}\ndata:\n`)
    let result = new Uint8Array(mimebin.length + data.length);
    result.set(mimebin, 0);
    result.set(data, mimebin.length);
    return chouxiang.encode(result)
}

function dataDecode(encstr) {
    let decdata = chouxiang.disHiddenDecode(encstr);
    let mimeIndex = new TextDecoder().decode(decdata).indexOf('data:\n');
    console.log(mimeIndex)
    if(mimeIndex === -1) {
        return {data:decdata, mime:""};
    }
    let mime = new TextDecoder().decode(decdata.slice(0, mimeIndex));
    let data = decdata.slice(mimeIndex + 6);
    return {data:data, mime:mime.substring(5)}; // 去掉前缀"mime:"
}

export default {
    dataEncode,dataDecode
}
