<template>
    <el-breadcrumb class="admin-breadcrumb" separator=">" v-if="items.length">
        <span class="el-breadcrumb__item">
            <span class="el-breadcrumb__item__inner breadcrumb-icon"></span>
        </span>
        <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path }" :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumb',
    data () {
        return {
            items: []
        }
    },
    mounted() {
        this.analysisPath()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'analysisPath'
    },
    methods: {
        analysisPath() {
            let breadcrumb = []
            let _indexs = this.$ls.get('BACK-STAGE__INDEX')

            if (_indexs === '-1') {
                breadcrumb = this.$route.matched.map(x => {
                    if(x.path=='/space/train/viewEnroll'&&sessionStorage.getItem('viewEnrollId')) x.path+='?id='+sessionStorage.getItem('viewEnrollId')+'&actorType='+sessionStorage.getItem('actorType')
                    return {
                        path: x.path,
                        title: x.meta.title || ''
                    }
                })
            } else {
                let permission = this.$ls.get('bs-permission').children
                let indexs = _indexs ? _indexs.split(',') : []

                for (let i = 0; i < indexs.length; i++) {
                    if(permission[indexs[i]].url=='/space/train/viewEnroll'&&sessionStorage.getItem('viewEnrollId')) permission[indexs[i]].url+='?id='+sessionStorage.getItem('viewEnrollId')+'&actorType='+sessionStorage.getItem('actorType')
                    breadcrumb.push({path: permission[indexs[i]].url, title: permission[indexs[i]].name})
                    permission = permission[indexs[i]].children
                }
            }

            this.items = breadcrumb
        }
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.admin-breadcrumb {
    &.el-breadcrumb {
        padding: 0;
        line-height: $breadcrumb-height;
    }
}
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.admin-breadcrumb {
    margin-left: $content-box-margin + $content-box-padding;
    .breadcrumb-icon {
        display: inline-block;
        width: 3px;
        height: 1.2em;
        margin-right: 8px;
        vertical-align: text-bottom;
        background-color: #20a0ff;
    }
}
</style>
