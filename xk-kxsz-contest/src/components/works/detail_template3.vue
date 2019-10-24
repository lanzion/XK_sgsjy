<template>
	<div class="detail-template bgw">
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				项目类别：
			</dt>
			<dd class="detail-item-content">{{detail.projectName}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				教师姓名：
			</dt>
			<dd class="detail-item-content">{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				申报组别：
			</dt>
			<dd class="detail-item-content">{{detail.declareName || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				学校全称：
			</dt>
			<dd class="detail-item-content">{{detail.schoolName}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				学校详细地址：
			</dt>
			<dd class="detail-item-content">{{detail.steamTemplate.address}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				任教学科：
			</dt>
			<dd class="detail-item-content">{{detail.steamTemplate.teach}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				年龄：
			</dt>
			<dd class="detail-item-content">{{detail.steamTemplate.age}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				性别：
			</dt>
			<dd class="detail-item-content" v-if="detail.steamTemplate.sex === '7'">男</dd>
			<dd class="detail-item-content" v-else-if="detail.steamTemplate.sex === '8'">女</dd>
			<dd class="detail-item-content" v-else>暂无</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				联系电话：
			</dt>
			<dd class="detail-item-content">
				<span v-if="ifManage">{{detail.steamTemplate.phone}}</span>
				<span v-else>{{detail.steamTemplate.phone | phoneFormat}}</span>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				身份证号：
			</dt>
			<dd class="detail-item-content">
				<span v-if="ifManage">{{detail.steamTemplate.idCode}}</span>
				<span v-else>{{detail.steamTemplate.idCode | idCodeFormat}}</span>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				微信或QQ：
			</dt>
			<dd class="detail-item-content">
				<span v-if="ifManage">{{detail.steamTemplate.qq}}</span>
				<span v-else>{{detail.steamTemplate.qq | qqFormat}}</span>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				资源简介：
			</dt>
			<dd class="detail-item-content">{{detail.description}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				科教成果：
			</dt>
			<dd class="detail-item-content">
				<el-row class="member-title">
                    <el-col :span="2">序号</el-col>
                    <el-col :span="5">活动名称</el-col>
                    <el-col :span="5">获奖项目</el-col>
                    <el-col :span="5">获奖等级</el-col>
                    <el-col :span="5">参与学生数量</el-col>
                </el-row>
                <el-row class="member-list" v-for="(item, index) in detail.steamTemplate.steamResultTemplateList" :key="index">
                    <el-col :span="2">
                        <span>{{index + 1}}</span>
                    </el-col>
                    <el-col class="pd5" :span="5" :title="item.name">
                    	{{item.name}}
                    </el-col>
                    <el-col class="pd5" :span="5" :title="item.projectName">
                    	{{item.projectName}}
                    </el-col>
                    <el-col class="pd5" :span="5" :title="item.grade">
                    	{{item.grade}}
                    </el-col>
                    <el-col class="pd5" :span="5" :title="item.student">
                    	{{item.student}}
                    </el-col>
                </el-row>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				附件：
			</dt>
			<dd class="detail-item-content" v-if="detail.fileAttchList != null && detail.fileAttchList.length">
				<!-- <a class="" v-for="(file, index) in detail.fileAttchList" :href="downloadUrl(file.resourceId, file.name)" :download="file.name" :title="file.name">{{file.name}}</a><br> -->
				<div v-if="ifManage">
					<!-- <a class="" v-for="(file, index) in detail.fileAttchList" :href="downloadUrl(file.resourceId, file.name)" :download="file.name" :title="file.name">{{file.name}}</a> -->
					<a class="" v-for="(file, index) in detail.fileAttchList" href="javascript:;" @click="downloadUrl(file.resourceId, file.name )" :title="file.name">{{file.name}}</a>
				</div>
				<div v-else>
					<p class="" v-for="(file, index) in detail.fileAttchList">{{file.name}}</p>
				</div>
			</dd>
			<dd class="detail-item-content" v-else>
				暂无附件
			</dd>
		</dl>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                ifManage: false
            }
        },
        props: {
            detail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
            if (this.$route.path.includes('contest/manage/entry/matchDetail')) {
                this.ifManage = true
            } else {
                this.ifManage = false
            }
        },
        filters: {
            phoneFormat(phone) {
                if (phone) {
                    return phone.replace(/(\S{3})\S*(\S{4})/, '$1****$2')
                }
                return 'ta没留下电话'
            },
            idCodeFormat(idCode) {
                if (idCode && idCode.length > 6) {
                    return idCode.replace(/(\S{3})\S*(\S{3})/, '$1************$2')
                } else if (idCode && idCode.length <= 6) {
                    return '*********'
                }
                return '暂无身份证号'
            },
            qqFormat(qq) {
                if (qq && qq.length > 4) {
                    return qq.replace(/(\S{2})\S*(\S{2})/, '$1******$2')
                } else if (qq && qq.length <= 4) {
                    return '****'
                }
                return '暂无微信或qq号'
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/offline_detail.scss';
</style>