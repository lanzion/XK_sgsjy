<template>
    <section id="interestsArticle" class="bgc_w">
        <!-- 头部功能 -->
        <section class="func">
            <div class="func_l clearfix">
                <!-- 选择分类 -->
                <el-select v-model="classify.value" placeholder="请选择" class='fl' clearable>
                    <el-option v-for="item in classify.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <!-- 管理分类 -->
                <button type="button" class="func_l_btn" @click="classifyPopup = true" v-if='isMember'>添加分类</button>
            </div>
            <div class="func_r clearfix">
                <span class="total fl">共计<span style="color: #009fe9;">{{ pageParam.totalNum }}</span>篇文章</span>
                <!-- 搜索 -->
                <v-search class="fl" tips="请输入文章名称" @search='changeSearch' style="width:200px;"></v-search>
                <!-- 发表 -->
                <router-link class="func_r_pub icon-btn-i-feedback" v-if='isMember' :to="{path:'/interestsSpace/article/publish', query: {id: $route.query.id}}"> 写文章 </router-link>
            </div>
        </section>
        <!-- 文章列表 -->
        <ul class="article_list" v-if="articleList.length">
            <li v-for="(item, index) in articleList" :key="item.id" class="article_li">
                <router-link class="article_li_title" :to="{path:'/articleDetail', query: {id: item.id, orgId: $route.query.id}}">
                    【 {{ item.articelTypeName }} 】 {{ item.title }}
                </router-link>
                <p class="article_li_content">
                    {{ item.content | handleWorksDesc(80) }}
                </p>
                <div class="article_li_func clearfix">
                    <time class="icon-i-time fr"> {{ item.createDate | dateFormat('yyyy-MM-dd HH:mm') }} </time>
                    <i class="icon-input-user fr"> {{ item.userName }} </i>
                    <span class="fr article_li_func_del" v-if="item.createId == $ls.get('loginUId')">
                        <v-del :delData="{ url: '/maker/interests/article/del', name: '文章', params: { id: item.id } }" class="articl_del" @callback="getListData"></v-del>
                        删除
                    </span>
                </div>
            </li>
        </ul>
        <div v-else class="isNull-list">
            暂无数据
        </div>
        <!-- 分页 -->
        <v-pagination :param="pageParam" :changePage='changePage' style="padding:30px 0;"></v-pagination>
        <!-- 管理分类弹窗 -->
        <el-dialog title="管理分类" :visible.sync="classifyPopup" size="tiny" class="classify" :before-close="clearModifyIndex">
            <h3 class="classify_title">分类名称</h3>
            <ul class="classify_list">
                <li v-for="(item, index) in classify.options" class="classify_li">
                    <el-input v-model="modifyName" placeholder="请输入内容" :maxlength="10" v-if='modifyIndex == index' style="width:200px;" @keyup.enter.native="addClassify(item, index)"></el-input>
                    <span v-else>{{item.name}}</span>
                    <v-del :delData="{ url: '/maker/interests/article/type/del', name: '分类', params: { id: item.id } }" class="articl_del fr" @callback="getClassifyData" v-if="modifyIndex != index"></v-del>
                    <span class="icon-btn-i-edit2 fr" @click="modifyParam( item.id, index, item.name )" v-if="modifyIndex != index"></span>
                    <span class="fr" @click="addClassify(item, index)" v-if="modifyIndex == index">确定</span>
                </li>
            </ul>
            <div class="classify_add" @click="addUnshift">
                <i class="icon-btn-i-add-circle"> 添加分类 </i>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import search from 'Common/search.vue'
import del from 'Common/del_popover.vue'
import pagination from 'Common/pagination.vue'
import { requestArticleList, articleClassifyAdd, articleClassifyList, articleClassifyModify, articleIsMember } from '@/service/interest.js'
export default {
    name: 'interestsArticle',
    data() {
        return {
            //  分类列表/值
            classify: {
                options: [],
                value: ''
            },
            //  分页
            pageParam: {
                pageSize: 6,
                pageNum: 1,
                totalNum: 100
            },
            //  文章列表
            articleList: [],
            //  删除信息
            delArticle: {
                name: '文章',
                url: '/maker/interests/article/del',
                params: {
                    id: null
                }
            },
            delClassify: {
                name: '分类',
                url: '/maker/interests/article/type/del',
                params: {
                    id: null
                }
            },
            //  分类弹框开关
            classifyPopup: false,
            modifyIndex: null,
            modifyName: null,
            modifyId: null,
            isMember: false,
            search: null,
            flagUnshift: true
        }
    },
    components: {
        'v-search': search,
        'v-pagination': pagination,
        'v-del': del
    },
    mounted() {
        this.getListData()
        this.getClassifyData()
        //判断当前用户是不是这个兴趣成员
        if(loginInfo){
            articleIsMember({interestId: this.$route.query.id, userId: loginInfo.userInfo.id}).then(res => {
                if(res.data.entity){
                    this.isMember = true
                }
            })
        }
    },
    methods: {
        addUnshift() {
            if(this.flagUnshift) {
                this.classify.options.unshift({name: '', id: ''})
                this.modifyIndex = 0
                this.flagUnshift = false
            }
        },
        // 关闭分组弹框清理
        clearModifyIndex() {
            this.classifyPopup = false
            if(this.classify.options[0].name === '' ) {
                this.classify.options.splice(0, 1)
            }
            this.modifyIndex = null
            this.modifyName = null
            this.flagUnshift = true
        },
        // 设置删除信息
        del (id, type) {
            if(type == 1) {
                this.delArticle.params.id = id
            }else if(type == 2){
                this.delClassify.params.id = id
            }
        },
        // 搜索
        changeSearch (val) {
            this.search = val
        },
        // 请求列表数据
        getListData () {
            requestArticleList({interestId: this.$route.query.id, articelType: this.classify.value, title: this.search }, this.pageParam).then(res => {
                if(res.data.entity) {
                    let entity = res.data.entity
                    this.articleList = entity.resultData
                    this.$set(this.pageParam, 'totalNum', entity.totalNum )
                }
            })
        },
        // 分类管理 - 添加分类
        addClassify (item, index) {
            if( index === 0 && item.id === "" && item.name === "" && this.modifyName != '' ) {
                articleClassifyAdd({interestId: this.$route.query.id, name: this.modifyName}).then(res => {
                    if(res.data.code === 200) {
                        this.getClassifyData()
                        this.modifyIndex = null
                        this.modifyName = null
                        this.modifyId = null
                        this.flagUnshift = true
                    }else {
                        this.$message({message: res.data.msg})
                    }
                })
            }else {
                articleClassifyModify({ interestId: this.$route.query.id, id: this.modifyId, name: this.modifyName }).then(res => {
                    if(res.data.code === 200 ) {
                        this.getClassifyData()
                        this.modifyName = null
                        this.modifyIndex = null
                        this.modifyId = null
                    }else {
                        this.$message({message: res.data.msg})
                    }
                })
            }
        },
        // 分类管理 - 分类列表
        getClassifyData () {
            articleClassifyList({ interestId: this.$route.query.id }).then(res => {
                if(res.data.entity) {
                    this.classify.options = res.data.entity.resultData
                }
            })
        },
        // 获取修改焦点
        modifyParam (id, index, name) {
            if(this.classify.options[0].name === '' ) {
                this.classify.options.splice(0, 1)
            }
            this.modifyName = name
            this.modifyIndex = index
            this.modifyId = id
        },
        // 翻页
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getListData()
        }
    },
    watch: {
        'params': {
            handler: function () {
                this.getListData()
            }
        }
    },
    computed: {
        params: function() {
            return Object.assign( {},
                {search: this.search},
                {type: this.classify.value}
            )
        }
    },
    filters: {
        handleWorksDesc (txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            let reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>

<style lang='scss' scoped>
$Red: #DD0000;
#interestsArticle {
    font-size: 14px;
    .func {
        padding: 10px 15px;
        position: relative;
        border-bottom: 1px solid #c9c9c9;
        .func_l {
            .func_l_btn {
                position: relative;
                height: 30px;
                margin-left: 10px;
                border: 1px solid $Red;
                color: $Red;
            }
        }
        .func_r {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            .total {
                padding-right: 20px;
                line-height: 34px;
            }
            .func_r_pub {
                display: inline-block;
                padding: 0 15px;
                border: 1px solid #DD0000;
                margin-left: 10px;
                height: 32px;
                line-height: 32px;
                background-color: #DD0000;
                color: #fff;
            }
        }
    }
    .article_list {
        padding: 0 15px;
        box-sizing: border-box;
        .article_li {
            position: relative;
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom: 1px dashed #c9c9c9;
            line-height: 2;
            &:hover .article_li_title {
                color: #009fe9;
            }
            .article_li_title {
                font-size: 1.28em;
                color: #3e3e3e;
            }
            .article_li_content {
                text-indent: 1em;
                color: #626262;
            }
            .article_li_func {
                height: 30px;
                color: #c9c9c9;
                .article_li_func_del {
                    display: inline-block;
                }
                .icon-i-time, .icon-input-user, .article_li_func_del {
                    line-height: 30px;
                    height: 100%;
                    padding: 0 10px;
                }
            }

        }
    }
    .classify {
        .classify_title {
            height: 40px;
            line-height: 40px;
            background-color: #eee;
            text-indent: 1em;
        }
        .classify_list {
            border-left: 1px solid #c9c9c9;
            border-right: 1px solid #c9c9c9;
            .classify_li {
                /* height: 50px; */
                line-height: 2;
                padding: 8px 15px;
                border-bottom: 1px solid #c9c9c9;
                .icon-btn-i-edit2 {
                    font-size: 14px;
                    padding-top: 8px;
                    padding-right: 8px;
                }
            }
        }
        .classify_add {
            position: relative;
            width: 100%;
            height: 40px;
            border: 1px dotted #DD0000;
            background-color: #fff9f9;
            margin: 10px 0;
            .icon-btn-i-add-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #000;
                &::before {
                    color: $Red;
                }
            }
        }
    }
}
</style>