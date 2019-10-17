// const isProduction = process.env.NODE_ENV === 'production'
const host = `${location.protocol}//${location.host}`
module.exports = {
	httpConfig: {
		baseURL: host,
		path: '/kxsz/'
	},
    fileBaseUrl: `${host}/`,
	// fileBaseUrl: isProduction && `${host}/` || 'http://192.168.2.93:8888/',
    fileUpload: 'maker/fst/getInfo',
    fileDownLoad: 'file/nfile/download?fileId=',
    editorImgUpload: `${host}/file/auth/uploadSingle`,
    pages: {
        index: `${host}/#/`,
        admin: `${host}/admin/index.html#/`,
        login: `${host}/#/login`,
        register: `${host}/#/register`,
        project: `${host}/space/`,
        activity: `${host}/space/`,
        interest: `${host}/space/`,
        course: `${host}/space/`,
        studio: `${host}/space/`,
        findPwd: {
            url: `${host}/#/findPwd`,
            type: 4
        },
    }
}