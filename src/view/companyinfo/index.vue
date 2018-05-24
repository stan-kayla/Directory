<template>
  <div id="companyInfo" v-cloak>
    <el-tabs v-model="activeName">
      <el-tab-pane label="企业信息(必填)" name="company">
        <company-info-tab :activeTab.sync="activeName"></company-info-tab>
      </el-tab-pane>
      <el-tab-pane label="电子合同委托书(必填)" name="contract">
        <contract-info-tab></contract-info-tab>
      </el-tab-pane>
<!--      <el-tab-pane label="营业执照(必填)" name="sign">
        <sign-info-tab></sign-info-tab>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'
  import CompanyInfoTab from './companyInfoTab'
  import ContractInfoTab from './contractInfoTab'
  import SignInfoTab from './signInfoTab.vue'

  export default {
    name: 'companyInfo',
    components: {
      SignInfoTab,
      ContractInfoTab,
      CompanyInfoTab
    },
    data () {
      return {
        activeName: 'company'
      }
    },
    mounted () {
      console.log(process.env)
      EventBus.$emit('setHomeHeader', '企业信息')
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  #companyInfo {
    [v-cloak] {
      display: none;
    }
    .status-alert {
      margin-bottom: 15px;
    }
  }
</style>
