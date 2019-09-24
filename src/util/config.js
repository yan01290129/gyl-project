import api from "@/api";
export default {
  /**
   * @param {名称} 初始化表格条件
   */
  inntTable(ruleData = {}) {
    !ruleData.pageIndex && (ruleData.pageIndex = 1),
    !ruleData.pageSize && (ruleData.pageSize = 10);
    return ruleData;
  },

  /**
   * @param {名称} 请求表格数据
   */
  async getConfigTable(configApi, ruleData) {
    if (configApi) {
      try {
        return await api.getList(configApi, ruleData);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },

  /**
   * @param {名称} 删除表格数据
   */
  async delConfigTable(configApi, code) {
    if (configApi) {
      try {
        return await api.delOne(configApi,code);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },

  /**
   * @param {名称} 初始化表单值
   */
  inntForm(data, configs) {
    for (let config of configs) {
      for (let item of config.items) {
        if (item.type === "checkbox" && !data[item.name]) {
          data[item.name] = [];
        }
        if (item.type === "select" || item.type === "inputselect" || item.type === "numselect" || item.type === "moneyselect" || item.type === "percentselect") {
          item.options = [];
        }
      }
    }
    return data;
  },

  /**
   * @param {名称} 设置表单下拉字典数据
   */
  async setConfigFormSelect(configs) {
    for await (let config of configs) {
      let requestArr = [];
      for (let item of config.items) {
        item.selectapi && requestArr.push(item.selectapi);
      }
      try {
        const [...response] = await Promise.all(
          requestArr.map(item => api.getEnum(item).catch(err => err))
        );
        let index = 0;
        for (let item of config.items) {
          if (item.selectapi) {
            item.options = [];
            for (let data of response[index]) {
              item.options.push({
                value: data.itemKey,
                label: data.itemValue
              });
            }
            index++;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    return configs;
  },

  /**
   * @param {名称} 获取栏位配置
   */
  getConfigForm(configs, params) {
    for (let config of configs) {
      for (let item of config.items) {
        if(item.name == params) return item
      }
    }
  },

  /**
   * @param {名称} 修改栏位配置
   */
  setConfigForm(configs, params, newItem) {
    for (let config of configs) {
      for(let i=0;i<config.items.length;i++){
        if(config.items[i].name == params){
          config.items[i] = {...config.items[i],...newItem}
        }
      }
    }
    return configs
  },

  /**
   * @param {名称} 修改表单为查看类型
   */
  setConfigFormOfText(configs) {
    for (let config of configs) {
      config.text = true
    }
    return configs
  },

  /**
   * @param {名称} 获取栏位指定下拉文本
   */
  getConfigFormOfSelect(configs, params, index) {
    for (let config of configs) {
      for (let item of config.items) {
        if (item.type === "select" || item.type === "inputselect" || item.type === "numselect" || item.type === "moneyselect" || item.type === "percentselect") {
          
          if(item.name == params && item.options[index]){
            for (let option of item.options) {
              if(option.value == index)return option['label']
            }
          } 
        }
      }
    }
  },

  /**
   * @param {名称} 查询汇率
   */
  async getExchangeRate(data,currency){
    if (currency == "人民币") {
      return 1;
    }
    try {
      const list = await api.getExchangeRateBank(data)
      for (let i = 0; i < list.length; i++) {
        var exchangerate = ''
        list.forEach(b => {
          if (currency == b.currency) {
            exchangerate = b.cenPrice;
          }
        });
        return parseFloat(exchangerate);
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @param {名称} 查询海关汇率
   */
  async getCustomsExchangerate(data,currency){
    try {
      const list = await api.getCustomsExchangerate(data)
      for (let i = 0; i < list.length; i++) {
        var exchangerate = ''
        list.forEach(b => {
          if (currency == b.currency) {
            exchangerate = b.cenPrice;
          }
        });
        return parseFloat(exchangerate);
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * @param {名称} 查询公式
   */
  async getCalculationFormula(solutionNo){
    try {
      const { list } = await api.getList('solutionformula',{billNo:solutionNo})
      return list
    } catch (e) {
      console.log(e);
    }
  },
  
  /**
   * @param {名称} 计算解析
   */
  calcConfig(data, calc,ratio, item) {
    let symbol = ["+", "-", "*", "/", "(", ")",'1','2','3','4','5','6','7','8','9','0'];
    var calclist = [calc];
    for (let o = 0; o < symbol.length; o++) {
      var val = [];
      for (let i = 0; i < calclist.length; i++) {
        let z = calclist[i].split(symbol[o]);
        val.push(...z);
      }
      calclist = val;
    }
    for (let f = 0; f < calclist.length; f++) {
      var key = calclist[f];
      if(!key)return
      if (data[key]) {
        if(ratio.indexOf(key) != '-1'){
          calc = calc.replace(key, data[key] + '/100'); //取值
        }else{
          calc = calc.replace(key, data[key])
        }
      }else{
        calc = calc.replace(key, 0)
        // 这里有个除以0的特殊情况
        calc.replace('/0', '/1');
      }
    }
    return parseFloat(eval(calc).toFixed(item.decimal || 4))
  },

  /**
   * @param {名称} 计算
   */
  getCalcConfig(data, configs, formulalist, ratio) {
    var caleData = {}
    for (let formulaItem of formulalist) {
      for (let config of configs) {
        for (let item of config.items) {
          let key = formulaItem.formula.split('=')[0].replace(/\s/g, '')
          let calc = formulaItem.formula.split('=')[1].replace(/\s/g, '')
          if(item.name == key && this.calcConfig(data,calc,ratio,item)){
            let data = this.calcConfig(data,calc,ratio,item)
            if(data){
              // console.log(key,calc,caleData[key])
              caleData[key] = this.calcConfig(data,calc,ratio,item)
            }
          }
        }
      }
    }
    return caleData
  },



  /**
   * @param {名称} 登录
   */
  async loginUtil() {
    try {
      // return await await api.postVal('auth/login?userCode=admin&password=c33367701511b4f6020ec61ded352059');
      return await await api.postVal('auth/login?userCode=gq&password=e10adc3949ba59abbe56e057f20f883e');
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   * @param {名称} 登出
   */
  async logoutUtil() {
    try {
      return await await api.postVal('auth/logout');
    } catch (error) {
      return Promise.reject(error);
    }
  },

};
