<template>
    <div class="back-stage__container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'backStageIndex' // 管理后台主页
    }
</script>

<style lang="scss" scoped>
    .back-stage__container {
        min-width: 930px;
        margin: 0 16px;
    }
</style>

<style lang='scss'>
@import '~@/asset/scss/table.scss';
@import '~@/asset/scss/admin_back-stage_content.scss';
</style>
