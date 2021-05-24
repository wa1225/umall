<template>
  <div>
      <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="id"
      label="菜单编号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="菜单名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="菜单图标">
      <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="菜单地址">
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
import {mapActions,mapGetters} from 'vuex'
import {reqmenudelete} from "../../../request/api"
import {successAlert} from "../../../utils/alert"
export default {
    props:["list"],
    data() {
      return {
        
      }
    },
    computed:{
        ...mapGetters({}),
    },
    methods:{
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
           reqmenudelete({id:id}).then(res=>{
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
    mounted(){
      console.log(this.list);
    }
}
</script>

<style scoped lang="less">
@import "../../../less/index.less";
</style>