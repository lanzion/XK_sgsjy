let uploader
initWebUpload()

function initWebUpload() {
    if (!WebUploader.Uploader.support()) {
        const error = "上传控件不支持您的浏览器！请尝试<a href='http://www.adobe.com/go/getflashplayer' target='_blank'>安装或升级flash版本</a>或者使用Chrome引擎的现代浏览器。"
        if (window.console) {
            window.console.log(error)
        }
        $('.top-tips').html(error).css('display', 'block')
        return
    }
    let chunkSize = 5 * 1024 * 1024,
        fileUploadAddress = location.protocol + '//' + location.host
        // fileUploadAddress = 'http://192.168.2.44/file/auth'
    // HOOK 这个必须要再uploader实例化前面
    WebUploader.Uploader.register({
        'before-send-file': 'beforeSendFile',
        'before-send': 'beforeSend'
    }, {
        beforeSendFile: function (file) {
            // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
            const task = new $.Deferred()
            // 根据文件内容来查询MD5
            uploader.md5File(file).then(function (val) {
                // 完成
                file.md5 = val + parseInt((Math.random() * 1000000))
                // 模拟用户id
                // file.uid = new Date().getTime() + "_" + Math.random() * 100;
                file.uid = WebUploader.Base.guid()
                // 进行md5判断
                $.post((fileUploadAddress + '/file/authnw/checkFileMd5?md5='+ file.md5 +'&name='+window.encodeURI(file.name)), { uid: file.uid, md5: file.md5 },
                    function (data) {
                        const status = data.status.value
                        task.resolve()
                        if (status == 101) {
                            // 文件不存在，那就正常流程
                        } else if (status == 100) {
                            // 忽略上传过程，直接标识上传成功；
                            uploader.skipFile(file)
                            file.pass = true
                        } else if (status == 102) {
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
    uploader = WebUploader.create({
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
        fileNumLimit: 1024,
        fileSizeLimit: 1024 * 1024 * 1024,
        fileSingleSizeLimit: 1024 * 1024 * 1024,
        duplicate: true,
    })

    // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
    uploader.onUploadBeforeSend = function (obj, data) {
        const file = obj.file
        data.md5 = file.md5 || ''
        data.uid = file.uid
    }
}
