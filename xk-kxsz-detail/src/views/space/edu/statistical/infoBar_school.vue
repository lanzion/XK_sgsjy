<template>
  <div id="courseList">
    <div class="container listBox">
      <v-region></v-region>
      <v-tabs :tabs="tabs" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab"></v-tabs>
      <v-list :listData="listData"></v-list>
      <v-pagination></v-pagination>
    </div>
  </div>
</template>

<script>
  import tabs from './../common/classificationList/classification/tabs.vue'
  import region from './../common/screening/region.vue'
  import list from './../common/classificationList/list/graphic/list.vue'
  import pagination from './../common/pagination.vue'
  export default {
    name: 'courseList',
    components: {
      'v-region': region,
      'v-tabs': tabs,
      'v-list': list,
      'v-pagination': pagination
    },
    data () {
      return {
        tabs: [
          {name: '全部项目', type: 0},
          {name: '正在报名', type: 1},
          {name: '最多参与', type: 2}
        ],
        cur_tab: 0,
        is_always_req: true,
        is_search: true,
        count: {
          num: 234,
          name: '项目'
        },
        listData: {
          list_col: 5,
          dataUrl: 'maker/spaces/listByEdu',
          content1: {
            left: {name: '标题', type: 'eduName'},
            right: {name: '标题', type: ''}
          },
          content2: {
            left: [
              {name: '资源', type: 'resouceNum'},
              {name: '课程', type: 'coursesNum'},
              {name: '项目', type: 'projectsNum'},
              {name: '作品', type: 'productionNum'}
            ],
            right: {name: '标题', type: ''}
          },
          params: {
            pageSize: 8,
            pageNum: 1
          }
        }
      }
    },
    methods: {
      setCurTab: function (index) {
        this.cur_tab = index;
        // this.getList(index)
      }
    }
  }

</script>

<style lang='scss' scoped>
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;

var slice = ArrayProto.slice,
    toString = ObjProto.toString;

var util = {};

util.isArray = function(obj) {
    return Array.isArray(obj);
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
util.isArrayLike = function(obj) {
    if(typeof obj !== 'object' || !obj){
        return false;
    }
    var length = obj.length;
    return typeof length === 'number'
        && length % 1 === 0 && length >= 0 && length <= MAX_ARRAY_INDEX;
};

util.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};


util.each = function(obj, callback) {
    var i,
        len;
    if (util.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
            if (callback(obj[i], i, obj) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback(obj[i], i, obj) === false) {
                break;
            }
        }
    }
    return obj;
};

util.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    util['is' + name] = function(obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
});

util.toArray = function(list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {
    r