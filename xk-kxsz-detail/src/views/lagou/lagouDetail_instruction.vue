<template>
    <article class="lagouDetail_instruction" v-html="detail.content"></article>
</template>

<script>
export default {
    props: {
        detail: Object
    }
}
</script>

<style lang='scss' scoped>
.lagouDetail_instruction {
    padding: 15px;
}
</style>

<style lang='scss'>
.lagouDetail_instruction {
    width: 100%;
    letter-spacing: 0.05em;
    line-height: 1.5;
    img {
        margin: 20px 10%;
        width: 80%;
    }
}
</style>