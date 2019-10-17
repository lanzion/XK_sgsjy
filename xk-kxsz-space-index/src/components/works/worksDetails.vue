<template>
	<div class="worksDetails" :class="{container: ifSpace}">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item :to="{ path: '/street/excellent' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/street/excellent/works' }">作品列表</el-breadcrumb-item>
            <el-breadcrumb-item>作品详情</el-breadcrumb-item>
        </el-breadcrumb>
		<div class="details-content clearfix ">
			<!-- 左边部分  作品详情-->
			<div :style="{width: isTeacherOrStudentSpace ? '100%' : '895px'}" class="details-left fl">
				<works-detail :detailData="detailData" @getCreator="getCreator" @getOrgId="getOrgId" ref="workDetail"></works-detail>
			</div>
			<!-- 右边部分  作者信息-->
			<div v-if="!isTeacherOrStudentSpace" class="details-right fl clearfix">
				<author-msg :id="creatorId"></author-msg>
				<div class="related-works">
					<h4 class="clearfix bgw"><span class="title fl">相关作品</span><span class="more fr" @click="$router.go(-1)">更多>></span></h4>
                    <ul class="list clearfix" v-if="items.length">
                        <li v-for="(item, index) in items" :key="index" @click="generateRoute(item)" class="list_li bgw">
                            <img :src="getFileUrl(item.resourceId) || listDefault" class="list_li_img">
                            <p class="list_li_title">{{item.workName | textOverflow(14) }}</p>
                            <!-- <p class="info">
                                <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{item.collectNum || 0}}</span>
                                <span class="info-item" title="评论"><i class="icon-i-reply"></i> {{item.commentNum || 0}}</span>
                                <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                            </p> -->
                        </li>
                    </ul>
                    <div v-else class="isNull-list">暂无数据</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import worksDetail from 'components/works/works_details.vue'
import authorMsg from 'components/works/author_msg.vue'
import { requestFrontendWorksList } from '@/service/works.js'
export default {
	name:'worksDetails',
	components:{
		'works-detail': worksDetail,
		'author-msg': authorMsg
	},
	data () {
		return {
			ifSpace: /\/space/.test(this.$route.path),
      		pagParam: {
      			pageSize: 4,
      			pageNum: 1
      		},
      		// 详情的参数
      		detailData:{
      			isStudent: this.$route.path.includes('student')
      		},
      		creatorId: null,
      		isTeacherOrStudentSpace: /^\/space\/student|teacher\/works\/detail/.test(this.$route.path),
            items: []
		}
	},
	created () {
		this.detailData.id = this.$route.query.worksId || this.$route.query.id;
	},
	methods:{
        generateRoute(item = {}) {
            this.$router.replace({ path: this.$route.path, query: { id: item.id} })
        },
		getCreator(val) {
			this.$set(this.$data, 'creatorId', val);
		},
        getOrgId (val) {
            requestFrontendWorksList({workId: this.$route.query.id }, this.pagParam).then(res => {
                if(res.data.code == 200 && res.data.entity != null) {
                    this.items = res.data.entity.resultData
                }
            })
        }
	},
    watch: {
        '$route.query.id' () {
            this.$refs.workDetail.getWorksDetails(this.$route.query.id)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';

.worksDetails{
    width: 1205px;
	.details-content{
		width: 100%;
		overflow: hidden;
        // margin-top: 50px;
		.details-left{
			width: 895px;
			overflow: hidden;
		}
		.details-right{
			width: 290px;
            margin-left: 20px;
			overflow: hidden;
			.related-works{
                width: 285px;
				margin-top: 20px;
				h4 {
					height: 50px;
                    line-height: 50px;
                    text-indent: 1em;
					font-size: 16px;
                    .more {
                        color: #999;
                        margin-right: 10px;
                        cursor: pointer;
                        &:hover {
                            color: #2797ed;
                        }
                    }
				}
                .list {
                    font-size: 14px;
                    .list_li {
                        box-sizing: border-box;
                        border-radius: 5px;
                        overflow: hidden;
                        cursor: pointer;
                        margin-bottom: 10px;
                        .list_li_img {
                            width: 100%;
                            height: 198px;
                        }
                        .list_li_title {
                            font-weight: 400;
                            color: #333;
                            padding: 15px;
                        }
                        &:hover {
                            box-shadow: 3px 3px 8px #ccc;
                            .list_li_title {
                                color: #2797ed;
                            }
                        }
                        .info {
                            font-size: .85em;
                            margin-bottom: 10px;
                            color: #989898;
                            .info-item + .info-item {
                                margin-left: 20px;
                            }
                        }
                    }

                }
			}
		}
	}
}
</style>
