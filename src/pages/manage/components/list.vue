<template>
  <div>
      <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all>
    <el-table-column
      prop="uid"
      label="用户编号"
      sortable
      width="280">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      sortable
      width="280">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="所属角色"
      sortable
      width="280">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
    </el-table-column>
    <el-table-column
      label="操作">
       <template slot-scope="scope">
        <el-button
        type="primary"
        @click="toedit(scope.row.uid)"
         >编辑</el-button>
        <el-button
          type="danger"
          @click="del(scope.row.uid)"
           >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions} from 'vuex';
import {requserdelete} from "../../../request/api"
import {successAlert} from "../../../utils/alert"
export default {
    props:["list"],
    data(){
        return{
        }
    },
    methods: {
        ...mapActions({}),
      toedit(uid){
          this.$emit("edit",uid)
        },
        del(uid) {
        this.$confirm('确定是否要删除?', '删除', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           requserdelete({uid:uid}).then(res=>{
             if(res.data.code==200){
               successAlert("删除成功")
               this.$emit("init")
             }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    },
    computed:{
        ...mapGetters({}),
    },
    mounted(){
        
    }
}
</script>

<style>

</style>