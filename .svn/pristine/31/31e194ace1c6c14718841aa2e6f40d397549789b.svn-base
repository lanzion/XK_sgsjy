<template>
    <section id="banner">
        <el-carousel height='400px'>
            <el-carousel-item v-for='(item, index) in imgs' :key="index">
                <a class='banner-img' :href="item.url" :style='{"background-image": "url(" + getFileUrl(item.imageUrl) + ")"}'></a>
            </el-carousel-item>
        </el-carousel>
    </section>
</template>
<!-- autoplay -->
<script>
import { requestBanner } from '@/service/common.js'
export default {
    name: 'banner',
    data() {
        return {
            imgs: []
        }
    },
    computed: {
    },
    created() {
        /*
         * 轮播图类型: bannerType
         * 1.平台首页,11.示范校
         * 2.教育-项目,3.教育-实训,12.教育-课程
         * 4.教育局空间,5.学校空间,6.班级空间,7.教师空间,8.学生空间,9.兴趣组空间,18.企业空间,19.投资人空间,20.投资机构空间,21.众创空间
         * 10.导师工作室
         */
        const path = this.$route.path
        let rootPath = path.match(/\/\w+/g)[0];
        let type = 1;
        switch (rootPath) {
            case '/space':
                type = path.includes('educationBureau') && '4'
                    || path.includes('school') && '5'
                    || path.includes('clasz') && '6'
                    || path.includes('teacher') && '7'
                    || path.includes('student') && '8'
                    || path.includes('interests') && '9'
                break;
            case '/education':
              type = path.includes('project') && '2'
                || path.includes('course') && '12'
                || path.includes('train') && '3'
              break;
            // case '/educationBureau':
            //     type = '4';
            //     break;
            // case '/school':
            //     type = '5';
            //     break;
            // case '/clasz':
            //     type = '6';
            //     break;
            // case '/teacher':
            //     type = '7';
            //     break;
            // case '/student':
            //     type = '8';
            //     break;
            // case '/interests':
            //     type = '9';
            //     break;
            case '/studioMember':
                type = '10';
                break;
            case '/model':
                type = '11';
                break;
            case '/enterprise':
                type = '18';
                break;
            case '/investor':
                type = '19';
                break;
            case '/investOrg':
                type = '20';
                break;
            case '/multSpace':
                type = '21';
                break;
            case '/street':
                type = path.includes('index') && '13'
                    || path.includes('excellent') && '14'
                    || path.includes('activity') && '15'
                    || path.includes('lagou') && '16'
                    || '17'
                break;
        }
        requestBanner({ 'bannerType': type }).then(res => {
            this.imgs = res.data.appendInfo.list
        })
    }
}
</script>

<style lang='scss' scoped>
    .el-carousel__item .banner-img {
        display: block;
        width: 100%;
        height: 100%;
    	background-position: center;
    	background-size: cover;
    }
</style>
