<template>
  <div>
    <el-dialog :title="info.isAdd?'菜单添加':'菜单编辑'" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changeId">
              <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="120px" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="el-icon-setting" value="1"
              ><i class="el-icon-setting"></i
            ></el-option>
            <el-option label="el-icon-goods" value="2"
              ><i class="el-icon-goods"></i
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="菜单地址" label-width="120px" v-if="form.type==2">
          <el-select v-model="form.url" placeholder="请选择">
            <el-option v-for="item in indexRouters" :key="item.path" :label="item.meta.title" :value="'/'+item.path"></el-option>
          </el-select>
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
import{indexRouters} from "../../../router/index"
import {reqmenuadd,reqmenuinfo,reqmenuedit} from "../../../request/api"
import { mapActions, mapGetters } from "vuex";
import {successAlert} from "../../../utils/alert"
export default {
    props:["info","list"],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    empty(){
        this.form={
       pid:"",
       title:"",
       icon:"",
       type:1,
       url:"",
       status:1
        }
    },
     cancle(){
        this.info.isshow = false
    },
    sure(){
        
        reqmenuadd(this.form).then(res=>{
            if(res.data.code==200){
                this.empty();
                this.info.isshow = false
                successAlert(res.data.msg);
                this.$emit("init");
            }
            
        })
    },
    getOne(id){
      reqmenuinfo({id:id}).then(res=>{
        console.log(res);
        this.form=res.data.list;
        this.form.id=id;
      })
    },
    changeId(){
      this.form.pid==0?this.form.type=1:this.form.type=2
    },
    edit(){
      reqmenuedit(this.form).then(res=>{
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

  },
  data() {
    return {
      form: {
       pid:"",
       title:"",
       icon:"",
       type:1,
       url:"",
       status:1
      },
      indexRouters,
    };
  },
};
</script>

<style scoped lang="less">
@import "../../../less/index.less";
</style>