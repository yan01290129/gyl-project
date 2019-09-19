import request from "@/util/request";

export default {

  // 请求数据字典
  getEnum(data) {
    return request({
      url: `/dict/search/${data}`,
      method: "get"
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
      method: "get"
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

};
