
export const interceptVideo = {
	methods: {
		// 截取视频第一帧
		// video： 视频标签的id； index: 列表数据的索引；key: this.$data读取列表数据的key
        captureImage(video, index, key) {
            const self = this
            setTimeout(function () {
                const videoEle = document.getElementById(video)
                const canvas = document.createElement('canvas')
                canvas.width = 265
                canvas.height = 180
                if (videoEle !== null) {
                    canvas.getContext('2d').drawImage(videoEle, 0, 0, canvas.width, canvas.height)
                    const dataUrl = canvas.toDataURL('image/png')
                    self.$set(self.$data[key][index], 'cover', dataUrl)
                }
            }, 500)
        },
	}
}