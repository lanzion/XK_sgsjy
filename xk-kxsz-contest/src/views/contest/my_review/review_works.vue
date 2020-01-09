<template>
    <div class="review_works bgw">
        <div class="review_works_title">
            <h4 class="list-head">{{title}}</h4>
            <el-button type="primary" class="batch_dow fr" size="small" @click="getGridData">批量下载作品</el-button>
        </div>
        <ul class="list_conent">
            <li>{{currentPhaseName}}分数统计:</li>
            <li>0~59: {{sectional.A||0}}人</li>
            <li>60~69: {{sectional.B||0}}人</li>
            <li>70~79: {{sectional.C||0}}人</li>
            <li>80~89: {{sectional.D||0}}人</li>
            <li>90~100: {{sectional.E||0}}人</li>
        </ul>
        <div class="works-list">
            <v-list :listData="listData" :items.sync="worksItems" class>
                <template slot-scope="props">
                    <div class="list-item-img__box img-box">
                        <div
                            class="bg-img__wrap"
                            :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"
                        ></div>
                        <span class="praise-num">赞 {{props.item.praiseNum || 0}}</span>
                    </div>
                    <h6 class="list-item-title clearfix">
                        <span class="fl works-name ellipsis">{{props.item.worksName}}</span>
                        <span class="fr user-name ellipsis">{{props.item.userName}}</span>
                    </h6>
                    <h6
                        class="list-item-title clearfix"
                        v-for="(phitem,index) in PhaseList"
                        :key="index"
                        v-if="props.item.scoreMap&&props.item.scoreMap[phitem.id]"
                    >{{phitem.name}}: {{props.item.scoreMap[phitem.id]}}分</h6>
                </template>
            </v-list>
        </div>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        <!-- 作品列表 -->
        <el-dialog title="作品列表" :visible.sync="dialogTableVisible" width="900">
            <el-form>
                <el-form-item label="作品状态">
                    <el-select v-model="worksStatus" clearable placeholder="请选择">
                        <el-option
                            v-for="item in statusList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" @click="resetGrid">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="gridData" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="workNo" label="作品编码" width="150"></el-table-column>
                <el-table-column property="worksName" label="作品名称"></el-table-column>
                <el-table-column property="author" label="作者" width="100"></el-table-column>
                <el-table-column property="resourceName" label="资源名称"></el-table-column>
            </el-table>
            <br />
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="gridDataPage.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="gridDataPage.totalNum"
            ></el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="batchDow">{{batchDowBtnTxt}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import list from '@/components/common/list/list.vue'
import pagination from '@/components/common/pagination.vue'
import {
    requestExpertAuditedWorks,
    requestExpertPendingWorks,
    aftermyreviewformyreviewsectionalstatistics
} from '@/service/works.js'
import { requestPhaseList } from '@/service/manage.js'
import { requestMatchExpertWorksEvaluation } from '@/service/matchEntrance.js'
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
const getFile = url => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        })
            .then(data => {
                resolve(data.data)
            })
            .catch(error => {
                reject(error.toString())
            })
    })
}
const fileUploadAddress = location.protocol + '//' + location.host
export default {
    name: 'review_works',
    components: {
        'v-list': list,
        'v-pagination': pagination
    },
    data() {
        return {
            sectional: '',
            listData: {
                col: 4,
                pathUrl: '',
                paramsArr: [
                    { name: 'id', val: 'route', key: 'id' }, // val为route 时，从路由获取参数，要传key（获取路由参数的字段）
                    { name: 'worksId', val: 'worksId' },
                    { name: 'reviewId', val: 'id' }
                ]
            },
            worksItems: [],
            pageParam: {
                totalNum: 0,
                pageSize: 16,
                pageNum: 1
            },
            title: '',
            PhaseList: [],
            currentPhase: '',
            currentPhaseName: '',
            batchDowBtnTxt: '下载作品',
            batchDowFlag: true,
            dialogTableVisible: false,
            gridData: [],
            multipleSelection: [],
            statusList: [
                { code: 1, name: '已审核' },
                { code: 2, name: '未审核' }
            ],
            worksStatus: '',
            gridDataPage: {
                totalNum: 0,
                pageSize: 20,
                pageNum: 1
            }
        }
    },
    created() {
        this.getPhaseList()
        this.judgeRoute()
    },
    mounted() {
        this.getWorksList()
    },
    watch: {
        '$route.path': {
            handler: function() {
                this.judgeRoute()
                this.getWorksList()
            },
            deep: true
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        handleSizeChange(val) {
            this.$set(this.gridDataPage, 'pageSize', val)
            this.getGridData()
        },
        handleCurrentChange(val) {
            this.$set(this.gridDataPage, 'pageNum', val)
            this.getGridData()
        },
        resetGrid() {
            this.$set(this.gridDataPage, 'pageNum', 1)
            this.getGridData()
        },
        // 判断路由
        judgeRoute() {
            if (this.$route.path.includes('pending')) {
                this.title = '待我评审'
                this.listData.pathUrl = '/contest/review/pending/detail/review'
            } else {
                this.title = '经我评审'
                this.listData.pathUrl = '/contest/review/audited/detail/review'
            }
        },
        getsectionalstatistics(id) {
            let handle = aftermyreviewformyreviewsectionalstatistics
            const params = {
                matchId: this.$route.query.id,
                phaseId: id
            }
            handle(params).then(res => {
                if (res.data.code === 200) {
                    const _data = res.data.appendInfo.result || {}
                    _data.forEach(v => {
                        if (v.phaseId == id) {
                            this.sectional = v.numList
                        }
                    })
                    // this.sectional = _data[_data.length-1].numList
                } else {
                    this.worksItems = []
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },

        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getWorksList()
        },
        getPhaseList() {
            requestPhaseList({ matchId: this.$route.query.id }).then(res => {
                if (res.data.code === 200) {
                    this.PhaseList = res.data.appendInfo.list
                    this.PhaseList.forEach(v => {
                        if (v.isOpen == 1) {
                            this.currentPhase = v.id
                            this.currentPhaseName = v.name
                        }
                    })
                    if (this.currentPhase)
                        this.getsectionalstatistics(this.currentPhase)
                    else {
                        this.getsectionalstatistics(
                            this.PhaseList[this.PhaseList.length - 1].id
                        )
                        this.currentPhaseName = this.PhaseList[
                            this.PhaseList.length - 1
                        ].name
                    }
                }
            })
        },
        getWorksList() {
            let handle
            let status
            if (this.$route.path.includes('pending')) {
                handle = requestExpertPendingWorks
                status = 2
            } else {
                handle = requestExpertAuditedWorks
                status = 1
            }
            const params = {
                matchId: this.$route.query.id,
                status: status,
                phaseId: ''
            }
            handle(params, this.pageParam).then(res => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.worksItems = _data.resultData || []
                    // console.log(this.worksItems)
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                } else {
                    this.worksItems = []
                    this.$message({
                        message: res.data.msg
                    })
                }
            })
        },
        // 获取数据
        async getGridData() {
            this.dialogTableVisible = true
            let param = {
                matchId: this.$route.query.id,
                status: this.worksStatus
            }
            let res = await requestMatchExpertWorksEvaluation(
                param,
                this.gridDataPage
            )
            try {
                if (res.data.code == 200) {
                    let _data = res.data.entity
                    this.$set(this.gridDataPage, 'totalNum', _data.totalNum)
                    this.gridData = _data.resultData
                }
            } finally {
            }
        },
        batchDow() {
            if (!this.multipleSelection.length) {
                this.$message({
                    message: '至少要选择一个作品',
                    type: 'warning'
                })
                return
            }
            if (!this.batchDowFlag) return
            this.batchDowBtnTxt = '下载中...'
            this.batchDowFlag = false
            // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
            const zip = new JSZip()
            const cache = {}
            const promises = []
            this.multipleSelection.forEach(item => {
                let fileUrl = fileUploadAddress + '/' + item.resourceId
                // let fileUrl = 'http://192.168.2.93/' + item.resourceId
                const promise = getFile(fileUrl).then(data => {
                    // 下载文件, 并存成ArrayBuffer对象
                    const file_name =
                        item.author +
                        '_' +
                        item.worksName +
                        '_' +
                        item.resourceName // 获取文件名
                    zip.file(file_name, data, { binary: true }) // 逐个添加文件
                    cache[file_name] = data
                })
                promises.push(promise)
            })

            Promise.all(promises).then(() => {
                zip.generateAsync({ type: 'blob' }).then(content => {
                    // 生成二进制流
                    FileSaver.saveAs(content, `作品.zip`) // 利用file-saver保存文件
                    setTimeout(() => {
                        this.batchDowBtnTxt = '下载作品'
                        this.batchDowFlag = true
                    }, 2000)
                })
            })
        }
    }
}
</script>

<style lang="scss">
.review_works {
}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/works_list.scss';
.review_works {
    padding-bottom: 100px;
    /deep/ .el-dialog {
        width: 900px;
    }
    .list-head {
        font-size: 16px;
        padding: 15px 15px 10px;
    }
    .works-list {
        padding: 0px 15px 15px;
    }
    .list-item__box {
        .list-item-img__box {
            img {
                height: 185px;
            }
        }
    }
}
.review_works_title {
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    .list-head {
        float: left;
    }
}
.list_conent {
    // float: left;
    // margin-left: 50px;
    overflow: hidden;
    li {
        font-size: 16px;
        padding: 15px 15px 10px;
        float: left;
    }
}
.list-item-list {
    height: 28px;
    line-height: 28px;
}
.batch_dow {
    margin-top: 7px;
    margin-right: 20px;
}
</style>