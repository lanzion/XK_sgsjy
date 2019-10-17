<template>
    <div>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"
            :http-request="uploadSectionFile"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
// import md5 from 'js-md5'
// import fetch from './fetch'
// import axios from '@/utils/axios'

export default {
    name: 'element-upload',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    props: [
        'tabs',
        'cur_tab',
        'title',
        'more',
        'count',
        'router',
        'btns',
        'total',
        'is_search'
    ],
    mounted() {
        this.initTab()
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        uploadSectionFile(file) {
            console.log('555555555555555',file)
        }


    },
    watch: {

    }
}
</script>

<style lang='scss'></style>
