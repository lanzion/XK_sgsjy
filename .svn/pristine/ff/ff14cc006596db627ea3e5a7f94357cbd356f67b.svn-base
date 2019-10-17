export const exportDatas = {
    methods: {
		// 导出数据没有数据是的公共提示
	    exportNoDatas() {
        this.$message({
            type: 'info',
            message: '当前没有数据，无法导出'
        })
    },
        exportCommon(url, inputs) {
            const form = $('<form>') // 定义一个form表单
            form.attr('style', 'display: none')
            form.attr('target', '')
            form.attr('method', 'get')
            form.attr('action', url)
                // // 将表单放置在web
            form.append(inputs)
            $('body').append(form)
            form.submit() // 表单提交
        }
    }
}
