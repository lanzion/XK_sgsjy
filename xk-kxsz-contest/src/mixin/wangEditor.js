import { editorImgUpload } from '@/assets/js/common-config.js'

export const editor = {
    data() {
        return {
            editor: null
        }
    },
    methods: {
        initEditor(param) {
            this.editor = new wangEditor('editor-trigger')
            //上传地址
            this.editor.config.uploadImgUrl = editorImgUpload
            // 通过file获取文件
            this.editor.config.uploadImgFileName = 'file'
            // 上传凭证，不需要
            this.editor.config.withCredentials = false
            // 富文本配置
            this.editor.config.menus = [
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                'link',
                'unlink',
                'table',
                'img',
                'undo',
                'redo'
            ]
            // 实例
            this.editor.create()
        }
    }
}
