<template>
    <div id="screeningList">
        <div class="mes">
            <div class="searchBox">
                <v-search></v-search>
            </div>
            <ul class="mes_ul">
                <li class="mes_li" v-for="(item, index) in data">
                    <router-link :to="{ path:'/educationBureauSpace/information/detail', query: {id: item.id }}">
                    <p class="mes_title" v-if="datas.fatherComponent == 'subjectOverview'">{{item.appName}}</p>
                    <p class="mes_title" v-else>{{item.title}} <time class="mes_time">{{item.publishDate | dateFormat('yyyy-MM-dd')}}</time></p>
                    </router-link>
                </li>
            </ul>
            <div class="paginationBox">
                <v-pagination :param="param" @callback="changePage"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import search from './../../../search.vue'
import pagination from './../../../pagination.vue'
export default {
    name: 'screeningList',
    data() {
        return {
            data:'',
            param:{
                totalNum:0,
                pageSize:10,
                pageNum:1
            }
        }
    },
    props: ['datas'],
    components: {
        'v-search': search,
        'v-pagination': pagination,
    },
    computed: mapState ({
        typeId: state => state.subjectDatail.typeId
    }),
    mounted() {
        setTimeout(this.getData(this.datas.initial, this.datas.paramsName),1000)
    },
    methods: {
        changePage (val) {
        },
        getData (val, param) {
            this.$http.post(this.datas.url,
                {[param] : [val]}
            ).then(response => {
                this.data = response.data.entity.resultData;
                console.log(this.data)
            })
        }
    },
    watch: {
        typeId:function(val) {
            this.getData(val.typeId, this.datas.paramsName)
        }
    }
}

</script>

<style lang='scss' scoped>
@import './../../../../../asset/scss/vars.scss';
$tab-width: 200px;
.mes {
    $item-list-height: 40px;
    $box-padding: 20px;
    position: relative;
    margin-left: $tab-width + 20;
    border: 1px solid #CFCFCF;
    height: 100%;
    .searchBox {
        padding: 10px;
        border-bottom: 1px solid #D3D3D3;
    }
    .mes_ul,
    .paginationBox {
        padding: 0 20px;
    }
    .mes_ul {
        min-height: $item-list-height * 10;
        padding: $box-padding;
        .mes_li {
            font-size: 14px;
            border-bottom: 1px dotted #E3E3E3;
            &:hover .mes_title {
                color: #DD0000;
            }
            .mes_title {
                line-height: $item-list-height;
                color: $default-color;
                .mes_time {
                    float: right;
                    color: #626262;
                }
            }
        }
    }
    .paginationBox {
        padding: 0 $box-padding;
    }
}
</style>
