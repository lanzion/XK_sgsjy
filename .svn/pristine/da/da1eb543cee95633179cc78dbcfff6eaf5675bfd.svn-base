<template>
    <div class="honor-detail container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(pages.detail.model, { query: {id: $route.query.orgId }, type: 6})">示范校</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect(pages.detail.model, { query: {id: $route.query.orgId }, path: '/honor', type: 6 })">创客荣誉列表</el-breadcrumb-item>
            <el-breadcrumb-item>创客荣誉详情</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="detail bgw">
            <div class="title-wrapper pr">
                <h3 class="title ellipsis">{{detail.name || '暂无成果标题'}}</h3>
                <div class="info clearfix">
                    <div class="info-left fl">
                        <figure class="avatar">
                            <img :src="getFileUrl(detail.cover) || faceDefault" class="pic">
                        </figure>
                    </div>
                </div>
            </div>
            <div v-html="detail.content || '暂无内容'" class="detail-main"></div>
        </section>
    </div>
</template>

<script>
    import { queryHonorDetail } from '@/service/model_school.js'
    import btnGroup from 'Common/button/com_panel_event.vue'

    export default {
        data() {
            return {
                detail: {},

                items: [
                    { label: '本校荣誉', path: `${this.pages.detail.model.path}/honor` },
                    { label: '荣誉详情', path: '' },
                ],
            }
        },
        created() {
            this.queryDetail()
        },
        components: {
            'v-btn-group': btnGroup,
        },
        methods: {
            // 获取详情
            async queryDetail() {
                const { id } = this.$route.query
                const res = await queryHonorDetail({ id })

                if (res.status === 200 && res.data.code === 200) {
                    this.detail = res.data.entity || {}
                }
            },
            generateRoute(path) {
                const { detail: { schoolId: id }, items: [firstItem] } = this
                const _path = path === undefined ? firstItem.path : path

                return { path: _path, query: { id } }
            }
        }
    }
</script>

<style lang='scss'>
    .honor-detail {
        .detail-main {
            p {
                text-indent: 24px;
                word-wrap: break-word;
                word-break: break-all;
            }
            img {
                display: block;
                max-width: 72%;
                margin: 16px auto;
            }
            ul, ol {
                padding: 12px;
            }
            table {
                box-sizing: border-box;
                width: 100%;
                margin: 12px 0;
                td {
                    text-align: center;
                    border: 1px solid #ddd;
                    padding: 4px;
                }
            }
            a:hover {
                color: #2797ed;
            }
        }
    }
</style>
<style lang='scss' scoped>
    $theme-color: #2797ed;

    .honor-detail {
        font-size: 14px;
        .el-breadcrumb {
            padding: 18px 0;
            .el-breadcrumb__item:last-child {
                pointer-events: none;
            }
        }
        .btn-group {
            right: 0;
            top: 8px;
        }
        .title {
            line-height: 3;
            font-size: 22px;
            color: #333;
            text-align: center;
        }
        .info {
            line-height: 40px;
            margin-top: 12px;
        }
        .info-left {
            font-size: 12px;
            color: #999;
            .avatar {
                display: inline-block;
                .pic {
                    width: 100%;
                }
            }
            .date {
                margin-left: 10px;
            }
        }
        .icon-btn-browse:before {
            margin-right: 6px;
            vertical-align: middle;
            font-size: 16px;
        }
        .blue {
            color: $theme-color;
        }
        .detail {
            padding: 25px 12px;
            .detail-main {
                margin-top: 30px;
                line-height: 1.5;
                overflow: hidden;
            }
        }
    }
</style>
