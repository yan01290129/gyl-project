import api from "@/api";
import utils from "@/util/config";
// 主表
import companyinfo from "../companyinfo/table";
import companyinfoRuleConfigs from "../companyinfo/rule";
import department from "../department/table";
import departmentRuleConfigs from "../department/rule";
import client from "../client/table";
import clientRuleConfigs from "../client/rule";
import clientcontact from "../clientcontact/table";
import clientcontactRuleConfigs from "../clientcontact/rule";
import supplierbase from "../supplierbase/table";
import supplierbaseRuleConfigs from "../supplierbase/rule";
import suppliercontact from "../suppliercontact/table";
import suppliercontactRuleConfigs from "../suppliercontact/rule";
import customer from "../customer/table";
import customerRuleConfigs from "../customer/rule";
import agreement from "../agreement/table";
import agreementRuleConfigs from "../agreement/rule";
import agreementsolution from "../agreementsolution/table";
import agreementsolutionRuleConfigs from "../agreementsolution/rule";
// 商品
import materielbase from "../materielbase/table";
import materielbaseRuleConfigs from "../materielbase/rule";

const TABLE_lIMIT = {
  clientContactName: {
    must: "clientCode",
    news: "委托方不能为空"
  },
  supplierContactName: {
    must: "supplierCode",
    news: "供应商不能为空"
  },
  agreementName: {
    must: "clientCode",
    news: "委托方不能为空"
  },
  agreementSolutionName: {
    must: "agreementCode",
    news: "协议管理不能为空"
  },
};

const TABLE_RULE = {
  clientContactName: {
    clientNo: "clientCode",
  },
  supplierContactName: {
    supplierCode: "supplierCode",
  },
  agreementName: {
    customerCode: "clientCode",
  },
  agreementSolutionName: {
    agreementNo: "agreementCode",
  }
};

const TABLE_CONFIGS = {
  trusteeName: {
    title: "公司列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: companyinfoRuleConfigs,
    configs: companyinfo
  },
  purchaseUnitName: {
    title: "部门列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: departmentRuleConfigs,
    configs: department
  },
  clientName: {
    title: "委托方列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: clientRuleConfigs,
    configs: client
  },
  clientContactName: {
    title: "委托方联系人列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: clientcontactRuleConfigs,
    configs: clientcontact
  },
  supplierName: {
    title: "供应商列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: supplierbaseRuleConfigs,
    configs: supplierbase
  },
  supplierContactName: {
    title: "供应商联系人列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: suppliercontactRuleConfigs,
    configs: suppliercontact
  },
  customerName: {
    title: "客户列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: customerRuleConfigs,
    configs: customer
  },
  agreementName: {
    title: "协议列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: agreementRuleConfigs,
    configs: agreement
  },
  agreementSolutionName: {
    title: "协议方案列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: agreementsolutionRuleConfigs,
    configs: agreementsolution
  },
  arrivalGoodsModel:{
    title: "物料基础信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materielbaseRuleConfigs,
    configs: materielbase
  },
  orderModel:{
    title: "物料基础信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materielbaseRuleConfigs,
    configs: materielbase
  },
  
};

const TABLE_WRITE = {
  trusteeName: {
    trusteeCode: "companyCode",
    trusteeName: "companyName"
  },
  purchaseUnitName: {
    purchaseUnitCode: "departmentCode",
    purchaseUnitName: "departmentName"
  },
  clientName: {
    clientCode: "clientNo",
    clientName: "clientName",
    salesmanId: "orderReceiverCode",
    salesmanName: "orderReceiverName",
    followPersonId: "orderFollowerCode",
    followPersonName: "orderFollowerName",
    clientContactName: "",
    // clientTel: "",
    // clientPhone: "",
    agreementCode: "",
    agreementName: ""
  },
  clientContactName: {
    clientContactName: "leader",
    clientTel: "tel",
    clientPhone: "phone"
  },
  supplierName: {
    supplierCode: "supplierCode",
    supplierName: "supplierName",
    supplierContactName: "",
    // supplierTel: "",
    // supplierPhone: ""
  },
  supplierContactName: {
    supplierContactName: "contact",
    supplierTel: "tel",
    supplierPhone: "phone"
  },
  customerName: {
    customerCode: "customerNo",
    customerName: "customerName",
  },
  agreementName: {
    agreementCode: "agreementNo",
    agreementName: "agreementName",
    dayRate: "insideDayRate", // 日利率
    agreementSolutionCode: "",
    agreementSolutionName: "",//方案名称
    // entrustOrderType: "",// 委托订单类型
    // reportGateType: "", // 报关类型
    // bizType: "",//业务类型
    // tradeMode: "",//贸易方式
    // dealMode: "",//成交方式
    // invoiceType: "",//发票类型
    // solutionNo: "",//公式编码
    // serviceCharge: "",//种类
    // serviceTaxRate: "",//服务费率
    // serviceFee: "",//定额服务费
  },
  agreementSolutionName:{
    agreementSolutionCode: "itemCode",
    agreementSolutionName: "solutionName",
    entrustOrderType: "customType",// 委托订单类型
    reportGateType: "customType", // 报关类型
    bizType: "businessType",//业务类型
    tradeMode: "tradeType",//贸易方式
    dealMode: "establishMode",//成交方式
    solutionNo: "solutionNo",//公式编码
    serviceCharge: "serviceChargeType",//种类
    serviceTaxRate: "serviceChargeRate",//服务费率
    serviceFee: "serviceCharge",//定额服务费
    invoiceType: "invoiceType",//发票类型
    matPayment: "matPayment",//是否垫货款
    minCharge: "minimumCharge",//低消金额
  },
  arrivalGoodsModel:{
    arrivalGoodsModel: "specificationType",//来货规格型号
  },
  orderModel:{
    arrivalGoodsModel: "specificationType",//来货规格型号
  },
};

export default {
  /**
   * @param {名称} 点选限制
   */
  limitSelectionTable(data, item) {
    if (TABLE_lIMIT[item.name] && !data[TABLE_lIMIT[item.name]["must"]]) {
      return TABLE_lIMIT[item.name]["news"];
    } else {
      return "";
    }
  },

  /**
   * @param {名称} 点选数据
   */
  async getSelectionTable(data, item) {
    var tableDialog = TABLE_CONFIGS[item.name];
    for (let key in TABLE_RULE[item.name]) {
      if (data.hasOwnProperty(TABLE_RULE[item.name][key])) {
        tableDialog.ruleData[key] = data[TABLE_RULE[item.name][key]];
      } else {
        tableDialog.ruleData[key] = "";
      }
    }
    try {
      const { list, count } = await api.getList(
        tableDialog.configs["api"],
        tableDialog.ruleData
      );
      (tableDialog.data = list), (tableDialog.count = count);
      return tableDialog;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   * @param {名称} 切换条件
   */
  async changeSelectionTable(item, ruleData) {
    var tableDialog = TABLE_CONFIGS[item.name];
    tableDialog.ruleData = ruleData;
    try {
      const { list, count } = await api.getList(
        tableDialog.configs["api"],
        tableDialog.ruleData
      );
      (tableDialog.data = list), (tableDialog.count = count);
      return tableDialog;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   * @param {名称} 点选回写
   */
  async writeSelectionTable(item, currentRow) {
    var writeVla = {};
    var tableRow = TABLE_WRITE[item.name];
    for (let key in tableRow) {
      if (currentRow.hasOwnProperty(tableRow[key])) {
        writeVla[key] = currentRow[tableRow[key]];
      } else {
        writeVla[key] = "";
      }
    }
    await this.apiWriteSelectionTable(writeVla, item, currentRow);
    return writeVla;
  },

  /**
   * @param {名称} 接口回写
   */
  async apiWriteSelectionTable(writeVla, item, currentRow) {
    if (item.name == "supplierName") {
      // 卖方币别
      try {
        const { currency } = await api.getVal("supplierfinance/searchOne/"+currentRow.supplierCode);
        writeVla.supplierCurrency = currency || "";
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (item.name == "customerName") {
      // 买方币别
      try {
        const { settlementCurrency } = await api.getVal('customerfinance/searchOne?customerNo='+currentRow.customerNo);
        writeVla.currency = settlementCurrency || "";
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
