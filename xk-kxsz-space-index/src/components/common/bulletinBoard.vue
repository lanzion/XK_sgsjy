<template>
    <div class="bulletinBoard bgw">
        <h2 class="title">公告</h2>
        <transition-group v-if="list.length > 0" class="bulletin_ul" tag="ul" name="ls">
            <li v-for="(item, index) in list" class="bulletin_li" :key="item.id" @mouseenter="stop" @mouseleave="roll">
                <el-tooltip effect="light" :content='item.content' placement="bottom">
                    <span class="msg"> {{ item ? item.title : '' }} </span>
                </el-tooltip>
                <span class="time fr">{{item? item.createDate : null | dateFormat('MM-dd HH:mm') }}</span>
            </li>
        </transition-group>
        <div v-else class="isNull-list">
            暂无公告
        </div>
    </div>
</template>

<script>
export default {
    name: 'bulletinBoard',
    data() {
        return {
            show: true,
            list: []
        }
    },
    props: {
        datas: {
            type: Array,
            default: []
        }
    },
    methods: {
        roll() {
            let list = this.list
            if(list.length > 5) {
                this.time = setInterval(function (){
                    let item = list.shift()
                    setTimeout(function() {
                        list.push(item)
                    },0)
                },3000)
            }
        },
        stop() {
            clearInterval(this.time)
        }
    },
    watch: {
        datas: {
            handler: function (val, oldVal) {
                if(val.length != 0) {
                    this.list.push(...val)
                    this.roll()
                }
            },
            deep: true
        }
    },
    destroyed() {
        this.stop()
    }
}
</script>


<style lang='scss'>
.el-tooltip__popper {
    width: 300px;
    word-wrap: break-word;
    word-break: normal;
}
</style>

<style lang='scss' scoped>
.bulletinBoard {
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    max-height: 292px;
    overflow: hidden;
    .title {
        font-size: 16px;
        padding: 12px 0px;
        border-bottom: 1px solid #c9c9c9;
        text-indent: .5em;
    }
    .bulletin_ul {
        padding: 10px 10px 0;
        .bulletin_li {
            padding: 15px 0;
            transition: all 1s;
            .msg {
                display: inline-block;
                width: 60%;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .time {
                color: #999;
            }
        }
    }
    .ls-enter-active, .ls-leave-active {
        transition: opacity 1s, transform 1s;
    }
    .ls-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    .ls-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
    .isNull-list {
        border: none;
    }
}
</style>
