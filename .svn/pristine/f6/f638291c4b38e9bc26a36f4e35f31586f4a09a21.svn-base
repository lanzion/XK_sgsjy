const apiHost = `${location.protocol}//${location.host}`
const host = process.env.NODE_ENV === 'production' ? `${location.protocol}//${location.host}` : `${location.protocol}//192.168.2.47`
// const host = `${location.protocol}//${location.host}`

let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
let domain = location.hostname
domain = domain.match(exp) || domain === 'localhost' ? domain : '.xk100.com'

module.exports = {
    httpConfig: {
        baseURL: apiHost,
        path: '/kxsz/',
        // domain: '.xk100.com'
        domain: domain
    },
    // fileBaseUrl: 'http://192.168.2.93:8888/',
    fileBaseUrl: `${apiHost}/`,
    fileUpload: 'maker/fst/getInfo',
    fileDownLoad: 'file/nfile/download?fileId=',
    editorImgUpload: `${apiHost}/file/auth/uploadSingle`,
    // fileDownLoad: 'http://192.168.2.47/file/download?fileId=',
    /*
     * type: 1 (列表 -> 详情)
     *       2 (详情 -> 列表)
     *       3 (更多/相关 -> 详情)
     *       4 (公共[头部/尾部] -> )
     *       5 (-> 个人空间)
     *       6 (顶部面包屑 -> )
     */
    pages: {
        index: {
            url: `${host}/#/`,
            type: 4
        },
        admin: {
            url: `${host}/admin/#/`,
            type: 4
        },
        my: {
            url: `${host}/personalAdmin/#/`,
            type: 5
        },
        findPwd: {
            url: `${host}/#/findPwd`,
            type: 4
        },
        register: {
            url: `${host}/#/register`,
            type: 4
        },
        login: {
            url: `${host}/#/login`,
            type: 4
        },
        detail: {
            resource: {
                url: `${host}/detail/#/resource`,
                path: '/resource',
                type: 1
            },
            activity: {
                url: `${host}/detail/#/street/activity`,
                type: 1
            },
            contest: {
                url: `${host}/match/#/contest/detail`,
                type: 1
            },
            contestReview: {
                url: `${host}/match/#/contest/review/pending`,
                type: 1
            },
            works: {
                url: `${host}/detail/#/street/work`,
                path: '/work',
                type: 1
            },
            story: {
                url: `${host}/detail/#/street/story/info`,
                path: '/story',
                type: 1
            },
            service: {
                url: `${host}/detail/#/street/lagou/detail/1/instruction`,
                path: '/lagou/1',
                type: 1
            },
            demand: {
                url: `${host}/detail/#/street/lagou/detail/2/instruction`,
                path: '/lagou/2',
                type: 1
            },
            course: {
                url: `${host}/detail/#/education/course`,
                path: '/education/course',
                type: 1
            },
            project: {
                url: `${host}/detail/#/education/project`,
                path: '/education/project',
                type: 1
            },
            train: {
                url: `${host}/detail/#/education/train`,
                path: '/education/train',
                type: 1
            },
            teacher: {
                url: `${host}/detail/#/space/teacher`,
                path: '/space/teacher',
                type: 5
            },
            student: {
                url: `${host}/detail/#/space/student`,
                path: '/space/student',
                type: 5
            },
            edu: {
                url: `${host}/detail/#/space/edu`,
                path: '/space/edu',
                type: 5
            },
            school: {
                url: `${host}/detail/#/space/school`,
                path: '/space/school',
                type: 5
            },
            clasz: {
                url: `${host}/detail/#/space/clasz`,
                path: '/space/clasz',
                type: 5
            },
            interest: {
                url: `${host}/detail/#/space/interest`,
                path: '/space/interest',
                type: 5
            },
            studio: {
                url: `${host}/detail/#/space/studio`,
                type: 5
            },
            model: {
                url: `${host}/detail/#/space/model`,
                type: 5
            },
            studioMicroClass: {
                url: `${host}/detail/#/space/studio/microClass`,
                type: 1
            }
        },
        list: {
            activity: {
                url: `#/activity/event`,
                type: 2
            },
            contest: {
                url: `#/activity/contest`,
                type: 2
            },
            works: {
                url: `#/work/list`,
                type: 2
            },
            project: {
                url: `#/education/project`,
                type: 2
            },
            course: {
                url: `#/education/course`,
                type: 2
            },
            train: {
                url: `#/education/train`,
                type: 2
            },
            teacher: {
                url: `#/space/teacher`,
                type: 2
            },
            student: {
                url: `#/space/student`,
                type: 2
            },
            edu: {
                url: `#/space/edu`,
                type: 2
            },
            school: {
                url: `#/space/school`,
                type: 2
            },
            clasz: {
                url: `#/space/clasz`,
                type: 2
            },
            interest: {
                url: `#/space/interest`,
                type: 2
            },
            studio: {
                url: `#/space/studio`,
                type: 2
            },
            model: {
                url: `#/space/model`,
                type: 2
            },
            search: {
                url: `${host}#/search`,
                type: 4
            }
        }
    }
}
