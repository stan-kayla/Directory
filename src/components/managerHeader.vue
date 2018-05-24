<template>
  <div id="managerHeader">
    {{title}}
  </div>
</template>

<script>
  import { EventBus } from '../util/eventBus'

  export default {
    name: 'managerHeader',
    data () {
      return {
        title: ''
      }
    },
    mounted () {
      EventBus.$on('setHomeHeader', val => {
        this.title = val
      })
    }
  }
</script>

<style lang="scss" scoped>
  #managerHeader {
    background-color: #e5e5e5;
    height: 55px;
    line-height: 55px;
    padding-left: 45px;
    font-size: 23px;
    font-weight: bold;
  }
</style>
