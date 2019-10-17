<template>
  <li :style="{'min-height': itemHeight + 'px'}" class="list-item table-layout pr">
    <slot name="content">
      <slot name="cover">
        <figure :style="{'width': picWidth + 'px', 'height': picHeight + 'px'}" class="pic table-cell pr">
          <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.imgUrl || item.cover || item.resourceId || item.fileId) || listDefault})`, width: picWidth + 'px', height: picHeight + 'px' }"></div>
          <!-- <img :src="getFileUrl(item.imgUrl || item.cover || item.resourceId || item.fileId) || listDefault" :width="picWidth" :height="picHeight" alt="" /> -->
          <slot name="status"></slot>
        </figure>
      </slot>
      <div class="content table-cell">
        <slot name="title">
          <h3 class="name ellipsis">{{item.name || item.title || item.workName || '暂无'}}</h3>
        </slot>
        <p v-if="module === 'works'" class="desc">{{(item.introduction || '暂无描述') | handleWorksDesc}}</p>
        <p v-else class="desc">
          {{(item.content || item.details || item.introduction || '暂无描述') | textOverflow(50, '......')}}</p>
        <slot></slot>
      </div>
      <slot name="operate"></slot>
    </slot>
  </li>
</template>

<script>
  export default {
    name: 'listRow', // 每行一个列表展示

    data () {
      return {}
    },

    props: {
      item: {
        type: Object,
        default () {
          return {}
        }
      },
      itemHeight: {
        type: Number,
        default: 190
      },
      module: {
        type: String,
        default: ''
      },
      picWidth: {
        type: Number,
        default: 266
      },
      picHeight: {
        type: Number,
        default: 160
      }
    },

    filters: {
      handleWorksDesc (txt = '', len = 50, rep = '。。。') { // 处理作品描述字段，字段包括HTML标签内容
        const reg = new RegExp('(.{' + len + '}).+')
        return txt.replace(/<[^>]+>|\n|\s|&nbsp;/gi, '').replace(reg, '$1' + rep) || ''
      }
    }
  }
</script>
<style lang="scss">
  @import "~@/asset/scss/vars.scss";

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      /*.login-title,*/
      .list-item.table-layout .operate .btn {
        color: $color-value;
        border: 1px solid $color-value;
        &:not(.disabled):hover {
          color: #fff;
          background-color: $color-value;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .list-item.table-layout {
    box-sizing: border-box;
    border-bottom: 1px dashed #c9c9c9;
    .pic {
      box-sizing: border-box;
      overflow: hidden;
      padding-right: 20px;
      .status {
        top: -14%;
        left: -14%;
        transform: rotate(-45deg);
        border: 40px solid transparent;
        border-bottom-color: #46c475;
        &.ing {
          border-bottom-color: #00a0e9;
        }
        &.end {
          border-bottom-color: #c9c9c9;
        }
      }
      .txt {
        top: 20px;
        left: -40px;
        width: 80px;
        text-align: center;
        color: #fff;
      }
    }
    .content {
      padding-right: 15%;
    }
    .name {
      max-width: 448px;
      line-height: 1.5;
      font-size: 22px;
      .link:hover {
        color: #00a0e9;
      }
    }
    .desc {
      line-height: 1.3;
      margin: 10px 0 12px;
      font-size: 14px;
      color: #333;
    }
    .other-info {
      font-size: 0;
      span {
        display: inline-block;
        width: 40%;
        line-height: 1.6;
        font-size: 14px;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /*&:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: 0;
        }*/
        &:nth-child(2n+1) {
          margin-right: 10px;
        }
        &.duration {
          width: 55%;
        }
      }
    }
    .gray {
      color: #999;
    }
    .blue {
      color: #00a0e9;
    }
    .operate {
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      .btn {
        box-sizing: border-box;
        display: block;
        width: 96px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        padding: 0;
        border-radius: 4px;
        &.disabled {
          cursor: default;
        }
      }
      .btn + .btn {
        margin-top: 18px;
      }
    }
  }
</style>
