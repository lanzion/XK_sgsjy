<template>
    <div id="subject_member">
        <h4>{{title}}</h4>
        <section>
            <ul class="clearfix" v-if="memberList.length > 0">
                <li class="fl" v-for="(item,index) in memberList" :style="{width:width}">
                    <a @click="toPersonDetail(item)">
                        <div class="img-box">
                            <img :src="getFileUrl(item.face) || faceDefault">
                        </div>
                        <div class="name">{{item.name}}</div>
                    </a>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无数据</div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'subject_member',
        components: {},
        data() {
            return {
                width: 1 / 4 * 100 + '%'
            }
        },
        props: {
            title: {
                type: String,
                default: '课题组成员'
            },
            isBackend: {
                type: Boolean,
                default: true
            },
            memberList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    *{
        box-sizing: border-box;
    }
    #subject_member{
        background-color: #fff;
        width: 274px;
        margin-bottom: 20px;
        h4{
            padding: 13px;
            border-bottom: 1px solid #c9c9c9;
            font-size: 16px;
        }
        section{
            padding: 5px 10px 15px;
            ul{
                li{
                    text-align: center;
                    margin-top: 10px;
                    .img-box{
                        margin-bottom: 6px;
                        img{
                            border-radius: 1000px;
                            width: 50px;
                            height: 50px;
                        }
                    }
                    a:hover{
                        color: #2797ed;
                    }
                }
            }
        }
    }
</style>