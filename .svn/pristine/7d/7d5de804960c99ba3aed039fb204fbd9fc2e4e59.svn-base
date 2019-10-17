const host = `${location.protocol}//${location.host}`
// const host = 'http://192.168.2.150:9090'

const exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
let domain = location.hostname
domain = domain.match(exp) || domain === 'localhost' ? domain : '.xk100.com'

module.exports = {
    httpConfig: {
        baseURL: host,
        path: '/kxsz/',
        domain: domain
        // domain: '.xk100.com'
    },
    // fileBaseUrl: 'http://192.168.2.93:8888/',
    fileBaseUrl: `${host}/`,
    fileUpload: 'maker/fst/getInfo',
    fileDownLoad: 'file/nfile/download?fileId=',
    editorImgUpload: `${host}/file/auth/uploadSingle`,
    // fileDownLoad: 'http://192.168.2.47/file/download?fileId=',
    pages: {
        index: `${host}/#/`,
        login: `${host}/#/login`,
        admin: `${host}/admin/#/`,
        my: `${host}/personalAdmin/#/`,
    }
}
// module.exports = {
//     httpConfig: {
//         baseURL: 'http://localhost',
//         path: '/ckApi/'
//     },
//     // fileBaseUrl: 'http://192.168.2.93:8888/',
//     fileBaseUrl: `http://localhost/`,
//     fileUpload: 'maker/fst/getInfo',
//     fileDownLoad: 'file/nfile/download?fileId=',
//     editorImgUpload: `http://localhost/file/auth/uploadSingle`,
//     // fileDownLoad: 'http://192.168.2.47/file/download?fileId=',
//     pages: {
//         index: `http://localhost/#/`,
//         admin: `http://localhost/admin/index.html#/`,
//         space: `http://localhost/space/index.html#/`,
//         my: `http://localhost/space/index.html#/admin`
//     }
// }
