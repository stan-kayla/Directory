<template>
  <div id="manager" class="container">
    <manager-header></manager-header>
    <el-row>
      <el-col :span="4">
        <manager-menu></manager-menu>
      </el-col>
      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ManagerHeader from '../components/managerHeader.vue'
  import ManagerMenu from '../components/myMenu.vue'

  export default {
    components: {
      ManagerMenu,
      ManagerHeader
    },
    name: 'manager'
  }
</script>

<style lang="scss" scoped>
  #manager {
    background-color: $white-max;
    padding: 60px 0 40px;
    box-shadow: 0 0 10px #ccc;
    .content {
      min-height: 904px;
      border-left: 1px solid #ddd;
      padding: 20px;
    }
    .router-link-active {
      background-color: red;
    }
  }
</style>
