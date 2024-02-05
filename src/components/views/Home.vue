<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <div class="container">
        <!-- Brand -->
        <a class="navbar-brand" href="#">典孝急编码器</a>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/Text">文本转码</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/File">文件转码</router-link>
                </li>
            </ul>
        </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>

</style>
