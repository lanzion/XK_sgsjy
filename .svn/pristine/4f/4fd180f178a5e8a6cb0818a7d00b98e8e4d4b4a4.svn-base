<template>
    <section class="lagouDetail_hookupwith">
        <ul class="hookupwith_list">
            <li v-for="(i, k) in list" class="hookupwith_li">
                <router-link :to="dynamicPath(i)">
                     <img :src="getFileUrl(i.face)" class="face fl">
                </router-link>
                <div class="msg">
                    <p>勾搭人: {{ i.linkMan }} <span class="time fr"> {{ i.createDate | dateFormat('yyyy-MM-dd') }} </span> </p>
                    <p>联系方式: {{ isCreator?i.mobile:'*******' }}</p>
                    <p>勾搭状态: {{ i.status | translate(hookUpWithStatus) }}</p>
                    <p class="remark">勾搭备注: {{ i.remark }}</p>
                </div>
            </li>
        </ul>
        <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
    </section>
</template>

<script>
import { hookupWithList } from '@/service/service.js'
import { mapActions, mapState } from 'vuex'
import pagination from 'Common/pagination.vue';
export default {
    data() {
        return {
            isCreator: null,
            list: [],
            pageParam: {
                pageNum: 1,
                pageSize: 7
            }
        }
    },
    props: {
        detail: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        getList () {
            let params = {
                busId: this.$route.query.id,
                type: this.$route.params.type
            }
            hookupWithList(params, this.pageParam).then( res => {
                if(res.data.code == 200) {
                    this.list = res.data.entity.resultData
                    this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                }

            })
        },
        // 切换页数
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getList()
        },
    },
    mounted() {
        this.isCreator = this.$ls.get('loginUId') && this.detail.createId != this.$ls.get('loginUId')
        this.getList()
    },
    computed: {
        ...mapState('dictionaryCommon', {
            hookUpWithStatus (state) {
                let dicList = (state['hookUpWithStatusDicList'] || {}).dicList || []
                return dicList
            }
        })
    },
    components: {
        'v-pagination': pagination
    },
}
</script>

<style lang='scss' scoped>
.lagouDetail_hookupwith {
    font-size: 14px;
    .hookupwith_list {
        .hookupwith_li {
            padding: 20px;
            box-sizing: border-box;
            height: 140px;
            & + li {
                border-top: 1px solid #dfdfdf;
            }
            .face {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            .msg {
                margin-left: 120px;
                p {
                    padding: 5px 0;
                }
                .time {
                    color: #999;
                }
                .remark {
                    word-wrap:break-word;
                    word-break:normal;
                }
            }
        }
    }
}
</style>