<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="input">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="input">
        <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      </div>
     <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
     </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqlogin} from "../../request/api"
import {successAlert,errorAlert} from "../../utils/alert"
export default {
  props: [],
  data() {
    return {
      user:{
        username:"",
        password:""
      }

    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
    //跳转页面
    login(){
      reqlogin(this.user).then(res=>{
        if(res.data.code==200){
          console.log(res);
          sessionStorage.setItem("userInfo",JSON.stringify(res.data.list))
          successAlert("登录成功")
          this.$router.push("/")
        }else{
          errorAlert(res.data.msg)
        }
      })  
    }
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(@primary, @primary2);
  position: relative;
}
.con {
  width: 300px;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
}
.center{
    text-align: center;
     margin-bottom: 20px;
}
.input{
    margin-bottom: 20px;
}
</style>