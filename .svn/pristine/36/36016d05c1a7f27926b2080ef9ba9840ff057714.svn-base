import { eduBatchLock, schoolBatchLock } from '@/service/admin_base.js'

export const orgLock = {
    data() {
        return {
            identityType: {
                edu: {
                    label: '教育局',
                    handler: eduBatchLock
                },
                school: {
                    label: '学校',
                    handler: schoolBatchLock
                },
            }
        }
    },
    methods: {
        /*
         * 启用/停用
         * [{ "id": "用户ID", "status": 0 }]
         */
        startOperate({item, model, identity} = {item, model, identity}) {
            const txt = model === 'start' ? '启用' : '停用'
            const identityLabel = this.identityType[identity].label
            const handler = this.identityType[identity].handler
            if (item.length) {
                const status = model === 'start' ? '1' : '0'
                let params = []
                this.$confirm(`此操作将${txt}该${identityLabel}，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    item.forEach(x => {
                        params.push({ id: x.id, status: status })
                    })
                    handler(params).then(response => {
                        if (response.data.code === 200) {
                            this.$message({ message: `${txt}成功`, type: 'success' })
                            item.forEach(x => {
                                x.status = status
                            })
                        } else {
                            this.$message.error(response.data.msg)
                        };
                        this.$refs.multipleTable.clearSelection()
                    })
                }).catch(() => {})
            } else {
                this.$message({message: `请选择要${txt}的${identityLabel}`})
            }
        },
            // 判断是否启用
        isStart(item) {
            return !Number(item.status)
        },
        // 判断是否停用
        isStop(item) {
            return !!Number(item.status)
        },
    }
}
