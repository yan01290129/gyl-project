let rules = {
  required: true,
  message: "不能为空",
  trigger: "blur,change"
};
export default [
  {
    none: false,
    disab: false,
    nonetitle: false,
    title: "统计",
    text: false,
    items: [
      {
        name: "agencyFee",
        label: "代理报检费",
        type: "money",
        decimal:2,
        symbol:'￥',
        long: true
      },
      {
        name: "quarantineFee",
        label: "检疫费",
        type: "money",
        decimal:2,
        symbol:'￥',
        long: true
      },
      {
        name: "goodsValue",
        label: "卖方销售总货值",
        type: "moneyselect",
        disabled: true,
        selsect:'goodsValuecurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "customTotalAmount",
        label: "关税合计",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'customTotalAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "vatTotalAmount",
        label: "增值税合计",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'vatTotalAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "totalServiceCharge",
        label: "服务费总和",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'totalServiceChargecurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "matPayment",
        type: "switch",
        label: "是否垫货款",
        disabled: true,
        long: true
      },
      {
        name: "trusteePayGoodsAmount",
        label: "受托方应付货款总额",
        type: "moneyselect",
        disabled: true,
        selsect:'totalServiceChargecurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "invoiceAmount",
        label: "应开票金额",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'invoiceAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "advanceAmount",
        label: "预计应收总额",
        type: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'advanceActualAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "refundCustomerAmount",
        label: "应退客户货款",
        type: "moneyselect",
        disabled: true,
        selsect:'refundCustomerAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "paidGoodsAmount",
        label: "已付货款总额",
        type: "moneyselect",
        disabled: true,
        selsect:'paidGoodsAmountcurrency',
        selectapi: "currencyName",
        selsectDisabled:true,
        long: true
      },
      {
        name: "dayRate",
        label: "日利率(%)",
        type: "num",
        disabled: true,
        long: true
      },
      {
        name: "chargeInterest",
        type: "switch",
        label: "计息",
        disabled: true,
        long: true
      },
      {
        name: "invoiceType",
        type: "select",
        label: "发票类型",
        selectapi: "InvoiceTypes",
        long: true
      },
      {
        name: "minimumCharge",
        label: "最低消费差额",
        type: "money",
        decimal:2,
        symbol:'￥',
        disabled: true,
        long: true
      },
      {
        name: "supplierPayMode",
        type: "select",
        label: "付供应商货款方式",
        selectapi: "paymentToSuppliers",
        long: true
      },
      {
        name: "pickUpType",
        type: "select",
        label: "提货信息",
        selectapi: "pickingInformation",
        long: true
      },
      // {
      //   name: "specialTips",
      //   type: "input",
      //   label: "特别提示",
      // },
      {
        name: "invoiceRemark",
        type: "textarea",
        label: "发票备注",
        long: true
      },
      {
        name: "remark",
        type: "textarea",
        label: "备注",
        long: true
      },
    ]
  }
];
