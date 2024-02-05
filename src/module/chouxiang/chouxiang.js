// 映射字符到十六进制
const charToHexMapping = {
    '典': '0000',
    '孝': '0001',
    '急': '0010',
    '批': '0011',
    '麻': '0100',
    '赢': '0101',
    '绷': '0110',
    '蚌': '0111',
    '润': '1000',
    '乐': '1001',
    '寄': '1010',
    '摆': '1011',
    '拳': '1100',
    '甜': '1101',
    '胶': '1110',
    '图': '1111',
};

// 映射十六进制到字符
const hexToCharMapping = {};
for (const [key, value] of Object.entries(charToHexMapping)) {
    hexToCharMapping[value] = key;
}

RegExp.escape = function (str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// 将十进制转换为自定义字符串
function decimalToCustomString(decimalNumber) {
    const binaryString = decimalNumber.toString(2).padStart(24, '0');  // 转换为二进制并填充到24位
    let resultString = '';
    for (let i = 0; i < binaryString.length; i += 4) {  // 每4位转换为一个自定义字符
        const digit = binaryString.substring(i, i + 4);
        resultString += hexToCharMapping[digit];
    }
    return resultString;
}

// 将自定义字符串转换为十进制
function customStringToDecimal(inputString) {
    const slist = Object.keys(charToHexMapping);  // 获取字符列表
    const reg = new RegExp(slist.map(s => RegExp.escape(s)).join('|'), 'g');  // 构建匹配字符的正则表达式
    const binaryString = inputString.match(reg)?.map(char => charToHexMapping[char]).join('') || '';  // 匹配字符并转换为二进制字符串
    if (binaryString === '') return 0;
    return parseInt(binaryString, 2);  // 将二进制字符串转换为十进制数
}

// 填充字符串到指定长度
function padString(inputStr, length, padChar = ' ') {
    if (inputStr.length < length) {
        const padding = padChar.repeat(length - inputStr.length);
        return padding + inputStr;
    } else {
        return inputStr;
    }
}

// 编码函数：将字节数组编码为自定义字符串
// 编码函数：将字节数组编码为自定义字符串
function encode(data) {
    const byteArray = [...data];
    let retStr = padString(decimalToCustomString(data.length), 6, '典');  // 添加原始数据的长度
    for (let i = 0; i < byteArray.length; i += 3) {  // 每3个字节编码成一个24比特块
        const byte1 = byteArray[i];
        const byte2 = byteArray[i + 1];
        const byte3 = byteArray[i + 2];
        const combined = (byte1 << 16) + ((byte2 || 0) << 8) + (byte3 || 0);  // 组合成一个24比特块
        retStr += padString(decimalToCustomString(combined), 6, '典');  // 转换为自定义字符串并填充到6个字符
    }
    return retStr;
}


// 解码函数：将自定义字符串解码为字节数组
// 解码函数：将自定义字符串解码为字节数组
function decode(cxstr) {
    const originalLength = customStringToDecimal(cxstr.substring(0, 6));  // 解码原始数据的长度
    const retBytes = [];
    for (let i = 6; i < cxstr.length; i += 6) {  // 从索引6开始，每6个字符解码为一个24比特块
        const combined = customStringToDecimal(cxstr.substring(i, i + 6));
        retBytes.push((combined >> 16) & 0xFF);  // 获取前8位
        if (retBytes.length < originalLength) {
            retBytes.push((combined >> 8) & 0xFF);   // 获取中间8位
            if (retBytes.length < originalLength) {
                retBytes.push(combined & 0xFF);          // 获取后8位
            }
        }
    }
    return new Uint8Array(retBytes);  // 返回原始数据的字节数组
}


// 隐藏解码函数：将文本中的自定义字符解码
function disHiddenDecode(text) {
    const customChars = Object.keys(charToHexMapping);  // 获取自定义字符列表
    const pattern = new RegExp(customChars.map(s => RegExp.escape(s)).join('|'), 'g');  // 构建匹配自定义字符的正则表达式
    const foundChars = text.match(pattern) || [];  // 查找文本中的自定义字符
    return decode(foundChars.join(''));  // 解码自定义字符并返回解码后的字节数组
}

export default {
    encode,decode,disHiddenDecode
}
