<template>
    <div class="lagouDetail container clearfix">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path }" :key="index" >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content_l fl">
            <section class="infor">
                <div class="infor_img bg-img__wrap fl" title="点击查看原图" @click="visible.show = true" :style='{"background-image": "url(" + getFileUrl(detail.cover) + ")"}'></div>
                <div class="infor_detail">
                    <h3 class="infor_detail_title"> {{ detail.name }}
                        <v-btn-group class="fr" :title.sync="detail.name" v-if="!ifAdmin" :module="module" :img="detail.cover"></v-btn-group>
                    </h3>
                    <p class="icon-i-classify" v-if="type === '1'"> 类别: {{ detail.category ? detail.category:'' | translate(serveCategoryOptions, {key: 'id'}) }} </p>
                    <p class="icon-i-classify" v-if="type === '2'"> 类别: {{ detail.category ? detail.category:'' | translate(demandCategoryOptions, {key: 'id'}) }} </p>
                    <p class="icon-i-browse"> 浏览: {{ detail.browseNum?detail.browseNum:0 }} </p>
                    <p class="icon-i-time"> {{ detail.createDate | dateFormat('yyyy-MM-dd') }} </p>
                    <p class="icon-i-activeTime"> {{ detail.validDate | dateFormat('yyyy-MM-dd') }} </p>
                </div>
            </section>
            <section class="view">
                <v-tabs :tabs="[
                { name: moduleName+'说明', type: 'instruction' },
                { name: moduleName+'评论(' + (this.detail.commentNum ? this.detail.commentNum : 0)  + ')', type: 'comment' },
                { name: '附件', type: 'attachment' },
                { name: '勾搭列表(' + (this.detail.seduceNum ? this.detail.seduceNum : 0)  + ')', type: 'hookupwith' }
            ]" :router="router"></v-tabs>
                <router-view :detail.sync="detail" class="view_content" ref="view" @commentAdd="commentAdd" @commentChange="detaillChange"></router-view>
            </section>
        </div>
        <div class="content_r fr">
            <section class="publisher" :style="{backgroundImage: `url(${bgDefault})`}">
                <img :src="getFileUrl(detail.face) || faceDefault" class="publisher_face">
                <p class="publisher_name">发布者: {{ detail.createName }}</p>
                <p class="publisher_phone">联系电话: {{ isLogin?(detail.phone?detail.phone:'暂无'):'*******' }}</p>
                <button type="button" class="publisher_hook" @click="callhookupWithPopup" v-if="isCreateor && !(detail.seduce ? detail.seduce : detail.isSeduce)"> <span>+</span> 勾搭 </button>
                <button type="button" class="publisher_hook" v-else-if="isCreateor && (detail.seduce ? detail.seduce : detail.isSeduce)"> <span>-</span> 已勾搭 </button>
            </section>
            <section class="correlation">
                <h3 class="correlation_title">相关{{moduleName}} <router-link :to="{ path: '/street/lagou/list/' + $route.params.type }" class="correlation_title_more fr">更多>></router-link></h3>
                <ul class="aboutlist clearfix" v-if="aboutList.length">
                    <li v-for="(item, index) in aboutList" :key="index" @click="generateRoute(item)" class="list_li">
                        <div class="bg-img__wrap list_li_img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                        <!-- <img :src="getFileUrl(item.cover) || listDefault" class="list_li_img" /> -->
                        <p class="list_li_title">{{item.name | textOverflow(14) }}</p>
                        <p class="info">
                            <span class="info-item" title="收藏"><i class="icon-btn-collection"></i> {{item.collectNum || 0}}</span>
                            <span class="info-item" title="评论"><i class="icon-i-reply"></i> {{item.commentNum || 0}}</span>
                            <span class="info-item" title="浏览"><i class="icon-btn-browse"></i> {{item.browseNum || 0}}</span>
                        </p>
                    </li>
                </ul>
            </section>
        </div>
        <el-dialog title="勾搭信息" :visible.sync="hookupWithPopup" size="tiny">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="联系人" prop="linkMan">
                    <el-col :span="20">
                        <el-input v-model="form.linkMan" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-col :span="20">
                        <el-input v-model="form.mobile"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="勾搭备注" prop="remark">
                    <el-col :span="20">
                        <el-input v-model="form.remark" type="textarea" :row="3" resize="none"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="20">
                        <button class="btn btn1 fr" type="button" @click.prevent="hookupWithPopup = false">取消</button>
                        <button class="btn btn2 fr" type="button" @click.prevent="onSubmit">勾搭</button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="detail.cover"></img-preview>
    </div>
</template>

<script>
import btnGroup from 'Common/button/com_panel_event.vue'
import { mapActions, mapState } from 'vuex'
import { serviceDetail, hookupWithAdd, serviceAboutList } from '@/service/service.js'
import { demandDetail, demandAboutList } from '@/service/demand.js'
import tabs from 'Common/classificationList/classification/tabs.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        }
        return {
            isLogin: this.$ls.get('loginInfo'),
            // 是否创建者
            isCreateor: null,
            items: [],
            detail: {},
            module: '',
            moduleName: '',
            ifAdmin: false,
            tabs: [
                { name: '需求说明', type: 'instruction' },
                { name: '需求评论', type: 'comment' },
                { name: '附件', type: 'attachment' },
                { name: '勾搭列表', type: 'hookupwith' }
            ],
            router: {
                path: `/street/lagou/detail/${this.$route.params.type}`,
            },
            hookupWithPopup: false,
            form: {
                linkMan: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.userName : '',
                mobile: '',
                remark: ''
            },
            // 表单检验
            rules: {
                linkMan: [
                    { required: true, message: '请输入联系人', trigger: 'change' },
                    { max: 20, message: '不超过20字符', trigger: 'change' }
                ],
                mobile: [
                    { required: true, validator: validatePhone, trigger: 'change' },
                ],
                remark: [
                    { required: true, message: '请输入勾搭备注', trigger: 'change' },
                    { max: 100, message: '不超过100字符', trigger: 'change' }
                ]
            },
            listData: {
                col: 1,
                pathUrl: '/street/lagou/detail/' + this.$route.params.type,
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            aboutList: [],
            type: this.$route.params.type,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        this.getDetailData()
    },
    mounted() {
        // 请求涉及技术下拉
        this.getDictComb('serveCategory')
        this.analysisPath()
        this.getAboutList()
    },
    methods: {
        callhookupWithPopup () {
            if(this.$ls.get('loginInfo')) {
                this.hookupWithPopup = true
            }else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        generateRoute(item = {}) {
            this.$router.replace({ path: this.$route.path, query: { id: item.id} })
        },
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        moreChange() {
            this.getDetailData()
            this.getAboutList()
        },
        getAboutList () {
            let type = this.$route.params.type
            let param = {
                category: this.detail.category,
                auditStatus: 1
            }
            let handler
            if(type == '1') {
                param.serveId = this.$route.query.id
                handler = serviceAboutList
            }else if (type == '2') {
                param.demandId = this.$route.query.id
                handler = demandAboutList
            }
            handler (param, {pageNum: 1, pageSize: 4}).then(res => {
                if(res.data.code === 200) {
                    this.aboutList = [...res.data.entity.resultData]
                }
            })
        },
        // 表单提交
        onSubmit(){
            this.$refs['form'].validate((valid)=>{
                if(valid) {
                    let form = this.form
                    form.type = this.$route.params.type
                    form.busId = this.$route.query.id
                    form.busName = this.detail.name
                    form.publisherId = this.detail.createId
                    form.publisherName = this.detail.createName
                    hookupWithAdd (form).then(res => {
                        if(res.data.code === 200) {
                            this.hookupWithPopup = false;
                            this.$message({type:'success', message: '发送成功'})
                            this.getDetailData()
                            this.$refs.view.getList()
                        }else {
                            this.$message({ message: res.data.msg} )
                        }
                    })
                }
            })
        },
        // 请求详情
        getDetailData () {
            let type = this.$route.params.type
            if(type == '1') {
                serviceDetail({ id: this.$route.query.id }).then(res => {
                    if(res.data.code === 200 && res.data.entity) {
                        this.detail = res.data.entity
                        this.detaillChange()
                    }
                })
            }else if (type == '2') {
                demandDetail({ id: this.$route.query.id }).then(res => {
                    if(res.data.code === 200 && res.data.entity) {
                        this.detail = res.data.entity
                        this.detaillChange()
                    }
                })
            }
        },
        // 详情改变
        detaillChange () {
            let type = this.$route.params.type
            if(type == '1') {
                this.module = 'service'
                this.moduleName = '服务'
            }else if(type == '2') {
                this.module = 'demand'
                this.moduleName = '需求'
            }
            this.isCreateor = this.detail.createId != this.$ls.get('loginUId')
            this.router.query = this.$route.query;
        },
        analysisPath () {
            let type = this.$route.params.type
            if(type == '1') {
                this.items = [
                    { path: '/street/lagou', title: '求·拉钩' },
                    { path: '/street/lagou/list/1', title: '所有服务' },
                    { path: '', title: '服务详情' }
                ]
            }else if (type == '2') {
                this.items = [
                    { path: '/street/lagou', title: '求·拉钩' },
                    { path: '/street/lagou/list/2', title: '所有需求' },
                    { path: '', title: '需求详情' }
                ]
            }
        },
        // 评论数增加
        commentAdd(){
            this.detail.commentNum++;
        },
        //打开勾搭弹窗
        openDialog(){
            if(this.$ls.get('loginInfo')){
                this.hookupWithPopup = true;
            }else{
                this.$store.commit('toggleLoginModal', true);
            }
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            serveCategoryOptions (state) {
                let dicList = (state['serveCategoryDicList'] || {}).dicList || []
                return dicList
            },
            demandCategoryOptions (state) {
                let dicList = (state['demandCategoryDicList'] || {}).dicList || []
                return dicList
            }
        })
    },
    watch: {
        '$route.path': 'analysisPath',
        '$route.query.id': 'moreChange'
    },
    components: {
        'v-btn-group': btnGroup,
        'v-tabs': tabs,
        'img-preview': imgPreview
    },
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/aboutList.scss';
$blue: #0694e8;
$p15: 15px;
.content_l {
    width: 906px;
    margin-right: 20px;
    font-size: 14px;
    .infor {
        padding: $p15;
        height: 210px;
        background-color: #fff;
        box-sizing: border-box;
        .infor_img {
            width: 280px;
            height: 100%;
        }
        .infor_detail {
            margin-left: 300px;
            .infor_detail_title {
                line-height: 3;
                font-size: 1.42em;
            }
            p {
                line-height: 2;
            }
        }
    }
    .view {
        margin-top: 30px;
        background-color: #fff;
        .view_content {
            min-height: 250px;
            box-sizing: border-box;
        }
    }
}
.content_r {
    width: 274px;
    font-size: 14px;
    .publisher {
        text-align: center;
        height: 210px;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#d0ebfc+0,51bdfe+100 */
        // background: rgb(208,235,252); /* Old browsers */
        // background: -moz-linear-gradient(top, rgba(208,235,252,1) 0%, rgba(81,189,254,1) 100%); /* FF3.6-15 */
        // background: -webkit-linear-gradient(top, rgba(208,235,252,1) 0%,rgba(81,189,254,1) 100%); /* Chrome10-25,Safari5.1-6 */
        // background: linear-gradient(to bottom, rgba(208,235,252,1) 0%,rgba(81,189,254,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d0ebfc', endColorstr='#51bdfe',GradientType=0 ); /* IE6-9 */
        background-size: 100% 70px;
        background-color: #fff;
        -webkit-background-size: 100% 70px;
        background-repeat: no-repeat;
        .publisher_face {
            width: 68px;
            height: 68px;
            margin-top: 26px;
            border-radius: 50%;
        }
        .publisher_name {
            line-height: 3;
            font-weight: bold;
        }
        .publisher_phone {
            color: #999;
        }
        .publisher_hook {
            margin-top: 20px;
            color: #3099d0;
            border: 1px solid #3099d0;
            padding: 4px 24px;
            box-sizing: border-box;
            span {
                font-size: 1.28em;
                font-weight: bold;
            }
        }
    }
    .correlation {
        margin-top: 30px;
        background-color: #fff;
        .correlation_title {
            font-size: 1.14em;
            text-indent: .5em;
            padding: 13px;
            border-bottom: 1px solid #d1dbe5;
            .correlation_title_more {
                color: #959595;
            }
        }
        .cols-item {
            font-size: 13px;
            line-height: 1.5;
            &.cols-item_r {
                border-left: none;
            }
        }
        .aboutlist {
            font-size: 14px;
            .list_li {
                width: 100%;
                height: 250px;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;
                border-bottom: 1px solid #ddd;
                .list_li_img {
                    width: 100%;
                    height: 80%;
                }
                .list_li_title {
                    font-weight: 400;
                    color: #333;
                    margin: 8px 0;
                }
                &:hover .list_li_title {
                    color: #2797ed;
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
.btn {
    font-size: 12px;
    width: 64px;
    height: 26px;
    line-height: 26px;
    border: 1px solid $blue;
    border-radius: 2px;
}
.btn1 {
    color: $blue;
}
.btn2 {
    margin-right: 10px;
    color: #fff;
    background-color: $blue;
}
</style>