import request from "@/util/request";

export default {

  // 请求数据字典
  getEnum(data) {
    return request({
      url: `/dict/search/${data}`,
      method: "GET"
    });
  },

  // 查询数据列表
  getList(url, rule) {
    return request({
      url: `/${url}/search`,
      method: "POST",
      data: rule
    });
  },

  // 查询单条
  getOne(url, code) {
    return request({
      url: `/${url}/${code}`,
      method: "POST"
    });
  },

  // 删除单条
  delOne(url, code) {
    return request({
      url: `/${url}/${code}`,
      method: "DELETE"
    });
  },

  // get请求url
  getVal(url) {
    return request({
      url: `/${url}`,
      method: "GET"
    });
  },

  // post请求url
  postVal(url, rule) {
    return request({
      url: `/${url}`,
      method: "POST",
      data: rule
    });
  },

  // 查询汇率
  getExchangeRateBank(date) {
    return request({
      url: `exchangerate/${date}`,
      method: "GET"
    });
  },

  // 指定日期海关汇率
  getCustomsExchangerate(date) {
    return request({
      url: `exchangerate/custom/${date}`,
      method: "GET"
    });
  },

  // 委托订单-新增
  addEntrustorderData(data) {
    return request({
      url: '/entrustorder/',
      method: "POST",
      data
    });
  },

  // 委托订单-修改
  editEntrustorderData(data) {
    return request({
      url: '/entrustorder/',
      method: "PUT",
      data
    });
  },

};
