<template>
    <div id="search" class="clearfix">
        <div class="search clearfix">
            <input type="text" :placeholder="tips" class="search_text" v-model.trim="search" v-on:keyup.enter="getSearch">
            <div class="el-search_btn icon-search" @click="getSearch"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        getSearch() {
            this.$emit('search', this.search)
        },
        routeChange() {
            this.search = ''
        }
    },
    props: {
        tips: {
            type: String,
            default: '在结果中搜索'
        }
    },
    watch: {
        $route: 'routeChange',
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/vars.scss';
.search {
    float: right;
    height: 32px;
    border: 1px solid $theme-color;
    .search_text {
        float: left;
        height: 30px;
        border: none;
        text-indent: 5px;
    }
    .el-search_btn {
        float: left;
        width: 42px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: $theme-color;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
    }
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .search {
            border-color: $color-value;
            .el-search_btn {
                background-color: $color-value;
            }
        }
    }
}
</style>
