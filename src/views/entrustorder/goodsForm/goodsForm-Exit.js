let rules = {
  required: true,
  message: "不能为空",
  trigger: "blur,change"
};
export default [
  {
    title: "基础",
    items: [
      {
        name: "orderModel",
        type: "inputbutton",
        label: "来货编码",
        // readonly: true,
      },
      {
        name: "arrivalGoodsModel",
        type: "inputbutton",
        label: "来货规格型号",
        // readonly: true,
        rules
      },
      {
        name: "brandName",
        type: "inputbutton",
        readonly: true,
        label: "品牌",
        rules
      },
      // {
      //   type: 'button',
      //   key: "brandNameorder",
      //   name: "",
      //   lable: "品牌记录",
      //   prop: "brandNameorder",
      // },
      {
        name: "sourceAreaName",
        type: "inputbutton",
        label: "原产地",
        readonly: true,
        rules
      },
      // {
      //   type: 'button',
      //   key: "sourceAreaNameorder",
      //   name: "",
      //   lable: "产地记录",
      //   prop: "sourceAreaNameorder",
      // },
      {
        name: "arrivalGoodsName",
        type: "input",
        label: "来货名称",
      },
    ]
  },
  {
    title: "海关商品归类",
    items: [
      {
        name: "goodsName",
        type: "input",
        label: "商品名称",
        disabled: true,
      },
      {
        name: "taxNo",
        type: "input",
        label: "税号",
        disabled: true,
      },
      {
        name: "attachNo",
        type: "input",
        label: "附号",
        disabled: true,
      },
    ]
  },
  {
    title: "卖方销售",
    items: [
      {
        name: "sellerQuantity",
        label: "成交数量",
        type: "num",
        decimal:0,
      },
      {
        name: "sellerUnitName",
        type: "inputbutton",
        readonly: true,
        label: "成交单位",
        rules
      },
      {
        name: "sellerPrice",
        label: "单价",
        type: "money",
      },
      {
        name: "sellerCurrency",
        type: "select",
        label: "币别",
        selectapi: "currencyName",
        disabled: true,
      },
      {
        name: "sellerGoodsValue",
        label: "货价(货值)",
        type: "money",
        disabled: true,
      },
      {
        name: "pieceMum",
        label: "件数",
        type: "num",
        decimal:0,
      },
      {
        name: "netWeight",
        label: "净重(KG)",
        type: "num",
      },
      {
        name: "grossWeight",
        label: "毛重(KG)",
        type: "num",
      },
      {
        name: "packingType",
        type: "input",
        label: "货物包装种类",
      },
    ]
  },
  {
    title: "预估运保杂费",
    items: [
      {
        name: "freightRate",
        label: "运费费率(%)",
        type: "num",
        ratio:true,
      },
      {
        name: "freight",
        label: "运费",
        type: "money",
      },
      {
        name: "premiumRate",
        label: "保费费率(%)",
        type: "num",
        ratio:true,
      },
      {
        name: "premium",
        label: "保费",
        type: "money",
      },
      {
        name: "extrasRate",
        label: "杂费费率(%)",
        type: "num",
        ratio:true,
      },
      {
        name: "extras",
        label: "杂费",
        type: "money",
      },
      {
        name: "costAmount",
        label: "运保杂费额",
        type: "money",
      },
    ]
  },
  {
    title: "报关(人民币)",
    items: [
      {
        name: "controlledGoods",
        type: "input",
        label: "管制物品",
      },
      {
        name: "superviseModeName",
        type: "inputbutton",
        label: "监管条件",
        readonly: true,
      },
    ]
  },
  {
    title: "服务费",
    items: [
      {
        name: "serviceExchangeRate",
        label: "费率(%)",
        type: "num",
        ratio:true,
      },
      {
        name: "serviceCurrency",
        type: "select",
        label: "币别",
        selectapi: "currencyName",
        disabled: true,
      },
      {
        name: "serviceFee",
        label: "服务费",
        type: "money",
        decimal:2,
        symbol:'￥',
        disabled: true,
      },
    ]
  },
  {
    title: "买方采购",
    items: [
      {
        name: "buyerExchangeRate",
        label: "货款汇率",
        type: "num",
        decimal:6,
        disabled: true
      },
      {
        name: "buyerCurrency",
        type: "select",
        label: "币别",
        selectapi: "currencyName",
        disabled: true,
      },
      {
        name: "buyerRate",
        label: "买方汇率",
        type: "num",
        decimal:6,
        disabled: true
      },
      {
        name: "buyerPrice",
        label: "单价",
        type: "money",
        disabled: true,
      },
      {
        name: "buyerGoodsValue",
        label: "货价(货值)",
        type: "money",
        disabled: true,
      },
    ]
  },
  {
    title: "出口退税",
    items: [
      {
        name: "drawbackRate",
        label: "退税率(%)",
        type: "num",
        ratio:true,
      },
      {
        name: "drawback",
        label: "退税金额",
        type: "money",
        disabled: true,
      },
    ]
  },
  {
    title: "",
    items: [
      {
        name: "volume",
        type: "input",
        label: "体积(CBM)",
      },
      {
        name: "poNo",
        type: "input",
        label: "客户采购订单号",
      },
      {
        name: "materialCode",
        type: "input",
        label: "委托方物料编码",
      },
      {
        name: "materialName",
        type: "input",
        label: "委托方物料名称",
      },
      {
        name: "clientModel",
        type: "input",
        label: "委托方规格型号",
      },
      {
        name: "batchNo",
        type: "input",
        label: "批号",
      },
      {
        name: "transactionUnit",
        type: "input",
        label: "成交单位",
      },
      {
        name: "threeCproject",
        type: "input",
        label: "3C项目",
      },
    ]
  }
];
