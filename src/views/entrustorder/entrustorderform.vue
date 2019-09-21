<template>
  <div>
    <el-page-header @back="goBack" content="委托订单列表" class="header"></el-page-header>
    <data-form ref="mainform" v-loading='loading' :data.sync="data" :configs.sync="configs" :operationConfigs='optionConfigs' @handlerOperation='operation' @handlerPointSelection='pointSelection'>
      <template v-slot>
        <div class="formHead">{{formHead}}</div>
      </template>
    </data-form>
    <el-tabs v-model="activeName" v-if="tabIsDisabled">
      <el-tab-pane label="商品信息" name="goods">
        <data-table v-loading='goods.loading' :data.sync="goods.data" :count.sync="goods.count" :configs.sync="goods.configs" :ruleData.sync="goods.ruleData" :noneRules='true' :operationConfigs='goods.optionConfigs' @handlerRuleChange='childRuleChange' @handlerCurrentSelected='childCurrentSelected' @handlerOperation='childOperationGood'></data-table>
      </el-tab-pane>
      <el-tab-pane label="报关信息" name="custom" v-if="data.entrustOrderType == '1' || data.entrustOrderType == '2'">
        <data-form v-loading='custom.loading' :data.sync="custom.data" :configs="customConfigsFormfile" :operationConfigs='custom.optionConfigs' @handlerOperation='childFormOperation' @handlerPointSelection='childPointSelection'></data-form>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="buyer">
        <data-table v-loading='buyer.loading' :data.sync="buyer.data" :count.sync="buyer.count" :configs.sync="buyer.configs" :ruleData.sync="buyer.ruleData" :noneRules='true' :operationConfigs='buyer.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="卖方交货信息" name="seller">
        <data-table v-loading='seller.loading' :data.sync="seller.data" :count.sync="seller.count" :configs.sync="seller.configs" :ruleData.sync="seller.ruleData" :noneRules='true' :operationConfigs='seller.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="受托方收款" name="trusteereceipt">
        <data-table v-loading='trusteereceipt.loading' :data.sync="trusteereceipt.data" :count.sync="trusteereceipt.count" :configs.sync="trusteereceipt.configs" :ruleData.sync="trusteereceipt.ruleData" :noneRules='true' :operationConfigs='trusteereceipt.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="受托方付款" name="trusteepanyment">
        <data-table v-loading='trusteepanyment.loading' :data.sync="trusteepanyment.data" :count.sync="trusteepanyment.count" :configs.sync="trusteepanyment.configs" :ruleData.sync="trusteepanyment.ruleData" :noneRules='true' :operationConfigs='trusteepanyment.optionConfigs' @handlerRuleChange='childRuleChange' @handlerCurrentSelected='childCurrentSelected' @handlerOperation='childOperationTrusteepanyment'></data-table>
      </el-tab-pane>
      <el-tab-pane label="收货信息" name="receive">
        <data-table v-loading='receive.loading' :data.sync="receive.data" :count.sync="receive.count" :configs.sync="receive.configs" :ruleData.sync="receive.ruleData" :noneRules='true' :operationConfigs='receive.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="转款信息" name="transfer">
        <data-table v-loading='transfer.loading' :data.sync="transfer.data" :count.sync="transfer.count" :configs.sync="transfer.configs" :ruleData.sync="transfer.ruleData" :noneRules='true' :operationConfigs='transfer.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="付款信息" name="panyment">
        <data-table v-loading='panyment.loading' :data.sync="panyment.data" :count.sync="panyment.count" :configs.sync="panyment.configs" :ruleData.sync="panyment.ruleData" :noneRules='true' :operationConfigs='panyment.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
      <el-tab-pane label="收货与报关明细" name="detail">
        <data-table v-loading='detail.loading' :data.sync="detail.data" :count.sync="detail.count" :configs.sync="detail.configs" :ruleData.sync="detail.ruleData" :noneRules='true' :operationConfigs='detail.optionConfigs' @handlerRuleChange='childRuleChange'></data-table>
      </el-tab-pane>
    </el-tabs>
    <data-form v-if="tabIsDisabled" v-loading='loading' :data.sync="data" :configs.sync="configsOthor" @handlerPointSelection='pointSelection'></data-form>
    <data-table-dialog v-loading='tableDialog.loading' :title.sync='tableDialog.title' :visible.sync='tableDialog.visible' :data.sync='tableDialog.data' :count.sync="tableDialog.count" :configs.sync="tableDialog.configs" :ruleData.sync="tableDialog.ruleData" :ruleConfigs.sync="tableDialog.ruleConfigs" :operationConfigs='tableDialog.optionConfigs' @handlerRuleChange='tableDialogRuleChange' @handlerCurrentSelected='tableDialogcurrentSelected' @handlerOperation='tableDialogOperation'></data-table-dialog>
    <data-form-dialog v-loading='goodformDialog.loading' :title.sync='goodformDialog.title' :visible.sync='goodformDialog.visible' :data.sync='goodformDialog.data' :configs='goodsConfigsFormfile' :operationConfigs.sync='goodformDialog.optionConfigs' @handlerOperation='fromDialogOperationGood()' @handlerPointSelection='fromDialogPointSelection'></data-form-dialog>
    <data-form-dialog v-loading='trusteepanymentformDialog.loading' :title.sync='trusteepanymentformDialog.title' :visible.sync='trusteepanymentformDialog.visible' :data.sync='trusteepanymentformDialog.data' :configs.sync='trusteepanymentformDialog.configs' :operationConfigs.sync='trusteepanymentformDialog.optionConfigs' @handlerOperation='fromDialogOperationTrusteepanyment' @handlerPointSelection='fromDialogPointSelection'></data-form-dialog>
  </div>
</template>

<script>
	import DataForm from "@/components/Model/dataForm.vue";
	import optionConfigs from "./opform";
	import configs from "./form";
	import configsOthor from "./formothor";
	import utils from "@/util/config";
	import api from "@/api";
	import dialogDataUtil from "./dialogDataUtil";
	// 表格
	import DataTable from "@/components/Model/dataTable.vue";
	import childoptionConfigs from "./optable";
	import goodsConfigsTable from "./goodsTable";
	import buyerConfigs from "./buyerTable";
	import sellerConfigs from "./sellerTable";
	import trusteereceiptConfigs from "./trusteereceiptTable";
	import trusteepanymentConfigs from "./trusteepanymentTable";
	import receiveConfigs from "./receiveTable";
	import transferConfigs from "./transferTable";
	import panymentConfigs from "./panymentTable";
	import detailConfigs from "./detailTable";
	// 表单 
	import customConfigsForm from "./customForm";
	import customImportedConfigsForm from "./customForm/customForm-Imported";
	import customExitConfigsForm from "./customForm/customForm-Exit";
	// 弹窗表单
	import DataFormDialog from "@/components/Model/dataFormDialog.vue";
	import DataTableDialog from "@/components/Model/dataTableDialog.vue";
	import childoptionDialog from "./opformDialog";
	import goodsConfigsForm from "./goodsForm";
	import goodsImportedConfigsForm from "./goodsForm/goodsForm-Imported";
	import goodsExitConfigsForm from "./goodsForm/goodsForm-Exit";
	import goodsDomesticConfigsForm from "./goodsForm/goodsForm-Domestic";
	import trusteepanymentConfigsForm from "./trusteepanymentForm";
	
	export default {
		components: {
			DataForm,
			DataTable,
			DataFormDialog,
			DataTableDialog
		},
		data: () => ({
			// 主表
			loading:false,
			optionConfigs,
			data:{},
			configs:JSON.parse(JSON.stringify(configs)),
			configsOthor:JSON.parse(JSON.stringify(configsOthor)),
			// tabs栏
			activeName:'goods',
			goods:{
				loading:false,
				optionConfigs:childoptionConfigs,
				ruleData:{},
				data:[],
				count:0,
				configs:goodsConfigsTable,
				currentRow:''
			},
			custom:{
				loading:false,
				optionConfigs: [{ label: "保存", event: "save", type: "primary" }],
				data:{},
				configs:customConfigsForm,
				configsImported:JSON.parse(JSON.stringify(customImportedConfigsForm)),
				configsExit:JSON.parse(JSON.stringify(customExitConfigsForm)),
			},
			buyer:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:buyerConfigs,
				currentRow:''
			},
			seller:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:sellerConfigs,
				currentRow:''
			},
			trusteereceipt:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:trusteereceiptConfigs,
				currentRow:''
			},
			trusteepanyment:{
				loading:false,
				optionConfigs:childoptionConfigs,
				ruleData:{},
				data:[],
				count:0,
				configs:trusteepanymentConfigs,
				currentRow:''
			},
			receive:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:receiveConfigs,
				currentRow:''
			},
			transfer:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:transferConfigs,
				currentRow:''
			},
			panyment:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:panymentConfigs,
				currentRow:''
			},
			detail:{
				loading:false,
				ruleData:{},
				data:[],
				count:0,
				configs:detailConfigs,
				currentRow:''
			},
			tableDialog:{
				// 项
				item:{},
				// 默认
				visible:false,
				loading:false,
				optionConfigs:childoptionDialog,
				currentRow:'',
				// 动态获取
				title:'',
				ruleData:{},
				ruleConfigs:[],
				data:[],
				count:0,
				configs:{},
			},
			goodformDialog:{
				title:'委托订单',
				visible:false,
				loading:false,
				optionConfigs:childoptionDialog,
				data:{},
				configs:goodsConfigsForm,
				configsImported:JSON.parse(JSON.stringify(goodsImportedConfigsForm)),
				configsExit:JSON.parse(JSON.stringify(goodsExitConfigsForm)),
				configsDomestic:JSON.parse(JSON.stringify(goodsDomesticConfigsForm))
			},
			trusteepanymentformDialog:{
				title:'受托方付款',
				visible:false,
				loading:false,
				optionConfigs:childoptionDialog,
				data:{},
				configs:trusteepanymentConfigsForm
			},
			writeback:false // 回写
		}),
  		computed: {
			// 状态
			status() {
				return this.data.status;
			},
			tabIsDisabled(){
				return Boolean(this.status);
			},	
			// 抬头
			rise () {
				if (this.data.entrustOrderType && this.data.bizType) {
					if (this.data.entrustOrderType == 1 || this.data.entrustOrderType == 2) {
						if (this.data.bizType == 1 || this.data.bizType == 3) {
							return "single"; // 单抬头
						} else {
							return "double"; // 双抬头
						}
					} else {
						return "other"; // 其他
					}
				}
			},
			// 标题
			formHead () {
				var selectVal = ''
				if(this.data.entrustOrderType && utils.getConfigFormOfSelect(this.configs, "entrustOrderType",this.data.entrustOrderType)){
					selectVal = utils.getConfigFormOfSelect(this.configs, "entrustOrderType",this.data.entrustOrderType)
				}
				if(selectVal){
					if (this.rise == "single") {
						return selectVal + "(单抬头)";
					} else if (this.rise == "double") {
						return selectVal + "(双抬头)";
					} else if (this.rise == "other") {
						return selectVal;
					}
				}
			},

			// 卖方汇率  依赖条件
			buyerExchangeRate(){
				if(this.data.signDate && this.data.currency && (!this.writeback)){
					let date = this.data.signDate.slice(0, 10)
					let currencyName = utils.getConfigFormOfSelect(this.configs,'currency',this.data.currency);
					return JSON.stringify({date,currencyName})
				}
			},

			// 买方汇率  依赖条件
			orderExchangeRate(){
				if(this.data.signDate && this.data.supplierCurrency && (!this.writeback)){
					let date = this.data.signDate.slice(0, 10)
					let currencyName = utils.getConfigFormOfSelect(this.configs,'supplierCurrency',this.data.supplierCurrency);
					return JSON.stringify({date,currencyName})
				}
			},

			// 协议公式  依赖条件
			calculationFormula(){
				if(this.data.solutionNo && (!this.writeback)){
					return JSON.stringify({solutionNo:this.data.solutionNo})
				}
			},


			// 报关表单
			customConfigsFormfile(){
				if(this.data.entrustOrderType == '1'){
					if(this.status == '2'){
						return utils.setConfigFormOfText(this.custom.configsImported)
					}else{
						return  this.custom.configsImported
					}
				}
				if(this.data.entrustOrderType == '2'){
					if(this.status == '2'){
						return utils.setConfigFormOfText(this.custom.configsExit)
					}else{
						return this.custom.configsExit
					}
				}
				return this.custom.configs
			},
			
			// 商品弹窗表单
			goodsConfigsFormfile(){
				if(this.data.entrustOrderType == '1'){
					return this.goodformDialog.configsImported
				}
				if(this.data.entrustOrderType == '2'){
					return this.goodformDialog.configsExit
				}
				if(this.data.entrustOrderType == '3' || this.data.entrustOrderType == '4'){
					return this.goodformDialog.configsDomestic
				}
				return this.goodformDialog.configs
			},
		},
		methods: {
			// 返回
			goBack(){
				this.$router.go(-1);
			},

			// *********************************主表*****************************

			// 获取表单下拉
			async loadConfigSelect(){
				if(this.status == '2') return
				this.loading = true
				this.configs = [...await utils.setConfigFormSelect(this.configs)]
				this.configsOthor = [...await utils.setConfigFormSelect(this.configsOthor)]
				this.loading = false
			},

			// 操作按钮事件
			operation(val){
				if(val == 'save'){
					this.$refs['mainform'].$refs['form'].validate(async (valid) => {
						if (valid) {
							try {
								this.loading = true
								const data = this.status ? await api.editEntrustorderData(this.data) : await api.addEntrustorderData(this.data)
								this.$message({ message: '保存成功', type: 'success',center: true });
								this.data = data
							} catch (error) {
								this.$message({ message: '保存失败', type: 'warning',center: true });
								return Promise.reject(error)
							} finally {
								this.loading = false
							}
						} else {
							return false;
						}
					});
				}
				if(val == 'sub'){
					this.$message({ message: '提交', type: 'success',center: true });
				}
			},

			// 点选
			async pointSelection(data, item){
				var limit = dialogDataUtil.limitSelectionTable(data, item)
				if(limit){
					return this.$message({ message: limit, type: 'warning',center: true });
				}
				this.tableDialog.item = item
				this.tableDialog.visible = true
    			this.tableDialog.loading = true
				this.tableDialog = {...this.tableDialog, ...await dialogDataUtil.getSelectionTable(data, item)}
				this.tableDialog.ruleData = {...this.tableDialog.ruleData}
    			this.tableDialog.loading = false
			},

			// *********************************子表表格*****************************
			
			// 获取列表数据
			async childGetTableList(activeName) {
				try {
					this[activeName].loading = true
					const { list, count } = await utils.getConfigTable(this[activeName].configs.api, this[activeName].ruleData)
					this[activeName].data = list
					this[activeName].count = count
				} catch (error) {
					this.$message({ message: '获取数据失败', type: 'warning',center: true });
					return Promise.reject(error)
				} finally {
					this[activeName].loading = false
				}
			},

			// 修改搜索条件
			childRuleChange(ruleData) {
				this[this.activeName].ruleData = ruleData
			},

			// 选中当前行
			childCurrentSelected(currentRow){
				this[this.activeName].currentRow = currentRow
			},

			// 商品操作按钮事件
			async childOperationGood(val){
				if(val == 'add'){
					this.goodformDialog.visible = true
				}
				if(val == 'upd'){
				}
				if(val == 'del'){
				}
			},

			// 商品操作按钮事件
			async childOperationTrusteepanyment(val){
				if(val == 'add'){
					this.trusteepanymentformDialog.visible = true
				}
				if(val == 'upd'){
				}
				if(val == 'del'){
				}
			},

			// *********************************子表表单（报关信息）*****************************

			// 获取下拉
			async childloadConfigSelect(activeName){
				if(this.status == '2') return
				this[activeName].loading = true
				if(activeName == 'custom'){
					this.custom.configsImported = [...await utils.setConfigFormSelect(this.custom.configsImported)]
					this.custom.configsExit = [...await utils.setConfigFormSelect(this.custom.configsExit)]
				}
				this[activeName].loading = false
			},

			// 回写表单
			async childGetFormList(){
				try {
					this.custom.loading = true
					this.custom.data = {...this.custom.data,...await api.getVal('entrustcustom/'+this.data.entrustOrderNo)};
				} catch (error) {
					this.$message({ message: '获取数据失败', type: 'warning',center: true });
					return Promise.reject(error)
				} finally {
					this.custom.loading = false
				}
			},

			// 操作按钮事件
			childFormOperation(val){
				if(val == 'save'){
				}
			},

			// 点选
			childPointSelection(){},

			// *********************************弹窗表单*****************************

			// 下拉
			async DialogloadConfigSelect(activeName){
				if(this.status == '2') return
				this[activeName].loading = true
				if(activeName == 'goodformDialog'){
					this.goodformDialog.configsImported = [...await utils.setConfigFormSelect(this.goodformDialog.configsImported)]
					this.goodformDialog.configsExit = [...await utils.setConfigFormSelect(this.goodformDialog.configsExit)]
					this.goodformDialog.configsDomestic = [...await utils.setConfigFormSelect(this.goodformDialog.configsDomestic)]
				}
				if(activeName == 'trusteepanymentformDialog'){
					this.trusteepanymentformDialog.configs = [...await utils.setConfigFormSelect(this.trusteepanymentformDialog.configs)]
				}
				this[activeName].loading = false
			},

			// 商品操作按钮事件
			async fromDialogOperationGood(val){
				if(val == 'cancel'){
					this.goodformDialog.visible = false
				}
				if(val == 'confirm'){
				}
			},

			// 受托方付款操作按钮事件
			async fromDialogOperationTrusteepanyment(val){
				if(val == 'cancel'){
					this.trusteepanymentformDialog.visible = false
				}
				if(val == 'confirm'){
				}
			},
			
			// 点选
			fromDialogPointSelection(){},

			// *********************************弹窗表格*****************************

			//且换搜索条件
			async tableDialogRuleChange(val){
				this.tableDialog.loading = true
				this.tableDialog.ruleData = {...this.tableDialog.ruleData,...val}
				this.tableDialog = {...this.tableDialog, ...await dialogDataUtil.changeSelectionTable(this.tableDialog.item, this.tableDialog.ruleData)}
				this.tableDialog.loading = false
			},
			// 选中行
			tableDialogcurrentSelected(currentRow){
				this.tableDialog.currentRow = currentRow
			},
			// 操作
			async tableDialogOperation(val){
				if(val == 'confirm'){
					if((!this.tableDialog.currentRow) || JSON.stringify(this.tableDialog.currentRow) == '{}'){
						return this.$message({ message: '请选择数据', type: 'warning',center: true });
					}
					const writeVla = await dialogDataUtil.writeSelectionTable(this.tableDialog.item, this.tableDialog.currentRow)
					this.data = {...this.data,...writeVla}
					this.tableDialog.visible = false
				}
				if(val == 'cancel'){
					this.tableDialog.visible = false
				}
			}
		},
		async created(){
			// 初始化配置
			this.writeback = true
			this.data = utils.inntForm(this.data,this.configs)
			await this.loadConfigSelect()
			// ------状态对应回写
			// 修改
			this.data = {...this.$route.params}
			// 新增
			if(!this.status){
				this.data.trusteeCode = "GSXX2019072300015"
				this.data.trusteeName = "深圳市讯宇供应链管理有限公司"
				//-----????????? 采购组织默认操作人
				this.data.signDate = new Date().toJSON().slice(0, 10) + " 00:00:00";
				// 委托订单号 显示
				utils.setConfigForm(this.configs,'entrustOrderNo',{disab:true})
				
			}
			// 提交
			if(this.status == '2'){
				this.configs = [...utils.setConfigFormOfText(this.configs)]
				this.configsOthor = [...utils.setConfigFormOfText(this.configsOthor)]
				this.optionConfigs = [],this.custom.optionConfigs = []
				this.custom.configsImported = [...utils.setConfigFormOfText(this.custom.configsImported)]
				this.custom.configsExit = [...utils.setConfigFormOfText(this.custom.configsExit)]
				this.goodformDialog.configsImported = [...utils.setConfigFormOfText(this.goodformDialog.configsImported)]
				this.goodformDialog.configsExit = [...utils.setConfigFormOfText(this.goodformDialog.configsExit)]
				this.goodformDialog.configsDomestic = [...utils.setConfigFormOfText(this.goodformDialog.configsDomestic)]
				this.trusteepanymentformDialog.configs = [...utils.setConfigFormOfText(this.trusteepanymentformDialog.configs)]
			}
			this.writeback = false
		},
		watch:{
			tabIsDisabled(newVal, oldVal){
				// 初始化子项
				if(newVal){
					// 初始化表格（触发拉去数据）
					this.goods.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.buyer.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.seller.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.trusteereceipt.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.trusteepanyment.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.receive.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.transfer.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.panyment.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					this.detail.ruleData = utils.inntTable({entrustOrderNo:this.data.entrustOrderNo})
					// 表格限制操作
					this.status == '2' && (this.goods.optionConfigs = [],this.trusteepanyment.optionConfigs = [])
					// 初始化表单
					this.custom.data = utils.inntForm(this.custom.data,this.custom.configs)
					this.childloadConfigSelect('custom')
					// 回写表单
					this.childGetFormList()
					// 表单限制操作
					this.status == '2' && (this.custom.configs = [...utils.setConfigFormOfText(this.custom.configs)], this.custom.optionConfigs = [])
					// 初始化弹窗表单
					this.goodformDialog.data = utils.inntForm(this.goodformDialog.data,this.goodformDialog.configs)
					this.DialogloadConfigSelect('goodformDialog')

				}
			},
			'goods.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.goods.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('goods')
					}
				},
				deep: true
			},
			'buyer.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.buyer.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('buyer')
					}
				},
				deep: true
			},
			'seller.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.seller.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('seller')
					}
				},
				deep: true
			},
			'trusteereceipt.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.trusteereceipt.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('trusteereceipt')
					}
				},
				deep: true
			},
			'trusteepanyment.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.trusteepanyment.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('trusteepanyment')
					}
				},
				deep: true
			},
			'receive.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.receive.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('receive')
					}
				},
				deep: true
			},
			'transfer.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.transfer.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('transfer')
					}
				},
				deep: true
			},
			'panyment.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.panyment.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('panyment')
					}
				},
				deep: true
			},
			'detail.ruleData': {
				handler(newVal, oldVal) {
					if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
						// 如果存在页码之外的条件变更，且不在第一页
						this.$set(this.detail.ruleData,'pageIndex',1)
					}else{
						this.childGetTableList('detail')
					}
				},
				deep: true
			},

			// 卖方汇率
			async buyerExchangeRate(newVal, oldVal){
				let obj = JSON.parse(newVal)
				let val = await utils.getExchangeRate(obj.date,obj.currencyName)
				this.$set(this.data,'buyerExchangeRate',val)
				if(!val){
					this.$message({ message: '获取汇率失效', type: 'warning',center: true });	
				}
			},

			// 买方汇率
			async orderExchangeRate(newVal, oldVal){
				let obj = JSON.parse(newVal)
				let val = await utils.getExchangeRate(obj.date,obj.currencyName)
				this.$set(this.data,'orderExchangeRate',val)
				if(!val){
					this.$message({ message: '获取汇率失效', type: 'warning',center: true });	
				}
			},

			// 公式
			async calculationFormula(newVal, oldVal){
				let obj = JSON.parse(newVal)
				let val = await utils.getCalculationFormula(obj.solutionNo)
				console.log(val)
			},
			
		},
	};
</script>

<style scoped>
</style>
