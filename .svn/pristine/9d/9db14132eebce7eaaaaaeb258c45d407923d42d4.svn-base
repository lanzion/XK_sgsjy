<template>
    <div id="screeningTabs">
        <div class="tab">
            <h3 class="tab_title" v-text="datas.tab_title"></h3>
            <ul class="clearfix">
                <li class="tab_list" v-for="(item, index) in data" v-text="item.name" :class="{active:index == curId}" @click="listenCurTab(index, item[datas.paramsName])" :key="index">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'screeningTabs',
    data() {
        return {
            curId: 0,
            data:''
        }
    },
    props: [
        'datas'
    ],
    computed: mapState ({
        tabsId: state => state.subjectDatail.tabsId
    }),
    mounted() {
        if(!this.datas.ifParams){
            this.listenCurTab(0, this.datas.initial)
        }else{
          this.getTabs()
        }
    },
    methods: {
        listenCurTab: function (index, typeId) {
            this.curId = index
            this.$store.dispatch('setTabsId', typeId)
            if(this.datas.tabs === undefined || this.datas.tabs === "") {
                this.getData(this.datas.paramsName, typeId)
            }else {
                this.data = this.datas.tabs
            }

        },
        getTabs: function () {
            this.$http.post(this.datas.url)
                .then(res => {
                    this.data = res.data.entity
                })
        },
        getData: function (param, typeId) {
            this.$http.post(this.datas.url,{[param]:[typeId]})
                .then(res => {
                    this.data = res.data.entity
                })
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$tab-width: 200px;
#information {
    position: relative;
    width: 100%;
}
.tab {
    position: absolute;
    top: 0;
    bottom: 0;
    width: $tab-width;
    border: 1px solid #CFCFCF;
    .tab_title {
        height: 42px;
        line-height: 42px;
        background-color: #F6F6F6;
        font-size: 18px;
        text-indent: 14px;
        border-bottom: 1px solid #E5E5E5;
    }
    .tab_list {
        height: 42px;
        line-height: 42px;
        text-indent: 40px;
        font-size: 14px;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 2px solid transparent;
        &.active {
            color: $theme_color;
            border-color: $theme_color;
            background-color: #F8EEEE;
        }
    }
}
</style>
