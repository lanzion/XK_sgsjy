  <template>
    <el-dialog class="publish_letter" title="邀请成员" :visible.sync="visible.show" @close="close">
        <section class="box clearfix">
            <div class="fl box-l">
                <el-row>
                    <el-col :span="4" style="height:36px;line-height:36px;" align="middle"><i style="color: #d00;">*</i> 接收人:</el-col>
                    <el-col :span="19"><el-input v-model="selectTxt" placeholder="请选择邀请成员"></el-input></el-col>
                </el-row>
                <el-row style="margin-top:25px;">
                    <el-col :span="4" style="height: 36px; line-height: 36px; margin-bottom: 1px;" align="middle"> 内&nbsp;&nbsp;&nbsp;容:</el-col>
                    <el-col :span="19"><el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content" resize="none"></el-input></el-col>
                </el-row>
            </div>
            <div class="fr box-r">
                <el-row style="">
                    <el-col :span="24" style="height:36px;line-height:36px;"><el-input placeholder="输入关键字搜索" v-on:keyup.enter.native="searchPerson" icon="search" v-model="filterText" :on-icon-click="searchPerson"></el-input></el-col>
                </el-row>
                <el-tabs type="border-card" @tab-click="listenCurTab">
                    <el-tab-pane label="本校教师">
                        <el-row>
                            <el-col :span="24">
                                <el-tree :data="teacherData" show-checkbox node-key="id" :props="defaultProps" style="height:172px;overflow-y:auto;border: none;" :filter-node-method="filterNode1" ref="tree1" @check-change="selectData('teacher')"></el-tree>
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
                <!-- <div class="title-label">本校教师</div>
                <el-row>
                    <el-col :span="24">
                        <el-tree :data="teacherData" show-checkbox node-key="name" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @check-change="selectData()"></el-tree>
                    </el-col>
                </el-row> -->
            </div>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="send">确定</a>
        </div>
    </el-dialog>
</template>

<script>
import { baseInfo } from '@/js/getUserInfo.js'
import { requestFriendsList,requestTeacherList } from '@/service/privateLetter.js'
import { studioInviteMember } from '@/service/studio.js'
export default {
  name: 'publish_letter', // 邀请成员
  props: {
    visible:{
        type: Object,
        default () {
            return {show:false}
        }
    }
  },
  data() {
        return {
            search: {
                schoolId: null,
                name: '',
                lockStatus: 0,
                auditStatus: 1
            },
            filterText:'',
            userId:'',
            content: '',
            studentData: [],
            teacherData: [],
            friendsData: [],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            selector: [],
            selected: [],
            selector1: [],
            selected1: [],
            selector2: [],
            selected2: [],
            selectTxt:'',
            cur_tab: 0,
            province:'',
            city:'',
            area:''
        }
    },
    watch:{
        visible: {
            handler: function (val, oldVal) {
                if (val.show) {
                    this.getTeacherList(Object.assign({}, this.search))
                    this.getFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, name: '' }))
                }
            },
            deep:true
        }
    },
    mounted() {
        if (baseInfo) {
            let key = localStorage.getItem('userIdentity')
            this.search.schoolId = baseInfo[key].schoolId
            this.province = baseInfo[key].province
            this.city = baseInfo[key].city
            this.area = baseInfo[key].area
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
        }
    },
    methods: {
        listenCurTab(tab, event){
            this.cur_tab = parseInt(tab.index)
        },
        searchPerson() {
            if (this.filterText === '') {
                this.searchByName(this.search.schoolId)
            } else {
                this.searchByName()
            }
        },
        searchByName(schoolId = '') {
            switch (this.cur_tab) {
                case 0 :
                    this.getTeacherList(Object.assign({}, { lockStatus: 0, auditStatus: 1, schoolId: schoolId, name: this.filterText }))
                    break
                case 1 :
                    this.getFriendsList(Object.assign({ pageNum: 1, pageSize: 9999 }, { userId: this.userId, userName: this.filterText }))
                    break
            }
        },
        getTeacherList(params) {
            requestTeacherList(params).then((res) => {
                if(res.data.code === 200){
                    this.teacherData = res.data.entity.resultData
                    let len = this.teacherData.length
                    for (let i = 0; i < len; i++) {
                        if(this.teacherData[i].userId === this.$ls.get('loginInfo').userInfo.id){
                            this.teacherData.splice(i, 1)
                            return
                        }
                    }
                }
            })
        },
        getFriendsList(params) {
            requestFriendsList(params).then(res => {
                if(res.data.code === 200){
                    const datas = res.data.entity.resultData
                    this.friendsData = datas.filter(x => x.identity == '1')
                }
            })
        },
        filterNode1(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        filterNode2(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectData(type){
            switch (type) {
                case 'teacher':
                    this.selector1 = []
                    this.selected1 = []
                    let data1 = this.$refs.tree1.getCheckedNodes(true)
                    for(let i = 0; i < data1.length;i++) {
                        this.selector1.push(data1[i].name)
                        this.selected1.push(data1[i].userId)
                    }
                    break
                case 'friends':
                    this.selector2 = []
                    this.selected2 = []
                    let data2 = this.$refs.tree2.getCheckedNodes(true)
                    for(let i = 0; i < data2.length;i++) {
                        this.selector2.push(data2[i].name)
                        this.selected2.push(data2[i].userId)
                    };
                    break
            }
            this.selector = this.selector1.concat(this.selector2)
            this.selected = this.selected1.concat(this.selected2)
            this.selectTxt = this.selector.join('、')
        },
        send (){
            if(localStorage.getItem('loginInfo')){
                let userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id;
                let loc = location.href.substr(0, location.href.indexOf('#') + 1)
                let text = this.content + `<a style="color:#00a0e9;" href='${loc}/studioMemberDetail/homePage?id=${this.$route.query.id}'>${loc}studioMemberDetail/homePage?id=${this.$route.query.id}</a>`
                studioInviteMember({
                    busId: this.$route.query.id,
                    sendId: userId,
                    messageType: 6,
                    content: text,
                    receiveIds: [...new Set(this.selected)]
                }).then(res => {
                    if(res.data.code === 200){
                        this.showMessage('success','私信已发送')
                        this.visible.show = false
                        this.content = ''
                        this.selectTxt = ''
                        this.selector = []
                        this.selected = []
                        this.close()
                    } else {
                        this.showMessage('warning',res.data.msg)
                    }
                })
            }else{
                this.showMessage('warning','请登录后再操作')
            }
        },
        close(){
            this.$refs.tree1.setCheckedKeys([])
            this.$refs.tree2.setCheckedKeys([])
        }
    }
}
</script>
<style lang='scss'>
.publish_letter {
    .el-dialog {
        min-width: 850px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .box {
        .el-icon-search {
            width: 50px;
            &:hover {
                color: #2797ed;
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
        color: #2797ed;
    }
    .el-tabs--border-card > .el-tabs__header{
        background-color: #f6f6f6;
    }
    .el-tree{
        border:none;
        height: 169px;
        overflow-y: auto;
        padding: 5px;
        border: 1px solid #ccc;
    }
    .el-tabs--border-card > .el-tabs__content{
        padding: 0px;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
                &:hover{
                    opacity: 0.75;
                }
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover{
                    color: #fff;
                }
            }
        }
    }
}
.publish_letter {
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
    .title-label{
        padding: 5px 0;
    }
}
</style>
