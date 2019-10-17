<template>
	<el-dialog title="评比标准" :visible.sync="visible.show" top="50%" class="eval-standard">
		<table border="1" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th style="width: 120px;">类别</th>
					<th>内容</th>
					<th style="width: 80px;">分值</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>实用价值</td>
					<td class="txall">作品本身或设计具有实用价值。</td>
					<td>20</td>
				</tr>
				<tr>
					<td rowspan="3">功能设计与实现</td>
					<td class="txall">1、功能设计有创意</td>
					<td rowspan="3">30</td>
				</tr>
				<tr>
					<td class="txall">2、功能满足设计需求，运行稳定、适应性强。</td>
				</tr>
				<tr>
					<td class="txall">3、技术含量高。</td>
				</tr>
				<tr>
					<td rowspan="3">材料与加工</td>
					<td class="txall">1、软硬件的选取与搭配合理。</td>
					<td rowspan="3">20</td>
				</tr>
				<tr>
					<td class="txall">2、安装连接稳固，布线整齐美观。</td>
				</tr>
				<tr>
					<td class="txall">3、注重环保</td>
				</tr>
				<tr>
					<td rowspan="2">外观造型</td>
					<td class="txall">1、外观装饰美观，视觉效果好。</td>
					<td rowspan="2">10</td>
				</tr>
				<tr>
					<td class="txall">2、能配合作品功能的实现。</td>
				</tr>
				<tr>
					<td rowspan="4">作品介绍</td>
					<td class="txall">1、介绍人语言规范，吐字清晰，表达明确、流畅、自然。</td>
					<td rowspan="4">20</td>
				</tr>
				<tr>
					<td class="txall">2、介绍人精神饱满，能较好地运用姿态、动作、手势、表情等来介绍作品。</td>
				</tr>
				<tr>
					<td class="txall">3、介绍内容包括作品名称、需求分析、硬件介绍、程序介绍、功能展示等环节。</td>
				</tr>
				<tr>
					<td class="txall">4、介绍时间不超过5分钟。</td>
				</tr>
			</tbody>
		</table>
	</el-dialog>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
	.eval-standard {
		.el-dialog {
			width: 750px;
			.el-dialog__headerbtn {
				line-height: 50px;
			}
		}
	}
</style>

<style lang="scss" scoped>
	.txall {
		text-align: left!important;
	}
	.eval-standard {
		thead {
			tr {
				height: 40px;
				background-color: #f6f6f6;
			}
		}
		th,tr,td {
			text-align: center;
			vertical-align: middle;
			font-size: 16px;
			line-height: 2;
			padding: 0 15px;
			border: 1px solid #ccc;
		}
	}
</style>