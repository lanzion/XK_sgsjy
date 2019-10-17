<template>
    <footer class='footer'>
        <div class='container clearfix'>
            <section class='footer-box'>
                <h4 class='footer-header'>友情链接</h4>
                <ul class='cols-list link-list' id='link-model'>
                	<li v-for='item in links' class='cols-item'><a target='_blank' :href='item.linkUrl' v-text="item.linkName"></a></li>
                </ul>
            </section>
            <section class='footer-box'>
                <ul class='footer-header cols-list m-12'>
                    <li class='cols-item'>
                        <a :href="`${indexPage}about`">关于我们</a>
                    </li>
                    <li class='cols-item'>
                        <a :href="`${indexPage}help`">帮助中心</a>
                    </li>
                </ul>
                <p>版权所有：广州杰赛科技股份有限公司</p>
                <p>地址：广州市海珠区新港中路381号</p>
            </section>
            <section class='footer-box'>
                <h4 class='footer-header'>客户服务</h4>
                <p><i class='footer-icon icon-index-phone'></i>联系电话：020-84119781</p>
                <p><i class='footer-icon icon-index-mail'></i>邮箱：service@xk100.com</p>
            </section>
        </div>
    </footer>
</template>

<script>
    import { requestLinkList } from '@/service/common.js'
	import { pages } from '@/js/common-config.js'
    export default {
        name: 'link-model',
        data() {
        	return {
                indexPage: pages.index,
        		links: [],
                pageParam: {
                    pageNum: 1,
                    pageSize: 10
                }
        	}
        },
        created() {
            this.getLink()
        },
        methods: {
            getLink() {
                requestLinkList(Object.assign({}, {linkType: 'indexLink'}, this.pageParam)).then(response => {
                    if (response.data.code === 200) {
                        this.links = response.data.entity.resultData || []
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/cols.scss';
	$tab-item-margin: 12px;

	.footer {
        width: 100%;
        padding: 30px 0;
        margin-top: 36px;
        background-color: #707070;
        color: #fefefe;
        line-height: 2;
        z-index: 1;

	    .container {
		    text-align: center;
	    }

	    a {
		    color: #fefefe;
		    &:hover {
		    	color: #fff;
		    }
		}

		.footer-box {
		    overflow: hidden;
		    display: inline-block;
		    vertical-align: top;
		    text-align: left;
		    margin: 0 25px;
		}

        .link-list {
            width: 363px;

            &.cols-list {
                $sw: 12px;
                margin-left: -#{$sw};

                .cols-item {
                    padding: 0 $sw;
                    margin: 0 0 0 -1px;
                }
            }
        }

		.tab-list {
	        margin-left: - $tab-item-margin;
	        overflow: hidden;

	        .tab-list-item {
		        display: inline;
		        padding: 0 $tab-item-margin;
		        border-left: 1px solid;
			}
		}

		.footer-icon {
		    vertical-align: middle;
		}
	}
</style>
