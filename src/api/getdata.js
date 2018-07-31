import qs from 'qs'
import axios from 'axios'
import * as url from './url'
let oToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzMwMDMxNTQxOTgsInBheWxvYWQiOiJcIjE1OTkwODIxNTA3XCIifQ.JgoaHP3kDod2PVGpUiKBoMW7XQWemoF3EcIbrbC3FK8"
let oToken1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzI2NzE0MzA5OTcsInBheWxvYWQiOiJcIjE1OTkwODIxNTA3XCIifQ.xycGdNMUGDxIy56-5Gd9v8EdZ7kwncsB2ZAulndJHrw"
export function ceshi(params) {//
  return axios.post(url.login, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function holdOrderList(params) {//持仓列表
  return axios.post(url.holdOrder, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function holdOrderDetail(data, params) {//持仓详情
  return axios.post(url.holdOrderDetail + `?hdhId=${data}`, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function closeHold(data, params) {//平仓
  return axios.post(url.closeHoldOrder + `?hdhId=${data}`, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function calOrderList(params) {//结算列表
  return axios.post(url.calOrder, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function calOrderTotal(params) {//结算总盈亏
  return axios.post(url.calTotal, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function calDetail(data, params) {//结算详情
  return axios.post(url.calDetail + `?hocId=${data}`, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function entrustOrderList(params) {//委托列表
  return axios.post(url.entrustOrder, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function fundTotalList(params) {//委托列表
  return axios.post(url.fundList, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function messageList(params) {//消息列表
  return axios.post(url.messList, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function modifyMessState(params) {//修改消息状态
  return axios.post(url.modifyMessState, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function fundDetail(params) {//资产详情 
  return axios.post(url.fundDetail, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function updateUserPwd(params) {//密码设置
  return axios.post(url.updateUserPwd, params, {
    headers: {
      'token': oToken,
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// export function register(params){//注册
//     return axios.post(url.register,qs.stringify(params)).then((res) => {
//         return Promise.resolve(res.data)
//     })
// }
export function register(params) {//注册
  return axios.post(url.register, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getValidateCode(params) {//注册验证码
  return axios.post(url.getValidateCode + `?usPhone=${params.usPhone}`, {}).then((res) => {
    return Promise.resolve(res)
  })
}
// export function getValidateCode(params){//注册验证码
//     return axios.post(url.getValidateCode,params).then((res) => {
//         return Promise.resolve(res)
//     })
// }
export function login(params) {//登录
  return axios.post(url.login, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function forgetpwd(params) {//忘记密码
  return axios.post(url.forgetpwd, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function tabimg(params){//轮播图
    return axios.post(url.tabimg,params).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function contract(params){//合约列表
    return axios.post(url.contract,params).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function detail(params){//合约详情
    return axios.post(url.detail,params).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function openData(data,params) {//下单页
    return axios.post(url.openData+`?ctId=${data}`,params,{
      headers: {
        'token': oToken1, 
      }
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function open(params) {//下单页
return axios.post(url.open,params,{
    headers: {
    'token': oToken1, 
    }
}).then((res) => {
    return Promise.resolve(res.data)
})
}