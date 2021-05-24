<template>
  <div>
      <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all>
    <el-table-column
      prop="id"
      label="角色编号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="角色名称"
      sortable
      width="380">
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
        @click="toedit(scope.row.id)"
         >编辑</el-button>
        <el-button
          type="danger"
          @click="del(scope.row.id)"
           >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions} from 'vuex';
import {reqroledelete} from "../../../request/api"
import {successAlert} from "../../../utils/alert"
export default {
    props:["list"],
    data(){
        return{
        }
    },
    methods: {
        ...mapActions({}),
      toedit(id){
          this.$emit("edit",id)
        },
        del(id) {
        this.$confirm('确定是否要删除?', '删除', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           reqroledelete({id:id}).then(res=>{
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
    }
}
</script>

<style>

</style>