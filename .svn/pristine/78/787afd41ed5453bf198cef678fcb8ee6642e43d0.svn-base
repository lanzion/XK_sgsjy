import md5 from 'js-md5'
import fetch from './fetch'
// import SparkMD5 from 'spark-md5'
// import generateUUID from '@/assets/js/uuid'
import { checkFile, wordUpload } from '@/service/upload'

// 分片上传
/*
* 分片上传函数 支持多个文件
* @param options
* options.file 表示源文件
* options.pieceSize 表示需要分片的大小 默认是5m
* options.chunkUrl 分片上传的后端地址
* options.fileUrl 整个文件的上传地址
* progress 进度回调
* success 成功回调
* error 失败回调
*
*/
// eslint-disable-next-line import/prefer-default-export
export const uploadByPieces = ({ files, pieceSize = 5, progress, success, error }) => {
    if (!files || !files.length) return
  // 上传过程中用到的变量
    const fileList = [] // 总文件列表
    let progressNum = 1 // 进度
    const successAllCount = 0 // 上传成功的片数
  // let currentAllChunk = 0 // 当前上传的片数索引
    let AllChunk = 0 // 所有文件的chunk数之和
    const AllFileSize = 0 // 所有文件size

    const getChunkInfo = (file, currentChunk, chunkSize) => {
        const start = currentChunk * chunkSize
        const end = Math.min(file.size, start + chunkSize)
        const chunk = file.slice(start, end)
        return { start, end, chunk }
    }


    // 更新进度
    const progressFun = () => {
        progressNum = Math.ceil(successAllCount / AllChunk * 100)
        progress(progressNum)
    }
    // 对分片已经处理完毕的文件进行上传
    const uploadFile = (currentFile, chunkInfo) => {
        const reader = new FileReader()
        const file = currentFile.raw
        let imgUrlBase64 = ''
        // 将文件以Data URL形式读入页面
        imgUrlBase64 = reader.readAsDataURL(file)
        function dataURLtoBlob(dataurl) {
            const arr = dataurl.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }

            return new Blob([u8arr], { type: mime })
        }
        reader.onload = function (e) {
            // var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            // 执行上传操作
            const fetchForm = new FormData()
            fetchForm.append('name', currentFile.name)
            fetchForm.append('md5', currentFile.fileMD5)
            fetchForm.append('uid', currentFile.uid)
            fetchForm.append('size', currentFile.size)
            fetchForm.append('type', currentFile.raw.type)
            fetchForm.append('lastModifiedDate', currentFile.raw.lastModifiedDate)
            fetchForm.append('chunkSize', chunkInfo.chunk)
            fetchForm.append('file', dataURLtoBlob(reader.result))
            wordUpload(fetchForm).then((res) => {
                console.log('上传成功--', res)
                const { followServer, resourceId } = res.data.appendInfo
                success({
                    followServer: followServer,
                    resourceId: resourceId,
                    url: `${followServer}/${resourceId}`,
                })
            })
        }
    }

    const uploadChunk = async (currentFile, chunkInfo, fileIndex) => {
        const fetchForm = new FormData()
        fetchForm.append('name', currentFile.name)
        fetchForm.append('md5', chunkInfo.chunkMD5)
        fetchForm.append('uid', currentFile.uid)
        // fetchForm.append('chunks', chunkInfo.chunkCount)
        // fetchForm.append('chunk_index', chunkInfo.currentChunk)
        // fetchForm.append('chunk_md5', chunkInfo.chunkMD5)
        checkFile(fetchForm).then((res) => {
            if (res.status === 200) {
                const status = res.data.status
                if (status.value === 100) {
                    console.log('标记秒传')
                    this.$message({ message: '该文件已经上传成功过了，不能再上传了哦。', type: 'success' })
                    // 忽略上传过程，直接标识上传成功；
                } else if (status.value === 102) {
                    console.log('断点s上传')
                    // 部分已经上传到服务器了，但是差几个模块。
                    // 断点还没传的分块标志
                } else if (status.value === 101) {
                    uploadFile(currentFile, chunkInfo)
                    // this.isUploadedZip = false
                    // file.resume()
                }
            }
        })
    }

    // 针对每个文件进行chunk处理
    const readChunkMD5 = (fileLists) => {
        // eslint-disable-next-line array-callback-return
        fileLists.map((currentFile, fileIndex) => {
            const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
            const chunkCount = Math.ceil(currentFile.file.size / chunkSize) // 总片数
            AllChunk += chunkCount // 计算全局chunk数
            // let fileSize = currentFile.file.size // 文件大小
            // 针对单个文件进行chunk上传
            for (let i = 0; i < chunkCount; i++) {
                const { chunk } = getChunkInfo(currentFile.raw, i, chunkSize)
                const chunkFR = new FileReader()
                chunkFR.readAsBinaryString(chunk)
                chunkFR.addEventListener('load', (e) => {
                    const chunkBolb = e.target.result
                    const chunkMD5 = md5(chunkBolb)
                    // this.readingFile = false;
                    uploadChunk(currentFile, { chunkMD5, chunk, currentChunk: i, chunkCount }, fileIndex)
                }, false)
            }
        })
    }

    // 获取md5
    const readFileMD5 = (filesData) => {
        // 读取每个文件的md5
        // eslint-disable-next-line array-callback-return
        filesData.map((file, index) => {
            const chunkMD5 = md5(file.name)
            fileList.push({ md5: chunkMD5, name: file.name, file })
            // readChunkMD5(fileList)
            uploadChunk(file, { chunkMD5, chunk: 5 * 1024 * 1024, currentChunk: 1, chunkCount: 1 }, index)
        })
    }
    readFileMD5(files) // 开始执行代码
}
