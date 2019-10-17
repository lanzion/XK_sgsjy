import xhr from 'Axios'

const playTogetherList = (options = {}, params = {}) => xhr.post(`/maker/onlineTrainRoom/selectPager?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, options)

const trainDetail = (options = {}) => xhr.post(`/maker/onlineTrainRoom/selectDetail`, options)

const trainDiscussAdd = (options = {}) => xhr.post(`/maker/onlineTrainRoomDiscuss/add`, options)

const trainDiscussList = (options = {}, params = {}) => xhr.post(`/maker/onlineTrainRoomDiscuss/selectPager?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, options)

const trainDiscussDetail = (options = {}) => xhr.post(`/maker/onlineTrainRoomDiscuss/selectDetail`, options)

const trainDiscussDetailAdd = (options = {}) => xhr.post(`/maker/onlineTrainRoomDiscuss/add`, options)

const trainDiscussDetailList = (options = {}, params = {}) => xhr.post(`/maker/onlineTrainRoomDiscuss/selectPager?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, options)

const trainDiscussPraise = (options = {}) => xhr.post(`/maker/onlineTrainRoomDiscussPraise/add`, options)

export {
    playTogetherList,
    trainDetail,
    trainDiscussAdd,
    trainDiscussList,
    trainDiscussDetail,
    trainDiscussDetailAdd,
    trainDiscussDetailList,
    trainDiscussPraise
}
