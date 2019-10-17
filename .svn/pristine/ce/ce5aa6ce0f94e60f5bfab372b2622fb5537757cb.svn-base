<template>
    <div>
        <ul class="member-list clearfix">
            <p class="empty-block" v-if="personList.length==0">暂无成员</p>
            <li class="member-item clearfix" v-for="item in personList" :key="item.id" :style="{width: 100/cols + '%'}">
                <a @click="toPersonDetail(item)" class="head-item">
                    <img :src="getFileUrl(item.headImageUrl) || faceDefault" alt="" class="member-item-head circle" />
                </a>
                <div class="">
                    <p class="member-item-info">
                        <a @click="toPersonDetail(item)">{{item.applyName}}</a>
                    </p>
                    <p class="member-item-ascription">{{item.schoolName}}</p>
                </div>
            </li>
        </ul>
        <v-pagination :param.sync="pagParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import { adminProjectMemberUnapply } from '@/service/project.js'
import pagination from 'Common/pagination.vue'

export default {
    name: 'pendingMemberList',
    data() {
        return {
            personList: [],
            pagParam: { totalNum: 100, pageSize: 10, pageNum: 1 }
        }
    },
    components: {
        'v-pagination': pagination
    },
    props: [
        'cols'
    ],
    mounted() {
        this.getData()
    },
    watch: {
    },
    computed: {
    },
    methods: {
        changePage(val) {
            this.$set(this.pagParam, 'pageNum', val)
            this.getData()
        },
        getData() {
            adminProjectMemberUnapply({ projectId: this.$route.query.id }, this.pagParam).then((res) => {
                const _data = res.data.entity
                this.personList = _data.resultData
                this.pagParam.totalNum = _data.totalNum
            })
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$head-face-size: 72px;
.member-list {
    padding: 0 20px;

    .member-item {
        float: left;
        padding: 20px 10px 20px 0;
        box-sizing: border-box;

        .head-item {
            float: left;
            width: $head-face-size;
            padding-right: 1em;
        }

        .member-item-head {
            width: $head-face-size;
            height: $head-face-size;
        }
        .member-item-info {
            font-size: 18px;
            line-height: 2;
            a:hover{
                color: #2797ed;
            }
        }
        .member-item-ascription {
            font-size: 14px;
            color: #999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .member-list {
            .btn-group {
                .i-button:hover {
                    color: $color-value;
                }
            }
        }
    }
}
</style>