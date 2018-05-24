<template>
  <div id="companydirectory" class="container">
    <div class="banner-bg"></div>
    <div class="list-container">
      <company-list></company-list>
    </div>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader'
  import CompanyList from '../../components/company-list/index'

  export default {
    components: {
      CompanyList,
      MyHeader
    },
    name: 'companydirectory'
  }
</script>

<style lang="scss" scoped>
 #companydirectory{
   box-shadow: 0 0 10px #ccc;
   .list-container{
     padding: 10px;
     background-color: $white-max;
   }
   .banner-bg {
     height: 474px;
     background-image: url('./images/directory-banner.jpg');
   }
 }
</style>
