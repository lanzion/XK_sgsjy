<template>
  <div :style="{fontSize: iconSize + 'px'}" class="operate">
    <a v-if="generateIcon('moveup')" @click.stop="moveUp" href="javascript:;" class="btn-moveup btn" title="上移"><i class="icon-btn-moveup icon"></i></a>
    <a v-if="generateIcon('movedown')" @click.stop="moveDown" href="javascript:;" class="btn-movedown btn" title="下移"><i class="icon-btn-movedown icon"></i></a>
    <a v-if="generateIcon('edit')" @click.stop="editItem" href="javascript:;" class="btn-edit btn" title="编辑"><i class="icon-btn-edit2 icon"></i></a>
    <a v-if="generateIcon('share')" href="javascript:;" class="btn-share btn" title="分享"><i class="icon-btn-share icon"></i></a>
    <a v-if="generateIcon('submit')" href="javascript:;" class="btn-submit btn" title="提交"><i class="icon-btn-submit icon"></i></a>
    <!-- <a v-if="generateIcon('download')" :href="downloadUrl(downloadResource.id, downloadResource.name, downloadResource.fileExt)" :download="downloadResource.name" class="btn-download btn" title="下载"><i class="icon-btn-download icon"></i></a> -->
    <a v-if="generateIcon('download')" @click="downloadUrl(downloadResource.id, downloadResource.name)" class="btn-download btn" title="下载"><i class="icon-btn-download icon"></i></a>
    <a v-if="generateIcon('delete')" @mouseenter="popoverIsVisible = true" @mouseleave="popoverIsVisible = false" href="javascript:;" class="btn-delete btn">
      <i class="icon-btn-delete icon"></i>
      <transition name="zoom">
        <div v-show="popoverIsVisible" class="delete-popover">
          <p class="tip-title">确定要删除这个{{label}}吗？</p>
          <div class="btn-row">
            <button @click.stop="popoverIsVisible = false" class="btn-cancel" type="button">取消</button>
            <button @click.stop="deleteItem" class="btn-ok" type="button">确定</button>
          </div>
        </div>
      </transition>
    </a>
  </div>
</template>

<script>
  import {fileBaseUrl} from '@/js/common-config.js'

  export default {
    name: 'backendOperate', // 删除、编辑、上移等操作功能组件
    data () {
      return {
        fileBaseUrl,
        popoverIsVisible: false // 删除提示框是否显示
      }
    },
    props: {
      iconGroup: { // 需要展示的icon
        type: Array,
        default () { // 默认展示编辑与删除
          return ['edit', 'delete']
        }
      },
      iconSize: {
        type: Number,
        default: 18
      },
      label: { // 标识属于什么模块
        type: String,
        default: '课程'
      },
      downloadResource: { // 下载资源信息
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {},
    methods: {
      deleteItem () { // 删除
        this.$emit('on-delete')
        this.popoverIsVisible = false
      },
      editItem () { // 编辑
        this.$emit('on-edit')
      },
      generateIcon (type) { // 生成对应的icon
        return this.iconGroup.includes(type)
      },
      moveUp () { // 上移
        this.$emit('on-move-up')
      },
      moveDown () { // 下移
        this.$emit('on-move-down')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .operate {
    position: absolute;
    right: -6px;
    top: 20%;
    box-sizing: border-box;
    font-size: 0;
    .btn {
      display: inline-block;
      line-height: 1;
      padding: 6px;
    }
    .btn .icon {
      margin: 0;
    }
    .btn-delete {
      position: relative;
      .delete-popover {
        position: absolute;
        box-sizing: border-box;
        top: -98px;
        left: -78px;
        width: 182px;
        height: 94px;
        border: 1px solid #c9c9c9;
        cursor: default;
        background: #fff;
        padding: 20px 10px 10px;
        font-size: 12px;
        text-align: center;
        box-shadow: 2px 2px 2px #ddd;
        transform: scale(1);
        &.zoom-enter-active, &.zoom-leave-active {
          transition: all .3s .15s;
        }
        &.zoom-enter, &.zoom-leave-to {
          transform: scale(0);
        }
        &:after {
          position: absolute;
          left: 86px;
          bottom: -6px;
          width: 10px;
          height: 10px;
          background: #fff;
          border: 1px solid #c9c9c9;
          border-left: 0;
          border-top: 0;
          content: "";
          transform: rotateZ(45deg);
        }
        .tip-title{
          line-height: 1;
        }
      }
      .btn-row {
        line-height: 1;
        margin-top: 26px;
        text-align: right;
        button {
          font-size: 12px;
          border: 0;
          &.btn-cancel {
            background: #fff;
            color: #d00;
          }
          &.btn-ok {
            width: 36px;
            height: 22px;
            background: #d00;
            color: #fff;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
