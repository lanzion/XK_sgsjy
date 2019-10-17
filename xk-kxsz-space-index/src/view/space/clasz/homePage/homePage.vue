<template>
	<div id="classHomePage">
		<div class="content_l bgw">
            <h2 class="title dynamic-title p15">动态</h2>
            <div v-if="listData.length > 0">
                <ul class="dynamic_ul clearfix">
                    <li v-for="(item, index) in listData" :key="item.id" class="dynamic_li fl">
                        <router-link class="head-face circle" :style='{backgroundImage: "url(" + getFileUrl(item.userImage) + ")"}' :to="{path: `/space/${item.identity == '0' ? 'student' : 'teacher'}/dynamic`, query:{uid: item.userId }}"></router-link>
                        <div class="dynamic_content">
                            <p><router-link class="name" :to="{path: `/space/${item.identity == '0' ? 'student' : 'teacher'}/dynamic`, query:{uid: item.userId }}">{{item.userName}}</router-link></p>
                            <p>
                                <span>{{dynamicType[item.dynamicType]}}</span>
                                <router-link :to="dynamicPath(item.dynamicType, item)" class="dynamicName" :title="item.title">{{ item.title | textOverflow(15) }}</router-link>
                                <!-- <v-del class="fr del"></v-del> -->
                            </p>
                            <p class="icon-i-time2"> {{ item.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </p>
                        </div>
                    </li>
                </ul>
                <v-pagination :param.sync="pageParam" :changePage="changePage"></v-pagination>
            </div>
            <div v-else class="isNull-list">
                暂无动态
            </div>
		</div>
		<div class="content_r">
			<v-bulletinBoard :datas='bulletinData' class="bgw"></v-bulletinBoard>
			<div class="statistical bgw">
                <h2 class="title">学生光荣榜</h2>
                <v-person-list :datas="personData" :pathUrl="sideBarUrl" :handle-request="requestClassGlory" :is-glory="true"></v-person-list>
            </div>
		</div>
	</div>
</template>

<script>
import bulletinBoard from 'Common/bulletinBoard.vue'
import { inforData, classGlory,classDynamicList } from '@/service/homePage.js'
import { requestNoticeList } from '@/service/space_clasz.js'
import tabs from 'Common/classificationList/classification/tabs.vue'
import personList from 'Common/classificationList/list/text/personList.vue'
// import del_popover from 'Common/button/del_popover.vue'
import pagination from '@/components/common/pagination.vue'
export default {
	name:'classHomePage',
	components: {
		'v-bulletinBoard': bulletinBoard,
		'v-tabs': tabs,
        'v-person-list': personList,
        // 'v-del': del_popover,
        'v-pagination': pagination
	},
	data () {
		return {
            claszId: this.$route.query.id || this.$ls.get('baseInfo').student.classId,
			bulletinData: [],
			param: {
				pageSize: 10,
				pageNum: 1
			},
            personData: [],
            sideBarUrl: '/studentSpace',
            listData: [],
            pageParam: {
                pageNum: 1,
                pageSize: 20,
                totalNum:0
            },
            dynamicType: {
                '1': '发布了作品',
                '2': '发表了话题',
                '3': '上传了资源',
                '4': '发布了课程',
                '5': '发布了项目',
                '6': '发布了活动',
                '7': '分享了作品',
                '8': '分享了资源',
                '9': '分享了课程',
                '10': '分享了项目',
                '11': '分享了活动',
                '12': '发布了需求',
                '13': '发布了服务',
                '14': '发布了商业策划',
                '15': '发布了故事',
                '16': '分享了需求',
                '17': '分享了服务',
                '18': '分享了商业策划',
                '19': '分享了故事'
            }
		}
	},
	mounted() {
        //资讯数据
		requestNoticeList({noticeType: '1', title: '', busId: this.claszId}, { pageSize: 9999, pageNum: 1 }).then(res => {
			if(res.data.code === 200 && res.data.entity != null) {
				this.bulletinData = res.data.entity.resultData
			}
		})
        this.getDynamicList()
        this.requestClassGlory()
	},
  methods: {
    dynamicPath (val, item) {
        switch (val) {
            case '1':
            case '7':
                return {path: '/space/worksDetail', query: {id: item.busId} }
                break;
            case '2':
                return {path: '/claszSpace/topic/detail', query: {id: this.$route.query.id, topicId: item.busId} }
                break;
            case '3':
            case '8':
                return {path: '/space/resource/details', query: {id: item.busId} }
                break;
            case '4':
            case '9':
                return {path: '/education/course/detail', query: {id: item.busId} }
                break;
            case '5':
            case '10':
                return {path: '/education/project/detail', query: {id: item.busId} }
                break;
            case '6':
            case '11':
                return {path: '/space/activity/details', query: {id: item.busId} }
                break;
            case '12':
            case '16':
                return {path: '/street/lagou/detail/2/instruction', query: {id: item.busId} }
                break;
            case '13':
            case '17':
                return {path: '/street/lagou/detail/1/instruction', query: {id: item.busId} }
                break;
            case '14':
            case '18':
                return {path: '/street/co/plan/detail/info', query: {id: item.busId} }
                break;
            case '15':
            case '19':
                return {path: '/street/excellent/story/detail/info', query: {id: item.busId} }
                break;
        }
    },
    // 分页改变
    changePage (pageNum) {
        this.$set(this.$data.pageParam, 'pageNum', pageNum);
        this.getDynamicList()
    },
    // 光荣榜数据
	requestClassGlory() {
        let userId = ''
        if (this.$ls.get('loginInfo')) {
            userId = this.$ls.get('loginInfo').userInfo.id
        }
        classGlory({classId: this.claszId, userId: userId}).then(res => {
            if(res.data.code === 200 && res.data.entity != null){
              this.personData = res.data.entity
            };
        })
    },
    /*
     * 获取动态列表数据
     * classId:班级id
     */
    getDynamicList(){
        classDynamicList({classId: this.claszId},{pageSize:10,pageNum:this.pageParam.pageNum}).then((res)=>{
            if(res.data.code == 200){
                this.pageParam.totalNum = res.data.entity.totalNum;
                this.listData = res.data.entity.resultData;
            }
        })
    }
  }
}
</script>

<style lang='scss'>

</style>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
$border-color: #c9c9c9;
$head-size: 72px;
.dynamic-title {
    /* color: $default-color; */
}
.p15 {
    padding: 0 15px;
}
#classHomePage {
    .title {
        height: 40px;
        line-height: 40px;
        text-indent: .5em;
        font-size: 16px;
        border-bottom: 1px solid $border-color;
    }
	.content_l,
	.content_r {
        box-sizing: border-box;
    }
    .content_l {
	    float: left;
	    width: 75%;
        .dynamic_ul {
            padding: 15px;
            box-sizing: border-box;
            .dynamic_li {
                width: 50%;
                padding: 15px;
                box-sizing: border-box;
                .head-face {
                    float: left;
                    display: inline-block;
                    width: $head-size;
                    height: $head-size;
                    background-color: #ddd;
                    margin-right: 12px;
                }
                .dynamic_content {
                    overflow: hidden;
                    font-size: 16px;
                    .dynamicName:hover {
                        color: $default-color;
                    }
                    p {
                        line-height: 1.5;
                        &:first-of-type {
                            font-size: 1.125em;
                            a:hover {
                                color: $default-color;
                            }
                        }
                        &:nth-of-type(2) {
                            font-size: .875em;
                            span:first-of-type {
                                color: $border-color;
                            }
                        }
                        &:last-of-type {
                            font-size: .875em;
                            color: $border-color;
                        }
                    }
                }
                &:hover p:nth-of-type(2) .del {
                    display: inline-block;
                }
            }
        }
	}
	.content_r {
	    float: right;
	    width: 22.5%;
        .statistical {
            margin-top: 20px;
            /* padding: 8px 16px 0; */
	    }
	}
    .isNull-list {
        border: none;
    }
    .del {
        display: none;
    }
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #classHomePage {
            .content_l {
                .dynamic_ul {
                    .dynamic_li {
                        .dynamic_content {
                            .dynamicName,
                            p:first-of-type a {
                                &:hover {
                                    color: $color-value;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
