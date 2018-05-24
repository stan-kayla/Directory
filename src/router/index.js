import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/view/index')
const Login = () => import('@/view/login')
const ForgetPsw = () => import('@/view/forgetpsw')
const Register = () => import('@/view/register')
const Protocol = () => import('@/view/protocol')
const RegisterCompany = () => import('@/view/registercompany')
const RegSuccess = () => import('@/view/regsuccess')
const MemberCenter = () => import('@/view/membercenter')
const Publish = () => import('@/view/publish')
const AddHonor = () => import('@/view/addhonor')
const AddProject = () => import('@/view/addproject')
const Qualification = () => import('@/view/qualification')
const Estate = () => import('@/view/qualification/estate')
const Contract = () => import('@/view/contract')
const CompanyInfo = () => import('@/view/companyInfo/companyInfoTab')
const ContactInfo = () => import('@/view/contactInfo')
const ChangePwd = () => import('@/view/changepassword')
const HomePage = () => import('@/view/homepage')
const CompanyDirectory = () => import('@/view/companydirectory')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: Login,
      meta: {userState: 3}
    },
    {
      path: '/home',
      component: Index,
      meta: {userState: 1},
      children: [
        {path: 'membercenter', component: MemberCenter, meta: {userState: 1}},
        {path: 'publish', component: Publish, meta: {userState: 1}},
        {path: 'qualification', component: Qualification, meta: {userState: 1}},
        {path: 'qualification/estate', component: Estate, meta: {userState: 1}},
        {path: 'contract', component: Contract, meta: {userState: 1}},
        {path: 'companyinfo', component: CompanyInfo, meta: {userState: 1}},
        {path: 'contactinfo', component: ContactInfo, meta: {userState: 1}},
        {path: 'changepwd', component: ChangePwd, meta: {userState: 1}}
      ]
    },
    {
      path: '/addhonor',
      component: AddHonor,
      meta: {
        userState: 1
      }
    },
    {
      path: '/changehonor/:id',
      component: AddHonor,
      meta: {
        userState: 1
      }
    },
    {
      path: '/addproject',
      component: AddProject,
      meta: {
        userState: 1
      }
    },
    {
      path: '/changeproject/:id',
      component: AddProject,
      meta: {
        userState: 1
      }
    },
    {
      path: '/forgetpsw',
      component: ForgetPsw
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/protocol',
      component: Protocol
    },
    {
      path: '/registercompany',
      component: RegisterCompany,
      meta: {
        userState: 2
      }
    },
    {
      path: '/regsuccess',
      component: RegSuccess,
      meta: {
        userState: 1
      }
    },
    {
      path: '/companydirectory',
      component: CompanyDirectory,
      meta: {
        userState: 1
      }
    },
    {
      path: '*',
      component: Login,
      meta: {userState: 3}
    }
  ],
  mode: 'history'
})
