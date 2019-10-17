import {visitorList, groupFollow, cancelSingleFollowing} from '@/service/space.js'

export const visitor = {
  data () {
    return {
      visitors: []
    }
  },
  methods: {
    async requestVisitorList (options = {}, pageParam = {}) { // 获取TA的访客数据
      let res = await visitorList(options, pageParam)
      if (res.data.code === 200) {
        let _entity = res.data.entity || {}
        this.visitors = _entity.resultData || []
        this.pageParam && (this.pageParam.totalNum = _entity.totalNum || 0)
      }
    },
  }
}

export const follow = {
  methods: {
    async handleFollowOrNot (followedUId, hasFollowed) { // 教师、学生空间，关注、取消关注
      const label = hasFollowed && '取消关注' || '关注'
      const userId = this.$ls.get('loginUId', '')

      if (!userId) {
        // this.$message({type: 'info', message: `您还未登录，不能${label}`})
        // return false
        this.$store.commit('toggleLoginModal',true)
        return false
      }

      const _options = {followUser: userId, followedUserId: followedUId}
      const handler = hasFollowed && cancelSingleFollowing || groupFollow
      const options = hasFollowed && _options || [{ ..._options, followGroup: ''}]
      const errorMsg = `${label}失败，请重试`

      try {
        const res = await handler(options)

        if (res.status === 200 && res.data.code === 200) {
          this.$message({
            type: 'success',
            message: `成功${label}!`,
            duration: 1500
          })

          // 返回true，调用各自的callback
          return true
        }

        this.$message({type: 'error', message: res.data.msg || errorMsg, duration: 1500})
        return false
      } catch (e) {
        this.$message.error(errorMsg)
        return false
      }
    }
  }
}

export const privateLetter = {
  methods: {
    showPrivateLetterDialog (id) {
      if(this.$ls.get('loginInfo')){
        const loginUId = this.$ls.get('loginUId', '')

        if (loginUId === id) {
          this.$message.error('不能给本人发送私信~')
          return
        }

        this.dialog.addresseeId = id
        this.dialog.isVisible = true
      }else{
        this.$store.commit('toggleLoginModal',true)
      }
    }
  }
}
