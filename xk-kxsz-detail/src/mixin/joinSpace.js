export const joinSpace = {
    methods: {
        dynamicPath ({identity, orgId: id, userId: uid}) {
            const route = {
                    '0': { path: '/space/student/dynamic', query: { id, uid } },
                    '1': { path: '/space/teacher/dynamic', query: { id, uid } },
                    '2': { path: '/investor/detail', query: { id } },
                    '3': { path: '/investOrg/detail', query: { id } },
                    '4': { path: '/enterprise/detail', query: { id } },
                    '6': { path: '/educationBureauSpace/homepage', query: { id } },
                    '7': { path: '/educationBureauSpace/homepage', query: { id } },
                    '11': { path: '/multSpace/detail', query: { id } },
                }
            return route[identity]
        }
    }
}