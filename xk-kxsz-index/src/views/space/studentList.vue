<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="screeningBox bgc_w">
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology" groupName="兴趣"></v-classificationDictionary>
            <dl class="category-box category-input-box clearfix">
                <dd class="category-title"><span class="cate-tit">学校</span>:</dd>
                <dt class="category-list clearfix">
                    <xk-region-select class="fl select-region" @region="changeRegion" :clearable="true"></xk-region-select>
                    <el-select v-model="searchSchool" placeholder="选择学校" filterable clearable class="fl select-school" @change="setSearchSchool">
                        <el-option v-for="item in schoolData" :key="item.id" :label="item.schoolName" :value="item.schoolName"></el-option>
                    </el-select>
                    <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"></v-search>
                </dt>
            </dl>
            <dl class="category-box category-input-box clearfix">
                <dd class="category-title"><span class="cate-tit">学生</span>:</dd>
                <v-search class="fl" tips="请输入学生姓名" @search="setSearchStudent"></v-search>
            </dl>
        </section>
        <div class="totalNum clearfix">
            <v-sort-bar class="sort-bar-box fl" :sortBarData="sortBarData" :changeSort="changeSort"></v-sort-bar>
            <p class="fr">共有<span>{{page.totalNum}}</span>个符合条件的学生</p>
        </div>
        <el-row class="maker_ul" v-if="items.length">
            <el-col v-for="(i, k) in items" :span="8" :key="k">
                <div class="maker_li bgw">
                    <div class="maker_li_personal clearfix" @click="goToPersonSpace(i)">
                        <span class="maker_li_personal_face fl" :style="{'background-image': `url(${i.cover || studentDefault})`}"></span>
                        <div class="maker_li_personal_msg fl">
                            <p class="maker_li_personal_msg_name">{{ i.teacherName || i.studentName }}</p>
                            <p class="maker_li_personal_msg_school">{{ i.schoolName }}</p>
                        </div>
                    </div>
                    <p class="maker_li_introduction" :title="i.sign">
                        {{ i.sign | handleHtmlDesc(60) }}
                    </p>
                    <ul class="maker_li_countsUl table-layout">
                        <li class="maker_li_countsLi table-cell" v-for="(m, n) in i.counts">
                            <p class="maker_li_countsLi_num">{{ m.value }}</p>
                            <p class="maker_li_countsLi_name">{{ m.name }}</p>
                        </li>
                    </ul>
                    <div class="maker_li_func">
                        <button type="button" class="maker_li_func_focus" @click.stop="handleFollow(i.userId, !!i.isAttention, i)">{{ !i.isAttention ? '关注' : '已关注' }}</button>
                        <button type="button" class="maker_li_func_message" @click.stop="showPrivateLetterDialog(i.userId)">私信</button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="no-data" v-else>暂无学生空间数据</div>
        <v-pagination :param.sync='page' @callback="changePage"></v-pagination>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
    </div>
</template>

<script>
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import sortBar from '@/components/common/sortBar.vue'
// import region from '@/components/common/select/region_select.vue'
import sendPrivateLetter from '@/components/common/send_private_letter_dialog.vue'
import { requestSchoolList, requestIsCanVisit } from '@/service/common.js'
import { requestStudent } from '@/service/space.js'
import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'

export default {
    name: 'student',
    mixins: [follow, privateLetter],
    components: {
        'v-search': search,
        'v-pagination': pagination,
        'v-classificationDictionary': classificationDictionary,
        'v-sort-bar': sortBar,
        // 'v-region-select': region,
        sendPrivateLetter
    },
    data() {
        return {
            breadcrumb: [
                { path: '/space', name: '空间' },
                { path: '', name: '学生空间列表' }
            ],
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
                },
                // {
                //     name: '学习',
                //     model: 'study'
                // },
                // {
                //     name: '实践',
                //     model: 'guidance'
                // },
                {
                    name: '作品',
                    model: 'results'
                },
                // {
                //     name: '资源',
                //     model: 'collection'
                // },
                // {
                //     name: '访问',
                //     model: 'visit'
                // },
                {
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
            pageParam: {
                pageNum: 1,
                pageSize: 15
            },
            schoolData: [],         // 学校列表
            page: {
                totalNum: 0
            },
            items: [],                    // 列表数据
            loginUserId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
        }
    },
    created() {
        this.page = Object.assign(this.page, this.pageParam)
        this.getData()
    },
    watch: {
        params: {
            handler: function () {
                this.getData()
            },
            deep: true
        },
        pageParam: {
            handler: function () {
                this.getData()
            },
            deep: true
        }
    },
    computed: {
        params: function () {
            return Object.assign({},
                this.region,
                { studentName: this.searchStudent },
                { schoolName: this.searchSchool },
                { territory: this.territory },
                { technology: this.technology },
                this.order
            )
        }
    },
    methods: {
        handleFollow(followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
            this.handleFollowOrNot(followedUId, hasFollowed).then((res) => {
                res && this.getData()
            })
        },
        // 学生搜索框改变
        setSearchStudent(content) {
            this.$set(this.$data, 'searchStudent', content)
        },
        // 学校搜索框/下拉框改变
        setSearchSchool(content) {
            this.$set(this.$data, 'searchSchool', content)
        },
        // 改变领域级联
        changeCascade(items) {
            const territory = Array.from(items, x => x.id)
            this.$set(this.$data, 'territory', territory.join('-'))
        },
        // 改变技术
        changeTechnology(item) {
            this.$set(this.$data, 'technology', item.id)
        },
        // 分页改变
        changePage(pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
        },
        // 排序改变
        changeSort(order, index) {
            const _order = {}

            if (order === -1) {
                _order.composite = 0
            } else {
                _order.composite = 1
                _order[this.sortBarData[index].model] = order
            }
            this.$set(this.$data, 'order', _order)
        },
        // 地区改变
        changeRegion(items) {
            const _region = {}
            const [province, city, area] = items
            _region.provinceId = province
            _region.cityId = city
            _region.areaId = area
            this.$set(this.$data, 'region', _region)
            this.$set(this.$data, 'searchSchool', '')
            this.getSchoolData()
        },
        // 请求学校列表数据
        getSchoolData() {
            requestSchoolList(this.region).then((response) => {
                if (response.data.code === 200) {
                    this.schoolData = response.data.appendInfo.comboxList
                }
            })
        },
        // 请求列表数据
        getData() {
            requestStudent(this.params, this.pageParam).then((response) => {
                if (response.data.code === 200) {
                    this.items = response.data.entity.resultData
                    this.items.forEach((i) => {
                        i.counts = [
                            { name: '作品', value: i.counts ? i.counts.productionNum : 0 },
                            { name: '文章', value: i.counts ? i.counts.articleNum : 0 },
                            { name: '话题', value: i.counts ? i.counts.topicNum : 0 },
                            { name: '粉丝', value: i.counts ? i.counts.fansNum : 0 }
                        ]
                    })
                    this.$set(this.page, 'totalNum', response.data.entity.totalNum)
                }
            })
        },
        // 跳转个人空间
        goToPersonSpace(i) {
            const loginUid = this.$ls.get('loginUId') || ''
            if (loginUid === i.userId) {
                this.redirect(this.pages.my)
            } else {
                this.redirect(this.pages.detail.student, { query: { id: i.orgId, uid: i.userId } })
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.path === '/space/student/dynamic' && (to.query.uid !== undefined && to.query.uid !== this.loginUserId)) {
            requestIsCanVisit({ userId: to.query.uid }).then((res) => {
                if (res.data.code === 200 && res.data.entity) {
                    next()
                } else {
                    this.$message({ message: '您没有访问权限' })
                }
            })
        } else {
            next()
        }
    },
    filters: {
        handleHtmlDesc(txt = '', len = 150, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            let str = '暂无'
            if (txt) {
                str = txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
            return str
        }
    }
}
</script>

<style lang="scss">
    @import '~@/assets/css/scss/form.scss';
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/cascader.scss';
@import '~@/assets/css/scss/teaStuList.scss';

/*     #list {
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
        .name {
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
} */
.totalNum {
    .sort-bar-box {
        width: auto;
    }
}
</style>

