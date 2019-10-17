export const setTabs = {
    methods: {
        setTabs ({ num, badge = {} } = { num, badge }) {
            this.getCurPermission(num)
            let _tabs = []
            this.headTabs.forEach(x => {
                let _type = x.url.split('/')
                let _tab = {name: x.name, type: _type[_type.length - 1]}
                if (badge[x.menuId]) {
                    Object.assign(_tab, { badge: badge[x.menuId] })
                }
                _tabs.push(_tab)
            })
            this.tabs = _tabs
            this.tabRouter.path = this.router
        }
    }
}