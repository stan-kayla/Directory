<template>
  <div id="project-table">
    <div class="container-btn-add">
      <router-link to="/addproject">
        <el-button type="primary" round icon="el-icon-edit">新增工程案例</el-button>
      </router-link>
    </div>
    <el-table
      :data="projectData"
      border
      style="width: 100%"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle">
      <el-table-column
        label="项目图片"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.case_mainpic"/>
        </template>
      </el-table-column>
      <el-table-column
        label="项目名称"
        width="300">
        <template slot-scope="scope">
          <a class="detail-link" :href="baseUrl+'/cases/view/'+ scope.row.id">{{scope.row.case_name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="creat_time"
        label="发布日期">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <router-link :to="'/changeproject/'+scope.row.id">
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
        :total="projectTotal"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ProjectTable',
    mounted () {
      this.loadList()
    },
    data () {
      return {
        centerStyle: { textAlign: 'center' },
        projectData: [],
        projectTotal: 0,
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
          '/cases/view',
          {
            case_name: this.keyword,
            page: this.currentPage,
            pagesize: this.pagesize
          },
          resj => {
            this.projectData = resj.data.rows.map((item, index) => {
              item.case_mainpic = `${this.baseUrl}/uploadify/renderThumb/${item.case_mainpic}/90x90`
              return item
            })
            this.projectTotal = parseInt(resj.data.records)
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
            `/cases/remove`,
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
  #project-table{
    .detail-link{
      color: #6079b2;
      &:hover{
        color: $hot-dark;
        text-decoration: underline;
      }
    }
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
