<template>
  <div id="managerMenu">
    <ul class="list">
      <li v-for="item in menu" class="item">
        <template v-if="item.sub">
          <a @click="item.active=!item.active" :class="(item.active)?'router-link-active':''">{{item.title}}</a>
          <el-collapse-transition>
            <ul class="list" v-show="item.active">
              <li class="sub-item" v-for="subItem in item.sub">
                <router-link :to="subItem.href">{{subItem.title}}</router-link>
              </li>
            </ul>
          </el-collapse-transition>
        </template>
        <router-link :to="item.href" v-else>{{item.title}}</router-link>
      </li>
    </ul>
    <img src="../images/tel.png" alt="" class="img-responsive center-block">
  </div>
</template>

<script>
  export default {
    name: 'managerMenu',
    data () {
      return {
        show: true,
        height: '200px',
        active: '',
        menu: [
          {
            title: '会员中心',
            href: '/home/membercenter'
          },
          {
            title: '企业信息',
            href: '/home/companyinfo'
          },
          {
            title: '资质认证',
            href: '/home/qualification'
          },
          {
            title: '合同与付款',
            href: '/home/contract'
          },
          {
            title: '用户管理',
            active: '',
            sub: [
              {
                title: '联系人信息',
                href: '/home/contactinfo'
              },
              {
                title: '修改密码',
                href: '/home/changepwd'
              }
            ]
          },
          {
            title: '我的发布',
            href: '/home/publish'
          }
        ]
      }
    },
    mounted () {
      this.ifActive(this.menu)
    },
    methods: {
      collapse () {
        this.show = !this.show
      },
      ifActive (item) {
        let path = this.$route.path
        let active = false
        item.some((value, index) => {
          if (value.sub) {
            let flag = this.ifActive(value.sub)
            value.active = flag
          } else {
            if (path === value.href) {
              value.active = true
              active = true
            }
          }
        })
        return active
      }
    },
    watch: {
      $route () {
        this.ifActive(this.menu)
      }
    }
  }
</script>

<style lang="scss">
  #managerMenu {
    .list {
      list-style: none;
      padding: 0 10%;
      margin: 0 0 10px 0;
      text-align: center;
      overflow: hidden;
      .item {
        line-height: 50px;
        font-size: 16px;
        border-bottom: 1px solid #acacac;
        & > a {
          display: inline-block;
          outline: none;
          width: 100%;
          &.router-link-active {
            color: $hot-dark;
            &:before {
              content: "";
              border: 8px solid transparent;
              border-left-color: #c41335;
              position: absolute;
              margin-top: 17px; //triangle vertical center
              margin-left: -20px; //triangle margin to text
            }
          }
        }
      }
      .sub-item {
        font-size: 14px;
        line-height: 30px;
        & > a.router-link-active {
          color: $hot-light;
        }
      }
    }
  }
</style>
