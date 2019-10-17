<script>
import UploadList from './upload-list'
import Upload from './upload'
import IframeUpload from './iframe-upload'
import { ElProgress } from 'element-ui'
import Migrating from '@element-ui/src/mixins/migrating'

function noop() {}

export default {
    name: 'xk-upload',

    mixins: [Migrating],

    components: {
        ElProgress,
        UploadList,
        Upload,
        IframeUpload
    },

    provide: {
        uploader: this
    },

    props: {
        action: {
            type: String,
            required: true
        },
        headers: {
            type: Object,
            default() {
                return {}
            }
        },
        data: Object,
        multiple: Boolean,
        name: {
            type: String,
            default: 'file'
        },
        drag: Boolean,
        dragger: Boolean,
        withCredentials: Boolean,
        showFileList: {
            type: Boolean,
            default: true
        },
        accept: String,
        type: {
            type: String,
            default: 'select'
        },
        beforeUpload: Function,
        onRemove: {
            type: Function,
            default: noop
        },
        onChange: {
            type: Function,
            default: noop
        },
        onPreview: {
            type: Function
        },
        onSuccess: {
            type: Function,
            default: noop
        },
        onProgress: {
            type: Function,
            default: noop
        },
        onError: {
            type: Function,
            default: noop
        },
        fileList: {
            type: Array,
            default() {
                return []
            }
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        listType: {
            type: String,
            default: 'text'   // text,picture,picture-card
        },
        httpRequest: Function,
        disabled: Boolean
    },

    data() {
        return {
            uploadFiles: [],
            dragOver: false,
            draging: false,
            tempIndex: 1,
            uploader: null
        }
    },

    watch: {
        fileList: {
            immediate: true,
            handler(fileList) {
                this.uploadFiles = fileList.map((item) => {
                    item.uid = item.uid || (Date.now() + this.tempIndex++)
                    item.id = item.uid
                    item.status = 'success'
                    return item
                })
            }
        }
    },

    created() {
        this.ininWebUploader()
    },

    beforeDestroy() {
        this.destroyWebUploader()
    },

    methods: {
        ininWebUploader() {
            const _this = this
            let fileMd5
            const chunkSize = 5 * 1024 * 1024 // 分片大小(5M)
            const fileUploadAddress = location.protocol + '//' + location.host
            WebUploader.Uploader.register({
                name: 'webUploader',
                'before-send': 'beforeSend',
                'before-send-file': 'beforeSendFile',
                'after-send-file': 'afterSendFile'
            }, {
                beforeSend: function (block) {
                    const deferred = WebUploader.Deferred()
                    _this.$http.post('/api/media/upload/checkchunk', {

                        // 文件唯一表示
                        fileMd5: fileMd5,
                        // 当前分块下标
                        chunk: block.chunk,
                        // 当前分块大小
                        chunkSize: block['end-block'].start
                    }).then((response) => {
                        if (response.data.fileExist) {
                            // 分块存在，跳过该分块
                            deferred.reject()
                        } else {
                            // 分块不存在或不完整，重新发送
                            deferred.resolve()
                        }
                    })
                    // 构建fileMd5参数，上传分块时带上fileMd5
                    this.owner.options.formData.fileMd5 = fileMd5
                    deferred.resolve()

                    return deferred.promise()
                },
                beforeSendFile: function (file) {
                    // 创建一个deffered, 用于通知是否完成操作
                    const deferred = WebUploader.Deferred()
                    // 计算文件的唯一标识，用于断点续传
                    _this.uploader.md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                        console.log('beforeSendFile -> progress', file, percentage)
                        $('#item1').find('p.state').text('正在读取文件信息...')
                    }).then(function (val) {
                        console.log('beforeSendFile -> success', file, val)
                        fileMd5 = val
                        $('#item1').find('p.state').text('成功获取文件信息...')
                        // 获取文件信息后进入下一步
                        deferred.resolve()
                    })
                    // 向服务端请求注册上传文件
                    _this.$http.post('/api/media/upload/register', {
                        // 文件唯一表示
                        fileMd5: fileMd5,
                        fileName: file.name,
                        fileSize: file.size,
                        mimetype: file.type,
                        fileExt: file.ext
                    }).then((response) => {
                        if (response.data.success) {
                            // alert('上传文件注册成功开始上传')
                            deferred.resolve()
                        } else {
                            alert(response.message)
                            deferred.reject()
                        }
                    })
                    return deferred.promise()
                },
                afterSendFile: function (file) {
                    // 合并分块
                    _this.$http.post('/api/media/upload/mergechunks', {
                        fileMd5: fileMd5,
                        fileName: file.name,
                        fileSize: file.size,
                        mimetype: file.type,
                        fileExt: file.ext
                    }).then((response) => {
                        // 在这里解析合并成功结果
                        if (response && response.success) {
                            alert('上传成功')
                        } else {
                            alert('上传失败')
                        }
                    })
                }
            })

            // 实例化
            this.uploader = WebUploader.create({
                formData: {
                    uid: 0,
                    md5: '',
                    chunkSize: chunkSize
                },
                swf: './Uploader.swf',
                chunked: true, // 是否分片
                chunkSize: chunkSize, // 分片大小（字节）
                threads: 3, // 同时上传3片
                server: fileUploadAddress + '/file/auth/fileUpload', // 上传地址
                auto: true, // 添加文件自动上传
                disableGlobalDnd: true, // 禁掉全局的拖拽功能
                duplicate: true
            })

            // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
            this.uploader.onUploadBeforeSend = function (obj, data) {
                const file = obj.file
                data.md5 = file.md5 || ''
                data.uid = file.uid
                data.id = file.uid
            }
        },

        destroyWebUploader() {
            WebUploader.Uploader.unRegister('webUploader')
        },

        handleStart(rawFile) {
            rawFile.uid = Date.now() + this.tempIndex++
            const file = {
                status: 'ready',
                name: rawFile.name,
                size: rawFile.size,
                percentage: 0,
                uid: rawFile.uid,
                raw: rawFile
            }

            try {
                file.url = URL.createObjectURL(rawFile)
            } catch (err) {
                console.error(err)
                return
            }

            this.uploadFiles.push(file)
            this.onChange(file, this.uploadFiles)
        },
        handleProgress(ev, rawFile) {
            const file = this.getFile(rawFile)
            this.onProgress(ev, file, this.uploadFiles)
            file.status = 'uploading'
            file.percentage = ev.percent || 0
        },
        handleSuccess(res, rawFile) {
            const file = this.getFile(rawFile)

            if (file) {
                file.status = 'success'
                file.response = res

                this.onSuccess(res, file, this.uploadFiles)
                this.onChange(file, this.uploadFiles)
            }
        },
        handleError(err, rawFile) {
            const file = this.getFile(rawFile)
            const fileList = this.uploadFiles

            file.status = 'fail'

            fileList.splice(fileList.indexOf(file), 1)

            this.onError(err, file, this.uploadFiles)
            this.onChange(file, this.uploadFiles)
        },
        handleRemove(file, raw) {
            if (raw) {
                file = this.getFile(raw)
            }
            this.abort(file)
            const fileList = this.uploadFiles
            fileList.splice(fileList.indexOf(file), 1)
            this.onRemove(file, fileList)
        },
        getFile(rawFile) {
            const fileList = this.uploadFiles
            let target
            fileList.every((item) => {
                target = rawFile.uid === item.uid ? item : null
                return !target
            })
            return target
        },
        abort(file) {
            this.$refs['upload-inner'].abort(file)
        },
        clearFiles() {
            this.uploadFiles = []
        },
        submit() {
            this.uploadFiles
        .filter(file => file.status === 'ready')
        .forEach((file) => {
            this.$refs['upload-inner'].upload(file.raw)
        })
        },
        getMigratingConfig() {
            return {
                props: {
                    'default-file-list': 'default-file-list is renamed to file-list.',
                    'show-upload-list': 'show-upload-list is renamed to show-file-list.',
                    'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
                }
            }
        }
    },

    render(h) {
        let uploadList

        if (this.showFileList) {
            uploadList = (
        <UploadList
          listType={this.listType}
          files={this.uploadFiles}
          on-remove={this.handleRemove}
          handlePreview={this.onPreview}>
        </UploadList>
      )
        }

        const uploadData = {
            props: {
                type: this.type,
                drag: this.drag,
                action: this.action,
                multiple: this.multiple,
                'before-upload': this.beforeUpload,
                'with-credentials': this.withCredentials,
                headers: this.headers,
                name: this.name,
                data: this.data,
                accept: this.accept,
                fileList: this.uploadFiles,
                autoUpload: this.autoUpload,
                listType: this.listType,
                disabled: this.disabled,
                'on-start': this.handleStart,
                'on-progress': this.handleProgress,
                'on-success': this.handleSuccess,
                'on-error': this.handleError,
                'on-preview': this.onPreview,
                'on-remove': this.handleRemove,
                'http-request': this.httpRequest
            },
            ref: 'upload-inner'
        }

        const trigger = this.$slots.trigger || this.$slots.default
        const uploadComponent = (typeof FormData !== 'undefined' || this.$isServer)
        ? <upload {...uploadData}>{trigger}</upload>
        : <iframeUpload {...uploadData}>{trigger}</iframeUpload>

        return (
      <div>
        { this.listType === 'picture-card' ? uploadList : ''}
        {
          this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent
        }
        {this.$slots.tip}
        { this.listType !== 'picture-card' ? uploadList : ''}
      </div>
        )
    }
}
</script>
