<template>
   <div id="breadcrumb">
      <el-breadcrumb separator=">">
         <el-breadcrumb-item v-for="(item, index) in items" :to="{ path: item.path, query:{ id: $route.query.id ? $route.query.id : '' } }" :key="index">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
   </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.analysisPath()
    },
    watch: {
       // 如果路由有变化，会再次执行该方法
        $route: 'analysisPath'
    },
    methods: {
        analysisPath() {
            const path = this.$route.path
            const query = this.$route.query
            const items = path.match(/\/\w+/g)
            const breadcrumb = []
            let _nextPrefix = ''
            let _lastPath = ''
            let _lastItem = ''
            for (let i = 0; i < items.length; i++) {
                const _breadcrumb = {}
                let _path = ''
                let _itemName = ''
                _lastPath += items[i]

                if (i === 0) {
                    if (items[i].includes('educationBureauSpace') || items[i].includes('school')) {
                        _itemName = '首页'
                        _path = _lastPath + '/homepage'
                    } else if (items[i].includes('education')) {
                        _itemName = '首页'
                        _path = _lastPath
                    } else if (items[i].includes('index')) {
                        _itemName = '我的空间'
                        _path = _lastPath
                    }
                } else {
               // 二级
                    if (i === 1) {
                        if (items[i].includes('works')) {
                            _nextPrefix = '作品'
                            _itemName = '作品'
                        } else if (items[i].includes('activity')) {
                            _nextPrefix = '活动'
                            _itemName = '活动'
                        } else if (items[i].includes('subject')) {
                            _nextPrefix = '课题'
                            _itemName = '课题'
                        } else if (items[i].includes('collection')) {
                            _itemName = '收藏'
                        } else if (items[i].includes('resource')) {
                            _itemName = '资源'
                        }
                    }

                // 课题
                    if (_lastItem === '/subject') {
                        if (items[i].includes('guide')) {
                            _itemName = '申报指南'
                            _nextPrefix = '指南'
                        } else if (items[i].includes('research')) {
                            _itemName = '在研课题'
                            _nextPrefix = '课题'
                        } else if (items[i].includes('activity')) {
                            _itemName = '课题活动'
                            _nextPrefix = '活动'
                        } else if (items[i].includes('results')) {
                            _itemName = '课题成果'
                            _nextPrefix = '成果'
                        } else if (items[i].includes('resource')) {
                            _itemName = '课题资源'
                            _nextPrefix = '资源'
                        }
                    }
                // 教育
                    if (_lastItem === '/education') {
                        if (items[i].includes('project')) {
                            _itemName = '全部项目'
                            _nextPrefix = '项目'
                        } else if (items[i].includes('course')) {
                            _itemName = '热门课程'
                            _nextPrefix = '课程'
                        } else if (items[i].includes('collection')) {
                            _itemName = '收藏'
                        }
                    }

                    // 空间后台
                    if (_lastItem === '/admin') {
                        if (items[i].includes('dynamic')) {
                            _itemName = '动态'
                            _nextPrefix = '动态'
                        } else if (items[i].includes('study')) {
                            _itemName = '学习'
                            _nextPrefix = '学习'
                        } else if (items[i].includes('practice')) {
                            _itemName = '实践'
                            _nextPrefix = '实践'
                        } else if (items[i].includes('project')) {
                            _itemName = '项目'
                            _nextPrefix = '项目'
                        } else if (items[i].includes('course')) {
                            _itemName = '课程'
                            _nextPrefix = '课程'
                        } else if (items[i].includes('activity')) {
                            _itemName = '活动'
                            _nextPrefix = '活动'
                        } else if (items[i].includes('works')) {
                            _itemName = '作品'
                            _nextPrefix = '作品'
                        } else if (items[i].includes('resource')) {
                            _itemName = '资源'
                            _nextPrefix = '资源'
                        } else if (items[i].includes('invite')) {
                            _itemName = '邀约'
                            _nextPrefix = '邀约'
                        } else if (items[i].includes('case')) {
                            _itemName = '案例'
                            _nextPrefix = '案例'
                        } else if (items[i].includes('subject')) {
                            _itemName = '课题'
                            _nextPrefix = '课题'
                        } else if (items[i].includes('story')) {
                            _itemName = '故事'
                            _nextPrefix = '故事'
                        } else if (items[i].includes('service')) {
                            _itemName = '服务'
                            _nextPrefix = '服务'
                        } else if (items[i].includes('demand')) {
                            _itemName = '需求'
                            _nextPrefix = '需求'
                        } else if (items[i].includes('plan')) {
                            _itemName = '策划'
                            _nextPrefix = '策划'
                        } else if (items[i].includes('info')) {
                            _itemName = '资讯'
                            _nextPrefix = '资讯'
                        } else if (items[i].includes('lagou')) {
                            _itemName = '勾搭'
                            _nextPrefix = '勾搭'
                        } else if (items[i].includes('collection')) {
                            _itemName = '收藏'
                            _nextPrefix = '收藏'
                        } else if (items[i].includes('privateLetter')) {
                            _itemName = '私信'
                            _nextPrefix = '私信'
                        } else if (items[i].includes('focus')) {
                            _itemName = '关注'
                            _nextPrefix = '关注'
                        } else if (items[i].includes('visitor')) {
                            _itemName = '访客'
                            _nextPrefix = '访客'
                        } else if (items[i].includes('access')) {
                            _itemName = '访问权限'
                            _nextPrefix = '访问权限'
                        } else if (items[i].includes('profile')) {
                            _itemName = '基本资料'
                            _nextPrefix = '基本资料'
                        } else if (items[i].includes('security')) {
                            _itemName = '帐号安全'
                            _nextPrefix = '帐号安全'
                        } else if (items[i].includes('avatar')) {
                            _itemName = '头像设置'
                            _nextPrefix = '头像设置'
                        } else if (items[i].includes('background')) {
                            _itemName = '背景设置'
                            _nextPrefix = '背景设置'
                        } else if (items[i].includes('interest')) {
                            _itemName = '我参与的兴趣组'
                            _nextPrefix = '兴趣组'
                        } else if (items[i].includes('studio')) {
                            _itemName = '我参与的工作室'
                            _nextPrefix = '导师工作室'
                        } else if (items[i].includes('contest')) {
                            _itemName = '我的参赛'
                            _nextPrefix = '竞赛'
                        }
                    }

                    if (items[i].includes('detail') || items[i].includes('pendingDetail')) {
                        _itemName = _nextPrefix + '详情'
                    } else if (items[i].includes('publish') || items[i].includes('release')) {
                        _itemName = '发布' + _nextPrefix
                    } else if (items[i].includes('upload')) {
                        _itemName = '上传' + _nextPrefix
                    } else if (items[i].includes('apply')) {
                        _itemName = _nextPrefix + '申报'
                    } else if (items[i].includes('create')) {
                        _itemName = '创建' + _nextPrefix
                    }

                    _path = _lastPath
                }

                if (_itemName !== '') {
                    if (i === items.length - 1) {
                        _breadcrumb.path = ''
                    } else {
                        _breadcrumb.path = _path
                    }
                    _breadcrumb.title = _itemName
                    breadcrumb.push(_breadcrumb)
                }
                _lastItem = items[i]
            }

            if (Object.keys(query).includes('coursename')) {
                breadcrumb.push({ path: '', title: query.coursename })
            }
            this.items = breadcrumb
         // return breadcrumb;
        }
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.el-breadcrumb {
   padding: 1em 0;

   .el-breadcrumb__item:last-child {
      .el-breadcrumb__item__inner {
         &,
         & a,
         & a:hover,
         &:hover {
            color: #999;
         }
      }
   }
}

@each $color-key, $color-value in $color-data {
   .theme-#{$color-key} .el-breadcrumb {
      .el-breadcrumb__item__inner {
         a:hover,
         &:hover {
            color: $color-value;
         }
      }
   }
}
</style>

