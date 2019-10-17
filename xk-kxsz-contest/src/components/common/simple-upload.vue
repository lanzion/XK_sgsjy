<template>
    <div id="global-uploader">
        <!-- 上传 -->
        <uploader
            ref="uploader"
            :options="options"
            :autoStart="true"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-progress="onFileProgress"
            @file-error="onFileError"
            @files-submitted="onFileSubmit"
            class="uploader-app">
            <uploader-unsupport></uploader-unsupport>

            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

            <uploader-list v-show="panelShow">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <el-button
                                @click="fileListShow"
                                type="text"
                                :title="collapse ? '展开':'折叠' ">
                                <i
                                    class="iconfont"
                                    :class="collapse ? 'el-icon-arrow-down': 'el-icon-arrow-up'"
                                ></i>
                            </el-button>
                            <el-button @click="close" type="text" title="关闭">
                                <i class="el-icon-circle-close"></i>
                            </el-button>
                        </div>
                    </div>

                    <ul class="file-list">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file
                                :class="'file_' + file.id"
                                ref="files"
                                :file="file"
                                :list="true"
                            ></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length">
                            <i class="el-icon-warning-outline"></i> 暂无待上传文件
                        </div>
                    </ul>
                </div>
            </uploader-list>
        </uploader>
    </div>
</template>

<script>
    import SparkMD5 from 'spark-md5'
    import generateUUID from '@/assets/js/uuid'
    import Bus from '@/assets/js/bus'
    import { checkFile, wordUpload } from '@/service/upload'
    // import $ from 'jquery'
    import uuidv1 from 'uuid/v1'
    import { ACCEPT_CONFIG } from '@/assets/js/uploadType'
    // const fileUploadAddress = location.protocol + '//' + location.host
    const fileUploadAddress = 'http://192.168.2.44'


    export default {
        data() {
            return {
                options: {
                    target: fileUploadAddress + '/file/auth/fileUpload',
                    chunkSize: 20 * 1024 * 1024, // 每个分片的大小
                    fileParameterName: 'upfile', // 上传文件时文件的参数名
                    testChunks: true,     // 是否开启秒传
                    maxChunkRetries: 0, // 最大自动失败重试上传次数
                    checkChunkUploadedByResponse: function (chunk, message) {
                        const objMessage = JSON.parse(message)

                        if (objMessage.status.value === 201) {
                            // return true
                        }
                        return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
                    },
                    // headers: {
                    //     Authorization: Ticket.get() && 'Bearer ' + Ticket.get().access_token
                    // },
                    query() {
                    }
                },
                attrs: {
                    // accept: ACCEPT_CONFIG.getAll()
                    accept: ['.zip', '.doc', '.tgz', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff', '.png', '.jpg', '.jpeg', '.gif', '.bmp']
                },
                panelShow: false,   // 选择文件后，展示上传panel
                collapse: false,
                // minSize: 1
            }
        },
        created() {
        },
        mounted() {
            Bus.$on('openUploader', (query) => {
                this.params = query || {}
                if (this.$refs.uploadBtn) {
                    $('#global-uploader-btn').click()
                }
            })
        },
        computed: {
            // Uploader实例
            uploader() {
                return this.$refs.uploader.uploader
            }
        },
        methods: {
            onFileAdded(file) {
                this.panelShow = true
                // if (file.size / (5 * 1024 * 1024) > 1) {
                //     this.minSize = file.size / (5 * 1024 * 1024)
                // }
                this.computeMD5(file)
            },
            // 文件进度的回调
            onFileProgress(rootFile, file, chunk) {
                // console.log('上传文件资料：', file)
                // console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
            },
            onFileSuccess(rootFile, file, response, chunk) {
                const res = JSON.parse(response)
                console.log('onFileSuccess成功111', res)
                console.log('rootFile成功222', rootFile)
                console.log('file成功333', file)
                console.log('chunk成功444', chunk)
                if (res.status.value === 201) {
                    this.$message({ message: '上传成功', type: 'success' })
                    return
                }

            // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
                if (!res.result) {
                    const msg = res.message + '错误错误'
                    // this.$message({ message: msg, type: 'error' })
                    return
                }
                // 如果服务端返回需要合并
                // if (res.needMerge) {
                //     api.mergeSimpleUpload({
                //         tempName: res.tempName,
                //         fileName: file.name,
                //         ...this.params,
                //     }).then((res) => {
                //         // 文件合并成功
                //         Bus.$emit('fileSuccess')
                //     }).catch((e) => {})
                // // 不需要合并
                // } else {
                //     Bus.$emit('fileSuccess')
                //     console.log('上传成功')
                // }
            },
            onFileError(rootFile, file, response, chunk) {
                const msg = response + 'onFileError错误'
                this.$message({
                    message: msg,
                    type: 'error'
                })
            },
            // 选择的文件们添加到上传队列后触发
            onFileSubmit(files, fileList) {
                // console.log('选择文件files--', files)
                // console.log('选择文件fileList---', fileList)
            },
            /**
             * 计算md5，实现断点续传及秒传
             * @param file
             */
            computeMD5(file) {
                const fileReader = new FileReader()
                const time = new Date().getTime()
                let md5 = ''
                console.log('readAsArrayBuffer1', file)
                file.pause()
                fileReader.readAsArrayBuffer(file.file)
                console.log('fileMd5---+++')

                fileReader.onload = ((e) => {
                    if (file.size !== e.target.result.byteLength) {
                        console.log('文件读取失败')
                        this.error('Browser reported success but could not read the file until the end.')
                        return
                    }
                    // md5 = SparkMD5.ArrayBuffer.hash(e.target.result)
                    md5 = SparkMD5.ArrayBuffer.hash(e.target.result, false)
                    file.uid = generateUUID()
                    console.log('添加额外的参数', file)
                // 添加额外的参数
                    this.uploader.opts.query = {
                        // ...this.params
                        uid: file.uid,
                        id: file.id, // 任务ID
                        // md5: md5,
                        // chunk: 1, // 当前第几块
                        // chunks: 3, // 总分片数
                        // name: file.name, // 文件名
                        // size: file.size, // 文件大小
                        // file: file.file, // 分片对象
                    }

                    console.log(`MD5计算完毕：${file.id} ${file.name} MD5：${md5} 用时：${new Date().getTime() - time} ms`)
                    file.uniqueIdentifier = md5
                    console.log('90----', file)
                    file.resume() // 开始/继续文件上传
                    if (md5) {
                        checkFile({ uid: file.uid, md5: file.uniqueIdentifier, name: file.name }).then((res) => {
                            console.log('resMD5校验回掉--', res)
                            if (res.status === 200) {
                                const status = res.data.status
                                if (status === 100) {
                                    console.log('标记秒传')
                                    this.$message({ message: '该文件已经上传成功过了，不能再上传了哦。', type: 'success' })
                                    // 新增
                                    // file.cancel()
                                    // 忽略上传过程，直接标识上传成功；

                                    // 标记秒传，直接忽略后面所有分块到成功事件
                                } else if (status === 102) {
                                    console.log('断点s上传')
                                    // 部分已经上传到服务器了，但是差几个模块。
                                    // 断点还没传的分块标志

                                    // file.resume()
                                } else if (status === 101) {
                                    // this.isUploadedZip = false
                                    // file.resume()
                                }
                            }
                        })
                    }
                })
                fileReader.onerror = function () {
                    this.error('FileReader onerror was triggered, maybe the browser aborted due to high memory usage.')
                    return false
                }
            },
            fileListShow() {
                const $list = $('#global-uploader .file-list')
                if ($list.is(':visible')) {
                    $list.slideUp()
                    this.collapse = true
                } else {
                    $list.slideDown()
                    this.collapse = false
                }
            },
            close() {
                this.uploader.cancel()
                this.panelShow = false
            },
            error(msg) {
                this.$notify({
                    title: this.$t('c.false'),
                    message: msg,
                    type: 'error',
                    duration: 2000
                })
            }
        },
        watch: {},
        destroyed() {
            Bus.$off('openUploader')
        },
        components: {}
    }
</script>

<style scoped lang="scss">
#global-uploader {
    margin-top: 10px;
    // .uploader-app {
    //     width: 520px;
    // }
    .file-panel {
        // background-color: #fff;
        border: 1px solid #e2e2e2;
        // border-radius: 7px 7px 0 0;
        // box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        .file-title {
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            border-bottom: 1px solid #ddd;
            .operate {
                flex: 1;
                text-align: right;
            }
        }
        .file-list {
            position: relative;
            height: 240px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;
            > li {
                background-color: #fff;
            }
        }
        &.collapse {
            .file-title {
                background-color: #e7ecf2;
            }
        }
    }
    .no-file {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
    }
    /deep/.uploader-file-icon {
        &:before {
            content: "" !important;
        }
        &[icon="image"] {
            background: url(../../assets/img/common/info.png);
            background-color: #000;
        }
        &[icon="video"] {
            // background: url(./images/video-icon.png);
            background-color: aqua;
        }
        &[icon="document"] {
            // background: url(./images/text-icon.png);
            background-color: red;
        }
    }
    /deep/.uploader-file-actions > span {
        margin-right: 6px;
    }
}
/* 隐藏上传按钮 */
#global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
</style>
