<template>
    <div>
        <v-avatar-option :img="cover" :close="close" :save="setCover" @changeAvatar="changeCover"></v-avatar-option>
    </div>
</template>

<script>
    import { modifyUserFace } from '@/service/user.js'
    import { loginInfo } from 'Asset/js/getUserInfo.js'
    import avatarOption from '@/components/avatarOption/avatarOption.vue'

    export default {
        name: 'myAvatar',
        components: {
            'v-avatar-option': avatarOption
        },
        data() {
            return {
                cover: loginInfo.userInfo.face
            }
        },
        watch: {
            params: {
                handler: function () {
                    this.getData()
                },
                deep: true
            }
        },
        methods: {
            // 子组件传递改变头像
            changeCover(img) {
                this.cover = img
            },
            /*
             * 设置头像
             * face: 头像图片
             */
            setCover() {
                if (this.cover) {
                    modifyUserFace({ face: this.cover }).then((response) => {
                        if (response.data.code === 200) {
                            loginInfo.userInfo.face = this.cover
                            localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                            this.$message({ message: '修改成功', type: 'success' })
                        }
                    })
                }
            },
            close() {
                this.$router.go(-1)
            }
        }
    }
</script>
