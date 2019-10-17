<template>
  <div id="resourcesDetails" class="theme-red backend-content__middle">
    <bread-crumb v-if="isFront != 'admin'"></bread-crumb>
    <doc-reader v-if="detailsData.documentId" v-bind="{docId: detailsData.documentId, width: 1200}"></doc-reader>
    <section v-else class="preview-img">
    	<img :src="getFileUrl(item.fileId)" v-if="item.fileType === '4'" height="684">
      <img src="../../../../../static/images/info.png" v-else height="684">
    </section>
    <div class="preview-msg">
    	<section class="resource-msg">
    		<div class="resource-title clearfix">
          <h5 class="fl">{{detailsData.name}}</h5>
          <com-panel-event module="resource" :title="detailsData.name"></com-panel-event>
        </div>
    		<div class="resource-content">资源简介：{{detailsData.introduction}}</div>
    		<div class="resource-classify">分类：{{detailsData.resourceType}}</div>
    		<div class="resource-technology">技术：{{detailsData.technologyType}}</div>
    		<div class="other-msg">浏览：<span>{{detailsData.browseNum}}</span> | 上传时间：<span>{{detailsData.createDate | dateFormat('yyyy-MM-dd')}}</span> | 下载：<span>{{detailsData.downNum}} | 大小：<span>{{detailsData.fileSize}}KB</span></span></div>
    		<button>下载</button>
    	</section>
      <evaluate-details :evaluateData="evaluateData"></evaluate-details>
    </div>
  </div>
</template>

<script>
let color = {
  red: ['#f85959', '#fee0e0'],
  grassGreen: ['#2cbb61', '#e2fbde']
};
import { loginInfo } from '@/js/getUserInfo.js'
import evaluateDetails from 'Common/evaluation/detailEvaluation.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import comPanelEvent from 'Common/button/com_panel_event.vue'
import { requestResourceDetails } from '@/service/resource.js'
import docReader from 'components/resource/doc_reader.vue'

export default {
  name: 'resourcesDetails',
  components: {
    'evaluate-details': evaluateDetails,
    'bread-crumb': breadcrumb,
    'com-panel-event':comPanelEvent,
    docReader,
  },
  data() {
  	return {
      evaluateData:{
        name:'',  //类型名称
        reportApi:'maker/evaluate/addReport',// 举报api
        dataUrl:{
            evaluateCount:'maker/evaluate/selectEvaluateCount',   //评论统计的url
            evaluateList:'maker/evaluate/getList',    //评论列表url
            evaluationAdd:'maker/evaluate/add',   //发表评论url
        },
        params:'busId',    //字段名
        id:'',
        labelType: '4'
      },
      detailsData:'',
      isFront:'',//根据路由判断是否是后台，控制面包屑的显示。
      isPraise:false
  	}
  },
  created() {
    this.evaluateData.id = this.$route.query.id;
    this.checkStatistics();
    // 设置返回的路由
    let router = this.$route.path.split('/');
    this.isFront = router[1];
  },
  watch: {
  },
  computed: {
  },
  mounted() {
    this.getResourceDetails();
  },
  methods:{
    /*
    *获取资源详情
    *id:资源id
    */
    getResourceDetails(){
      let data = { id: this.evaluateData.id };
      requestResourceDetails(data).then((res) => {
        console.log(res);
        this.detailsData = res.data.entity;
      })
    },
    /*
     * 错误提示信息
     */
    showMessage(msg, type) {
        type = type == undefined ? 'error' : type;
        this.$message({
            message: msg,
            type: type
        });
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../../asset/scss/vars.scss';
*{
  box-sizing: border-box;
}
#resourcesDetails{
	width: 100%;
	overflow: hidden;
	margin: 0 auto;
  // 资源详情部分
	.preview-img{
    width: 100%;
		margin-bottom: 50px;
    img{
      width: 100%;
    }
	}
	.preview-msg{
		width: 100%;
		overflow: hidden;
		border: 1px solid #c9c9c9;
		padding: 15px 35px;
		margin: 0 auto;
		.resource-msg{
			width: 100%;
			overflow: hidden;
			position: relative;
			.resource-title{
        height: 20px;
        width: 80%;
        margin-bottom: 15px;
				h5{
          font-size: 16px;
          color: #00a0e9;
          line-height: 20px;
          padding-right: 50px;
        }
			}
			.resource-content,.resource-classify,.resource-technology,.other-msg{
				font-size: 14px;
				line-height: 25px;
        width: 80%;
			}
      .resource-content{
        margin-bottom: 15px;
      }
			.other-msg{
				color: #999;
			}
			button{
				position: absolute;
				top: 0;
				right: 0;
				width: 60px;
				height: 25px;
				line-height: 25px;
				border: 1px solid #d00;
				color:#d00;
			}
			button:hover{
				background-color: #d00;
				color: #fff;
			}
		}
	}
}
</style>
