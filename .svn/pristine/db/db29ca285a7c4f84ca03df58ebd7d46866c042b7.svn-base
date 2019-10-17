<template>
    <div id="teacherDynamic" class="bgw admin-list-head">
        <div class="">
            <v-tabs :tabs="[
                    { name: '已审项目', type: 'checked'},
                    { name: '待审项目', type: 'unchecked'}
                ]" :router="router" :is_search="true" :btns="btns" :count="count" @searchVal="searchParam" :total="totalNum"></v-tabs>
        </div>
        <div class="select-box">
            <v-multiSelect style="width: 172px; display: inline-block; margin-right: 10px;" :selectData.sync="selected.classification" :ifAll='false' :model='"project"' :clearable="true"></v-multiSelect>
            <el-select v-model="selected.technology" placeholder="请选择相关技术" clearable>
                <el-option
                  v-for="(item,index) in technologyOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>&nbsp;&nbsp;&nbsp;
            <el-select v-model="selected.period" placeholder="请选择学段" style="color:#A6A6A6;" clearable>
                <el-option
                  v-for="(item,index) in learningStagesDL"
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
import { mapState, mapActions } from 'vuex'
import multiSelect from '@/components/common/select/multi_select.vue'
import tabs from '@/components/common/classificationList/classification/tabs.vue'
import { requestPubSearch } from '@/service/common.js'

export default {
    name: 'teacherDynamic',
    data() {
        return {
            search: '',
            visible2: false,
            // tabs: [
            //     { name: '已审项目', type: 'checked'},
            //     { name: '待审项目', type: 'unchecked'}
            // ],
            router: {
                path: '/admin/project',
            },
            btns: [{ url: '/admin/project/publish', name: '发布项目' }],
            count: { name: '项目' },
            selected: {
                classification: [],
                technology: '',
                period: ''
            },
            options: {
                classification: {
                    level1: [],
                    level2: []
                },
                technology: {
                    options: []
                },
                period: {
                    options: []
                }
            },
            totalNum: ''
        }
    },
    mounted() {
        this.getDictComb('technicalClassification')
        this.getDictComb('learningStages')
        // this.getData( {"groupCode":"technicalClassification"}, 'technology')
        // this.getData( {"groupCode":"grade"}, 'period')
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
        }
    },
    components: {
        'v-tabs': tabs,
        'v-multiSelect': multiSelect
    },
    computed: {
        ...mapState('dictionaryCommon', {
            learningStagesDL(state) {
                const dicList = (state.periodKeyDicList || {}).dicList || []
                return dicList
            },
            technologyOptions(state) {
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
.select-box{
    padding: 5px 15px 0px;
}
</style>
