<template>
  <div>
    <el-dialog :title="info.isAdd?'角色添加':'角色编辑'" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
           :data="menulist"
           show-checkbox
           node-key="id"
           ref="tree"
           :props="defaultProps">
          </el-tree>
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
import { reqmenulist,reqroleadd,reqroleinfo,reqroleedit} from "../../../request/api";
import { mapGetters, mapActions } from "vuex";
import {successAlert} from "../../../utils/alert"
export default {
  props: ["info"],
  data() {
    return {
        form:{
            rolename:"",
      menus:"",
       status:1
        },
        menulist:[],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({}),
    empty(){
        this.form={
      rolename:"",
      menus:"",
       status:1
        }
    },
     cancle(){
        this.info.isshow = false
    },
    sure(){
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
        reqroleadd(this.form).then(res=>{
            if(res.data.code==200){
                this.empty();
                this.info.isshow = false
                successAlert(res.data.msg);
                this.$emit("init");
            }     
        })
    },
    getOne(id){
      reqroleinfo({id:id}).then(res=>{
        console.log(res);
        this.form=res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        this.form.id=id;
      })
    },
    edit(){
       this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqroleedit(this.form).then(res=>{
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
          this.$refs.tree.setCheckedKeys([])
        }
    }
  },
  mounted() {
    reqmenulist({ istree: true }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        this.menulist = res.data.list ? res.data.list : [];
      }
    });
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