  <template>
    <el-dialog class="inviteMembers" title="邀请成员" :visible.sync="visible.show" @close="close">
        <!-- <header class="header">
            邀请成员
        </header> -->
        <section class="box clearfix">
            <div class="fl box-l">
                <el-row>
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">接收人:</el-col>
                    <el-col :span="18"><el-input v-model="selector" placeholder="请输入内容" :readonly="true"></el-input></el-col>
                </el-row>
                <el-row style="margin-top:25px;">
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle">内&nbsp;&nbsp;&nbsp;容:</el-col>
                    <el-col :span="18"><el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content" resize="none"></el-input></el-col>
                </el-row>
            </div>
            <div class="fr box-r">
                <el-row>
                    <el-col :span="24" style="height:36px;line-height:36px;"><el-input placeholder="输入关键字搜索" v-model="filterText"></el-input></el-col>
                </el-row>
                <el-tabs type="border-card" @tab-click="listenCurTab">
                    <el-tab-pane label="本校学生">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="studentData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode1" ref="tree1" @check-change="selectData('student')"></el-tree>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="我的好友">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="friendsData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode2" ref="tree2" @check-change="selectData('friends')"></el-tree>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="send">确定</a>
        </div>
    </el-dialog>
</template>

<script>
import { requestBaseStudentExcludeSelf } from '@/service/admin_base.js'
import { admininviteMembersSend } from '@/service/project.js'
import { friendList } from '@/service/my.js'
import { requestFriendsList } from '@/service/privateLetter.js'

export default {
    name: 'inviteMembers', // 邀请成员
    props: ['visible', 'model'],
    data() {
        return {
            search: {
                schoolId: null,
                name: '',
                lockStatus: 0,
                auditStatus: 1
            },
            selector: '',
            content: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selected: [],
            text: '',
            title: '',
            studentData: [],
            friendsData: [],
            selector1: [],
            selected1: [],
            selector2: [],
            selected2: [],
            filterText: '',
            userId: ''
        }
    },
    methods: {
        // 切换本校学生,我的好友
        listenCurTab(tab) {
            this.cur_tab = parseInt(tab.index, 10)
            switch (this.cur_tab) {
                case 0:
                    this.$refs.tree1.filter(this.filterText)
                    break
                case 1:
                    this.$refs.tree2.filter(this.filterText)
                    break
            }
        },
        getStudentList() {
            const identity = this.$ls.get('userIdentity')
            // const param = {
            //     userId: this.$ls.get('loginUId'),
            //     friendGroup: '',
            //     userName: ''
            // }
            friendList({ userId: this.userId, name: '' }, { pageNum: 1, pageSize: 9999 }).then((res) => {
                if (res.data.code === 200) {
                    this.friendsData = res.data.entity.resultData
                    const len = this.friendsData.length
                    for (let i = 0; i < len; i++) {
                        if (this.friendsData[i].userId === this.$ls.get('loginInfo').userInfo.id) {
                            this.friendsData.splice(i, 1)
                            break
                        }
                    }
                }
            })
            this.search.schoolId = this.$ls.get('baseInfo')[identity].schoolId
            requestBaseStudentExcludeSelf(Object.assign({}, this.search)).then((res) => {
                if (res.data.code === 200) {
                    this.studentData = res.data.appendInfo.list || []
                }
            })
            // requestBaseStudent(Object.assign({}, this.search, { pageNum: 1, pageSize: 9999 })).then((res) => {
            //     if (res.data.code === 200) {
            //         this.studentData = res.data.entity.resultData
            //         const len = this.studentData.length
            //         for (let i = 0; i < len; i++) {
            //             if (this.studentData[i].userId === this.$ls.get('loginInfo').userInfo.id) {
            //                 this.studentData.splice(i, 1)
            //                 break
            //             }
            //         }
            //     }
            // })
        },
        filterNode1(value, data) {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        filterNode2(value, data) {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        selectData(type) {
            let _data
            let selector
            let selected
            switch (type) {
                case 'student':
                    selector = 'selector1'
                    selected = 'selected1'
                    _data = this.$refs.tree1.getCheckedNodes(true)
                    break
                case 'friends':
                    selector = 'selector2'
                    selected = 'selected2'
                    _data = this.$refs.tree2.getCheckedNodes(true)
                    break
            }
            this[selector] = []
            this[selected] = []
            for (let i = 0; i < _data.length; i++) {
                this[selector].push(_data[i].name)
                this[selected].push(_data[i].userId)
            }
            this.selector = this.selector1.concat(this.selector2)
            this.selected = this.selected1.concat(this.selected2)
            this.selectTxt = this.selector.join('、')
        },
        send() {
            if (localStorage.getItem('loginInfo')) {
                const userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
                // const loc = location.href.substr(0, location.href.indexOf('#') + 1)
                let messageType
                if (this.model === 'projectId') {
                    messageType = 2
                    this.text = this.content + `<a style="color:#00a0e9;" target="_blank" href='${this.pages.detail.project.url}?id=${this.$route.query.id}'>${this.pages.detail.project.url}?id=${this.$route.query.id}</a>`
                } else if (this.model === 'activityId') {
                    messageType = 3
                    this.text = this.content + `<a style="color:#00a0e9;" target="_blank" href='${this.pages.detail.activity.url}?id=${this.$route.query.id}'>${this.pages.detail.activity.url}?id=${this.$route.query.id}</a>`
                } else if (this.model === 'courseId') {
                    messageType = 5
                    this.text = this.content + `<a style="color:#00a0e9;" target="_blank" href='${this.pages.detail.course.url}?id=${this.$route.query.id}'>${this.pages.detail.course.url}?id=${this.$route.query.id}</a>`
                }
                admininviteMembersSend({
                    busId: this.$route.query.id,
                    sendId: userId,
                    content: this.text,
                    receiveIds: this.selected,
                    messageType: messageType
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '已发送邀请')
                        this.visible.show = false
                        this.content = ''
                        this.selector = ''
                        this.selected = []
                        this.$refs.tree1.setCheckedKeys([])
                        this.$refs.tree2.setCheckedKeys([])
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            } else {
                this.showMessage('warning', '请登录后再操作')
            }
        },
        close() {
            this.$refs.tree1.setCheckedKeys([])
            this.$refs.tree2.setCheckedKeys([])
        },
        getFriendsList() {
            requestFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, name: '' })).then((res) => {
                if (res.data.code === 200) {
                    this.friendsData = res.data.entity.resultData
                }
            })
        },
    },
    watch: {
        filterText(val) {
            switch (this.cur_tab) {
                case 0 :
                    this.$refs.tree1.filter(val)
                    break
                case 1 :
                    this.$refs.tree2.filter(val)
                    break
            }
        },
        visible: {
            handler: function (val) {
                if (val.show) {
                    this.getStudentList()
                }
            },
            deep: true
        }
    },
    created() {
        this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
    }
}
</script>
<style lang='scss'>
.inviteMembers {
    .el-dialog {
        min-width: 850px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .box {
        .el-icon-search {
            width: 50px;
            &:before {
                color: #666666;
            }
        }
        .el-textarea__inner {
            border-radius: 0;
        }
    }
    .el-input__inner{
        height: 36px;
    }
    .el-tabs--border-card{
        box-shadow: none;
        border-top: none;
    }
    .el-tabs__item{
        height: 32px;
        line-height: 32px;
    }
    .el-tabs__item.is-active{
        color: #d00;
    }
    .el-tabs--border-card > .el-tabs__header{
        background-color: #f6f6f6;
    }
    .el-tree{
        border:none;
    }
    .el-tabs--border-card > .el-tabs__content{
        padding: 0px;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                border: 1px solid $color-value;
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover {
                    color: #fff;
                }
            }
        }
    }
}
.inviteMembers {
    padding: 0;
    .header {
        height: 54px;
        line-height: 54px;
        text-indent: 1em;
        border-bottom: 1px solid #D7D7D7;
        font-size: 16px;
    }
    .box {
        padding: 40px 30px;
        .box-l, .box-r {
            width: 50%;
        }
        .box-r {
            .title {
                padding: 0px 5px;
                height: 25px;
                line-height: 25px;
                font-size: 14px;
            }
        }
    }
    .buttonGroup {
        height: 30px;
        text-align: right;
        padding: 0 30px 30px;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
        }
        .reply_btn1 {
            color: #fff;
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
        }
    }
}
</style>
