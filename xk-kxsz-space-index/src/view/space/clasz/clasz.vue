<template>
    <div id="classes">
        <!-- <v-nav></v-nav> -->
        <v-banner></v-banner>
        <div class="container listBox">
            <section class="classify-box">
                <v-region @region="changeRegion" :regionParams="Object.values(region)"></v-region>
                <v-classificationDictionary model="primarySchool,middleSchool,highSchool" :changeDataDic="changeGrade" groupName="年级"></v-classificationDictionary>
            </section>
            <div class="searchBox">
                <v-search @search="setSearchContent" tips="请输入学校名称"></v-search>
            </div>
            <!-- <div id="list">
                <transition-group class="list" v-if="items.length" name="list-item" tag="ul" mode="out-in">
                    <li class="list-item__box" :style="{width: listWidth}" v-for="(item, index) in items" :key="index" >
                        <div class="list-item-img__box" @click="toDetail(item)">
                            <img :src="getFileUrl(item.cover) || listDefault">
                        </div>
                        <h6 class="list-item-title clearfix">
                            <span class="fl">{{ item.className }}</span>
                            <span class="fr">{{ item.schoolName }}</span>
                        </h6>
                        <ul class="cols-list list-item-count">
                            <li class="cols-item">资源: {{item.counts == null ? 0 : item.counts.resouceNum}}</li>
                            <li class="cols-item">作品: {{item.counts == null ? 0 : item.counts.productionNum}}</li>
                            <li class="cols-item">话题: {{item.counts == null ? 0 : item.counts.topicNum}}</li>
                            <li class="cols-item">学生: {{item.counts == null ? 0 : item.counts.studentNum}}</li>
                        </ul>
                    </li>
                </transition-group>
                <div v-else class="isNull-list">暂无数据</div>
            </div> -->
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span class="fl name ellipsis" :title="props.item.className">{{ props.item.className }}</span>
                        <span class="fr school ellipsis" :title="props.item.schoolName">{{ props.item.schoolName }}</span>
                    </h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">资源: {{props.item.counts == null ? 0 : props.item.counts.resouceNum}}</li>
                        <li class="cols-item">作品: {{props.item.counts == null ? 0 : props.item.counts.productionNum}}</li>
                        <li class="cols-item">话题: {{props.item.counts == null ? 0 : props.item.counts.topicNum}}</li>
                        <li class="cols-item">学生: {{props.item.counts == null ? 0 : props.item.counts.studentNum}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync="page" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import region from '@/components/common/screening/region.vue'
// import nav from '@/components/common/nav.vue'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import { requestClaszList,judgeClaszMember } from '@/service/space_clasz.js'
export default {
    name: 'classes',
    components: {
        'v-banner': banner,
        'v-region': region,
        // 'v-nav': nav,
        'v-list': list,
        'v-search': search,
        'v-pagination': pagination,
        'v-classificationDictionary': classificationDictionary
    },
    data () {
        return {
            region: {
                province: '',
                city: '',
                area: ''
            },
            grade: '',
            search: '',
            pagParam: {
                pageNum: 1,
                pageSize: 20
            },
            listData: {
                col: 4,
                pathUrl: '/claszSpace/homePage',
                params: {
                    names: 'id',
                    val: 'orgId'
                }
            },
            page: {},
            items: [],
            userId:'',       //当前登录人id
            hadLogin: false
        }
    },
    computed: {
        params: function() {
            return Object.assign( {}, {schoolName: this.search}, {gradeId: this.grade}, this.region, this.pagParam );
        },
        listWidth: function() {
            return this.getWidth(4)
        }
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                this.getData();
            },
            deep: true
        }
    },
    created() {
        scrollToTop()
        this.page = Object.assign( {}, this.pagParam );
        this.getData();
        if(this.$ls.get('loginInfo')){
            this.userId = this.$ls.get('loginInfo').userInfo.id;
            this.hadLogin = true;
        }
    },
    methods: {
        // 地区改变
        changeRegion: function (region) {
            if (region == undefined) return;
            let _region = {
                province: region[0],
                city: region[1],
                area: region[2]
            };
            this.$set(this.$data, 'region', _region);
        },
        // 年段改变
        changeGrade: function (item) {
            this.$set(this.$data, 'grade', item.id);
        },
        // 搜索框改变
        setSearchContent: function (content) {
            this.$set(this.$data, 'search', content);
        },
        // 分页改变
        changePage: function(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
        // 请求列表数据
        getData: function () {
            requestClaszList(this.params).then(response => {
                this.items = response.data.entity.resultData
                this.$set(this.page, 'totalNum', response.data.entity.totalNum);
            })
        },
        //点击去班级主页前的判断(/claszSpace/homePage)
        toDetail(item){
            if(item.properties == "2"){
                if(this.hadLogin){
                    judgeClaszMember({classId: item.orgId, userId: this.userId}).then((res)=>{
                        let isMember = res.data.entity;
                        if(isMember){
                            this.$router.push({name:'claszHomePage',query:{id:item.orgId}})
                        }else{
                            this.showMessage('info','私密班级，非本班级成员不能访问')
                        }
                    })
                }else{
                    this.showMessage('info','私密班级,不允许访问')
                }
            }else{
                this.$router.push({name:'claszHomePage',query:{id:item.orgId}})
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
@import '~@/asset/scss/index_list.scss';
.list-item-title {
    .name{
        display: inline-block;
        width: 55%;
        text-align: left;
    }
    .school {
        text-align: right;
        width: 45%;
        display: inline-block;
    }
}
</style>
