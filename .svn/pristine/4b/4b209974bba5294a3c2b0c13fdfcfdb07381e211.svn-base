<template>
    <div id="search" class="clearfix">
        <div class="search clearfix">
            <input type="text" :placeholder="tips" class="search_text" v-model="search" v-on:keyup.enter="getSearch">
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
        getSearch(){
            this.$emit('search', this.search.trim())
        },
        routeChange (){
            this.search = ''
        }
    },
    props:{
        tips:{
            type:String,
            default: '在结果中搜索'
        }
    },
    watch: {
        "$route":"routeChange",
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/form.scss';
@import '~@/asset/scss/vars.scss';
.search {
    float: right;
    height: 32px;
    border: 1px solid $default-color;
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
        background-color: $default-color;
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
