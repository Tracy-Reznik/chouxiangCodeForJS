<template>
    <div class="container" style="margin:0 auto">
        <div class="row" style="height: 100%">
            <div class="col-md-6 col-12 p-10" style="margin-top: 10px;margin-bottom: 10px">
                <Card title="编码器" style="height: 500px">
                    <Upload style="width: 100%;height: 100px" @fileUploaded="handleFileUploaded"/>
                    <div style="overflow-y: scroll !important;height: 300px">
                        <p ref="targetElement" @click="selectText">{{ enc }}</p>
                    </div>
                </Card>
            </div>
            <div class="col-md-6 col-12 p-10" style="margin-top: 10px;margin-bottom: 10px">
                <Card title="解码器" style="height: 500px">
                    <textarea v-model="encinput" style="resize: none;width: 100%;height: 100px" ondragstart="return false;"/>
                    <div ref="output" style="overflow-y: scroll !important;height: 300px" class="show_info">

                    </div>
                    <p style="display: none">{{dec}}}</p>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Upload from "@/components/Upload.vue";
import binEncDec from "@/module/chouxiang/binEncDec.js";

export default {
    name: "File",
    components: {Card, Upload},
    data() {
        return {
            enc: '',
            encinput: '',
            dec: new Uint8Array(),
            file: new Uint8Array()
        }
    },computed:{
        dec(){
            function createElementFromMime(mimeType) {
                let element;
                mimeType=mimeType.replace(/[\r\n]/g,"")
                if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/gif' || mimeType==='image/webp' || mimeType==='image/bmp' || mimeType==='image/svg+xml' || mimeType==='image/tiff' || mimeType==='image/x-icon' || mimeType==='image/vnd.microsoft.icon' || mimeType==='image/vnd.wap.wbmp' || mimeType==='image/x-xbitmap' || mimeType==='image/x-xpixmap' || mimeType==='image/x-xwindowdump' || mimeType==='image/x-portable-anymap' || mimeType==='image/x-portable-bitmap' || mimeType==='image/x-portable-graymap' || mimeType==='image/x-portable-pixmap' || mimeType==='image/x-rgb' || mimeType==='image/x-xbitmap' || mimeType==='image/x-xpixmap' || mimeType==='image/x-xwindowdump') {
                    element = document.createElement('img');
                } else if (mimeType === 'audio/mpeg' || mimeType === 'audio/ogg' || mimeType === 'audio/wav' || mimeType==='audio/webm' || mimeType==='audio/3gpp' || mimeType==='audio/3gpp2' || mimeType==='audio/aac' || mimeType==='audio/mp4' || mimeType==='audio/x-aiff' || mimeType==='audio/x-ms-wma' || mimeType==='audio/x-wav' || mimeType==='audio/x-pn-realaudio' || mimeType==='audio/x-pn-realaudio-plugin' || mimeType==='audio/x-pn-realaudio-plugin') {
                    element = document.createElement('audio');
                    element.controls= true;
                } else if (mimeType === 'video/mp4' || mimeType === 'video/ogg' || mimeType === 'video/webm' || mimeType==='video/3gpp' || mimeType==='video/3gpp2' || mimeType==='video/avi' || mimeType==='video/mpeg' || mimeType==='video/quicktime' || mimeType==='video/x-ms-wmv' || mimeType==='video/x-msvideo' || mimeType==='video/x-flv' || mimeType==='video/x-f4v' || mimeType==='video/x-m4v' || mimeType==='video/x-matroska' || mimeType==='video/x-ms-asf' || mimeType==='video/x-ms-asx' || mimeType==='video/x-ms-wm' || mimeType==='video/x-ms-wmx' || mimeType==='video/x-ms-wvx' || mimeType==='video/x-msvideo' || mimeType==='video/x-sgi-movie' || mimeType==='video/x-smv' || mimeType==='video/x-flv' || mimeType==='video/x-f4v' || mimeType==='video/x-m4v' || mimeType==='video/x-matroska' || mimeType==='video/x-ms-asf' || mimeType==='video/x-ms-asx' || mimeType==='video/x-ms-wm' || mimeType==='video/x-ms-wmx' || mimeType==='video/x-ms-wvx' || mimeType==='video/x-msvideo' || mimeType==='video/x-sgi-movie' || mimeType==='video/x-smv') {
                    element = document.createElement('video');
                    element.controls= true;
                } else if (mimeType === 'text/plain' || mimeType === 'text/css' || mimeType === 'text/javascript' || mimeType === 'text/csv' || mimeType === 'text/calendar' || mimeType === 'text/rtf' || mimeType === 'text/richtext' || mimeType === 'text/sgml' || mimeType === 'text/tab-separated-values' || mimeType === 'text/t140' || mimeType === 'text/troff' || mimeType === 'text/uri-list' || mimeType === 'text/vcard' || mimeType === 'text/vnd.abc' || mimeType === 'text/vnd.curl' || mimeType === 'text/vnd.DMClientScript' || mimeType === 'text/vnd.flatland.3dml' || mimeType === 'text/vnd.fly' || mimeType === 'text/vnd.fmi.flexstor' || mimeType === 'text/vnd.in3d.3dml' || mimeType === 'text/vnd.in3d.spot' || mimeType === 'text/vnd.IPTC.NewsML' || mimeType === 'text/vnd.IPTC.NITF' || mimeType === 'text/vnd.latex-z' || mimeType === 'text/vnd.motorola.reflex' || mimeType === 'text/vnd.ms-mediapackage' || mimeType === 'text/vnd.net2phone.commcenter.command' || mimeType === 'text/vnd.radisys.msml-basic-layout' || mimeType === 'text/vnd.si.uricatalogue' || mimeType === 'text/vnd.sun.j2me.app-descriptor' || mimeType === 'text/vnd.wap.si' || mimeType === 'text/vnd.wap.sl' || mimeType === 'text/vnd.wap.wml' || mimeType === 'text/vnd.wap.wmlscript' || mimeType === 'text/vnd.wap.wmlscript' || mimeType === 'text/vnd.wap.si' || mimeType === 'text/vnd.wap.sl' || mimeType === 'text/vnd.wap.wml' || mimeType === 'text/vnd.wap.wmlscript') {
                    element = document.createElement('textarea');
                } else if (mimeType === 'application/pdf') {
                    element = document.createElement('embed');
                    element.setAttribute('type', 'application/pdf');
                } else {
                    console.warn('Unsupported MIME type:', mimeType);
                    element = document.createElement('iframe');
                }
                element.style.width = '100%';
                element.style.maxHeight = '100%';
                element.style.objectFit='contain';
                return element;
            }
            const decdata=binEncDec.dataDecode(this.encinput);
            const mimeType = decdata.mime;
            console.log(typeof mimeType)
            const uint8Array = decdata.data;
            const element=createElementFromMime(mimeType);
            const blob = new Blob([uint8Array], {type: mimeType});
            element.src = URL.createObjectURL(blob);
            if (element.tagName === 'TEXTAREA'){
                element.value = new TextDecoder().decode(uint8Array);
            }
            // this.$refs.output.appendChild(element);
            this.$nextTick(() => {
                this.$refs.output.innerHTML = '';
                this.$refs.output.appendChild(element);
            });
        }
    },
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
        handleFileUploaded(file) {
            // 使用FileReader获取文件数据
            const reader = new FileReader();
            reader.onload = (event) => {
                // 获取文件Uint8Array
                const arrayBuffer = event.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);

                // 获取文件mime类型
                const mimeType = file.type;
                // 将Uint8Array和mime类型传递给父组件
                this.enc = binEncDec.dataEncode(uint8Array, mimeType);
            };
            reader.readAsArrayBuffer(file);
        }

    }
}
</script>

<style scoped>



</style>
