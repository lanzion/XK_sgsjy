<template>
    <div id="adminService" class="bgw admin-list-head">
<!--         <div class="tabs"> -->
            <v-tabs :tabs="[
                { name: '已审服务', type: 'audited'},
                { name: '待审服务', type: 'pending'}
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
    name: 'adminService',
    components: {
        'v-tabs': tabs
    },
    data() {
        return {
            // tabs: [
            //     { name: '已审服务', type: 'audited'},
            //     { name: '待审服务', type: 'pending'}
            // ],
            router: {
                path: '/admin/service',
            },
            btns: [{'url':'/admin/service/publish','name':'发布服务'}],
            count: {'name':'服务'},
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
        this.getDictComb('serveCategory')
    },
    computed: {
        // 涉及技术下拉数据
        ...mapState('dictionaryCommon', {
            serveCategoryOptions (state) {
                let dicList = (state['serveCategoryDicList'] || {}).dicList || []
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