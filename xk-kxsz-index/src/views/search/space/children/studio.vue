<template>
    <div class="container listBox studioMember">
        <div>
            <el-row class="maker_ul" v-if="items.length" :gutter="20">
                <el-col v-for="(i, k) in items" :span="8" :key="k">
                    <div class="maker_li bgw" @click.prevent="redirect(pages.detail.studio, { query: { id: i.id } })">
                        <div class="mentor_li_box1 fl">
                            <div class="mentor_li_box1_face circle" :style="{'background-image': `url(${i.cover || faceDefault})`}"></div>
                            <button type="button" class="mentor_li_box1_apply" @click.stop="opensayVisible(i.id)">申请加入</button>
                        </div>
                        <div class="mentor_li_box2 fl">
                            <p class="mentor_li_box2_name" v-html="filterKeyWords(i.name, keyWords)"></p>
                            <p class="mentor_li_box2_address">{{ i.provinceName ? i.provinceName : '' }}{{ i.cityName ? i.cityName : '' }}{{ i.areaName ? i.areaName : '' }}</p>
                            <ul class="maker_li_countsUl table-layout" style="margin: 30px 0 20px -20px;">
                                <li class="maker_li_countsLi table-cell" v-for="(m, n) in i.counts">
                                    <p class="maker_li_countsLi_num">{{ m.value }}</p>
                                    <p class="maker_li_countsLi_name">{{ m.name }}</p>
                                </li>
                            </ul>
                            <p class="mentor_li_introduction" :title="i.introduction">
                                {{ i.introduction | handleHtmlDesc(42) }}
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="no-data" v-else>暂无导师工作室空间数据</div>
            <v-pagination :param.sync='pageParam' @callback="changePage"></v-pagination>
            <el-dialog title="说点什么" :visible.sync="sayVisible" size="tiny">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="say" resize="none"> </el-input>
                <div class="btn_group">
                    <button type="button" class="maker_li_func_message" @click="sayVisible = false;say = ''">取消</button>
                    <button type="button" class="maker_li_func_focus" @click="apply">确定</button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import { requestStudio, judgeIsExist, addMemberApply } from '@/service/space.js'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'studioMember', // 创客街区
    components: {
        'v-pagination': pagination,
    },
    data() {
        return {
            items: [],
            pageParam: {
                totalNum: 0,
                pageNum: 1,
                pageSize: 20
            },
            sayVisible: false,
            say: '',
            sayId: '',
            isExist: false // 判断登录用户是否已经创建过工作室
        }
    },
    mounted() {
        this.getList()
        if (this.$ls.get('loginUId')) {
            const userId = this.$ls.get('loginUId')
            this.judgeExist(userId)
        }
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        apply() {
            if (this.$ls.get('userIdentity') === 'teacher') {
                addMemberApply({ studioId: this.sayId, content: this.say }).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({ type: 'success', message: '发送成功' })
                        this.$set(this.$data, 'isApply', 1)
                    } else {
                        this.$message({ message: res.data.msg })
                    }
                    this.sayVisible = false
                })
            } else {
                this.$message({
                    message: '只允许老师参加'
                })
            }
        },
        opensayVisible(id) {
            if (this.$ls.get('loginInfo')) {
                this.sayId = id
                this.sayVisible = true
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 判断登录用户是否已经创建过工作室
        judgeExist(userId) {
            judgeIsExist({ userId: userId }).then((res) => {
                if (res.data.code === 200) {
                    this.isExist = res.data.appendInfo.exist
                }
            })
        },
        getList() {
            requestStudio({ name: this.keyWords }, this.pageParam).then((res) => {
                if (res.data.code === 200 && res.data.entity) {
                    this.items = res.data.entity.resultData
                    this.items.forEach((i) => {
                        i.counts = [
                            { name: '创客', value: i.num ? i.num : 0 },
                            { name: '成果', value: i.resourceNum ? i.resourceNum : 0 },
                            { name: '微课', value: i.courseNum ? i.courseNum : 0 },
                            { name: '访客', value: i.browseNum ? i.browseNum : 0 }
                        ]
                    })
                    this.setTotalNum(res.data.entity.totalNum)
                    this.pageParam.totalNum = res.data.entity.totalNum
                }
            })
        },
        // 分页改变
        changePage(pageNum) {
            this.$set(this.$data.pageParam, 'pageNum', pageNum)
            this.getList()
        },
    },
    computed: {
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getList()
            },
            deep: true
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
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/vars.scss';
.studioMember {
    font-size: 14px;
    .nav {
        height: 54px;
        text-align: right;
        line-height: 54px;
        .apply {
            border: none;
            background-color: nth($default-color, 1);
            color: #fff;
            padding: 10px 22px;
            border-radius: $button-radiu;
        }
    }
    .maker_ul {
        .maker_li {
            height: 230px;
            padding: 25px 15px;
            margin-bottom: 20px;
            box-sizing: border-box;
            border-radius: $box-radiu;
            transition: box-shadow .5s;
            cursor: pointer;
            overflow: hidden;
            &:hover {
                box-shadow: $index-box-shadow;
                .work_lis_msg_title {
                    color: #0da8ff;
                }
            }
            .mentor_li_box1 {
                padding-right: 15px;
                width: 130px;
                height: 100%;
                box-sizing: border-box;
                text-align: right;
                .mentor_li_box1_face {
                    display: inline-block;
                    margin: 8px 0 40px;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
                .mentor_li_box1_apply {
                    display: block;
                    width: 100%;
                    height: 35px;
                    background-color: nth($default-color, 1);
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-size: 14px;
                    &:hover {
                        background-color: nth($default-color, 2);
                    }
                }
            }
            .mentor_li_box2 {
                width: 220px;
                /* padding: 0 30px; */
                box-sizing: border-box;
                .mentor_li_box2_name {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .mentor_li_box2_address {
                    font-size: 12px;
                    color: #bbbbbb;
                }
                .mentor_li_introduction {
                    font-size: 14px;
                    line-height: 1.5;
                    text-align: justify;
                    word-wrap: break-word;
                }
                .maker_li_countsUl {
                    height: 40px;
                    width: 120%;
                    margin: 30px 0px 20px -10px;
                    .maker_li_countsLi {
                        text-align: center;
                        .maker_li_countsLi_num {
                            font-size: 14px;
                            margin-bottom: 10px;
                        }
                        .maker_li_countsLi_name {
                            font-size: 12px;
                            color: #bbb;
                        }
                        & + .maker_li_countsLi {
                            height: 40px;
                            border-left: 1px solid #dfdfdf;
                        }
                    }
                }
            }
        }
    }
    .category-input-box {
        .category-title {
            line-height: 34px;
        }
    }
    // 关键字搜索部分
    .key-search{
        padding-right: 8px;
        margin: 20px 0;
        background-color: #fff;
        .total-num{
            line-height: 46px;
            margin-right: 10px;
            .num{
                color: #00a0e9;
            }
        }
        .sort-bar-box {
            width: auto;
        }
        .search-box {
            margin-top: 6px;
        }
    }
    .btn_group {
        font-size: 0;
        margin-top: 20px;
        text-align: right;
        .maker_li_func_focus, .maker_li_func_message {
            margin: 0 5px;
            width: 88px;
            height: 32px;
            border: 1px solid #dfdfdf;
            border-radius: $button-radiu;
            &:hover {
                background-color: nth($default-color, 2);
                border: 1px solid nth($default-color, 1);
                color: #fff;
            }
        }
        .maker_li_func_focus {
            background-color: nth($default-color, 1);
            border: 1px solid nth($default-color, 1);
            color: #fff;
        }
    }
}
</style>
