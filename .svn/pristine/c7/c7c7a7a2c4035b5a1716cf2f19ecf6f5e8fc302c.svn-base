<template>
    <div id="visitors" class="backend-content__middle visitor">
        <h3 class="title">共计 {{ pagParam.totalNum }} 个访客</h3>
        <ul class="member-list clearfix">
            <p class="empty-block" v-if="personList.length==0">暂无成员</p>
            <li class="member-item clearfix" v-for="item in personList" :key="item.id" :style="{width: 100/cols + '%'}" :title="item.userName">
                <router-link :to="dynamicPath(item)">
                    <a class="head-item">
                        <img :src="getFileUrl(item.face) || faceDefault" class="member-item-head circle"/>
                    </a>
                    <div class="">
                        <p class="member-item-info">{{item.userName}}</p>
                        <p class="member-item-ascription">{{item.createDate | dateFormat('MM月dd日') }}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <v-pagination :param.sync="pagParam" :changePage="changePage"></v-pagination>
    </div>
</template>

<script>
import { visitorList } from '@/service/my.js'
import pagination from 'Common/pagination.vue'
export default {
    name : 'visitors',
    data() {
        return {
            cols: 5,
            personList: [],
            pagParam: {totalNum: 0, pageSize: 20, pageNum: 1}
        }
    },
    components: {
        'v-pagination': pagination
    },
    mounted() {
        this.getData()
    },
    methods: {
        changePage (val) {
            this.$set(this.pagParam,'pageNum', val)
            this.getData()
        },
        getData (){
            visitorList( { "userId" : this.$ls.get('loginUId') }, this.pagParam).then(res => {
                res = res.data.entity
                if(res){
                    this.personList = res.resultData
                    this.$set(this.pagParam, 'totalNum', res.totalNum)
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
$head-face-size: 72px;
#visitors {

}
.visitor {
    font-size: 14px;
    .title {
        font-weight: 400;
        padding-bottom: 10px;
        border-bottom: 1px solid #c9c9c9;
    }
    .member-list {
        .member-item {
            float: left;
            padding: 20px 10px 20px 0;
            box-sizing: border-box;
            &:hover .member-item-info {
                color: #00a7f3;
            }
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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