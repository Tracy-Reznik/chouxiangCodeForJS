<template>
    <div class="container">
        <div
            class="dropzone"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="handleClick"
        >
            <div v-if="!file" class="dz-message">
                <p>上传文件</p>
            </div>
            <input
                type="file"
                ref="fileInput"
                class="form-control"
                style="display: none;"
                @change="handleFileChange"
            />
            <div v-if="file" id="fileList">{{ file.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null
        };
    },
    methods: {
        handleDragOver() {
            // Add any styling changes if needed
        },
        handleDragLeave() {
            // Add any styling changes if needed
        },
        handleDrop(event) {
            this.handleFile(event.dataTransfer.files[0]);
            this.uploadFile();
        },
        handleClick() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            this.handleFile(event.target.files[0]);
            this.uploadFile();
        },
        handleFile(file) {
            this.file = file;
        },
        uploadFile() {
            if (!this.file) return;

            // Perform upload operation here
            console.log("Uploading file:", this.file);
            this.$emit('fileUploaded', this.file);
            // You can send the file to the server using Axios or any other method here
        }
    }
};
</script>

<style scoped>
.dropzone {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.dropzone:hover {
    border-color: #aaa;
}

.dropzone .dz-message {
    font-size: 1.2em;
}

#fileList {
    margin-top: 10px;
}
</style>
