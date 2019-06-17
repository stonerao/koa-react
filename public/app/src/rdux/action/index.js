import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA,INCREASEDUTIES } from '../constants'  // 引入action类型名常量

// 这里的方法返回一个action对象
export const increase = n => {
  return {
    type: INCREASE,
    amount: n
  }
}
export const increaseDuties = n => {
  console.log(n)
  return {
    type: INCREASEDUTIES,
    data: n
  }
}

export const decrease = n => {
  return {
    type: DECREASE,
    amount: n
  }
}

export const refreshData = () => {
  return {
    type: REFRESHDATA
  }
}

export const getSuccess = (json) => {
  return {
    type: GETSUCCESS,
    json
  }
}
