<template>
	<nav class="nav-list-box bgw fl">
	    <h4 class="nav-head">{{title}}</h4>
	    <ul class="nav-group">
	        <router-link class="nav-group-item" v-for="(item, index) in navItem" tag="li" :to="{ path: item.url, query: query }" :key="index">
	            <span>{{item.name}}</span>
	        </router-link>
	    </ul>
	</nav>
</template>

<script>
    export default {
        name: 'side_tabs',
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            navItem: {
                type: Array,
                default() {
                    return []
                }
            },
            query: {
                type: Object,
                default() {
                    return this.$route.query
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
$padding-size: 20px;
.nav-list-box{
    width: 202px;
    font-size: 14px;
    overflow: hidden;
    min-height: 524px;
    .nav-head{
        line-height: 42px;
        text-indent: 30px;
        font-size: 15px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
    }
    .nav-group {
        margin-bottom: $padding-size;
        background-color: #fff;

        .nav-group-item {
            line-height: 42px;
            text-indent: 50px;
            cursor: pointer;

            &:hover {
            	color: $theme-color;
            }
            &.active {
                background-color: $nav-bgc;
                border-left: 2px solid $theme-color;
            }
            &.active {
                &,
                [class*="icon-admin-i-"],
                [class*=" icon-admin-i-"] {
                    color: $theme-color;
                }
            }

            [class*="icon-admin-i-"],
            [class*=" icon-admin-i-"] {
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
}
</style>
