<template>
  <div>
<el-button type="primary" @click="toAdd">添加</el-button>
<v-list :list="list" @init="init" @edit="toedit"></v-list>
<v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {reqmenulist} from "../../request/api"
import vList from "./components/list"
import vForm from "./components/form"
export default {
    data(){
        return {
            info:{
                isshow:false,
                isAdd:true
            },
            list:[]
            
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
        toAdd(){
            this.info.isshow=true;
            this.info.isAdd=true;
        },
        toedit(id){
            this.info.isshow=true;
            this.info.isAdd=false;
            this.$refs.form.getOne(id)
        },
        init(){
            reqmenulist({istree:true}).then(res=>{
                console.log(res);
                if(res.data.code==200){
                     this.list=res.data.list?res.data.list:[]
                }
            })
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped lang="less">
@import "../../less/index.less";

</style>