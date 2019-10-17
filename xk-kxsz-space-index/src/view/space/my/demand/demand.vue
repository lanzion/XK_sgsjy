<template>
    <div id="adminDemand" class="admin-list-head bgw">
        <!-- <div class="tabs"> -->
            <v-tabs :tabs="[
                { name: '已审需求', type: 'audited'},
                { name: '待审需求', type: 'pending'}
            ]" :router="router" :is_search="true" :btns="btns" :count="count" @searchVal="searchParam" :total="totalNum"></v-tabs>
        <!-- </div> -->
        <div class="select-box">
            <el-select v-model="selected" placeholder="请选择" clearable>
                <el-option
                  v-for="(item,index) in serveCategoryOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>
        </div>
        <router-view :selected='selected' :search="search" @totalNum="total"></router-view>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { requestPubSearch, requestDictComb } from '@/service/common.js'
import tabs from 'Common/classificationList/classification/tabs.vue'
export default {
    name: 'adminDemand',
    components: {
        'v-tabs': tabs
    },
    data() {
        return {
            // tabs: [
            //     { name: '已审需求', type: 'audited'},
            //     { name: '待审需求', type: 'pending'}
            // ],
            router: {
                path: '/admin/demand',
            },
            btns: [{'url':'/admin/demand/publish','name':'发布需求'}],
            count: {'name':'需求'},
            selected: '',
            totalNum: '',
            search: ''
        }
    },
    methods:{
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        searchParam (val){
            this.search = val
        },
        total(val) {
            this.totalNum = val
        }
    },
    mounted() {
        // 请求涉及技术下拉
        this.getDictComb('demandCategory')
    },
    computed: {
        // 涉及技术下拉数据
        ...mapState('dictionaryCommon', {
            serveCategoryOptions (state) {
                let dicList = (state['demandCategoryDicList'] || {}).dicList || []
                return dicList
            }
        })
    }
}
</script>

<style lang='scss'>
    .el-select .el-input .el-input__icon {
        color: #A6A6A6;
    }
</style>

<style lang='scss' scoped>
.select-box{
    padding: 5px 15px 0px;
}
</style>