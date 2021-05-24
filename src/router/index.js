import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export const indexRouters = [
  {
    path:"/menu",
    component:()=>import("../pages/menu/menu.vue"),
    meta:{
      title:"菜单管理"
    }
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    meta:{
      title:"角色管理"
    }
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    meta:{
      title:"管理员管理"
    }
  },{
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    meta:{
      title:"商品分类"
    }
  },
  {
    path:"specs",
    component:()=>import("../pages/specs/specs.vue"),
    meta:{
      title:"商品规格"
    }
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    meta:{
      title:"商品管理"
    }
  },
  {
    path:"banner",
    component:()=>import("../pages/banner/banner.vue"),
    meta:{
      title:"轮播图管理"
    }
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    meta:{
      title:"秒杀活动"
    }
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    meta:{
      title:"会员管理"
    }
  },
]

const routes = [
 //配置一级路由
 {
   path:"/login",
   component:()=>import("../pages/login/login.vue")
 },
 {
   path:"/",
   component:()=>import("../pages/index/index.vue"),
   children:[
    {
      path:"home",
      component:()=>import("../pages/home/home.vue")
    },
    ...indexRouters,
    {
      path:"",
      redirect: "home"
    },
   ]
 },
 {
   path:"*",
   redirect:"/login"
 }
]


const router = new VueRouter({
  routes,
  mode:"history"
})
//全局前置守卫
router.beforeEach((to,from,next)=>{
  let islogin = sessionStorage.getItem("userInfo");
  if(to.path==="/login"){
    next()
    return
  }
  if(islogin){
    next()
    return
  }
  next('/login')
})


export default router
