<template>
    <div id="set_account" class="bgw ">
        <div>
            <v-tabs :tabs="tabs"></v-tabs>
        </div>
        <section class="set-account">
            <ul>
                <li class="clearfix">
                    <span class="type">密码设置</span>
                    <span>建议您定期更改密码以保护账号安全</span>
                    <router-link :to="{ path: '/admin/security/modifyPwd' }" class="fr">立即修改</router-link>
                </li>
                <!-- <li class="clearfix">
                    <span class="type">邮箱绑定</span>
                    <span v-if="email">已绑定邮箱 {{email}}</span>
                    <span v-else>您还没有绑定邮箱，建议绑定邮箱更安全</span>
                    <router-link :to="{ path: '/admin/security/modifyEmail' }" class="fr" v-if="email">修改绑定</router-link>
                    <router-link :to="{ path: '/admin/security/bindEmail' }" class="fr" v-else>立即绑定</router-link>
                </li>
                <li class="clearfix">
                    <span class="type">手机绑定</span>
                    <span v-if="phone">已绑定手机号 {{phone}}</span>
                    <span v-else>您还没有绑定手机，建议绑定手机更安全</span>
                    <router-link :to="{ path: '/admin/security/modifyMobile' }" class="fr" v-if="phone">修改绑定</router-link>
                    <router-link :to="{ path: '/admin/security/bindMobile' }" class="fr" v-else>立即绑定</router-link>
                </li> -->
            </ul>
        </section>
    </div>
</template>

<script>
    import tabs from 'Common/classificationList/classification/tabs.vue'

    export default {
        name: 'set_account',
        components: {
            'v-tabs': tabs,
        },
        data() {
            return {
                tabs: [
                    { name: '账号设置', type: '' }
                ],
                email: this.$ls.get('loginInfo').userInfo.email,
                phone: this.$ls.get('loginInfo').userInfo.phone
            }
        },
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    #set_account{
        width: 100%;
        min-height: 741px;
    }
    .set-account{
        padding:0px 18px 20px;
        ul{
            li{
                padding: 20px 0;
                border-bottom: 1px dashed #c9c9c9;
                line-height: 35px;
                span{
                    font-size: 14px;
                }
                .type{
                    color: #b3b3b3;
                    margin-right: 35px;
                }
                a{
                    padding: 0px 30px;
                    font-size: 14px;
                    color: $theme_color;
                    border:1px solid $theme_color;
                    border-radius: $button-radiu;
                    &:hover{
                        color: #fff;
                        background-color: $theme_color;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    #set_account{
        .tabs-bar-header{
            margin-bottom: 0px;
        }
    }
</style>
