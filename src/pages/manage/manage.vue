<template>
  <div>
      <el-button type="primary" @click="toAdd">添加</el-button>
    <v-list :list="list" @edit="toedit" @init="initpage"></v-list>
    <v-form :info="info" :list="list" @init="initpage" ref="form"></v-form>
    <div class="block">
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="size"
  @current-change="changePage"
  :total="total">
</el-pagination>
</div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {requserlist,requsercount} from "../../request/api"
import vList from "./components/list"
import vForm from "./components/form"
export default {
    data(){
        return {
            info:{
                isshow:false,
                isAdd:true
            },
            list:[],
            total:1,
            //一页的个数
            size:2,
            page:1
        }
    },
    components:{
        vList,
        vForm
    },
    computed:{
        ...mapGetters({}),
    },
    methods:{
        ...mapActions({}),
        gettotal(){
            requsercount().then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.total=res.data.list[0].total
                }
            })
        },
        toAdd(){
            this.info.isshow=true;
            this.info.isAdd=true;
        },
        toedit(uid){
            this.info.isshow=true;
            this.info.isAdd=false;
            this.$refs.form.getOne(uid)
        },
        init(){
            requserlist({size:this.size,page:this.page}).then(res=>{
               console.log(res)
                if(res.data.code==200){
                    let list=res.data.list?res.data.list:[]
                     if(list.length==0&&this.page!==1){
                         this.page--
                         this.init()
                         return
                     }
                     this.list=list;
                }
            })
        },
        changePage(page){
            this.page=page;
            this.init()
        },
        initpage(){
            this.init()
            this.gettotal()
        }
    },
    mounted(){
        this.initpage()
    }
}
</script>

<style scoped>

</style>