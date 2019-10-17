export const getNavList = {
    data() {
        return {
            navLink: []
        }
    },
    watch: {
        navLink: {
            handler: function(val) {
                if (val.length) {
                    this.analysisPath()
                }
            },
            immediate: true
        },
        $route: {
            handler: function(val) {
                if (this.navLink.length) {
                    this.analysisPath()
                }
            },
            immediate: true
        }
    },
    methods: {
        getNavList(module) {
            let _navList = JSON.parse(this.$ls.get('XK-MAKER__NAV')).filter(x => x.name == module)
            if (_navList.length) {
                this.navLink = _navList[0].children
            }
        },
        analysisPath() {
            const path = this.$route.path
            const flag = this.navLink.some(x => path.includes(x.url))
            if (!flag) {
                this.$router.push(this.navLink[0].url)
            }
        }
    }
}