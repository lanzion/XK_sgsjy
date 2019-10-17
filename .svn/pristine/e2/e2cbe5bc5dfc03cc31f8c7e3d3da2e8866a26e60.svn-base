<script>
    export default {
        name: 'docReader', // 文档阅读

        data() {
            return {
            }
        },

        props: {
            width: {
                type: [Number, String],
                default: '100%'
            },
            height: {
                type: [Number, String],
                default: 400
            },
            docId: {
                required: true,
                type: String,
            }
        },

        mounted() {
            this.init()
        },
        methods: {
            init() {
                const { width, docId } = this

                try {
                    const option = {
                        docId,
                        width,
                        token: 'TOKEN',
                        host: 'BCEDOC',
                        serverHost: 'https://doc.bj.baidubce.com',
                        zoom: false,
                        zoomStepWidth: 20,
                        ready(handler) {    // 设置字体大小和颜色, 背景颜色（可设置白天黑夜模式）
                            handler.setFontSize(1)
                            handler.setBackgroundColor('#000')
                            handler.setFontColor('#fff')
                        },
                        flip() {},
                        toolbarConf: {
                            page: false, // 上下翻页箭头图标
                            pagenum: false, // 几分之几页
                            full: true, // 是否显示全屏图标,点击后全屏
                            copy: false, // 是否可以复制文档内容
                            position: 'center', // 设置 toolbar中翻页和放大图标的位置(值有left/center)
                        }
                    }
                    new Document('docReader', option)
                } catch (e) {
                    console.log(e)
                }
            }
        },

        render() {
            let { width, height } = this
            width = !isNaN(width) ? `${width}px` : width
            height = !isNaN(height) ? `${height}px` : height
            const readerStyle = { width, height }

            return (
                <div id="docReader" style={readerStyle}></div>
            )
        }
    }
</script>

<style>
    #docReader {
        max-height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
        border: 1px solid #c9c9c9;
        margin: 0 auto;
    }
    #docReader .wenku-api-box {
        // height: 100%;
        padding-top: 0px;
    }
    #docReader .wenku-api-box .wenku-toolsbar-mod {
        height: 48px;
        display: none;
    }
    #docReader #wenku-loading {
        height: 100%;
    }
    #docReader #load{
        top: 50%;
        margin-top: -16px;
    }
</style>
