<template>
  <div>
     <el-container class="left">
  <el-aside width="200px" class="side">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :background-color="$primary2"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <div v-for="item in menulist" :key="item.id">
         <el-submenu :index="item.id.toString()" v-if="item.children">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.url">{{item1.title}}</el-menu-item>
      </el-submenu>
          <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
      </div>
     
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.meta.title">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
</el-breadcrumb>
        <router-view class="view"></router-view></el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data(){
    return {
      menulist:[]
    }
  },
    computed:{
        ...mapGetters({}),
    },
    methods: {
        ...mapActions({}),
    },
    mounted(){
     let menulist=JSON.parse(sessionStorage.getItem("userInfo"))
     this.menulist=menulist.menus
    }
}
</script>

<style scoped lang="less">
@import "../../less/index.less";
.left{
    height: 100vh;
}
.el-aside{
    background: @primary2;
}
.el-header{
    background-color: @header-color;
}
.view{
    margin-top: 20px;
}
</style>