let rules = {
  required: true,
  message: "不能为空",
  trigger: "blur,change"
};
export default [
  {
    none: false,
    disab: false,
    nonetitle: true,
    title: "",
    text: false,
    items: [
      {
        name: "businessUnitName",
        type: "inputbutton",
        label: "经营单位",
        readonly: true,
      },
      {
        name: "declarationUnitName",
        type: "inputbutton",
        label: "申报单位",
        readonly: true,
      },
      {
        name: "contractNo",
        type: "input",
        label: "合同号",
      },
      {
        name: "customerAppointContact",
        type: "switch",
        label: "客户指定合同"
      },
      {
        name: "buyInsurance",
        type: "switch",
        label: "我司购买保险"
      },
      {
        name: "reportAlone",
        type: "switch",
        label: "需单独报关"
      },
      {
        name: "originTariffFree",
        type: "switch",
        label: "原产地减免关税"
      },
      {
        name: "appointBusinessUnit",
        type: "switch",
        label: "指定经营单位"
      },
    ]
  },
  {
    title: "进口",
    items: [
      {
        name: "clientName",
        type: "inputbutton",
        label: "委托方"
      },
    ]
  },
  {
    title: "出口",
    items: [
      {
        name: "supplierName",
        type: "inputbutton",
        label: "供应商"
      },
      {
        name: "select",
        type: "select",
        label: "下拉框",
        selectapi: "entrustOrderTypeG"
      },
    ]
  }
];
