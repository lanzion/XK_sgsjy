<template>
    <div class="back-stage__container">
        <div class="table-layout">
            <!-- 安全设置 -->
            <section class="backend-content__middle table-cell menu-cell menu-tree">
                <div class="menu-title">安全设置</div>
                <ul class="nav-list">
                    <router-link tag="li" class="nav-item" v-for="(item, index) in nav" :key="index" :to="item.path">{{ item.name }}</router-link>
                </ul>
            </section>
            <!-- 导航详情 -->
            <div class="menu-content table-cell menu-cell">
                <router-view class="backend-content__middle"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safeSetting',
        data() {
            return {
                nav: [
                    {
                        name: '修改密码',
                        path: '/setting/password'
                    }, {
                        name: '绑定手机',
                        path: '/setting/mobile/bind'
                    }, {
                        name: '绑定邮箱',
                        path: '/setting/email/bind'
                    }
                ],
                phone: this.$ls.get('loginInfo').userInfo.phone,
                email: this.$ls.get('loginInfo').userInfo.email,
            }
        },
        mounted(){
            this.changeNav()
        },
        methods: {
            changeNav() {
                if (this.phone) {
                    this.$set(this.nav, 1, {
                        name: '修改手机',
                        path: '/setting/mobile/modify'
                    })
                }
                if (this.email) {
                    this.$set(this.nav, 2, {
                        name: '修改邮箱',
                        path: '/setting/email/modify'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .back-stage__container {
        min-width: 930px;
        margin: 0 16px;

        .nav-list {
            padding-top: 10px;
            .nav-item {
                padding: 14px 0;
                font-size: 14px;
                text-align: center;
                cursor: pointer;

                &:hover,
                &.is-active {
                    background-color: #2797ed;
                    color: #fff;
                }
            }
        }
    }
</style>