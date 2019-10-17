<template>
    <div class="demo">
        <div id="uploader">
            <div class="queueList">
                <div id="dndArea" class="placeholder">
                    <div id="filePicker"></div>
                    <!-- <p>支持截图复制进来上传</p> -->
                </div>
            </div>
            <div class="statusBar" style="display:none;">
                <div class="progress">
                    <span class="text">0%</span>
                    <span class="percentage"></span>
                </div>
                <div class="info"></div>
                <div class="btns" v-if="!auto">
                    <div id="filePicker2"></div>
                    <div class="uploadBtn">开始上传</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WebUploader from 'webuploader'
// import WebUploader from 'webuploader'
const okImg = require('Asset/img/common/ok.png')
const imgUrl = require('Asset/img/common/del.png')

// const fileUploadAddress = location.protocol + '//' + location.host
const fileUploadAddress = 'http://192.168.2.44'
const chunkSize = 5 * 1024 * 1024
export default {
    data() {
        return {
            // 上传地址
            uploadUrl: fileUploadAddress + '/file/auth/fileUpload',
            $wrap: null,
            $queue: null,
            // 状态栏，包括进度和控制按钮
            $statusBar: null,
            // 文件总体选择信息。
            $info: null,
            // 上传按钮
            $upload: null,
            // 没选择文件之前的内容。
            $placeHolder: null,
            $progress: null,
            // 添加的文件数量
            fileCount: 0,
            // 添加的文件总大小
            fileSize: 0,
            // 优化retina, 在retina下这个值是2
            ratio: null,
            // 缩略图大小
            thumbnailWidth: null,
            thumbnailHeight: null,
            // 可能有pedding, ready, uploading, confirm, done.
            state: 'pedding',
            percentages: {},
            // 判断浏览器是否支持图片的base64
            isSupportBase64: null,
            // 检测是否已经安装flash，检测flash的版本
            flashVersion: null,
            supportTransition: null,
            uploader: null,
            fileList: null,
            fileData: {
                refId: null,
                projectId: null
            },
            arrList: []
        }
    },
    mounted() {
        this.init()
        this.initWebUploader()
        this.fileData.refId = this.refId
        this.fileData.projectId = this.projectId
        this.clearFileList()
        this.getFileList()
    },
    props: {
        projectId: String,
        systemTime: Number,
        refId: String,
        auto: {
            type: Boolean,
            default: false
        },
        duplicate: {
            type: Boolean,
            default: false
        },
        selectedList: Array,
        btnType: String
    },
    methods: {
        init() {
            this.$wrap = $('#uploader')
            // 图片容器
            this.$queue = $('<ul class="filelist"></ul>').appendTo(
                this.$wrap.find('.queueList')
            )
            // 状态栏，包括进度和控制按钮
            this.$statusBar = this.$wrap.find('.statusBar')
            // 文件总体选择信息。
            this.$info = this.$statusBar.find('.info')
            // 上传按钮
            this.$upload = this.$wrap.find('.uploadBtn')
            // 没选择文件之前的内容。
            this.$placeHolder = this.$wrap.find('.placeholder')
            this.$progress = this.$statusBar.find('.progress').hide()
            // 添加的文件数量
            this.fileCount = 0
            // 添加的文件总大小
            this.fileSize = 0
            // 优化retina, 在retina下这个值是2
            this.ratio = window.devicePixelRatio || 1
            // 缩略图大小
            this.thumbnailWidth = 110 * this.ratio
            this.thumbnailHeight = 110 * this.ratio
            // 可能有pedding, ready, uploading, confirm, done.
            this.state = 'pedding'
            // 所有文件的进度信息，key为file id
            this.percentages = {}
            // // 判断浏览器是否支持图片的base64
            this.isSupportBase64 = (function () {
                const data = new Image()
                let support = true
                data.onload = data.onerror = function () {
                    if (this.width !== 1 || this.height !== 1) {
                        support = false
                    }
                }
                data.src =
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
                return support
            }())
            // 检测是否已经安装flash，检测flash的版本
            this.flashVersion = (function () {
                let version

                try {
                    version = navigator.plugins['Shockwave Flash']
                    version = version.description
                } catch (ex) {
                    try {
                        // eslint-disable-next-line no-undef
                        version = new ActiveXObject(
                            'ShockwaveFlash.ShockwaveFlash'
                        ).Getconstiable('$version')
                    } catch (ex2) {
                        version = '0.0'
                    }
                }
                version = version.match(/\d+/g)
                return parseFloat(version[0] + '.' + version[1], 10)
            }())
            this.supportTransition = (function () {
                let s = document.createElement('p').style
                const r =
                        'transition' in s ||
                        'WebkitTransition' in s ||
                        'MozTransition' in s ||
                        'msTransition' in s ||
                        'OTransition' in s
                s = null
                return r
            }())
        },
        // 初始化webuploader
        initWebUploader() {
            const that = this
            if (
                !WebUploader.Uploader.support('flash') &&
                WebUploader.browser.ie
            ) {
                // flash 安装了但是版本过低。
                if (that.flashVersion) {
                    (function (container) {
                        window.expressinstallcallback = function (state) {
                            switch (state) {
                                case 'Download.Cancelled':
                                    console.log('您取消了更新！')
                                    break

                                case 'Download.Failed':
                                    console.log('安装失败')
                                    break

                                default:
                                    console.log('安装已成功，请刷新！')
                                    break
                            }
                            delete window.expressinstallcallback
                        }

                        const swf = './expressInstall.swf'
                        // insert flash object
                        let html =
                            '<object type="application/' +
                            'x-shockwave-flash" data="' +
                            swf +
                            '" '

                        if (WebUploader.browser.ie) {
                            html +=
                                'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
                        }

                        html +=
                            'width="100%" height="100%" style="outline:0">' +
                            '<param name="movie" value="' +
                            swf +
                            '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>'

                        container.html(html)
                    }(that.$wrap))

                    // 压根就没有安转。
                } else {
                    // that.$wrap.html(
                    //     '<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>'
                    // )
                }

                return
            } else if (!WebUploader.Uploader.support()) {
                console.log('Web Uploader 不支持您的浏览器！')
                return
            }

            // HOOK 这个必须要再uploader实例化前面
            WebUploader.Uploader.register({
                'before-send-file': 'beforeSendFile',
                'before-send': 'beforeSend'
            }, {
                beforeSendFile: function (file) {
                    // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
                    const task = new $.Deferred()
                    const formData = that.uploader.options.formData
                    // 根据文件内容来查询MD5
                    that.uploader.md5File(file).then(function (val) {
                        // 完成
                        // eslint-disable-next-line radix
                        file.md5 = val + parseInt((Math.random() * 1000000))
                        // 模拟用户id
                        // file.uid = new Date().getTime() + "_" + Math.random() * 100;
                        file.uid = WebUploader.Base.guid()
                        formData.uid = file.uid
                        formData.md5 = file.md5
                        console.log('00000000查询MD5', file.uid)
                        // 进行md5判断
                        // /file/auth/checkFileMd5原有的接口
                        // $.post((fileUploadAddress + '/file/auth/checkFileMd5'), { uid: file.uid, md5: file.md5 },
                        $.post((fileUploadAddress + '/file/auth/checkFileMd5'), { uid: file.uid, md5: file.md5, name: file.name },
                                function (data) {
                                    const status = data.status.value
                                    task.resolve()
                                    if (status === 101) {
                                        // 文件不存在，那就正常流程
                                    } else if (status === 100) {
                                        // 忽略上传过程，直接标识上传成功；
                                        that.uploader.skipFile(file)
                                        file.pass = true
                                    } else if (status === 102) {
                                        // 部分已经上传到服务器了，但是差几个模块。
                                        file.missChunks = data.data
                                    }
                                })
                    })
                    return $.when(task)
                },
                beforeSend: function (block) {
                    const task = new $.Deferred()
                    const file = block.file
                    const missChunks = file.missChunks // 丢失分块
                    const blockChunk = block.chunk // 当前分块
                    if (missChunks !== null && missChunks !== undefined && missChunks !== '') {
                        let flag = true
                        for (let i = 0; i < missChunks.length; i++) {
                            if (blockChunk === missChunks[i]) {
                                // console.log(file.name + ":" + blockChunk + ":还没上传，现在上传去吧。");
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

            // 实例化
            that.uploader = WebUploader.create({
                pick: {
                    id: '#filePicker',
                    label: '+'
                },
                formData: {
                    uid: 0,
                    md5: '',
                    chunkSize: chunkSize,
                    companyCode: 'companyCo'
                },
                accept: {
                    extensions: 'png,jpeg,jpg,gif'
                },
                dnd: '#dndArea',
                paste: '#uploader',
                swf: 'Static/js/Uploader.swf',
                chunked: false, // 是否要分片处理大文件上传
                // chunkSize: 512 * 1024,
                server: fileUploadAddress + '/file/auth/fileUpload',
                chunkSize: chunkSize, // 字节 1M分块
                threads: 10000,  // 允许同时最大上传进程数
                timeout: 0,
                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                // fileNumLimit: 5,
                fileSizeLimit: 25 * 1024 * 1024, // 25 M
                fileSingleSizeLimit: 5 * 1024 * 1024, // 5 M
                auto: this.auto,
                duplicate: this.duplicate
            })

            // 拖拽时不接受 js, txt 文件。
            that.uploader.on('dndAccept', function (items) {
                let denied = false
                const len = items.length
                let i = 0
                // 修改js类型
                const unAllowed = 'text/plain;application/javascript '
                for (; i < len; i++) {
                    // 如果在列表里面
                    // eslint-disable-next-line no-bitwise
                    if (~unAllowed.indexOf(items[i].type)) {
                        denied = true
                        break
                    }
                }
                return !denied
            })

            // 文件发送前
            that.uploader.on('uploadBeforeSend', function (file, data) {
                data.refId = that.refId
                data.projectId = that.projectId
            })

            // 进度条
            that.uploader.on('uploadProgress', function (file, percentage) {
                const $li = $('#' + file.id)
                const $percent = $li.find('.progress span')
                   // 避免重复创建
                // if(!$percent.length) {
                //     $percent = $('<p class="progress"><span></span></p>')
                //             .appendTo( $li )
                //             .find('span')
                // }
                $percent.text('进度：' + percentage * 100 + '%')
                $percent.css('width', percentage * 100 + '%')
                that.percentages[file.id][1] = percentage
                that.updateTotalProgress()
            })

            // 当文件被加入队列以后触发
            that.uploader.on('fileQueued', (file) => {
                that.fileCount++
                that.fileSize += file.size

                if (that.fileCount === 1) {
                    that.$placeHolder.addClass('element-invisible')
                    that.$statusBar.show()
                }
                if (that.fileCount === 5) {
                    $('#dndArea').addClass('btnHide')
                }

                that.addFile(file)
                // that.setState('ready')
                that.setState('confirm')
                that.updateTotalProgress()
            })

            uploader.onUploadBeforeSend = function (obj, data) {
                // console.log("onUploadBeforeSend");
                const file = obj.file
                data.md5 = file.md5 || ''
                data.uid = file.uid
            }

            // 上传返回结果
            that.uploader.on('uploadSuccess', function (file, response) {
                if (file.pass && !response) {
                    const data = window.localStorage.getItem('mc_' + file.md5)
                    if (!data) {
                        $('#' + file.id).find('p.state').text('秒传失效,请重新上传')
                        return
                    }
                    // response = JSON.parse(data)
                    window.localStorage.removeItem(file.md5)
                }
                if (response) {
                    const status = response.status
                }

                const resdata = {
                    followServer: response.appendInfo.followServer,
                    resourceId: response.appendInfo.resourceId,
                    name: file.name,
                    size: file.size,
                    uid: file.uid,
                    urls: response.appendInfo.followServer + '/' + response.appendInfo.resourceId
                }
                that.arrList.push(resdata)
                that.$emit('uploadSuccess', that.arrList)
                window.parent.postMessage(resdata, '*')
            })

            // 当文件被移除队列后触发
            that.uploader.on('fileDequeued', (file) => {
                that.fileCount--
                that.fileSize -= file.size

                if (!that.fileCount) {
                    that.setState('pedding')
                }
                if (that.fileCount < 5) {
                    $('#dndArea').removeClass('btnHide')
                }

                that.removeFile(file)
                that.updateTotalProgress()
            })
            // 文件上传完成后触发
            that.uploader.on('uploadFinished', function (type) {
                that.setState('confirm')
            })
            // 文件开始上传时触发
            that.uploader.on('startUpload', function (type) {
                that.setState('uploading')
            })
            // 文件暂停上传时触发
            that.uploader.on('stopUpload', function (type) {
                that.setState('paused')
            })
            // 文件上传出错后触发
            that.uploader.on('error', function (code) {
                console.log('出错啦出错啦！', code)
                let errMsg
                switch (code) {
                    case 'F_EXCEED_SIZE':
                        errMsg = '文件大小超出范围'
                        break

                    case 'Q_TYPE_DENIED':
                        errMsg = '请上传支持格式的图片'
                        break

                    case 'interrupt':
                        errMsg = '上传暂停'
                        break

                    default:
                        errMsg = '上传失败，请重试'
                        break
                }
                that.$message({
                    message: errMsg,
                    type: 'error'
                })
            })

            // 手动上传
            that.$upload.on('click', function () {
                if ($(that).hasClass('disabled')) {
                    return false
                }
                if (that.state === 'ready') {
                    that.uploader.upload()
                } else if (that.state === 'paused') {
                    that.uploader.upload()
                } else if (that.state === 'uploading') {
                    that.uploader.stop()
                }
            })
            that.$info.on('click', '.retry', function () {
                that.uploader.retry()
            })

            that.$info.on('click', '.ignore', function () {
                console.log('todo')
            })
            that.$upload.addClass('state-' + that.state)
            that.updateTotalProgress()
        },
        addFile(file) {
            const that = this
            const $li = $(
                '<li id="' + file.id + '">' +
                    // '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>' +
                    '<p class="progress"><span></span></p>' +
                    '</li>'
            )
            const $btns = $(
                // '<div class="file-panel">' +
                '<div class="file-panel">' +
                    // '<span class="cancel">删除</span>' +
                    '<img src="' + imgUrl + '" alt="删除" class="delImg"/>' +
                '</div>'
            ).appendTo($li)

            // 删除按钮
            const $prgress = $li.find('p.progress span')
            const $wrap = $li.find('p.imgWrap')
            const $info = $('<p class="error"></p>')
            const showError = function (code) {
                let text = ''
                switch (code) {
                    case 'F_EXCEED_SIZE':
                        text = '文件大小超出'
                        break
                    case 'interrupt':
                        text = '上传暂停'
                        break
                    default:
                        text = '上传失败，请重试'
                        break
                }
                $info.text(text).appendTo($li)
            }

            // 文件不合格
            if (file.getStatus() === 'invalid') {
                showError(file.statusText)
            } else {
                // @todo lazyload
                $wrap.text('预览中')
                that.uploader.makeThumb(file,
                    function (error, src) {
                        let img
                        if (error) {
                            $wrap.text('不能预览')
                            return
                        }
                        // 判断浏览器是否支持图片的base64
                        if (that.isSupportBase64) {
                            img = $('<img src="' + src + '" class="imgType">')
                            $wrap.empty().append(img)
                        } else {
                            // 预览操作，根据实际情况
                            $.ajax('../preview.action', {
                                method: 'POST',
                                data: src,
                                dataType: 'json'
                            }).done(function (response) {
                                if (response.result) {
                                    img = $(
                                        '<img src="' + response.result + '">'
                                    )
                                    $wrap.empty().append(img)
                                } else {
                                    $wrap.text('预览出错')
                                }
                            })
                        }
                    },
                    that.thumbnailWidth,
                    that.thumbnailHeight
                )

                that.percentages[file.id] = [file.size, 0]
                file.rotation = 0
            }

            // 文件状态变化
            file.on('statuschange', function (cur, prev) {
                if (prev === 'progress') {
                    $prgress.hide().width(0)
                } else if (prev === 'queued') {
                    // $li.off('mouseenter mouseleave')
                    // $btns.remove()
                }
                // 成功
                if (cur === 'error' || cur === 'invalid') {
                    showError(file.statusText)
                    that.percentages[file.id][1] = 1
                } else if (cur === 'interrupt') {
                    showError('interrupt')
                } else if (cur === 'queued') {
                    that.percentages[file.id][1] = 0
                } else if (cur === 'progress') {
                    $info.remove()
                    // $prgress.css('display', 'block')
                    $prgress.css('display', 'none') // 隐藏
                } else if (cur === 'complete') {
                    $li.append('<span class="success"></span>')
                    $('<div class="triangle"><img src="' + okImg + '" alt="成功" class="okImg"/></div>').appendTo($li)
                }

                $li.removeClass('state-' + prev).addClass('state-' + cur)
            })

            $li.on('mouseenter', function () {
                // $btns.stop().animate({ height: 30 })
                $btns.addClass('btnShow')
            })

            $li.on('mouseleave', function () {
                // $btns.stop().animate({ height: 0 })
                $btns.removeClass('btnShow')
            })

            // $li.on('click', function () {
            //     window.open(file.source.src)
            // })

            $btns.on('click', 'img', function () {
                const index = $(this).index()
                let deg

                switch (index) {
                    case 0:
                        that.uploader.removeFile(file)
                        return

                    case 1:
                        file.rotation += 90
                        break

                    case 2:
                        file.rotation -= 90
                        break
                }

                if (this.supportTransition) {
                    deg = 'rotate(' + file.rotation + 'deg)'
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        transform: deg
                    })
                } else {
                    $wrap.css(
                        'filter',
                        'progid:DXImageTransform.Microsoft.BasicImage(rotation=' +
                            // eslint-disable-next-line no-bitwise
                            (~~(((file.rotation / 90) % 4) + 4) % 4) +
                            ')'
                    )
                }
            })
            $li.appendTo(this.$queue)
        },
        removeFile(file) {
            // const that = this
            const $li = $('#' + file.id)
            delete this.percentages[file.id]
            this.arrList.splice($li.index(), 1)
            this.$emit('removeFile', this.arrList)
            this.updateTotalProgress()
            $li.off()
                .find('.file-panel')
                .off()
                .end()
                .remove()
            if (file.source.id === undefined) {
                return
            }
            // 删除远程文件
            // eslint-disable-next-line no-undef
            fileRemove(file.source.id).then((response) => {
                if (response.data.success) {
                    this.$message({
                        message: '删除附件成功',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            })
        },
        updateTotalProgress() {
            const that = this
            let loaded = 0
            let total = 0
            const spans = this.$progress.children()
            // let percent

            $.each(that.percentages, function (k, v) {
                total += v[0]
                loaded += v[0] * v[1]
            })

            const percent = total ? loaded / total : 0

            spans.eq(0).text(Math.round(percent * 100) + '%')
            spans.eq(1).css('width', Math.round(percent * 100) + '%')
        },
        setState(val) {
            const that = this
            let stats

            if (val === that.state) {
                return
            }

            that.$upload.removeClass('state-' + that.state)
            that.$upload.addClass('state-' + val)
            that.state = val
            switch (that.state) {
                case 'pedding':
                    that.$placeHolder.removeClass('element-invisible')
                    that.$queue.show()
                    that.$statusBar.addClass('element-invisible')
                    that.uploader.refresh()
                    break

                case 'ready':
                    that.$placeHolder.addClass('element-invisible')
                    $('#filePicker2').removeClass('element-invisible')
                    that.$queue.show()
                    that.$statusBar.removeClass('element-invisible')
                    that.uploader.refresh()
                    break

                case 'uploading':
                    $('#filePicker2').addClass('element-invisible')
                    that.$progress.show()
                    that.$upload.text('暂停上传')
                    break

                case 'paused':
                    that.$progress.show()
                    that.$upload.text('继续上传')
                    break

                case 'confirm':
                    that.$progress.hide()
                    $('#filePicker2').removeClass('element-invisible')
                    that.$upload.text('开始上传')

                    stats = that.uploader.getStats()
                    if (stats.successNum && !stats.uploadFailNum) {
                        that.setState('finish')
                        return
                    }
                    break
                case 'finish':
                    stats = that.uploader.getStats()
                    if (stats.successNum) {
                        console.log('上传成功finish')
                    } else {
                        // 没有成功的图片，重设
                        that.state = 'done'
                        location.reload()
                    }
                    break
            }
        },
        // 清空文件列表
        clearFileList() {
            this.$info.empty()
            this.$queue.empty()
            this.fileCount = 0
            this.fileSize = 0
        },
        // 获取已上传的文件列表
        getFileList() {
            this.fileList = []
            if (
                this.fileData.projectId !== undefined &&
                this.fileData.refId !== undefined
            ) {
                // eslint-disable-next-line no-undef
                getFileList(this.fileData).then((response) => {
                    this.fileList = this.formatUrl(response.data)
                })
            }
        },
        // 将已上传的文件加载到组件列表中
        formatUrl(files) {
            // this.$emit('uploadSuccess', files)
            for (let i = 0; i < files.length; i++) {
                const item = files[i]
                files[i].url = process.env.BASE_API + files[i].url
                const obj = {}
                obj.name = files[i].name
                obj.size = files[i].size
                obj.lastModifiedDate = item.createTime
                obj.id = files[i].Id
                obj.src = files[i].url
                obj.ext = item.fileType.substr(1)

                const file = new WebUploader.File(obj)
                // 此处是关键，将文件状态改为'已上传完成'
                file.setStatus('complete')
                this.addFile(file)
            }
            return files
        }
    },
    watch: {
        systemTime() {
            this.fileData.refId = this.refId
            this.fileData.projectId = this.projectId
            this.clearFileList()
            this.getFileList()
        },
        selectedList(data) {
            // console.log('啦啦啦啦啦`````', data)
            const that = this
            this.$queue.empty()
            if (data.length === 5) {
                $('#dndArea').addClass('btnHide')
            } else {
                $('#dndArea').removeClass('btnHide')
            }
            for (let i = 0; i < data.length; i++) {
                if (i < 5) {
                    data[i].id = 'WU_FILE_' + i
                    data[i].status = 'complete'
                    const $li = $(
                    '<li id="' + data[i].uid + '" class="state-complete">' +
                        // '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>' +
                        '<p class="progress"><span></span></p>' +
                        '</li>'
                    )
                    const $btns = $(
                        // '<div class="file-panel">' +
                        '<div class="file-panel">' +
                            // '<span class="cancel">删除</span>' +
                            '<img src="' + imgUrl + '" alt="删除" class="delImg"/>' +
                        '</div>'
                    ).appendTo($li)

                    const $prgress = $li.find('p.progress span')
                    const $wrap = $li.find('p.imgWrap')
                    const img = $('<img src="' + data[i].urls + '" class="imgType">')
                    $wrap.empty().append(img)
                    $('<div class="triangle"><img src="' + okImg + '" alt="成功" class="okImg"/></div>').appendTo($li)
                    $li.appendTo(this.$queue)
                    // 删除按钮
                    $btns.on('click', 'img', function () {
                        that.arrList.splice($li.index(), 1)
                        that.$emit('removeFile', that.arrList)
                        $li.remove()
                    })
                    $li.on('mouseenter', function () {
                        // $btns.stop().animate({ height: 30 })
                        $btns.addClass('btnShow')
                    })

                    $li.on('mouseleave', function () {
                        // $btns.stop().animate({ height: 0 })
                        $btns.removeClass('btnShow')
                    })
                }
            }
            this.arrList = data
            // this.addFile(e)
        }
    }
}
</script>
<style lang='scss' scoped>
#filePicker {
    width:148px;
    line-height:148px;
    border:1px dashed #92cdfa;
    background-color:#f5fafe;
    color:#8c939d;
    font-size:60px;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    .webuploader-pick {
        padding: 0;
    }
}

/deep/.queueList{
    overflow: hidden;
    padding-bottom: 15px;
    .filelist,
    .placeholder {
        height:148px;
        float: left;
    }
    .filelist {
        position: relative;
    }
    .placeholder {
        width: 148px;
    }
    .state-complete {
        width:148px;
        height: 100%;
        float: left;
        margin-left: 15px;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
    }

    .imgType,
    .imgWrap {
        width: 100%;
        height: 100%;
    }

    .file-panel {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        display: none;
        text-align: center;
        z-index: 9999;
    }

    .delImg {
        width: 28px;
        margin-top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .btnHide {
        display: none;
    }

    .btnShow {
        display: block;
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 30px solid #13ce66;
        border-left: 30px solid transparent;
        position: absolute;
        top: 0;
        right: 0;
        /* border-left:30px solid transparent;
        border-right:30px solid transparent;
        border-bottom:30px solid #fff; */
    }

    .okImg {
        width: 15px;
        position: absolute;
        bottom: 15px;
        right: 2px;
    }

    .state-complete .progress {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
