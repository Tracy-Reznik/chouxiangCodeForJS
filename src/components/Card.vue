<template>
    <div class="card">
        <div class="card-header"  style=""><h1>{{ title }}</h1></div>
        <div class="card-body"  style="">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        title: String
    }
}
</script>

<style scoped>

</style>
