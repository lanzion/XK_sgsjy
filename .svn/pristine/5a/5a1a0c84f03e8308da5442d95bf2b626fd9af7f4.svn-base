import { userBatchLock } from '@/service/admin_base.js'

export const userLock = {
    methods: {
        /*
         * 启用/停用
         * [{ "id": "用户ID", "lockStatus": 0 }]
         */
        lockOperate({item, model, identity} = {item, model, identity}) {
            const txt = model === 'lock' ? '停用' : '启用'
            if (item.length) {
                const status = model === 'lock' ? '1' : '0'
                let params = []
                this.$confirm(`此操作将${txt}该${identity}，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    item.forEach(x => {
                        params.push({ id: x.id, lockStatus: status })
                    })
                    userBatchLock(params).then(response => {
                        if (response.data.code === 200) {
                            this.$message({ message: `${txt}成功`, type: 'success' });
                            item.forEach(x => {
                                x.lockStatus = status
                            })
                        } else {
                            this.$message.error(response.data.msg)
                        };
                        this.$refs.multipleTable.clearSelection()
                    })
                }).catch(() => {})
            } else {
                this.$message({message: `请选择要${txt}的${identity}`})
            }
        },
        // 判断是否锁定
        isLocked(item) {
            return Number(item.lockStatus) === 1
        },
        // 判断是否未锁定
        isUnLocked(item) {
            return Number(item.lockStatus) === 0
        },
    }
}
