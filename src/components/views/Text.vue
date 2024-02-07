<script>
import chouxiang from '@/module/chouxiang/chouxiang.js'
import Card from "@/components/Card.vue";

export default {
    components: {Card},

    methods: {
        selectText() {
            const target = this.$refs.targetElement;
            const selection = window.getSelection();

            if (document.body.createTextRange) {
                const range = document.body.createTextRange();
                range.moveToElementText(target);
                range.select();
            } else if (window.getSelection) {
                const range = document.createRange();
                range.selectNodeContents(target);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        },
    },
    computed: {
        enc() {
            let array = [];
            for (let i = 0; i < this.msg.length; i++) {
                let charCode = this.msg.charCodeAt(i);
                let binaryCharCode;
                if (charCode <= 0x7F) {
                    binaryCharCode = charCode.toString(2).padStart(8, '0'); // 单字节字符，使用8位二进制表示
                } else {
                    // 多字节字符，将 Unicode 编码转换为字节序列
                    let byteSequence = encodeURIComponent(this.msg[i]).substr(1).split('%').map(hex => parseInt(hex, 16));
                    binaryCharCode = byteSequence.map(byte => byte.toString(2).padStart(8, '0')).join('');
                }
                // 将字符的二进制表示拆分成8位字节并存储在binaryArray数组中
                for (let j = 0; j < binaryCharCode.length; j += 8) {
                    array.push(parseInt(binaryCharCode.slice(j, j + 8), 2));
                }
            }
            return chouxiang.encode(new Uint8Array(array));
        },
        dec() {
            let binaryArray = chouxiang.disHiddenDecode(this.msg1);
            let result = '';
            let i = 0;
            while (i < binaryArray.length) {
                let byte = binaryArray[i];
                let char;
                if (byte >> 7 === 0) {
                    // 单字节字符
                    char = String.fromCharCode(byte);
                    i += 1;
                } else if ((byte >> 5) === 6) {
                    // 双字节字符
                    char = String.fromCharCode(((byte & 0x1F) << 6) | (binaryArray[i + 1] & 0x3F));
                    i += 2;
                } else if ((byte >> 4) === 14) {
                    // 三字节字符
                    char = String.fromCharCode(((byte & 0xF) << 12) | ((binaryArray[i + 1] & 0x3F) << 6) | (binaryArray[i + 2] & 0x3F));
                    i += 3;
                } else {
                    // 四字节字符
                    char = String.fromCharCode(((byte & 0x7) << 18) | ((binaryArray[i + 1] & 0x3F) << 12) | ((binaryArray[i + 2] & 0x3F) << 6) | (binaryArray[i + 3] & 0x3F));
                    i += 4;
                }
                result += char;
            }
            return result;
        },

    },
    data() {
        return {
            msg: '',
            msg1: '',
            msg2: ''
        }
    }
}
</script>

<template>
    <div class="container" style="margin:0 auto">
        <div class="row" style="height: 100%">
            <div class="col-md-6 col-12 p-10" style="margin-top: 10px;margin-bottom: 10px">
                <Card title="编码器" style="height: 500px">
                    <textarea v-model="msg" style="resize: none;width: 100%;height: 100px" ondragstart="return false;"/>
                    <div style="overflow-y: scroll !important;height: 300px">
                        <p @click="selectText">{{ enc }}</p>
                    </div>
                </Card>
            </div>
            <div  class="col-md-6 col-12 p-10" style="margin-top: 10px;margin-bottom: 10px">
                <Card title="解码器" style="height: 500px">
                    <textarea v-model="msg1" style="resize: none;width: 100%;height: 100px" ondragstart="return false;"/>
                    <div style="overflow-y: scroll !important;height: 300px">
                        <pre style="white-space: pre-wrap;">{{ dec }}</pre>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<style lang="less">
p, pre {
    font-size: 20px;
    text-align: left;
}
</style>
