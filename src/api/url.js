export const url='http://192.168.1.96:8080'//王贵成
// export const url='http://192.168.1.128:8080/ry_stockoption'//王贵成
export const url1='http://192.168.1.188:8080'//曲坤

export const holdOrder=url+'/api/holdOrder/list'//持仓列表
export const holdOrderDetail=url+'/api/holdOrder/detail'//持仓详情
export const closeHoldOrder=url+'/api/holdOrder/close'//平仓
export const entrustOrder=url+'/api/order/list'//委托列表
export const calOrder=url+'/api/closeOrder/list'//结算列表
export const calTotal=url+'/api/closeOrder/historyProfit'//结算总盈亏
export const calDetail=url+'/api/closeOrder/detail'//结算详情
export const fundList=url+'/api/orderbill/getorderbillList'//资金明细
export const messList=url1+'/api/message/list'//消息列表
export const modifyMessState=url1+'/api/message/state'//修改消息状态
export const fundDetail=url+'/api/mine/assetDetail'//资产详情
export const updateUserPwd=url+'/api/mine/updateUserPwd'//个人中心密码设置

export const register=url+'/api/user/register'//注册账号
export const getValidateCode=url+'/api/user/getValidateCode'//注册验证码
export const login=url1+'/user/login'//登录
export const forgetpwd=url+'/api/user/forgetpwd'//忘记密码

export const tabimg=url1+'/tabimg/list'//轮播图
export const contract=url1+'/contract/list'//合约列表
export const detail=url1+'/contract/detail'//合约详情
export const openData=url1+'/api/order/openData'//开仓页数据（下单页）
export const open=url1+'/api/order/open'//开仓（点击下单）
