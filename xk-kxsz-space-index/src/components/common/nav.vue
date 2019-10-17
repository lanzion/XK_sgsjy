<template>
    <div id="nav" class="container">
        <nav class="nav">
            <router-link v-for="(item, index) in navLink" :to="item.url" :key="index">{{ item.name }}</router-link>
        </nav>
    </div>
</template>

<script>
import { requestNavList } from '@/service/common.js'
import { getNavList } from '@/mixin/getNavList.js'
export default {
    name: 'nav',
    mixins: [getNavList],
    data() {
        return {
        }
    },
    created() {
        this.getNavList('创客空间')
    }
}

</script>

<style lang='scss' scoped>
.nav {
    margin: 0 auto;
    font-size: 16px;
    .active {
        color: #DD0000;
        border-bottom: 2px solid #DD0000;
    }
    a {
        display: inline-block;
        font-size: 16px;
        padding: 16px 20px;
        color: #3E3E3E;
    }
}
</style>
