<template>
    <div id="adminWorks" class="bgw admin-list-head">
        <!-- <div class="tabs"> -->
            <v-tabs :tabs="[
                { name: '已审作品', type: 'audited'},
                { name: '待审作品', type: 'pending'}
            ]" :router="router" :is_search="true" :btns="btns" :count="count" @searchVal="searchParam" :total="totalNum"></v-tabs>
        <!-- </div> -->
        <div class="select-box">
            <v-multiSelect style="width:172px;display:inline-block;margin-right: 10px;" :selectData.sync="selected.classification" :ifAll='false' :model='"works"' :clearable="true"></v-multiSelect>
            <el-select v-model="selected.technology" placeholder="请选择" clearable>
                <el-option
                  v-for="(item,index) in technologyTypeOptions"
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
import multiSelect from 'Common/select/multi_select.vue'

export default {
    name: 'adminWorks',
    components: {
        'v-tabs': tabs,
        'v-multiSelect': multiSelect
    },
    data() {
        return {
            visible2: false,
            router: {
                path: '/admin/works',
            },
            btns: [{ url: '/admin/works/publish', name: '发布作品' }],
            count: { name: '作品' },
            selected: {
                classification: [],
                technology: '',
            },
            options: {
                classification: {
                    level1: [],
                    level2: []
                },
                technology: {
                    options: []
                }
            },
            totalNum: '',
            search: ''
        }
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        searchParam(val) {
            this.search = val
        },
        getLevel(value) {
            if (value === '') {
                this.visible2 = true
                this.selected.classification = ['']
            } else {
                requestPubSearch({ id: value }).then((res) => {
                    res.data.entity.unshift({ name: '全部', sort: '' })
                    this.options.classification.level2 = res.data.entity
                })
            }
        },
        total(val) {
            this.totalNum = val
        },
        getData(params, address) {
            requestDictComb(params).then((res) => {
                res.data.entity.dicList.unshift({ name: '全部', sort: '' })
                this.options[address].options = res.data.entity.dicList
            })
        }
    },
    mounted() {
        // 请求涉及技术下拉
        this.getDictComb('technicalClassification')
    },
    computed: {
        // 涉及技术下拉数据
        ...mapState('dictionaryCommon', {
            technologyTypeOptions(state) {
                const dicList = (state.technicalClassificationDicList || {}).dicList || []
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
#adminWorks {
    .select-box{
        padding: 5px 15px 0px;
    }
}
</style>