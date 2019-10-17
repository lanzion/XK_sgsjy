<template>
  <el-select v-model="term.value" :placeholder="'选择学期'" @change="filter" :clearable="clearable">
    <el-option
      v-for="item in term.options"
      :key="item.id"
      :label="item.schoolYear"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  import { requestTermList } from '@/service/admin_evaluation.js'

  export default {
    name:'term_select',
    data() {
      return{
        term:{
          value: null,
          options: []
        }
      }
    },
    props:{
      selected: [Array, String],
      ifAll: {
        type: Boolean,
        default: true
      },
      clearable: {
        type: Boolean,
        default: false
      },
    },
    created(){
      this.getTermList();
      this.term.value = this.selected
    },
    methods:{
      getTermList(){
        requestTermList().then((res)=>{
          let allItem = { schoolYear: "全部", id: '' };
          let resArr = res.data.appendInfo && res.data.appendInfo.termList || []
          this.term.options = this.ifAll ? [allItem].concat(resArr) : resArr
          // this.term.options.unshift({id: '', schoolYear: '全部'});
        })
      },
      filter(val){
        this.$emit('update:selected', val)
      }
    }
  }
</script>
