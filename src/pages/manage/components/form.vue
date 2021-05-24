<template>
  <div>
      
    <el-dialog :title="info.isAdd?'用户添加':'用户编辑'" :visible.sync="info.isshow" @closed="closed">
        {{form}}
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择">
              <el-option v-for="item in rolelist" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
         <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1" 
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button v-if="info.isAdd" type="primary" @click="sure"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="edit"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqrolelist,requseradd,requserinfo,requseredit} from "../../../request/api";
import { mapGetters, mapActions } from "vuex";
import {successAlert} from "../../../utils/alert"
export default {
  props: ["info"],
  data() {
    return {
        form:{
            roleid:"",
      username:"",
      password:"",
       status:1
        },
        rolelist:[]
    };
  },
  methods: {
    ...mapActions({}),
    empty(){
        this.form={
            roleid:"",
      username:"",
      password:"",
       status:1
        }
    },
     cancle(){
        this.info.isshow = false
    },
    sure(){
        requseradd(this.form).then(res=>{
            if(res.data.code==200){
                this.empty();
                this.info.isshow = false
                successAlert(res.data.msg);
                this.$emit("init");
                 console.log(res);
            }     
        })
    },
    getOne(uid){
      requserinfo({uid:uid}).then(res=>{
        console.log(res);
        this.form=res.data.list;
      })
    },
    edit(){
      requseredit(this.form).then(res=>{
        if(res.data.code==200){
           this.empty();
           this.info.isshow = false
          successAlert(res.data.msg);
          this.$emit("init")
        }
      })
    },
    closed(){
       if(!this.info.isAdd){
          this.empty()
        }
    }
  },
  mounted() {
      reqrolelist().then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.rolelist = res.data.list
          }
      })
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style scoped>
.el-input {
  width: 50%;
}
.tree {
  display: flex;
  margin-top: 20px;
}
</style>