<template>
    <div id="select_participator">
        <el-popover
            ref="popover"
            placement="bottom"
            width="450"
            v-model="visible">
            <div class="content clearfix">
                <div class="content-left fl">
                    <el-row>
                      <el-col :span="24"><el-input placeholder="输入人名搜索" v-model="filterText"></el-input></el-input></el-col>
                	</el-row>
                	<el-row>
                	    <el-col :span="24">
                	        <el-tree :data="datas" :show-checkbox="!disabled" node-key="id" :props="defaultProps" style="height:180px;overflow-y:auto;border:1px solid #c9c9c9;" :filter-node-method="filterNode" ref="tree" @check-change="selectData"></el-tree>
                	    </el-col>
                	</el-row>
                </div>
                <div class="content-right fr">
                    <h5>请勾选要参与的联系人</h5>
                    <ul>
                        <li v-for="(item,index) in selected" class="clearfix">
                            <span>{{item}}</span>
                            <i class="fr icon-btn-close2" @click="delSelected(index)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btn-group clearfix">
                <a class="reply_btn reply_btn1" @click="visible = false">确定</a>
             <a class="reply_btn reply_btn2" @click="cancelSelected">取消</a>
            </div>
        </el-popover>

        <el-input class="selector" type="textarea" autosize v-model="participator" disabled :placeholder="placeholder" v-popover:popover required></el-input>
    </div>
</template>

<script>
    import { requestSchoolTeachers } from '@/service/subject.js'

    export default {
        name: 'select_participator',
        data() {
            return {
                visible: false,
                selected: [],
                participator: '',
                datas: [],
                filterText: '',
                defaultProps: {
                    children: 'children',
                    label: 'userName'
                },
            }
        },
        props: {
            placeholder: {
                type: String,
                default: '请选择课题参与人，多选'
            },
            memberList: {
                type: Array,
                default() {
                    return []
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            requestSchoolTeachers().then((res) => {
                this.datas = res.data.entity
            })
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
            memberList: {
                handler: function (val) {
                    this.$refs.tree.setCheckedKeys(val)
                    window.setTimeout(() => {
                        const data = this.$refs.tree.getCheckedNodes(true)
                        const nameArr = []
                        for (let i = 0; i < data.length; i++) {
                            nameArr.push(data[i].userName)
                        }
                        this.selected = nameArr
                    }, 300)
                },
                deep: true
            },
            selected: {
                handler: function (val) {
                    this.participator = val.join(',')
                },
                deep: true
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true
                return data.userName.indexOf(value) !== -1
            },
            selectData() {
                const idArr = []
                const nameArr = []
                const data = this.$refs.tree.getCheckedNodes(true)
                for (let i = 0; i < data.length; i++) {
                    nameArr.push(data[i].userName)
                    idArr.push(data[i].id)
                }
                this.selected = nameArr
                this.memberList.splice(0, this.memberList.length, ...idArr)
            },
            delSelected(index) {
                this.memberList.splice(index, 1)
            },
            cancelSelected() {
                this.visible = false
                if (this.$route.query.subjectId === undefined) {
                    this.selected = []
                    this.memberList.splice(0, this.memberList.length, '')
                }
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
    .el-popover{
        .btn-group {
            height: 30px;
            text-align: right;
            padding: 0 10px 10px;
            .reply_btn {
                border:1px solid $theme-color;
                border-radius: $button-radiu;
                display: inline-block;
                width: 62px;
                height: 28px;
                line-height: 26px;
                text-align: center;
                box-sizing: border-box;
            }
            .reply_btn1 {
                color: #fff;
                background-color: $theme-color;
                margin-right: 10px;
                &:hover {
                    opacity: 0.75;
                }
            }
            .reply_btn2 {
                color: $theme-color;
                margin-top: 2px;
                &:hover {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }
        .content{
            width: 100%;
            .content-left{
                box-sizing: border-box;
                padding: 10px;
                width: 234px;
                border-right: 1px solid #ddd;
                .el-tree{
                    border:none!important;
                }
            }
            .content-right{
                box-sizing: border-box;
                width: 195px;
                padding: 20px;
                h5{
                    font-size: 12px;
                    color: #999;
                    line-height: 2em;
                }
                ul{
                    li{
                        font-size: 12px;
                        line-height: 2.5em;
                        i{
                            font-size: 12px;
                            line-height: 2.5em;
                        }
                        i:hover{
                            color: $theme-color;
                        }
                    }
                }
            }
        }
    }
    #select_participator {
        .selector {
            .el-textarea__inner {
                cursor: pointer;
                background-color: #fff;
                &:hover {
                    border-color: $theme-color;
                }
            }
        }
    }
</style>

<style lang="scss" scoped>
    #select_participator{
        .content{
            width: 100%;
        }
    }
</style>

