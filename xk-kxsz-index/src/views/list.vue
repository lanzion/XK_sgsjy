<template>
    <router-view class="container list-wrap"></router-view>
</template>

<script>

export default {
    name: 'list',
    data() {
        return {}
    }
}

</script>

<style lang='scss'>
@import '~@/assets/css/scss/list.scss';
@import '~@/assets/css/scss/item_list.scss';
.list-wrap {
    margin: 0 auto 100px;
}
</style>
