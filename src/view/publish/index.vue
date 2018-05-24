<template>
  <div id="publish">
    <el-tabs v-model="activeName" @tab-click="tabSelect()">
      <el-tab-pane name="project">
        <span slot="label"><i class="fa fa-building"></i> 工程案例</span>
        <project-table :keyword="projectSearchText"/>
      </el-tab-pane>
      <el-tab-pane name="honor">
        <span slot="label"><i class="fa fa-trophy"></i> 企业荣誉</span>
        <honor-table :keyword="honorSearchText"/>
      </el-tab-pane>
      <el-tab-pane v-if="hadProductTab" name="product">
        <span slot="label"><i class="fa fa-fire-extinguisher"></i> 消防产品</span>
        <product-table :keyword="productSearchText"/>
      </el-tab-pane>
    </el-tabs>
    <el-input class="search-input" placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search()">
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
  </div>
</template>

<script>
  import ProjectTable from './project-table.vue'
  import HonorTable from './honor-table.vue'
  import ProductTable from './product-table.vue'
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'Publish',
    components: {
      ProjectTable,
      HonorTable,
      ProductTable
    },
    mounted () {
      this.getMeberInfo()
      EventBus.$emit('setHomeHeader', '我的发布')
    },
    data () {
      return {
        activeName: 'project', // 当前标签的name属性
        hadProductTab: false,
        searchText: '',
        centerStyle: { textAlign: 'center' },
        projectSearchText: '',
        honorSearchText: '',
        productSearchText: ''
      }
    },
    methods: {
      getMeberInfo () {
        this.$api.get(
          '/ent/json',
          null,
          resj => {
            if (resj.data.ent_type.indexOf('2') !== -1) {
              this.hadProductTab = true
            }
          }
        )
      },
      tabSelect () {
        this.searchText = ''
        this.search()
      },
      search () {
        switch (this.activeName) {
          case 'project':
            this.projectSearchText = this.searchText
            break
          case 'honor':
            this.honorSearchText = this.searchText
            break
          case 'product':
            this.productSearchText = this.searchText
            break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  #publish{
    position: relative;
    padding: 0 35px 0 20px;
    .el-tabs__item{ // tabs样式改写
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    .search-input{
      position: absolute;
      right: 35px;
      top: 10px;
      width: 300px;
    }
  }
</style>
