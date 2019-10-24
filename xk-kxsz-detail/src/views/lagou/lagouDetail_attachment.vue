<template>
    <section class="lagouDetail_attachment">
        <h3 class="title">附件 <span class="title_totalNum"> ( {{ resourceList ? resourceList.length : 0 }}个 ) </span> </h3>
        <ul v-if="resourceList.length" class="attlist">
            <li v-for="(i, k) in resourceList" class="attlist_li">
                <i class="icon fl" :class="['icon-file-c-' + judgeFileType(i.name)]">
                    <i v-for="i in 6" :class="['path' + i]"></i>
                </i>
                <div class="attlist_li_msg">
                    <p>{{i.name}}</p>
                    <!-- <p><a :href="downloadUrl( i.resourceId, i.name )" :download="i.name" style="color:#0391D9;fontSize:14px;"> 下载 </a></p> -->
                    <p><a @click="downloadUrl(i.resourceId, i.name )" style="color:#0391D9;fontSize:14px;"> 下载 </a></p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { fileType } from '@/mixin/fileType.js'

export default {
    mixins: [fileType],
    props: {
        detail: Object
    },
    methods: {

    },
    computed: {
        resourceList() {
            return (this.detail.resourceList || this.detail.demandResource || [])
        }
    }
}
</script>

<style lang='scss' scoped>
.lagouDetail_attachment {
    padding: 15px;
    font-size: 14px;
    .title {
        height: 40px;
        line-height: 40px;
        text-indent: 1em;
        background-color: #c5e5f2;
        font-weight: bold;
        .title_totalNum {
            font-size: 0.85em;
            color: #999;
        }
    }
    .attlist {
        padding: 12px;
        .attlist_li {
            height: 80px;
            padding: 20px 0;
            box-sizing: border-box;
            .icon {
                width: 40px;
                height: 40px;
                font-size: 40px;
            }
        }
        .attlist_li_msg {
            font-size: 1.14em;
            margin-left: 50px;
            p {
                line-height: 1.2;
            }
        }
    }
}
</style>