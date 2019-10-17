<template>
	<div id="ll">
		<el-popover
		  ref="popover"
		  placement="top"
		  width="180"
		  trigger="hover"
		  v-model="visible">
		  <p style="margin:22px;">确定要删除这个项目吗？</p>
		  <div style="text-align: right; margin: 10px;">
		    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
		    <el-button type="danger" size="mini" @click="visible = false">确定</el-button>
		  </div>
		</el-popover>
		<span v-popover:popover class="delete-btn"><i class="icon-btn-delete"></i></span>
	</div>
</template>

<script>
	export default {
		name: 'll',
		data () {
			return {
				visible: false
			}
		}
	}
</script>

<style lang="scss" scoped>
#ll{
	display: inline-block;
	.delete-btn{
		margin-left: 10px;
	}
	span{
		font-size: 20px;
		margin-left: 14px;
		cursor: pointer;
		margin:0;
	}
	i:hover{
		color: #d00;
	}
}
</style>

<style lang="scss">
	// .el-button--text{
	// 	color: #d00!important;
	// }
	// .el-button--mini{
	// 	width: 40px!important;
	// }
</style>