<template>
    <div class="resource">
        <!--<div class="sum fr">总计：<span class="red">21563</span></div>-->
        <div class="options-and-search clearfix">
            <div class="options fl">
                <multi-select :selectData="category" model="resource" :ifAll="false" :clearable="true" style="width:175px;display:inline-block;"></multi-select>
                <single-select :selected.sync="selected.technology" :single-select-data="{groupCode: 'technicalClassification', placeholder: '选择技术'}" style="width:175px;"></single-select>
                <!--<single-select :selected.sync="selected.grade"-->
                <!--:single-select-data="{groupCode: 'level', 'ifAll': true, placeholder: '选择级别'}"-->
                <!--style="width:130px;"></single-select>-->
            </div>
            <div class="fr">
                <span class="total">共计<em class="blue">{{pageParam.totalNum}}</em>个资源</span>
                <search class="fr" @search="setKeyWords"></search>
            </div>
        </div>
        <div class="list-wrapper">
            <ul>
                <list-row v-for="(item, index) in lists" :item="item" :key="index">
                    <h3 slot="title" class="name ellipsis">
                        <a @click="redirect(pages.detail.resource, { query: { id: item.id } })" :title="item.name" class="link">
                            {{item.name || '暂无'}}
                        </a>
                    </h3>
                    <p class="other-info gray">
                        <span>上传人：{{item.userName || '暂无'}}</span>
                        <span>浏览：<em class="blue">{{item.browseNum || 0}}</em>人</span>
                        <span>文件大小：{{(item.fileSize / 1024).toFixed(1) + 'kb'}}</span>
                        <span>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                    </p>
                    <div slot="operate" class="operate pa">
                        <span class="score blue">{{item.avgScore || 5}}分</span>
                        <a @click="redirect(pages.detail.resource, { query: { id: item.id } })" class="btn">预览</a>
                        <!-- <a v-if="$ls.get('loginInfo')" :href="downloadUrl(item.fileId, item.name, item.fileExt)" :download="item.name || +new Date" class="btn" @click="downloadAdd(item.id,index)">下载</a> -->
                        <a v-if="$ls.get('loginInfo')" href="javascript:;" :download="item.name || +new Date" class="btn" @click="downloadAdd(item.fileId, item.name,item.id,index)">下载</a>
                    </div>
                </list-row>
            </ul>
            <p v-if="!lists.length" class="no-data">暂无数据</p>
            <pagination :param="pageParam" @callback="changePage"></pagination>
        </div>
    </div>
</template>

<script>
    import { requestcFrontendResourceList, downloadAdd } from '@/service/resource.js'
    import { fileBaseUrl } from '@/js/common-config.js'
    import pagination from 'components/common/pagination.vue'
    import multiSelect from '@/components/common/select/multi_select.vue'
    import singleSelect from '@/components/common/select/single_select.vue'
    import search from 'components/common/search.vue'
    import listRow from 'Common/list/list_row.vue'

    export default {
        name: 'personResource', // 教师/学生空间-资源
        data() {
            return {
                category: [], // 分类
                fileBaseUrl,
                lists: [], // 列表
                pageParam: { // 分页数据
                    pageSize: 5,
                    pageNum: 1,
                    totalNum: 0
                },
                selected: { // 接口所需数据
                    fileType: '',
                    name: '',
                    resourceType: '',
                    technology: ''
                }
            }
        },
        created() {
            this.requestList()
        },
        components: {
            pagination,
            multiSelect,
            singleSelect,
            search,
            listRow
        },
        methods: {
            async requestList() { // 获取列表数据
                const res = await requestcFrontendResourceList({
                    ...this.selected,
                    orgId: this.$route.query.id,
                    resourceType: this.category.join('-'),
                    auditStatus: 1
                }, this.pageParam)

                if (res.data.code === 200) {
                    const _entity = res.data.entity || {}
                    this.lists = _entity.resultData || []
                    this.pageParam.totalNum = _entity.totalNum
                }
            },
            setKeyWords(str) {
                this.selected.name = str
            },
            /*
             * 下载次数加1
             */
            downloadAdd(resourceId, fileName,id, index) {
                const link = document.createElement("a");
                link.style.display = "none";
                link.href = fileBaseUrl+resourceId;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                downloadAdd({ id: id }).then((res) => {
                    if (res.data.code === 200) {
                        this.lists[index].downNum++
                    }
                })
            },
            changePage(val) {
                this.pageParam.pageNum = val
                this.requestList()
            }
        },
        watch: {
            category: {
                handler: function () {
                    this.requestList()
                },
                deep: true
            },
            selected: {
                handler: function () {
                    this.requestList()
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sum {
        margin-top: -52px;
        font-size: 14px;
        .red {
            color: #d00;
        }
    }

    .options-and-search .total {
        display: inline-block;
        line-height: 34px;
        margin-right: 12px;
        font-size: 14px;
    }

    .list-wrapper {
        margin-top: 10px;
        border-top: 1px solid #c9c9c9;
    }

    .list-wrapper .list-item {
        .author {
            margin-bottom: 8px;
        }
        .score {
            display: block;
            margin-bottom: 8px;
            font-size: 16px;
            text-align: center;
        }
    }
</style>

