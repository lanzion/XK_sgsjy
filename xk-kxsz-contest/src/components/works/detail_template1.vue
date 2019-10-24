<template>
	<div class="detail-template bgw">
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				项目类别：
			</dt>
			<dd class="detail-item-content">{{detail.projectName || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				作品名称：
			</dt>
			<dd class="detail-item-content">{{detail.name || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				申报组别：
			</dt>
			<dd class="detail-item-content">{{detail.declareName || '暂无'}}</dd>
		</dl>
		<!-- <dl class="detail-item clearfix">
			<dt class="detail-item-label">
				辅导机构：
			</dt>
			<dd class="detail-item-content">{{detail.declareTemplate.institution || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				机构地址：
			</dt>
			<dd class="detail-item-content">{{detail.declareTemplate.address || '暂无'}}</dd>
		</dl> -->
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				项目成员：
			</dt>
			<dd class="detail-item-content">
				<el-row class="member-title">
					<el-col :span="2">身份</el-col>
					<el-col :span="2">姓名</el-col>
					<el-col :span="5">身份证号码</el-col>
					<el-col :span="3">学校</el-col>
					<el-col :span="3">电话</el-col>
					<el-col :span="2">家长姓名</el-col>
					<el-col :span="3">家长电话</el-col>
					<el-col :span="3">微信/QQ</el-col>
				</el-row>
				<el-row class="member-list" v-for="(item, index) in detail.declareTemplate.declareMemberTemplate" :key="index">
					<el-col :span="2">
						<span v-if="index === 0">负责人</span>
						<span v-else>成员{{index}}</span>
					</el-col>
					<el-col class="pd5" :span="2" :title="item.name">
						{{item.name || '暂无'}}
					</el-col>
					<el-col class="pd5" :span="5" v-if="item.name">
						<span v-if="ifManage">{{item.idCode}}</span>
						<span v-else :title="item.idCode">{{item.idCode | idCodeFormat}}</span>
					</el-col>
					<el-col class="pd5" :span="3" :title="item.schoolName" v-if="item.name">
						{{item.schoolName || '暂无'}}
					</el-col>
					<el-col class="pd5" :span="3" v-if="item.name">
						<span v-if="ifManage">{{item.phone}}</span>
						<span v-else>{{item.phone | phoneFormat}}</span>
					</el-col>
					<el-col class="pd5" :span="2" :title="item.parentName" v-if="item.name">
						{{item.parentName || '暂无'}}
					</el-col>
					<el-col class="pd5" :span="3" v-if="item.name">
						<span v-if="ifManage">{{item.parentPhone}}</span>
						<span v-else>{{item.parentPhone | phoneFormat}}</span>
					</el-col>
					<el-col class="pd5" :span="3" v-if="item.name">
						<span v-if="ifManage">{{item.qq}}</span>
						<span v-else :title="item.qq">{{item.qq | qqFormat}}</span>
					</el-col>
				</el-row>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				辅导老师：
			</dt>
			<dd class="detail-item-content">
				<el-row class="member-title">
					<el-col :span="4">姓名</el-col>
					<el-col :span="5">身份证号码</el-col>
					<el-col :span="5">学校</el-col>
					<el-col :span="5">电话</el-col>
					<el-col :span="5">微信/QQ</el-col>
				</el-row>
				<el-row class="member-list" v-if="detail.declareTemplate.declareTeacherTemplate.length">
					<el-col class="pd5" :span="4" :title="detail.declareTemplate.declareTeacherTemplate[0].name">
						{{detail.declareTemplate.declareTeacherTemplate[0].name || '暂无'}}
					</el-col>
					<el-col class="pd5" :span="5">
						<span v-if="ifManage">{{detail.declareTemplate.declareTeacherTemplate[0].idCode}}</span>
						<span v-else>{{detail.declareTemplate.declareTeacherTemplate[0].idCode | idCodeFormat}}</span>
					</el-col>
					<el-col class="pd5" :span="5" :title="detail.declareTemplate.declareTeacherTemplate[0].schoolName">
						{{detail.declareTemplate.declareTeacherTemplate[0].schoolName || '暂无'}}
					</el-col>
					<el-col class="pd5" :span="5">
						<span v-if="ifManage">{{detail.declareTemplate.declareTeacherTemplate[0].phone}}</span>
						<span v-else>{{detail.declareTemplate.declareTeacherTemplate[0].phone | phoneFormat}}</span>
					</el-col>
					<el-col class="pd5" :span="5">
						<span v-if="ifManage" :title="detail.declareTemplate.declareTeacherTemplate[0].qq">{{detail.declareTemplate.declareTeacherTemplate[0].qq}}</span>
						<span v-else>{{detail.declareTemplate.declareTeacherTemplate[0].qq | qqFormat}}</span>
					</el-col>
				</el-row>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				项目简介：
			</dt>
			<dd class="detail-item-content">{{detail.description}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				创意与发明图：
			</dt>
			<dd class="detail-item-content" v-if="detail.imgAttchList != null && detail.imgAttchList.length">
				<img class="" width="266" height="188" v-for="(file, index) in detail.imgAttchList" title="点击查看原图" @click="showBigImg(file.resourceId)" :src="getFileUrl(file.resourceId)" />
			</dd>
			<dd class="detail-item-content" v-else>
				暂无图片
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				附件：
			</dt>
			<dd class="detail-item-content" v-if="detail.fileAttchList != null && detail.fileAttchList.length">
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
		<img-preview :visible.sync="visible" :imgUrl="imgUrl"></img-preview>
	</div>
</template>

<script>
    import imgPreview from '@/components/common/img_preview/img_preview.vue'

    export default {
        components: {
            'img-preview': imgPreview
        },
        data() {
            return {
                visible: { // 查看大图的控制
                    show: false
                },
                imgUrl: '',
                ifManage: false
            }
        },
        props: {
            detail: {
                type: Object,
                default() {
                    return {
                        declareTemplate: {
                            institution: '',
                            address: ''
                        }
                    }
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
        methods: {
            showBigImg(url) {
                this.visible.show = true
                this.imgUrl = url
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