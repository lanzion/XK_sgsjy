<template>
    <div>
        <ul class="member-list clearfix">
            <p class="empty-block" v-if="personList.length==0">暂无成员</p>
            <li class="member-item clearfix" v-for="item in personList" :key="item" :style="{width: 100/cols + '%'}">
                <a class="head-item">
                    <img :src="item.headImageUrl" alt="" class="member-item-head circle" />
                </a>
                <div class="">
                    <p class="member-item-info">{{item.createName}}aaa</p>
                    <p class="member-item-ascription">{{item.schoolName}}</p>
                </div>
            </li>
        </ul>
        <v-pagination v-if="personList.length>0"></v-pagination>
    </div>
</template>

<script>
import pagination from './../../../pagination.vue'
export default {
    name : 'pendingMemberList',
    data() {
        return {
            projectId: 'fd9cb78793484d2091ad3b60c483a8c7'
        }
    },
    components: {
        'v-pagination': pagination
    },
    props: [
        'personList',
        'cols'
    ],
    created() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
    }
}
</script>
<style lang='scss' scoped>
@import './../../../../../asset/scss/vars.scss';
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