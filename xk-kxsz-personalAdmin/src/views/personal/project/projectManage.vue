<template>
    <div class="projectManage backend-content__middle">
        <div class="option-box clearfix">
            <div class="search clearfix">
            <input type="text" placeholder="请输入项目名称" class="search_text" v-model="search">
            <div class="el-search_btn icon-search" @click="getData({'projectName': search});search =''"></div>
        </div>
        <v-multiSelect :selectData.sync="select" :model='"project"' style="width:172px;display:inline-block;margin-left:20px;"></v-multiSelect>
        <xk-region-select :defaultItems.sync="region" style="width:172px;display:inline-block;margin-left:20px;"></xk-region-select>
        <div class="fr btn-box">
            <button class="recommend">推荐</button>
        </div>
        </div>
        <!-- 活动管理表 -->
        <div class="resource-table manage-table">
            <el-table class="data-table" :data="items" style="width: 100%" ref="multipleTable">
                <el-table-column type="selection" width="28"></el-table-column>
                <el-table-column prop="projectName" label="项目名称">
                    <template slot-scope="scope">
                        <span class="name">
                            <router-link :to="{ path:'/admin/project/unreview', query:{id: scope.row.projectId} }">{{scope.row.projectName}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="uploadTime" label="项目期限" width="200">
                    <template slot-scope="scope">
                        {{scope.row.startDate | dateFormat('yyyy.MM.dd')}} -- {{scope.row.endDate | dateFormat('yyyy.MM.dd')}}
                    </template>
                </el-table-column>
<!--                 <el-table-column
                    prop="applyScopeId"
                    label="适合"
                    width="80"
                    :filters="[{ text:'小学', value:1 }, { text:'初中', value:2 }, { text:'高中', value: 3}]"
                    :filter-method="filterCheck"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        {{scope.row.applyScopeId}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="uplaoder" label="发起人">
                    <template slot-scope="scope">
                        {{scope.row.createName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="checkType"
                    label="审核"
                    width="80"
                    :filters="[{ text:'已审核', value:'已审核' }, { text:'待审核', value:'待审核' }, { text:'通过', value:'通过' }, { text:'不通过', value:'不通过' }]"
                    :filter-method="filterCheck"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        {{scope.row.auditStatus}}
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="125">
                    <template slot-scope="scope">
                        <el-popover ref="popover{{$index}}" placement="top" v-model="scope.row.visible" @show="togglePopover(scope, true)" @hide="togglePopover(scope, false)">
                            <p>确定删除该项目吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="togglePopover(scope, false)">取消</el-button>
                                <el-button type="primary" size="mini" @click="togglePopover(scope, false)">确定</el-button>
                            </div>
                        </el-popover>
                        <i title="推荐" class="icon-btn-reprint" @click=""></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <v-pagination :param.sync='pagParam' :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
import multiSelect from '@/components/common/select/multi_select.vue'
// import regionSelect from '@/components/Common/select/region_select.vue'
import pagination from '@components/common/pagination.vue'
import { selectProjectAuditList, selectProjectRecommended } from '@/service/project.js'
export default {
    name:'projectManage',
    components:{
        'v-pagination': pagination,
        'v-multiSelect': multiSelect,
        // 'v-regionSelect': regionSelect
    },
    data() {
        return{
            items: [],
            listData:[],
            select: [],
            region: [],
            pagParam: {
                pageNum:1,
                pageSize: 5,
                totalNum: 1
            },
            search: ''
        }
    },
    mounted() {
        this.getData({})
    },
    methods:{
        filterCheck(value, row) {
            return row.checkType === value;
        },
        /*
        *获取数据列表
        */
        getData(param) {
            selectProjectAuditList(param, this.pagParam).then((res)=> {
                this.items = res.data.entity.resultData
                this.pagParam.totalNum = res.data.entity.totalNum
            })
        },
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData({
                'projectType': val.select.join('-'),
                'projectName': val.search
            })
        },
        recommended (id, ) {
            adminProjectRecommended({"relationId": id,"busType": "3","recommendType": JSON.parse(localStorage.getItem('loginInfo')).userInfo.identity,"spaceId":"1"}).then(res => {

            })
        }
    },
    computed: {
        params: function() {
            return Object.assign( {}, {select: this.select})
        }
    },
    watch: {
        "params": {
            handler: function (val, oldVal) {
                console.log(val)
                this.getData({
                    'projectType': val.select.join('-'),
                    'projectName': val.search
                    // 'applyScopeId': val
                })
            },
            deep: true,
            // immediate: false
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
*{
    box-sizing: border-box;
}
.projectManage{
    width: 100%;
    overflow: hidden;
    .option-box{
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
        /* 搜索框 */
        .search {
          float: left;
          height: 32px;
          border: 1px solid $theme_color;
          .search_text {
            float: left;
            width: 172px;
            height: 30px;
            border: none;
            text-indent: 5px;
          }
          .el-search_btn {
            float: left;
            width: 42px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            background-color: $theme_color;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
          }
        }
/* 按钮 */
        .btn-box{
            button{
                float: left;
                height: 35px;
                // line-height: 35px;
                padding: 8px 15px;
                text-align: center;
                font-size: 14px;
                margin-left: 10px;
                border:1px solid $theme_color;
                color: $theme_color;
            }
            button:hover{
                background-color: $theme_color;
                color: #fff;
            }
            .upload-res{
                background-color: $theme_color;
                color: #fff;
            }
            .upload-res:hover{
                opacity: 0.75;
            }
        }
    }
    /* 资源名称的颜色 */
    .name{
        a{
            color: #2797ed;
        }
    }
}
</style>

<style lang='scss' lang='scss'>
    .el-table-filter{
        .el-checkbox__inner::after{
            border-color: #2797ed!important;
        }
    }
    .manage-table{
        .el-table .cell, .el-table th > div{
            font-size: 12px;
            text-align: center;
        }
    }
</style>