<template>
    <div :class="theme">
        <v-header :module="module"></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
        <side-bar></side-bar>
        <keep-alive>
            <el-dialog v-model="isLogin" :show-close="false" :close-on-press-escape="false" class="login-modal">
                <v-login></v-login>
            </el-dialog>
        </keep-alive>
    </div>
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import { mapState } from 'Vuex'
import checkLoginTimeout from '@/js/checkLoginTimeout.js'
import { initProConfig, requestNavList } from '@/service/common.js'
import head from '@/components/common/head.vue'
import footer from '@/components/common/footer.vue'
import login from '@/components/common/login.vue'
import sideBar from '@/components/sideTools/sideTools.vue'
import logo_education from '@/asset/img/common/logo_education.svg'
import logo_model from '@/asset/img/common/logo_model.svg'
import logo_space from '@/asset/img/common/logo_space.svg'
import logo_street from '@/asset/img/common/logo_street.svg'
import logo_studio from '@/asset/img/common/logo_studio.svg'
export default {
    name: 'app',
    data() {
        return {
            theme: '',
            module: {},
            model: '',
            isSearch: true,
            scrolled: false
        }
    },
    computed: mapState ({
        isLogin: state => state.login.isShow
    }),
    components: {
        'v-header': head,
        'v-footer': footer,
        'v-login': login,
        sideBar
    },
    created() {
        checkLoginTimeout()
    },
    mounted() {
        // this.$store.commit('saveLoginInfo', loginInfo)
        this.initPro();
        this.setModule();
        this.reqNavList();
    },
    ls: {
      baseInfo: {
        type: Object,
        default: null
      },
      loginInfo: {
        type: Object,
        default: null
      },
      permission: {
        type: Object,
        default: null
      },
      curEvaluatingItem: {
        type: Object,
        default: null
      },
    },
    watch:{
        '$route': 'setModule'
    },
    methods: {
        setModule() {
            let path = this.$route.path;
            let item = path.match(/\/\w*/g)[0]
            switch (item) {
                case '/':
                case '/space':
                case '/educationBureau':
                case '/educationBureauSpace':
                case '/school':
                case '/schoolSpace':
                case '/clasz':
                case '/claszSpace':
                case '/claszManage':
                case '/teacher':
                case '/teacherSpace':
                case '/student':
                case '/studentSpace':
                case '/interests':
                case '/interestsSpace':
                case '/articleDetail':
                case '/interestManage':
                case '/enterprise':
                case '/investor':
                case '/investOrg':
                case '/multSpace':
                case '/admin':
                    this.theme = 'theme-lightBlue'
                    this.module = {
                        pic: logo_space,
                        homepage: '/space',
                        // title: '活动空间'
                    }
                    break;
                case '/project':
                case '/education':
                    this.theme = 'theme-lightBlue'
                    this.module = {
                        pic: logo_education,
                        homepage: '/education',
                        // title: '活动培训'
                    }
                    break;
                case '/street':
                    this.theme = 'theme-lightBlue'
                    this.module = {
                        pic: logo_street,
                        homepage: '/street',
                        // title: '活动街区'
                    }
                    break;
                case '/studioMember':
                case '/studioManage':
                case '/studioMemberDetail':
                    this.theme = 'theme-lightBlue'
                    this.module = {
                        pic: logo_studio,
                        homepage: '/studioMember',
                        // title: '导师工作室'
                    }
                    break;
                case '/model':
                    this.theme = 'theme-lightBlue'
                    this.module = {
                        pic: logo_model,
                        homepage: '/model',
                        // title: '创客示范校'
                    }
                    break;
                default:
                    this.theme = 'theme-lightBlue';
                    this.module = {
                        pic: '',
                        homepage: '/'
                    }
                    this.isSearch = false;
                    break;
            }
        },
        initPro() {
            initProConfig().then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.appendInfo || {},
                        initType = Number(_data.initType) === 4 ? 0 : _data.initType
                    this.$ls.set('XK-MAKER__REGIONLEVEL', initType)
                }
            })
        },
        reqNavList() {
            requestNavList().then(response => {
                if (response.data.code == 200) {
                    this.$ls.set('XK-MAKER__NAV', JSON.stringify(response.data.appendInfo.list) || [])
                }
            })
        }
    }
}

</script>

<style lang='scss'>
.login-modal.el-dialog__wrapper {
    .el-dialog {
        width: 400px;
        height: 336px;
        padding: 0 10px;
        border: 0;
    }
    .el-dialog__header {
        background-color: #fff;
        border: 0;
    }
}
</style>

<style lang="scss" scoped>
    .hidden{
        display: none;
    }
</style>
