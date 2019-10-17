  <template>
    <el-dialog class="inviteMembers" title="邀请成员" :visible.sync="visible.show">
        <!-- <header class="header">
            邀请成员
        </header> -->
        <section class="box clearfix">
            <div class="fl box-l">
                <el-row>
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle"><i style="color: #d00;">*</i> 接收人:</el-col>
                    <el-col :span="18"><el-input v-model="selector" placeholder="请输入内容" :readonly="true"></el-input></el-col>
                </el-row>
                <el-row style="margin-top:25px;">
                    <el-col :span="4" style="height:32px;line-height:32px;" align="middle"><i style="color: #d00;">*</i> 内&nbsp;&nbsp;&nbsp;容:</el-col>
                    <el-col :span="18"><el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content" resize="none"></el-input></el-col>
                </el-row>
            </div>
            <div class="fr box-r">
                <el-row>
                    <el-col :span="24"><el-input placeholder="输入关键字搜索" icon="search" v-model="search.name" :on-icon-click="getStudentList"></el-input></el-col>
                </el-row>
                <h6 class="title">本校学生</h6>
                <el-row>
                    <el-col :span="24">
                        <el-tree :data="data" show-checkbox node-key="name" :props="defaultProps" style="height:180px;overflow-y:auto;border:1px solid #c9c9c9;" :filter-node-method="filterNode" ref="tree" @check-change="selectData"></el-tree>
                    </el-col>
                </el-row>
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
import { requestBaseStudent } from '@/service/admin_base.js'
import { inviteMember } from '@/service/interest.js'
export default {
  name: 'inviteMembers', // 邀请成员
  props: ['visible'],
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
            data: [],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            selected: [],
            text: '',
            userId:''
        }
    },
    methods: {
        getStudentList() {
            requestBaseStudent(Object.assign({pageNum: 1, pageSize: 9999}, this.search)).then(res => {
                this.data = res.data.entity.resultData
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        selectData(){
            let arr = []
            let arr1 = []
            let data = this.$refs.tree.getCheckedNodes(true)
            for(let i=0; i<data.length;i++) {
                arr.push(data[i].name)
                arr1.push(data[i].userId)
            }
            this.selector = arr.join('、')
            this.selected = arr1
        },
        send (){
            let loc = location.href.split('#')[0];
            this.text = this.content;
            inviteMember({
                sendId: this.userId,
                content: this.text,
                receiveIds: this.selected,
                busId:this.$route.query.id,
                messageType:4
            }).then(res => {
                if(res.data.code === 200){
                    this.$message({
                        message: '已发送邀请',
                        type: 'success'
                    })
                    this.visible.show = false;
                    this.content = '';
                    this.selector = '';
                    this.selected = [];
                    this.$refs.tree.setCheckedKeys([]);
                }else{
                    this.showMessage('error',res.data.msg)
                }
            })
        }
    },
    mounted() {
        if (baseInfo) {
            let key = localStorage.getItem('userIdentity')
            this.$set(this.$data.search, 'schoolId', baseInfo[key].schoolId);
            this.getStudentList();
        };
        if(localStorage.getItem('loginInfo')){
            this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id
        };
    }
}
</script>
<style lang='scss'>
.inviteMembers {
    .el-dialog {
        min-width: 956px;
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
}
</style>
<style lang='scss' scoped>
@import './../../asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .buttonGroup {
            .reply_btn1 {
                background-color: $color-value;
            }
            .reply_btn2 {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover {
                    color: #fff;
                    background-color: $color-value;
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
            &:hover{
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            margin-top: 2px;
            margin-right: 10px;
        }
    }
}
</style>
