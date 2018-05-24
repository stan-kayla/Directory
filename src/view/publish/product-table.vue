<template>
  <div id="product-table">
    <el-table
      :data="productData"
      border
      style="width: 100%"
      :header-cell-style="centerStyle"
      :cell-style="centerStyle">
      <el-table-column
        label="产品名称"
        width="150">
        <template slot-scope="scope">
          <a class="detail-link" :href="baseUrl+'/product/view/'+ scope.row.id">{{scope.row.productName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="fireproductcode"
        label="产品类别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="model"
        label="产品型号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="certificateNo"
        label="证书编号"
        width="160">
      </el-table-column>
      <el-table-column
        label="发证日期"
        width="100">
        <template slot-scope="scope">
          {{scope.row.certDateStart | timeFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="截止日期"
        width="100">
        <template slot-scope="scope">
          {{scope.row.certDateEnd | timeFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="证书状态">
        <template slot-scope="scope">
          <span class="cer-state">{{scope.row.inState}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="container-pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="productTotal"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ProductTable',
    mounted () {
      this.loadList()
    },
    data () {
      return {
        centerStyle: { textAlign: 'center' },
        productData: [],
        productTotal: 0,
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
          '/product/mylist',
          {
            product_name: this.keyword,
            page: this.currentPage,
            pagesize: this.pagesize
          },
          resj => {
            this.productData = resj.data.rows
            this.productTotal = parseInt(resj.data.records)
          }
        )
      },
      pageChange (page) {
        this.currentPage = page
        this.loadList()
      }
    },
    filters: {
      timeFormat (time) {
        return time.slice(0, 10)
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
  #product-table{
    .detail-link{
      color: #6079b2;
      &:hover{
        color: $hot-dark;
        text-decoration: underline;
      }
    }
    .container-pagination{
      text-align: center;
      margin-top: 15px;
    }
    .cer-state{
      color: #67C23A;
    }
  }
</style>
