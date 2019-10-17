
// http://192.168.2.79:8089/file/authnw/fileUpload
import xhr from 'axios'

const fileUploadAddress = location.protocol + '//' + location.host
// const fileUploadAddress = 'http://192.168.2.44'
// const fileUploadAddress = 'http://192.168.2.83:8089'

// 上传前MD5校验
const checkFile = (options = {}) => xhr.post(fileUploadAddress + '/file/auth/checkFileMd5', options)
const checkFileNw = (options = {}) => xhr.post(fileUploadAddress + '/file/authnw/checkFileMd5', options)

// 上传
const wordUpload = (options = {}) => xhr.post(fileUploadAddress + '/file/auth/fileUpload', options)

export {
    checkFileNw,
    checkFile,
    wordUpload
}
