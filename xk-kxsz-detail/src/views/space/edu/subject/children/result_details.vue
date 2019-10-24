<template>
    <div id="subjectResultDetails" class="subjectResultDetails">
        <el-breadcrumb class="breadcrumbs" separator=">">
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject`, query: { id: $route.query.id } }">课题</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject/results`, query: { id: $route.query.id } }">课题成果</el-breadcrumb-item>
          <el-breadcrumb-item>成果详情</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="result-details bgw">
        <!-- 详情内容 -->
            <div class="content">
                <dl class=" clearfix">
                    <dt class="fl">成果名称：</dt>
                    <dd class="content-right fl">{{resultDetail.name}}</dd>
                </dl>
                <dl class="clearfix">
                    <dt class="fl">所属课题：</dt>
                    <dd class="content-right fl">
                        {{resultDetail.subjectName}}
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt class="fl">成果类型：</dt>
                    <dd class="content-right fl">
                        {{resultDetail.resultType | translate(resultTypeDL)}}
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt class="fl">上传人：</dt>
                    <dd class="content-right fl">
                        <p class="fl">
                            {{resultDetail.userName}}
                        </p>
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt class="fl">上传时间：</dt>
                    <dl class="content-right fl">
                        <p class="fl">
                            {{resultDetail.createDate | dateFormat('yyyy.MM.dd')}}
                        </p>
                    </dl>
                </dl>
                <dl class="clearfix">
                    <dt class="fl">附件：</dt>
                    <dd class="content-right fl" v-if="resultDetail.resourceId">
                        <!-- <a class="fl" :href="downloadUrl(resultDetail.resourceId, resultDetail.resourceName)" :download="resultDetail.resourceName">
                            {{resultDetail.resourceName}}
                        </a> -->
                        <a class="fl"  @click="downloadUrl(resultDetail.resourceId, resultDetail.resourceName )">
                            {{resultDetail.resourceName}}
                        </a>
                    </dd>
                    <dd class="content-right fl" v-else>
                        <span>暂无附件</span>
                    </dd>
                </dl>
            </div>
        </section>
    </div>
</template>

<script>
import breadcrumb from 'Common/breadcrumb.vue'
import { requestSubjectResultDetail } from '@/service/subject.js'
import { mapState } from 'vuex'

export default {
    name: 'subjectResultDetails',
    components: {
        'v-breadcrumb': breadcrumb
    },
    data() {
        return {
            resultDetail: {
                resultType: ''
            },
            type: this.$route.path.split('/')[2]
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            resultTypeDL(state) {
                const dicList = (state.resultTypeDicList || {}).dicList || []
                return dicList
            },
        }),
    },
    mounted() {
        requestSubjectResultDetail({ id: this.$route.query.resultId }).then((res) => {
            this.resultDetail = res.data.entity
        })
    }
}
</script>

<style lang='scss' scoped>
    *{
        box-sizing:border-box;
    }
    /*介绍内容*/
    .result-details{
        width: 100%;
        padding: 20px;
        // border: 1px solid #c9c9c9;
        .content{
            width: 100%;
            overflow: hidden;
            dl{
                width: 100%;
                margin-bottom: 27px;
                dt{
                    font-size: 15px;
                    font-weight: bold;
                    color: #000;
                }
                dd{
                    margin-bottom: 5px;
                    color: #222
                }
                .content-right{
                    width: 970px;
                    font-size: 14px;
                    overflow: hidden;
                    margin-bottom: 0;
                    a{
                        color: #00a0e9;
                    }
                }
            }
        }
    }
</style>