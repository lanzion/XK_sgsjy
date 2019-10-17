
const chunkSize = 5 * 1024 * 1024
const urlPrefix = 'authnw'

WebUploader.Uploader.register({
    'before-send-file': 'beforeSendFile',
    'before-send': 'beforeSend'
}, {
    beforeSendFile: function (file) {
        console.log('beforeSendFile')
        // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
        const task = new $.Deferred()
        // 根据文件内容来查询MD5
        uploader.md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {   // 及时显示进度
            console.log('计算md5进度:', percentage)
            getProgressBar(file, percentage, 'MD5', 'MD5')
        }).then(function (val) { // 完成
            console.log('md5 result:', val)
            file.md5 = val
            // 模拟用户id
            // file.uid = new Date().getTime() + '_' + Math.random() * 100
            file.uid = WebUploader.Base.guid()
            console.log(file)
            console.log(file.name)
            // 进行md5判断
            $.post(urlPrefix + '/checkFileMd5', { uid: file.uid, md5: file.md5, name: file.name },
                    function (data) {
                        console.log(data.status)
                        const status = data.status.value
                        task.resolve()
                        if (status == 101) {
                            // 文件不存在，那就正常流程
                        } else if (status == 100) {
                            // 忽略上传过程，直接标识上传成功；
                            uploader.skipFile(file)
                            file.pass = true
                            if (data) {
                                const json = JSON.stringify(data)
                                window.localStorage.setItem('mc_' + val, json)
                            }
                        } else if (status == 102) {
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
                    }).error(function (data) {
                        if (data) {
                            file.statusText = data.message
                        }
                        task.reject()
                    })
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
                if (blockChunk == missChunks[i]) {
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

// 实例化
export const uploader = WebUploader.create({
    pick: {
        id: '#picker',
        innerHTML: '点击选择文件',
        multiple: true
    },
    formData: {
        uid: 0,
        md5: '',
        chunkSize: chunkSize  // 5 * 1024 * 1024
    },
    // dnd: '#dndArea',
    // paste: '#uploader',
    swf: '../../static/js/Uploader.swf',
    chunked: true,
    chunkSize: chunkSize, // 字节 1M分块
    threads: 10000,
    timeout: 0,
    server: urlPrefix + '/fileUpload',
    auto: false,

    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
    disableGlobalDnd: true,
    fileNumLimit: 1024,
    fileSizeLimit: 10 * 1024 * 1024 * 1024,    // 6g
    fileSingleSizeLimit: 2 * 1024 * 1024 * 1024    // 2g
})
/**
 *  生成进度条封装方法
 * @param file 文件
 * @param percentage 进度值
 * @param id_Prefix id前缀
 * @param titleName 标题名
 */
function getProgressBar(file, percentage, idPrefix, titleName) {
    const lii = $('#' + file.id)
    const percent = lii.find('#' + idPrefix + '-progress-bar')
    // 避免重复创建
    if (!percent.length) {
        // $percent = $('<div id = '' + id_Prefix + '-progress' class = 'progress progress-striped active'>' +
        //         '<div id = '' + id_Prefix + '-progress-bar' class = 'progress-bar' role = 'progressbar' style = 'width: 0%'>' +
        //         '</div>' +
        //         '</div>'
        // ).appendTo($li).find('#' + id_Prefix + '-progress-bar')
    }
    const progressPercentage = percentage * 100 + '%'
    percent.css('width', progressPercentage)
    percent.html(titleName + ':' + progressPercentage)
}

// 当有文件被添加进队列的时候
// uploader.on('fileQueued', function (file) {
//     console.log('fileQueued');
//     $thelist.append('<div id='' + file.id + '' class='item'>' +
//             '<h4 class='info'>' + file.name + '</h4>' +
//             '<p class='state'>等待上传...</p>' +
//             '</div>');
// });

// 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
uploader.onUploadBeforeSend = function (obj, data) {
    console.log('onUploadBeforeSend')
    const file = obj.file
    data.md5 = file.md5 || ''
    data.uid = file.uid
}
// 上传中
uploader.on('uploadProgress', function (file, percentage) {
    getProgressBar(file, percentage, 'FILE', '上传进度')
})
// 上传返回结果
uploader.on('uploadSuccess', function (file, response) {
    console.log(response)
    if (file.pass && !response) {
        const data = window.localStorage.getItem('mc_' + file.md5)
        if (!data) {
            $('#' + file.id).find('p.state').text('秒传失效,请重新上传')
            return
        }
        response = JSON.parse(data)
        window.localStorage.removeItem(file.md5)
    }
    if (response) {
        const status = response.status
        const text = response.status.reasonPhrase
        $('#' + file.id).find('p.state').text(text)
        if (status && (status.value == '200' || status.value == '100')) { // 整个上传成功
            const filePath = response.data.storeFilePath
            // var fileNode = $('<a href=''+filePath+'' rel='ex'>'+file.name+'</a>')
            const fileNode = ''
            fileNode.attr('target', '_blank')
            $('#' + file.id).find('p.state').after(fileNode)
        } else { // 单片上传成功或失败
        }
    }
})
uploader.on('uploadError', function (file) {
    let text = '上传出错'
    if (file.statusText) {
        text = file.statusText
    }
    $('#' + file.id).find('p.state').text(text)
})
uploader.on('uploadComplete', function (file) {
    // 隐藏进度条
    // fadeOutProgress(file, 'MD5')
    // fadeOutProgress(file, 'FILE')
})
// 文件上传
// $btn.on('click', function () {
//     console.log('上传...')
//     uploader.upload()
//     console.log('上传成功')
// })

/**
 * 隐藏进度条
 * @param file 文件对象
 * @param id_Prefix id前缀
 */
// function fadeOutProgress(file, id_Prefix) {
//     $('#' + file.id).find('#' + id_Prefix + '-progress').fadeOut()
// }
