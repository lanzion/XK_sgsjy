export const setWinLevel = {
	methods: {
		setLevel(detail, identity) {
            const idtLevel = {
                10: 0,
                6: 1,
                7: 2,
                9: 3
            }
            const levelDatas = [
                { id: '10', name: '省级', code: '10' },
                { id: '6', name: '市级', code: '6' },
                { id: '7', name: '区县级', code: '7' },
                { id: '9', name: '校级', code: '9' }
            ]
            const matchGrade = detail.matchGrade
            const startIdx = parseInt(idtLevel[matchGrade], 10)
            const endIdx = parseInt(idtLevel[identity], 10)
            if (endIdx >= startIdx) {
                return levelDatas.slice(startIdx, (endIdx + 1))
            }
            return []
        }
	}
}