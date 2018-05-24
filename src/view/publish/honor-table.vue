<template>
  <div id="honor-table">
    <div class="container-btn-add">
      <router-link to="/addhonor">
        <el-button type="primary" round icon="el-icon-edit">新增企业荣誉</el-button>
      </router-link>
    </div>
    <el-table
      :data="honorData"
      border
      style="width: 100%"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle">
      <el-table-column
        label="荣誉图片"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.honor_pic"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="honor_name"
        label="荣誉名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="发布日期">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <router-link :to="'/changehonor/'+scope.row.id">
            <el-button type="text">修改</el-button>
          </router-link>
          <el-button @click="delFun(scope.row.id)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="container-pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="honorTotal"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HonorTable',
    mounted () {
      this.loadList()
    },
    data () {
      return {
        centerStyle: { textAlign: 'center' },
        honorData: [],
        honorTotal: 0,
        currentPage: 1
      }
    },
    props: {
      keyword: {
        type: String,
        default: ''
      },
      pagesize: {
        type: Number,
        default: 10
      }
    },
    methods: {
      loadList () {
        this.$api.get(
          '/honor/listHonor',
          {
            honor_name: this.keyword,
            page: this.currentPage,
            pagesize: this.pagesize
          },
          resj => {
            this.honorData = resj.data.rows.map((item, index) => {
              item.honor_pic = `${this.baseUrl}/uploadify/renderThumb/${item.honor_pic}/90x90`
              return item
            })
            this.honorTotal = parseInt(resj.data.records)
          }
        )
      },
      delFun (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/honor/remove`,
            {id},
            resj => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.loadList()
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      pageChange (page) {
        this.currentPage = page
        this.loadList()
      }
    },
    watch: {
      keyword () {
        this.loadList()
      },
      pagesize () {
        this.loadList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  #honor-table{
    .container-btn-add{
      text-align: right;
      margin-bottom: 15px;
    }
    .container-pagination{
      text-align: center;
      margin-top: 15px;
    }
  }
</style>

