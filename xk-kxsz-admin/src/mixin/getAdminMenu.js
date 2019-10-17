import { adminPermission } from 'Asset/js/getUserInfo.js'
export const subPermission = {
    data () {
        return {
            router: null,           // tab的根路径
            headTabs: [],           // 三级列表
            typeHeadBtnGroup: [],   // 分类表头按钮
            typeListBtnGroup: [],   // 分类列表按钮
            headBtnGroup: [],       // 表头按钮
            listBtnGroup: [],       // 表格内按钮
            switchBtnGroup: []      // 单元格内开关按钮
        }
    },
    computed: {
        operateWidth: function() {
            const fontSize = 14     // 表格内字体大小
            const margin = 17       // 操作项间距(含边框)
            const cellPadding = 38  // 表格内左右填充(含边框)
            const minCellWidth = fontSize * 2 + cellPadding
            let result = 0
            this.listBtnGroup.forEach(x => {
                result += x.name.length * fontSize
            })
            this.listBtnGroup.length && (result += (this.listBtnGroup.length - 1) * margin + cellPadding)
            return result > minCellWidth ? result : minCellWidth
        }
    },
    created() {
        if (!this.setTabs) {
            this.getCurPermission()
        }
    },
    methods: {
        getCurPermission(len) {
            let indexs = localStorage.getItem('BACK-STAGE__INDEX').split(',');
            if (len !== undefined) {
                indexs.length = len
            }
            let _adminPermission = adminPermission.children;
            indexs.forEach((x, i) => {
                if (i == indexs.length - 1) {
                    this.router = _adminPermission[x].url
                };
                _adminPermission = _adminPermission[x].children || []
            })
            this.headTabs = _adminPermission.filter(x => x.permissType=='1')
            this.headBtnGroup = _adminPermission.filter(x => x.permissType=='2' || x.permissType=='3' || x.permissType=='2-1' || x.permissType=='3-1')
            this.listBtnGroup = _adminPermission.filter(x => x.permissType=='2' || x.permissType=='3' || x.permissType=='2-2' || x.permissType=='3-2' || x.permissType=='5')
            this.typeHeadBtnGroup = _adminPermission.filter(x => x.permissType=='4' || x.permissType=='4-1')
            this.typeListBtnGroup = _adminPermission.filter(x => x.permissType=='4' || x.permissType=='4-2')
            this.switchBtnGroup = _adminPermission.filter(x => x.permissType=='6')
            console.log(this.router)
            console.log(this.headTabs)
            console.log(this.typeHeadBtnGroup)
            console.log(this.typeListBtnGroup)
            console.log(this.headBtnGroup)
            console.log(this.listBtnGroup)
            console.log(this.switchBtnGroup)
        }
    }
}
