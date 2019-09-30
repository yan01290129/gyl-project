<template>
  <div>
    <el-breadcrumb separator="/" class="header">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/entrustorderlist">委托订单</a></el-breadcrumb-item>
    </el-breadcrumb>
    <data-table v-loading='loading' :data.sync="data" :count.sync="count" :configs.sync="configs" :ruleData.sync="ruleData" :ruleConfigs.sync="ruleConfigs" :operationConfigs='optionConfigs' @handlerCurrentSelected='currentSelected' @handlerCellDblclick='cellDblclick' @handlerRuleChange='ruleChange' @handlerRuleEvent='ruleEvent' @handlerOperation='operation'>
      <template #entrustOrderNo="slotProps">
        <el-tag type="success">{{slotProps.prop.entrustOrderNo}}</el-tag>
      </template>
      <template #statusName="slotProps">
        <el-tag type="success">{{slotProps.prop.statusName}}</el-tag>
      </template>
    </data-table>
  </div>
</template>

<script>
	import DataTable from "@/components/Model/dataTable.vue";
	import optionConfigs from "./optable";
	import ruleConfigs from "./rule";
	import configs from "./table";
	import utils from "@/util/config";
	export default {
		components: {
			DataTable
		},
		data: () => ({
			loading:false,
			optionConfigs,
			ruleData:{},
			ruleConfigs,
			data:[],
			count:0,
			configs,
			currentRow:''
		}),
		methods: {
			// 获取搜索栏下拉
			async loadConfigSelect(){
				this.loading = true
				this.ruleConfigs = await utils.setConfigTableRuleSelect(this.ruleConfigs)
				this.loading = false
			},
			// 获取列表
			async getTableList() {
				try {
					this.loading = true
					let { list, count } = await utils.getConfigTable(this.configs.api, this.ruleData)
					this.data = list
					this.count = count
				} catch (error) {
					this.$message({ message: '获取数据失败', type: 'warning',center: true });
					return Promise.reject(error)
				} finally {
					this.loading = false
				}
			},
			// 修改搜索条件
			ruleChange(ruleData) {
				this.ruleData = ruleData
			},
			// 选中当前行
			currentSelected(currentRow){
				this.currentRow = currentRow
			},
			// 双击当前行
			cellDblclick(currentRow){
				this.operation('upd')
			},
			// 查询条件变更
			ruleEvent(newVal, oldVal){
				if(newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){	// 如果存在页码之外的条件变更，且不在第一页
					this.$set(this.ruleData,'pageIndex',1)
				}else{
					this.getTableList()
				}
			},
			// 操作按钮事件
			async operation(val){
				if(val == 'add'){
					this.$router.push('/entrustorderform')
				}
				if(val == 'upd'){
					if((!this.currentRow) || JSON.stringify(this.currentRow) == "{}")return this.$message({ message: '请选择记录', type: 'warning',center: true });
					this.$router.push({ name: 'entrustorderform', params: this.currentRow})
				}
				if(val == 'del'){
					if((!this.currentRow) || JSON.stringify(this.currentRow) == "{}")return this.$message({ message: '请选择记录', type: 'warning',center: true });
					try {
						this.loading = true
						await utils.delConfigTable(this.configs.api, this.currentRow.entrustOrderNo);
					} catch (error) {
						this.$message({ message: '删除失败', type: 'warning',center: true });
						return Promise.reject(error);
					} finally {
						this.loading = false
					}
				}
			},
		},
		created(){
			// 初始化
			this.ruleData = utils.inntTable()
			this.loadConfigSelect()
			this.getTableList()
		},
	};
</script>

<style scoped>
</style>
