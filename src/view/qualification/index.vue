<template>
  <div>
    <div height='100px'>
      <p v-if='type'>您选择的企业类型为{{type}},请完成相应企业类型资质材料提交。</p>
      <p v-if='!type'>您尚未选择企业类型</p>
      <strong>审核通过才能公开对应企业类型。</strong>
    </div>
    <div>
      <el-row :gutter="5">
        <el-col :span="8">
          <router-link to="/home/qualification/estate?type=HD" class="grid-content bg-type1">房地产企业</router-link>
        </el-col>
        <el-col :span="10">
          <router-link to='/home/qualification/estate?type=PRO' class="grid-content bg-type2">消防产品厂家</router-link>
        </el-col>
        <el-col :span="6">
          <router-link to='/home/qualification/estate?type=FDU' class="grid-content bg-type3">消防设计单位</router-link>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <router-link to='/home/qualification/estate?type=FCU' class="grid-content bg-type4">消防施工单位</router-link>
        </el-col>
        <el-col :span="6">
          <router-link to='/home/qualification/estate?type=FTS' class="grid-content bg-type5">消防技术服务机构</router-link>
        </el-col>
        <el-col :span="6">
          <router-link to='/home/qualification/estate?type=OTH' class="grid-content bg-type6">其他</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'

  export default {
    name: 'qualification',
    data () {
      return {
        type: ''
      }
    },
    mounted () {
      this.load()
      EventBus.$emit('setHomeHeader', '资质认证')
    },
    methods: {
      load () {
        this.$api.get('/ent/json', this.type,
        resj => {
          if (!resj.data.ent_type) {
            this.$alert('请先完成企业信息', '温馨提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.replace('/home/companyinfo')
              }
            })
          } else {
            this.type = resj.data.ent_type.replace('1', '房地产企业')
            .replace('2', '消防产品厂家')
            .replace('3', '消防设计单位')
            .replace('4', '消防施工单位')
            .replace('5', '消防技术服务机构')
            .replace('6', '其他')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-main {
    overflow: initial;
    padding-right: 20%;
  }

  .el-row {
    height: auto;
    margin-bottom: 5px;

    &
    :last-child {
      margin-bottom: 0;
    }

  }

  .el-col {
    border-radius: 0px;
  }

  .bg-type1 {
    background: #3387EA
  }

  .bg-type2 {
    background: #F9BE3E
  }

  .bg-type3 {
    background: #D2583D
  }

  .bg-type4 {
    background: #86A644
  }

  .bg-type5 {
    background: #5CB1E1
  }

  .bg-type6 {
    background: #33AF95
  }

  .grid-content {
    display: block;
    border-radius: 0px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    color: white;
    font-size: 18px;
    padding-left: 33px;
    padding-right: 33px;
  }

  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }
</style>
