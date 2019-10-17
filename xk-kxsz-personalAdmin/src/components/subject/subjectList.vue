<template>
    <div id="screeningList">
        <div class="mes bgw">
            <div class="searchBox clearfix">
                <v-search style="display: inline-block" class="fr" @search="searchParam"></v-search>
                <span class="total-count fr">共计 {{param.totalNum}} 条数据</span>
            </div>
            <div class="table-box mes_ul">
                <el-table class="data-table" :data="dataList" style="width: 100%">
                    <el-table-column prop="prop0" :label="table_title[0]" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <router-link v-if="flag !== '/resource'" :to="{ path: linkTo, query:{ id: $route.query.id, [paramName]: scope.row.id } }">{{scope.row.prop0}}</router-link>
                            <span v-else>{{scope.row.prop0}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop1" :label="table_title[1]" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="flag !== '/resource'">{{scope.row.prop1}}</span>
                            <span v-else>{{resourceType[scope.row.prop1]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop2" :label="table_title[2]" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="flag == '/results'">{{scope.row.prop2 | translate(resultTypeDL)}}</span>
                            <span v-else-if="flag == '/resource'">{{scope.row.prop2 ? (scope.row.prop2/1024).toFixed(1) : 0}}KB</span>
                            <span v-else>{{scope.row.prop2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" :label="table_title[3]" show-overflow-tooltip>
                        <template slot-scope="scope">{{ scope.row.date | dateFormat('yyyy-MM-dd')}}</template>
                    </el-table-column>
                    <el-table-column prop="prop3" :label="table_title[4]"  v-if="flag !== '/activity'"></el-table-column>
                    <el-table-column label="操作" width="80" v-if="flag === '/resource'">
                        <template slot-scope="scope"><a :href="downloadUrl(scope.row.resourceId, scope.row.prop0)" :download="scope.row.prop0">下载</a></template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationBox">
                <v-pagination :param="param" :changePage="changePage"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'Vuex'
import search from 'Common/search.vue'
import pagination from 'Common/pagination.vue'
import dataTranslation from '@/js/dataTranslation.js'
import {
    requestsubjectGuideList,
    requestSubjectActivityList,
    requestSpaceResultList,
    requestBackendSubjectList,
    requestResourceList
} from '@/service/subject.js'
export default {
    name: 'screeningList',
    data() {
        return {
            search:'',
            param:{
                totalNum:0,
                pageSize:5,
                pageNum:1
            },
            table_title:[],
            tableProp:[],
            dataList:[],
            flag:'',
            linkTo:'',
            paramName:'',
            /*资源类型 (1.课题申报指南附件, 2.课题申报指南资源, 3.课题申报附件,4.阶段成果,5.课题成果,6课题任务)',*/
            resourceType:{
                1: '课题申报指南附件',
                2: '课题申报指南资源',
                3: '课题申报附件',
                4: '阶段成果',
                5: '课题成果',
                6: '课题任务'
            },
            id:''
        }
    },
    components: {
        'v-search': search,
        'v-pagination': pagination,
    },
    computed: {
        ...mapState('subject',{typeId: 'typeId'}),
        ...mapState('dictionaryCommon', {
            resultTypeDL (state) {
                let dicList = (state['resultTypeDicList'] || {}).dicList || []
                return dicList
            },
        }),
    },
    created(){
        this.id = this.$route.query.id;
        let strNum = this.$route.path.lastIndexOf('/');
        let _route = this.$route.path.substring(strNum);
        this.flag = _route;
        switch(_route){
            case '/guide':
                this.table_title = ['标题','课题级别','发布人','申报截止日期','状态'];
                this.linkTo = '/educationBureauSpace/subject/guide/detail';
                this.paramName = 'guideId'
                break;
            case '/research':
                this.table_title = ['课题名称','课题级别','负责人','立项时间','当前阶段'];
                this.linkTo = '/space/subject/research/detail/info';
                this.paramName = 'subjectId'
                break;
            case '/activity':
                this.table_title = ['活动主题','所属课题','主持人','活动时间'];
                this.linkTo = '/educationBureauSpace/subject/activity/detail';
                this.paramName = 'activityId'
                break;
            case '/results':
                this.table_title = ['成果名称','所属课题','成果类型','上传时间','上传人'];
                this.linkTo = '/educationBureauSpace/subject/results/detail';
                this.paramName = 'resultId'
                break;
            case '/resource':
                this.table_title = ['资源名称','资源类型','文件大小','上传时间','上传人'];
                break;
        };
        this.getTableData()
    },
    mounted() {
        // console.log(this.typeId)
        // setTimeout(this.getData(this.datas.initial, this.datas.paramsName),1000)
    },
    methods: {
        searchParam (val){
            this.search = val;
            this.getTableData()
        },
        changePage(val){
            this.param.pageNum = val;
            this.getTableData()
        },
        getTableData(){
            switch(this.flag){
                case '/guide':
                    requestsubjectGuideList({ orgId: this.$route.query.id, subjectLevel: this.typeId, title: this.search },{pageSize:5,pageNum:this.param.pageNum}).then((res)=>{
                        let datas = res.data.entity ? res.data.entity.resultData : [];
                        this.param.totalNum = res.data.entity ? res.data.entity.totalNum : 0;
                        if(datas.length > 0){
                            this.dataList = [];
                            for(let i in datas ){
                                let obj = {};
                                obj.prop0 = datas[i].title;
                                obj.prop1 = datas[i].subjectLevelInfo;
                                obj.prop2 = datas[i].jobName;
                                obj.prop3 = datas[i].statusInfo;
                                obj.id = datas[i].id;
                                obj.date = datas[i].endDate;
                                this.dataList.push(obj)
                            }
                        }else{
                            this.dataList = [];
                        }
                    });
                    break;
                case '/research':
                    requestBackendSubjectList({ orgId: this.id, auditStatus: 1, status: this.typeId, name: this.search },{ pageSize: 5, pageNum: this.param.pageNum }).then((res) => {
                        let datas = res.data.entity ? res.data.entity.resultData : [];
                        this.param.totalNum = res.data.entity ? res.data.entity.totalNum : 0;
                        if(datas.length > 0){
                            this.dataList = [];
                            for(let i in datas ){
                                let obj = {};
                                obj.prop0 = datas[i].name;
                                obj.prop1 = datas[i].subjectLevelName;
                                obj.prop2 = datas[i].headUserName;
                                switch(datas[i].status){
                                    case 1 :
                                        obj.prop3 = '立项';
                                        break;
                                    case 2 :
                                        obj.prop3 = '开题';
                                        break;
                                    case 3 :
                                        obj.prop3 = '中期评估';
                                        break;
                                    case 4 :
                                        obj.prop3 = '结题验收';
                                        break;
                                    case 5 :
                                        obj.prop3 = '已结束';
                                        break;
                                }
                                obj.id = datas[i].id;
                                obj.date = datas[i].projectDate;
                                this.dataList.push(obj)
                            }
                        }else {
                            this.dataList = [];
                        }
                    });
                    break;
                case '/activity':
                    requestSubjectActivityList({orgId:this.id, subjectId: this.typeId,title:this.search },{pageSize:5,pageNum:this.param.pageNum}).then((res)=>{
                        // console.log(res)
                        let datas = res.data.entity ? res.data.entity.resultData : [];
                        this.param.totalNum = res.data.entity ? res.data.entity.totalNum : 0;
                        if(datas.length > 0){
                            this.dataList = [];
                            for(let i in datas ){
                                let obj = {};
                                obj.prop0 = datas[i].title;
                                obj.prop1 = datas[i].name;
                                obj.prop2 = datas[i].compereUserName;
                                obj.id = datas[i].id;
                                obj.date = datas[i].startDate;
                                this.dataList.push(obj)
                            }
                        }else{
                            this.dataList = [];
                        }
                    });
                    break;
                case '/results':
                    requestSpaceResultList({orgId:this.id, resultType: this.typeId, name: this.search },{pageSize:5,pageNum:this.param.pageNum}).then((res)=>{
                        let datas = res.data.entity ? res.data.entity.resultData : [];
                        this.param.totalNum = res.data.entity ? res.data.entity.totalNum : 0;
                        if(datas.length > 0){
                            this.dataList = [];
                            for(let i in datas ){
                                let obj = {};
                                obj.prop0 = datas[i].name;
                                obj.prop1 = datas[i].subjectName;
                                obj.prop2 = datas[i].resultType;
                                obj.prop3 = datas[i].userName;
                                obj.id = datas[i].id;
                                obj.date = datas[i].createDate;
                                this.dataList.push(obj)
                            }
                        }else{
                            this.dataList = [];
                        }
                    })
                    break;
                case '/resource':
                    requestResourceList({orgId:this.id, resourceType: this.typeId, name: this.search },{pageSize:5,pageNum:this.param.pageNum}).then((res)=>{
                        // console.log(res);
                        let datas = res.data.entity ? res.data.entity.resultData : [];
                        this.param.totalNum = res.data.entity ? res.data.entity.totalNum : 0;
                        if(datas.length > 0) {
                            this.dataList = [];
                            for(let i in datas ){
                            let obj = {};
                                obj.prop0 = datas[i].name;
                                obj.prop1 = datas[i].resourceType;
                                obj.prop2 = datas[i].fileSize;
                                obj.prop3 = datas[i].userName;
                                obj.id = datas[i].id;
                                obj.date = datas[i].updateDate;
                                obj.resourceId = datas[i].resourceId;
                                this.dataList.push(obj);
                            }
                        }else{
                            this.dataList = [];
                        }
                    });
                    break;
                default:
                    this.dataList = [];
                    break;
            }
        }
    },
    watch: {
        typeId:{
            handler:function(val,oldVal){
                this.getTableData();
            },
            deep:true
        },
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$tab-width: 200px;
.mes {
    $item-list-height: 40px;
    $box-padding: 20px;
    position: relative;
    margin-left: $tab-width + 20;
    // border: 1px solid #CFCFCF;
    height: 100%;
    .searchBox {
        padding: 10px;
        border-bottom: 1px solid #D3D3D3;
        .total-count{
            display: inline-block;
            line-height: 34px;
            margin-right: 17px;
            font-size: 14px;
        }
    }
    .paginationBox {
        padding: 0 20px;
    }
    .mes_ul {
        min-height: $item-list-height * 10;
        padding: $box-padding;
        a{
            color:#00a0e9;
        }
        .mes_li {
            font-size: 14px;
            border-bottom: 1px dotted #E3E3E3;
            &:hover .mes_title {
                color: $theme_color;
            }
            .mes_title {
                line-height: $item-list-height;
                color: $default-color;
                .mes_time {
                    float: right;
                    color: #626262;
                }
            }
        }
    }
    .paginationBox {
        padding: 0 $box-padding;
    }
}
</style>

<style lang="scss">
    #screeningList{
        .table-box{
            .el-table{
                .cell{
                    text-align: center;
                }
            }
            .data-table.el-table{
                border: none;
            }
            .data-table.el-table:after{
                background-color: #fff;
            }
            .data-table.el-table:before{
                background-color: #fff;
            }
        }
    }
</style>
