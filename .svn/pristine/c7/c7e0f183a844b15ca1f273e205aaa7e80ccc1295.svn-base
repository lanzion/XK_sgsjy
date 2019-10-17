<template>
	<div class="open_rate">
		<p class="prompt">我们欢迎全国各地的教育局和学校来平台使用，我们将会为您免费开通线上创客空间。您可以在此查询办理进度。办理中的请您耐心等待，已开通的请您注意查收邮件，已拒绝的请您查看拒绝原因</p>
        <div class="search-box clearfix">
            <el-input class="fl" v-model="name" placeholder="申请编号/单位名称" v-on:keyup.enter.native="getRateDatas(name)"></el-input>
            <button class="search-btn fl" @click="getRateDatas(name)">查询</button>
        </div>
        <div class="table-box">
            <el-table :data="datas" style="width: 100%" border>
                <el-table-column prop="applyNo" label="申请编号" width="154"></el-table-column>
                <el-table-column prop="area" label="区域" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.areaName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="linkName" label="联系人" width="90" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="125">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone | phoneFormat}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="90">
                    <template slot-scope="scope">
                        <el-popover
                            ref="popover"
                            placement="top"
                            title="拒绝理由："
                            width="200"
                            trigger="hover"
                            :content="scope.row.opinion">
                        </el-popover>
                        <span class="c_gray" v-if="scope.row.status == '1'">办理中</span>
                        <span class="c_gray" v-if="scope.row.status == '2'">已开通</span>
                        <span class="refused" v-if="scope.row.status == '3'" v-popover:popover>已拒绝</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
	</div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue'
    import { requestOrgApplyRate } from '@/service/openOrg.js'

    export default {
        name: 'open_rate',
        components: {
            'v-pagination': pagination
        },
        data() {
            return {
                name: '',
                datas: [],
                pageParams: {
                    pageSize: 10,
                    totalNum: 0,
                    pageNum: 1
                }
            }
        },
        mounted() {
            this.getRateDatas()
        },
        methods: {
            changePage(val) {
                this.pageParams.pageNum = val
                this.getRateDatas()
            },
            getRateDatas(name = '') {
                requestOrgApplyRate({ name: name }, this.pageParams).then((res) => {
                    if (res.data.code === 200) {
                        this.datas = res.data.entity.resultData
                        this.pageParams.totalNum = res.data.entity.totalNum
                    }
                })
            }
        },
        filters: {
            phoneFormat(phone) {
                if (phone) {
                    return phone.replace(/(\S{3})\S*(\S{4})/, '$1****$2')
                }
                return 'ta没留下电话'
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
    .open_rate {
        .el-input {
            width: 278px;
        }
        .el-input__inner {
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
        }
        .cell {
            text-align: center;
            padding: 0 15px;
            cursor: default;
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .open_rate {
        width: 800px;
        margin: 0 auto;
        .prompt {
            font-size: 12px;
            color: #999;
            line-height: 1.5em;
            text-align: center;
            margin-bottom: 45px;
        }
        .search-box {
            margin-bottom: 20px;
            .search-btn {
                width: 88px;
                height: 38px;
                border-radius: 4px;
                background-color: nth($default-color, 1);
                color: #fff;
                font-size: 16px;
                margin-left: 10px;
                &:hover {
                    opacity: 0.75;
                }
            }
        }
    }
    .refused {
        color: nth($default-color, 1);
        cursor: pointer;
    }
    .c_gray {
        color: #1f2d3d;
    }
</style>