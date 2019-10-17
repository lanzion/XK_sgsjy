<template>
  <section class='statistics-model container'>
    <ul id="statistics-model">
      <li class='item-box' v-for='item in items'>
        <div class='item-box-statis'>
          <i class='icon-model' :class='item.model'></i>
          <span class='item-box-num'>{{ item.total }}</span>
        </div>
        <span class='item-box-title'>{{ item.title }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
	import data from 'res/datas/statistics.json'
  export default {
    el: '#statistics-model',
    data() {
    	return {
    		items: data.entity.resultData
    	}
    }
  }
</script>

<style lang='scss' scoped>
	$start-color: #3a97d5;
  $end-color: #1b7fc2;

	.statistics-model {
	  padding: 22px 0;
	  color: #3e3e3e;
	  line-height: 2em;

	  .container {
		  text-align: center;
	  }

    .item-box {
      display: inline-block;
      width: 124px;
      height: 118px;
      margin: 30px 32px;

      .item-box-statis {
        color: #fff;
        background: $start-color;
        background: -moz-linear-gradient(top,  $start-color 0%, $end-color 100%);
        background: -webkit-linear-gradient(top,  $start-color 0%,$end-color 100%);
        background: linear-gradient(to bottom,  $start-color 0%,$end-color 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#{$start-color}', endColorstr='#{$end-color}',GradientType=0 );

        .icon-model {
          font-size: 52px;
        }
        .item-box-num {
          font-size: 28px;
        }
      }

      .item-box-title {
        font-size: 16px;
        line-height: 3em;
      }
    }

	}
</style>
