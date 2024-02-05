<template>
    <div class="container">
        <div class="row">
            <h1>典孝急编码器</h1>
            <div class="col-md-6 col-12 p-10">
                <router-link to="/Text" class="card">
                    <h2 class="card-header">文本转码</h2>
                    <div class="card-body">
                        <p>将一段文本转换为抽象编码</p>
                    </div>
                </router-link>
            </div>
            <div class="col-md-6 col-12 p-10">
                <router-link to="/File" class="card">
                    <h2 class="card-header">文件转码</h2>
                    <div class="card-body">
                        <p>将一个文件转换为抽象编码</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
div.row{
    .card{
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
</style>
