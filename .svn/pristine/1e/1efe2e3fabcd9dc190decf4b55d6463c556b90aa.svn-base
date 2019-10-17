<template>
    <div id="uploader" class="wu-example">
    <!--用来存放文件信息-->
    <div id="thelist" class="uploader-list"></div>
    <div class="btns">
        <div id="picker">选择大文件0000</div>
        <div id="ctlBtn" class="webuploader-pick">开始上传</div>
    </div>
</div>
</template>

<script>
import WebUploader from 'webuploader'

export default {
    name: 'vue-upload',
    props: {
        accept: {
            type: Object,
            default: null,
        },
        // 上传地址
        url: {
            type: String,
            default: '',
        },
        // 上传最大数量 默认为100
        fileNumLimit: {
            type: Number,
            default: 10,
        },
        // 大小限制 默认2M
        fileSingleSizeLimit: {
            type: Number,
            default: 2048000,
        },
        // 上传时传给后端的参数，一般为token，key等
        formData: {
            type: Object,
            default: null
        },
        // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
        keyGenerator: {
            type: Function,
            default(file) {
                const currentTime = new Date().getTime()
                const key = `${currentTime}.${file.name}`
                return key
            },
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        // 上传按钮ID
        uploadButton: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            uploader: null,
            url_prefix: 'http://192.168.2.44',
            chunkSize: '5 * 1024 * 1024'
        }
    },
    mounted() {
        this.initWebUpload()
    },
    methods: {
        initWebUpload() {
            const that = this
                // HOOK 这个必须要再uploader实例化前面
            WebUploader.Uploader.register({
                'before-send-file': 'beforeSendFile', // 用文件整体MD5验证
                'before-send': 'beforeSend'  // 分片验证
            }, {
                beforeSendFile: function (file) {
                    // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
                    const task = new $.Deferred()
                    // 根据文件内容来查询MD5
                    that.uploader.md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {   // 及时显示进度
                        console.log('计算md5进度:', percentage)
                        // getProgressBar(file, percentage, 'MD5', 'MD5')
                    }).then(function (val) { // 完成
                        console.log('md5 result:', val)
                        file.md5 = val
                        // 模拟用户id
                        // file.uid = new Date().getTime() + "'" + Math.random() * 100
                        file.uid = WebUploader.Base.guid()

                        // 进行md5判断
                        $.post(that.url_prefix + '/file/authnw/checkFileMd5', { uid: file.uid, md5: file.md5, name: file.name },
                        function (data) {
                            // console.log(data.status)
                            const status = data.status.value
                            task.resolve()
                            if (status === 101) {
                                // 文件不存在，那就正常流程
                            } else if (status === 100) {
                                // 忽略上传过程，直接标识上传成功
                                console.log('已存在！！！', data)
                                that.uploader.skipFile(file)
                                file.pass = true

                                if (data) {
                                    const json = JSON.stringify(data)
                                    window.localStorage.setItem('mc_' + val, json)
                                }
                            } else if (status === 102) {
                                // 部分已经上传到服务器了，但是差几个模块。
                                let missCks = data.data
                                if (!missCks) {
                                    missCks = new Array(file.missChunks)
                                    for (let i = 0; i < file.chunks; i++) {
                                        missCks.push(i)
                                    }
                                }
                                file.missChunks = data.data
                            }
                        })
                        // .error(function (data) {
                        //     console.log('data------', data)
                        //     if (data && data.responseJSON) {
                        //         console.log(data.responseJSON.message)
                        //     }
                        //     task.reject()
                        // })
                    })
                    return $.when(task)
                },
                beforeSend: function (block) {
                    console.log('block')
                    const task = new $.Deferred()
                    const file = block.file
                    const missChunks = file.missChunks
                    const blockChunk = block.chunk
                    console.log(block)
                    console.log('当前分块：' + blockChunk)
                    console.log('missChunks:' + missChunks)
                    if (missChunks !== null && missChunks !== undefined && missChunks !== '') {
                        let flag = true
                        for (let i = 0; i < missChunks.length; i++) {
                            if (blockChunk === missChunks[i]) {
                                console.log(file.name + ':' + blockChunk + ':还没上传，现在上传去吧。')
                                flag = false
                                break
                            }
                        }
                        if (flag) {
                            task.reject()
                        } else {
                            task.resolve()
                        }
                    } else {
                        task.resolve()
                    }
                    return $.when(task)
                }
            })
            this.uploader = WebUploader.create({
                auto: false, // 选完文件后，是否自动上传
                swf: 'Static/js/Uploader.swf',  // swf文件路径
                chunkSize: that.chunkSize, // 字节 1M分块
                threads: 10000,
                timeout: 0,
                server: that.url_prefix + '/file/authnw/fileUpload',  // 文件接收服务端
                pick: {
                    id: '#picker',     // 选择文件的按钮
                    multiple: this.multiple,   // 是否多文件上传 默认false
                    label: '点点点',
                },
                accept: {
                    extensions: 'doc,docx,ppt,pptx,xls,xlsx,vsd,pot,pps,rtf,wps,et,dps,pdf,txt,epub,mp4,png,jpeg,jpg,gif,exe,avi,rar,zip'
                },  // 允许选择文件格式。
                fileNumLimit: this.fileNumLimit, // 限制上传个数
                // fileSingleSizeLimit: this.fileSingleSizeLimit, // 限制单个上传图片的大小
                formData: {
                    uid: 0,
                    md5: '',
                    chunkSize: this.chunkSize
                },  // 上传所需参数
                chunked: true,          // 分片上传
                duplicate: true,  // 重复上传

                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                fileSizeLimit: 20 * 1024 * 1024 * 1024,    // 20g
                fileSingleSizeLimit: 2 * 1024 * 1024 * 1024    // 2g
            })

            // 选择文件
            this.uploader.on('beforeFileQueued', function (file) {
                const ids = file.id
                const idLe = ids.length - 1
                const fileId = ids.substr(idLe, 1)
                console.log('选择文件12222222', fileId)

                // if (fileId >= 4) {
                //     $('.webuploader-container').addClass("itemHide")
                //     return
                // }
                // $thelist.append('<div id="' + file.id + '" class="item">' +
                //     '<h4 class="info fl">' + file.name + '</h4>' +
                //     '<p class="state fl">等待上传...</p>' + '<img src="./static/img/check.png" alt="上传成功" class="imgs"/>' +
                //     '</div>')
            })
            // 当有文件被添加进队列的时候，添加到页面预览
            this.uploader.on('fileQueued', (file) => {
                this.$emit('fileChange', file)
                $('#thelist').append('<div id="' + file.id + '" class="item">' +
                '<h4 class="info fl">' + file.name + '</h4>' +
                '<p class="state fl">等待上传...</p>' +
                '<i class="el-icon-success imgs"></i>' +
                // '<img src="./static/img/check.png" alt="上传成功" class="imgs"/>' +
                '</div>')
            })

            // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
            this.uploader.onUploadBeforeSend = function (obj, data) {
                // console.log("onUploadBeforeSend")
                const file = obj.file
                data.md5 = file.md5 || ''
                data.uid = file.uid
            }

            this.uploader.on('uploadStart', (file) => {
                // 在这里可以准备好formData的数据
                    // formData: {
                    //     uid: 0,
                    //     md5: '',
                    //     chunkSize: chunkSize
                    // },
                // this.uploader.options.formData.key = this.keyGenerator(file)
            })

            // 文件上传过程中创建进度条实时显示。
            this.uploader.on('uploadProgress', (file, percentage) => {
                this.$emit('progress', file, percentage)
                let name = ''
                if (percentage === 1) {
                    name = '上传成功'
                } else {
                    name = '上传进度'
                }
                // that.getProgressBar(file, percentage, 'FILE', name)
            })

            // this.uploader.on('uploadSuccess', (file, response) => {
            //     this.$emit('success', file, response)
            // })
                // 上传返回结果
            this.uploader.on('uploadSuccess', function (file, response) {
                if (file.pass && !response) {
                    const data = window.localStorage.getItem('mc_' + file.md5)
                    if (!data) {
                        $('#' + file.id).find('p.state').text('秒传失效,请重新上传')
                        return
                    }
                    const responsed = JSON.parse(data)
                    window.localStorage.removeItem(file.md5)
                }
                if (response) {
                    const status = response.status
                    // const text = response.status.reasonPhrase
                    const text = '啦啦啦啦'
                    $('#' + file.id).find('p.state').text(text)
                    // 链接
                    if (status && (status.value === '200' || status.value === '100')) { // 整个上传成功
                        const filePath = response.data.storeFilePath
                        const fileNode = $('<a href="' + filePath + '" rel="ex">' + file.name + '</a>')
                        fileNode.attr('target', '_blank')
                        // $('#' + file.id).find('p.state').after(fileNode)
                        // $('#' + file.id).find('p.state').text("上传成功")
                        $('#' + file.id).find('img.imgs').attr('class', 'imgShow')
                        that.fadeOutProgress(file, 'FILE')
                        // $thelist.append('<div id="' + file.id + '" class="item">' +
                        //     '<img src="./img/check.png" alt="上传成功" class="fl"/>' +
                        //     '</div>')
                    }
                }
                let resdata = {}
                resdata = {
                    file: {
                        name: file.name,
                        size: file.size
                    },
                    response: response
                }
                console.log(resdata)
                window.parent.postMessage(resdata, '*')
            })

            this.uploader.on('uploadError', (file, reason) => {
                console.log('c错了吗', reason)
                this.$emit('uploadError', file, reason)
                const text = '上传出错'
                $('#' + file.id).find('p.state').text(text)
            })

            this.uploader.on('error', (type) => {
                let errorMessage = ''
                if (type === 'F_EXCEED_SIZE') {
                    errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`
                } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                    errorMessage = '文件上传已达到最大上限数'
                } else {
                    errorMessage = `上传出错！请检查后重新上传！错误代码${type}`
                }

                console.log(errorMessage)
                this.$emit('error', errorMessage)
            })

            this.uploader.on('uploadComplete', (file, response) => {
                this.$emit('complete', file, response)
            })

                // 文件上传
            $('#ctlBtn').on('click', function () {
                that.uploader.upload()
                console.log('d点击上传')
            })
        },

                /**
         *  生成进度条封装方法
         * @param file 文件
         * @param percentage 进度值
         * @param id_Prefix id前缀
         * @param titleName 标题名
         */
        // getProgressBar(file, percentage, id_Prefix, titleName) {
        //     const $li = $('#' + file.id)
        //     const $percent = $li.find('#' + id_Prefix + '-progress-bar')
        //     console.log('file.id', file.id)
        //     // 避免重复创建
        //     if (!$percent.length) {
        //         const $percent = $('<div id="' + id_Prefix + '-progress" class="progress progress-striped active">' +
        //                 '<div id="' + id_Prefix + '-progress-bar" class="progress-bar" role="progressbar" style="width: 0%">' +
        //                 '</div>' +
        //                 '</div>'
        //         ).appendTo($li).find('#' + id_Prefix + '-progress-bar')
        //     }
        //     const progressPercentage = percentage * 100 + '%'
        //     $percent.css('width', progressPercentage)
        //     $percent.html(titleName + ':' + progressPercentage)
        // },

        upload(file) {
            this.uploader.upload(file)
        },
        stop(file) {
            this.uploader.stop(file)
        },
        // 取消并中断文件上传
        cancelFile(file) {
            this.uploader.cancelFile(file)
        },
        // 在队列中移除文件
        removeFile(file, bool) {
            this.uploader.removeFile(file, bool)
        },

        // getAccept(accept) {
        //     let title
        //     let exteensions
        //     let mimeTypes
        //     switch (accept) {
        //         case 'text':
        //             title = 'Texts',
        //             exteensions = 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
        //             mimeTypes = '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
        //             break

        //         case 'video':
        //             title = 'Videos',
        //             exteensions = 'mp4',
        //             mimeTypes = '.mp4'
        //             break

        //         case 'image':
        //            title ='Images',
        //             exteensions ='gif,jpg,jpeg,bmp,png',
        //             mimeTypes ='.gif,.jpg,.jpeg,.bmp,.png'
        //             break

        //         default:
        //             return accept
        //     }
        // },
    },
}
</script>
