<template>
    <div id="teacher">
        <!-- <v-nav></v-nav> -->
        <v-banner></v-banner>
        <div class="container listBox">
            <section class="classify-box">
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology" groupName="兴趣"></v-classificationDictionary>
                <dl class="category-box category-input-box clearfix">
                    <dd class="category-title">学校：</dd>
                    <dt class="category-list clearfix">
                        <v-region-select class="fl select-region" @region="changeRegion" :clearable="true"></v-region-select>
                        <el-select v-model="searchSchool" placeholder="选择学校" filterable clearable class="fl select-school" @change="setSearchSchool">
                            <el-option v-for="item in schoolData" :key="item.id" :label="item.schoolName" :value="item.schoolName"></el-option>
                        </el-select>
                        <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"></v-search>
                    </dt>
                </dl>
                <dl class="category-box category-input-box clearfix">
                    <dd class="category-title">学生：</dd>
                    <v-search class="fl" tips="请输入学生姓名" @search="setSearchStudent"></v-search>
                </dl>
            </section>
            <v-sort-bar class="sort-bar-box" :sortBarData="sortBarData" :changeSort="changeSort"></v-sort-bar>
            <div class="totalNum clearfix">
                <p class="fr">共有<span>{{page.totalNum}}</span>个符合条件的学生</p>
            </div>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <img class="list-item-face" :src="getFileUrl(props.item.cover) || faceDefault">
                        <div class="btn-box clearfix">
                            <button @click.stop="handleFollow(props.item.userId, !!props.item.isAttention)" class="fl">
                                <strong>{{props.item.isAttention ? '-' : '+'}}</strong> 关注
                            </button>
                            <button @click.stop="showPrivateLetterDialog(props.item.userId)" class="fr">私信</button>
                        </div>
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span class="name fl ellipsis" :title="props.item.studentName">{{props.item.studentName}}</span>
                        <span class="school fr ellipsis" :title="props.item.schoolName">{{props.item.schoolName}}</span></h6>
                    <ul class="cols-list list-item-count">
                        <li class="cols-item">学习: {{props.item.counts == null ? 0 : props.item.counts.studyNum}}</li>
                        <li class="cols-item">实践: {{props.item.counts == null ? 0 : props.item.counts.practiceNum}}</li>
                        <li class="cols-item">作品: {{props.item.counts == null ? 0 : props.item.counts.productionNum}}</li><br>
                        <li class="cols-item">资源: {{props.item.counts == null ? 0 : props.item.counts.resouceNum}}</li>
                        <li class="cols-item">访问: {{props.item.counts == null ? 0 : props.item.counts.visitNum}}</li>
                        <li class="cols-item">粉丝: {{props.item.counts == null ? 0 : props.item.counts.fansNum}}</li>
                    </ul>
                </template>
            </v-list>
            <v-pagination :param.sync='page' :changePage="changePage"></v-pagination>
        </div>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
// import nav from '@/components/common/nav.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import list from '@/components/common/classificationList/list/graphic/list.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import sortBar from '@/components/common/sortBar.vue'
import region from '@/components/common/select/region_select.vue'
import sendPrivateLetter from '@/components/teacher/send_private_letter_dialog.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import { requestSchoolList, requestIsCanVisit } from '@/service/common.js'
import { requestStudentList } from '@/service/space_student.js'
import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'

export default {
    name: 'student',
    mixins: [follow, privateLetter],
    components: {
        'v-banner': banner,
        // 'v-nav': nav,
        'v-list': list,
        'v-search': search,
        'v-pagination': pagination,
        'v-classificationDictionary': classificationDictionary,
        'v-sort-bar': sortBar,
        'v-region-select': region,
        sendPrivateLetter
    },
    data () {
        return {
            dialog: {
                addresseeId: '', // 私信收信人
                isVisible: false
            },
            region: {
                province: null,
                city: null,
                area: null
            },
            sortBarData: [
                {
                    name: '综合',
                    model: 'composite',
                    default: true
                }, {
                    name: '学习',
                    model: 'study'
                }, {
                    name: '实践',
                    model: 'guidance'
                }, {
                    name: '作品',
                    model: 'results'
                }, {
                    name: '资源',
                    model: 'collection'
                }, {
                    name: '访问',
                    model: 'visit'
                }, {
                    name: '粉丝',
                    model: 'fans'
                }
            ],
            order: {
                composite: 0        // 排序 0-不排序, 1-要排序
            },
            searchSchool: '',     // 学校搜索
            searchStudent: '',    // 学生搜索
            territory: null,            // 领域 1-2-3
            technology: null,         // 技术
            pagParam: {
                pageNum: 1,
                pageSize: 20
            },
            schoolData: [],         // 学校列表
            page: {
                totalNum: 0
            },
            items: [],                    // 列表数据
            listData: {
                col: 5,
                pathUrl: '/studentSpace',
                params: {
                    names: 'id',
                    val: 'orgId'
                }
            },
            loginUserId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
        }
    },
    created(){
        this.page = Object.assign(this.page, this.pagParam);
        scrollToTop()
        this.getData()
    },
    watch: {
        params: {
            handler: function (val, oldVal) {
                this.getData();
            },
            deep: true
        }
    },
    computed: {
        params: function () {
            return Object.assign({},
                this.region,
                this.pagParam,
                {studentName: this.searchStudent},
                {schoolName: this.searchSchool},
                {territory: this.territory},
                {technology: this.technology},
                this.order
            );
        }
    },
    methods: {
        handleFollow (followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
            this.handleFollowOrNot(followedUId, hasFollowed).then(res => {
                res && this.getData()
            })
        },
        // 学生搜索框改变
        setSearchStudent(content) {
            this.$set(this.$data, 'searchStudent', content);
        },
        // 学校搜索框/下拉框改变
        setSearchSchool(content) {
            this.$set(this.$data, 'searchSchool', content);
        },
        // 改变领域级联
        changeCascade(items) {
            let territory = Array.from(items, x => x.id);
            this.$set(this.$data, 'territory', territory.join('-'));
        },
        // 改变技术
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id);
        },
        // 分页改变
        changePage(pageNum) {
            this.$set(this.$data.pagParam, 'pageNum', pageNum);
        },
        // 排序改变
        changeSort(order, index) {
            let _order = {};

            if (order === -1) {
                _order.composite = 0;
            } else {
                _order.composite = 1;
                _order[this.sortBarData[index].model] = order;
            }
            this.$set(this.$data, 'order', _order);
        },
        // 地区改变
        changeRegion(items) {
            let _region = {};
            let [province, city, area] = items;
            _region.provinceId = province;
            _region.cityId = city;
            _region.areaId = area;
            this.$set(this.$data, 'region', _region);
            this.$set(this.$data, 'searchSchool', '');
            this.getSchoolData();
        },
        // 请求学校列表数据
        getSchoolData () {
            requestSchoolList(this.region).then(response => {
                if (response.data.code == 200) {
                    this.schoolData = response.data.appendInfo.comboxList
                }
            })
        },
        // 请求列表数据
        getData () {
            requestStudentList(this.params).then(response => {
                if (response.data.code == 200) {
                    this.items = response.data.entity.resultData
                    this.$set(this.page, 'totalNum', response.data.entity.totalNum);
                }
            })
        }
    },
    // beforeRouteLeave (to, from, next) {
    //     if (to.path === '/space/student/dynamic' && (to.query.uid !== undefined && to.query.uid !== this.loginUserId) ) {
    //         requestIsCanVisit({ userId: to.query.uid }).then(res => {
    //             if (res.data.code === 200 && res.data.entity) {
    //                 next()
    //             } else {
    //                 this.$message({message: '您没有访问权限'})
    //             }
    //         })
    //     } else {
    //         next()
    //     }
    // }
}
</script>

<style lang='scss' scoped>
    @import '~@/asset/scss/cols.scss';
    @import '~@/asset/scss/cascader.scss';

    #list {
        .list-item-face {
            display: block;
            width: 190px;
            height: 190px;
            margin: 0 auto;
            border-radius: 50%;
        }
        .cols-list .cols-item {
            margin-bottom: 4px;
        }
        .list-item__box:hover img {
            transform: scale(1);
        }
        .list-item-title,
        .cols-list {
            text-align: center;
        }
        .list-item-title {
            .name{
                display: inline-block;
                width: 55%;
                text-align: left;
                box-sizing: border-box;
                padding-left: 10px;
            }
            .school {
                box-sizing: border-box;
                padding-right: 10px;
                text-align: right;
                width: 45%;
                display: inline-block;
            }
        }
    }
    .category-input-box {
        .category-title {
            line-height: 34px;
        }
    }

    .listBox {
        margin-bottom: 200px;
        .category-box {
            .select-region,
            .select-school {
                margin-right: 20px;
                height: 32px;
                width: 232px;
            }
        }
        .sort-bar-box {
            margin-top: 42px;
        }
        .totalNum {
            width: 100%;
            padding: 20px 0 10px;
            border-bottom: 1px solid #c9c9c9;
            font-size: 14px;
            span {
                color: #00a0e9;
            }
        }
    }
</style>

<style lang="scss">
    .select-school {
        .el-input__inner {
            height: 34px;
        }
    }
</style>
