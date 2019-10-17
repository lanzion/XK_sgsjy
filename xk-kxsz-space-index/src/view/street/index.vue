<template>
  <div class="street-wrapper">
    <!-- <nav class="nav-street">
      <div class="container">
        <router-link v-for="(item, index) in navLink" :to="item.url" :key="index" class="nav-link">{{item.name}}
        </router-link>
      </div>
    </nav> -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import { getNavList } from '@/mixin/getNavList.js'

  export default {
    name: 'street', // 创客街区

    // mixins: [getNavList],

    data () {
      return {
      }
    },

    created () {
      // this.getNavList('创客街区')
    },

    methods: {}
  }
</script>

<style lang="scss">
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cascader.scss";
  @import '~@/asset/scss/vars.scss';

  $theme-color: #00a9e0;
  $color-light-red: #fe7545;
  $tab-height: 42px;

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .street-wrapper .tabs .el-tabs__item.is-active{
        background-color: $color-value;
        color: #fff;
      }
    }
  }

  .street-wrapper {
    .list-group {
      margin-top: 30px;
      /*&:first-child {
        margin-top: 30px;
      }*/
    }
    .list-group__title {
      line-height: 36px;
      font-size: 14px;
      border-bottom: 1px solid #e0e0e0;
      .font-large {
        margin-right: 12px;
        font-size: 24px;
      }
      .btn-more {
        color: #999;
        &:hover {
          color: $theme-color;
        }
      }
    }
    #list {
      margin-top: 10px;
      &.has-no-data {
        margin-bottom: 40px;
        font-size: 0;
      }
    }
    .list-item__box {
      font-size: 14px;
      .list-item-img {
        display: block;
      }
      .list-item-title {
        line-height: 1.5;
        margin-top: 6px;
        margin-bottom: 2px;
      }
      .about {
        border: 1px solid #e0e0e0;
        padding: 0 14px 10px;
        overflow: hidden;
        background-color: #fff;
        .line-info {
          line-height: 20px;
          margin-top: 10px;
        }
        &.no-border {
          border: 0;
        }
      }
      .info-group {
        color: #999;
        .info-item + .info-item {
          margin-left: 20px;
        }
      }
      .dead-line {
        line-height: 20px;
        margin-top: 10px;
        padding-top: 10px;
        font-size: 14px;
        color: #999;
        border-top: 1px solid #e0e0e0;
      }
      .desc {
        height: 32px;
        line-height: 1.2;
        margin-top: 8px;
        font-size: 14px;
        color: #999;
      }
    }
    [class^=tabs-count] {
      color: $color-light-red;
    }
    .light-red {
      color: $color-light-red;
    }
    .tabs {
      height: $tab-height;
      margin: 20px 0 10px;
      padding-right: 10px;
      background-color: #fff;
      .el-tabs__header {
        margin-bottom: 0;
        border-bottom: 0;
      }
      .tabs-right {
        right: 10px;
      }
      .el-tabs__item {
        height: $tab-height;
        line-height: $tab-height;
        font-size: 14px;
        color: #333;
        border-right: 1px solid #f2f2f2;
      }
      .el-tabs__active-bar {
        display: none;
      }
    }
    .screeningBox.no-field {
      .classify-box {
        margin-top: 10px;
      }
    }
    .category-box {
      .select-region, .select-school {
        margin-right: 20px;
        height: 32px;
        width: 232px;
      }
    }
    .isNull-list {
      margin: 0;
    }
  }
</style>
<style lang="scss" scoped>
  $theme-color: #2f3440;
  $theme-color__active: #484c57;
  .street-wrapper {
    .nav-street {
      font-size: 0;
      background-color: $theme-color;
    }
    .nav-link {
      display: inline-block;
      font-size: 16px;
      padding: 16px 20px;
      color: #fff;
      &.active {
        background-color: $theme-color__active;
      }
    }
  }
</style>
