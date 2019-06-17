// reducers/count.js
import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA, INCREASEDUTIES } from '../constants' // 引入action类型常量名

// 初始化state数据
const initialState = {
    number: 1,
    data: [],
    duties: []
}

// 通过dispatch action进入
export default function update(state = initialState, action) {
    // 根据不同的action type进行state的更新
    switch (action.type) {
        case INCREASE:
            return Object.assign({}, state, { number: state.number + action.amount })
        case INCREASEDUTIES:
            return Object.assign({}, state, { duties: action.data })
        case DECREASE:
            return Object.assign({}, state, { number: state.number - action.amount })
        case GETSUCCESS:
            return Object.assign({}, state, { data: action.json })
        case REFRESHDATA:
            return Object.assign({}, state, { data: [] })
        default:
            return state
    }
}