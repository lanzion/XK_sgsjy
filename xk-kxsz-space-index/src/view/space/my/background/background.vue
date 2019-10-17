<template>
    <section id="bgcPopup" :class="{bgc_w:isTeaStuAdmin}">
        <h2 class="title" v-if="!isTeaStuAdmin">背景设置</h2>
        <v-tabs :tabs="tabs" v-else></v-tabs>
        <div :class="{'backend-content__middle':isTeaStuAdmin}">
            <el-upload :show-file-list="false" action :before-upload="UploadFile">
                <button class="upload-btn" type="button"> 选择照片 </button>
                <span slot="tip" class="upload-tip">大小不能超过{{ imgStandardFileSize }}M, 仅支持:gif、jpg、png</span>
            </el-upload>
            <img class="preview" :src="getFileUrl(background)" v-if="background">
            <img class="preview" :src="bgc" v-else="background">
            <div class="button-group">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </div>
        </div>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { modifyAvatar, deleteAvatar } from '@/service/admin_base.js'
import tabs from 'Common/classificationList/classification/tabs.vue'
import bgc from 'res/images/info.png'
import { mapState, mapActions } from 'Vuex'

export default {
    name: 'bgcPopup',
    mixins: [uploadFileSize],
    data() {
        return {
            background: this.$ls.get('loginInfo').userInfo.space.background || null,
            bgc: bgc,
            isTeaStuAdmin: false,
            tabs: [
                { name: '背景设置', type: ''}
            ],
        }
    },
    components: {
        'v-tabs': tabs,
    },
    mounted() {
        this.isTeaStuAdmin = this.$route.fullPath === "/admin/background"
    },
    methods: {
        ...mapActions({
            'setBackGround': 'spaceBackground/setBackGround'
        }),
        UploadFile (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                  _this = this
            if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            _this.background = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
            } else {
                if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.background = null
                    uploader.cancelFile(file)
            }
        },
        save () {
            let param = {
                background: this.background,
                cover: null
            }
            if(this.$ls.get('baseInfo')[this.$ls.get('userIdentity')]) {
                param.orgId = this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].id
            }else {
                param.orgId = this.$ls.get('baseInfo').baseInfo.id
            }
            modifyAvatar(param).then(res => {
                if (res.data.code == 200) {
                    this.setBackGround(this.background)
                    let _loginInfo = this.$ls.get('loginInfo')
                    _loginInfo.userInfo.space.background = this.background
                    this.$ls.set('loginInfo', _loginInfo)
                    this.$message({
                        message: '设置成功',
                        type: 'success'
                    });
                }else {
                    this.$message({message: res.data.msg})
                }
            })
        },
        reset() {
            let param = {
                background: '',
                cover: null
            }
            if(this.$ls.get('baseInfo')[this.$ls.get('userIdentity')]) {
                param.orgId = this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].id
            }else {
                param.orgId = this.$ls.get('baseInfo').baseInfo.id
            }
            deleteAvatar(param).then(res => {
                if (res.data.code == 200) {
                    this.setBackGround(null)
                    let _loginInfo = this.$ls.get('loginInfo')
                    _loginInfo.userInfo.space.background = ''
                    this.background = ''
                    this.$ls.set('loginInfo', _loginInfo)
                    this.$message({
                        message: '设置成功',
                        type: 'success'
                    });
                }else {
                    this.$message({message: res.data.msg})
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .upload-btn, .btn2 {
            border: 1px solid $color-value;
            color: $color-value;
        }
        .prompting {
            color: $color-value;
        }
    }
}
#bgcPopup {
    font-size: 14px;
    .title {
        margin-bottom: 20px;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
    }
    .upload-tip {
        color: #999;
    }
    .preview {
        margin-top: 30px;
        height: 360px;
        width: 100%;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
    }
    .prompting {
        padding: 10px 0;
        box-sizing: border-box;
        font-size: 12px;
    }
    .button-group {
        margin-top: 15px;
    }
}
</style>