<template>
	<!-- 评论部分 -->
		<div id="activityMember">
			<ul class="list clearfix" v-if="memberList.length > 0">
        <li class="fl" v-for="item in memberList" :style="{width:width}">
          <div class="img-box">
            <router-link :to="dynamicPath(item)"><img :src="getFileUrl(item.headImageUrl) || faceDefault" width="72" height="72"></router-link>
          </div>
          <p class="name-box">
            <router-link :to="dynamicPath(item)">{{item.createName}}</router-link>
          </p>
        </li>
      </ul>
      <p class="empty-block" v-else>暂无数据</p>
		</div>
</template>

<script type="text/javascript">
  import { requestAuditedMember } from '@/service/activity.js';
	export default {
  name: 'activityMember',
  components: {
	},
  data () {
  	return {
		  width:100/9 + '%',
  	}
  },
  props:{
    memberList:{
      type:Array,
      default () {
        return []
      }
    }
  },
  mounted(){

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
#activityMember{
	width: 100%;
  overflow: hidden;
  padding: 10px 20px 20px;
  .list{
    width: 100%;
    overflow: hidden;
    li{
      overflow: hidden;
      margin-bottom: 20px;
      .img-box{
        width: 100%;
        height:73px;
        text-align: center;
        margin-bottom: 5px;
        img{
          border-radius: 1000px;
        }
      }
      .name-box{
        width: 100%;
        text-align: center;
      }
      &:hover{
        a{
          color: #2797ed;
        }
      }
    }
  }
}
</style>