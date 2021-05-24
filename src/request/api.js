import { get, post } from "./http";
/***菜单开始 ***/
//添加
 export const reqmenuadd=(params)=>post("/api/menuadd",params);
//修改
 export const reqmenuedit=params=>post("/api/menuedit",params)
//删除
 export const reqmenudelete=params=>post("/api/menudelete",params)
//列表
 export const reqmenulist = params=>get("/api/menulist",params)
//查询一条
 export const reqmenuinfo = params=>get("/api/menuinfo",params)
/***菜单结束 ***/
/***角色管理开始 ***/
//添加
 export const reqroleadd=(params)=>post("/api/roleadd",params);
//修改
 export const reqroleedit=params=>post("/api/roleedit",params)
//删除
 export const reqroledelete=params=>post("/api/roledelete",params)
//列表
 export const reqrolelist = params=>get("/api/rolelist",params)
//查询一条
 export const reqroleinfo = params=>get("/api/roleinfo",params)
/***角色管理结束 ***/
/***管理员管理开始 ***/
//添加
 export const requseradd=(params)=>post("/api/useradd",params);
 //管理员总数
 export const requsercount=()=>get("/api/usercount")
//修改
 export const requseredit=params=>post("/api/useredit",params)
//删除
 export const requserdelete=params=>post("/api/userdelete",params)
//列表
 export const requserlist = params=>get("/api/userlist",params)
//查询一条
 export const requserinfo = params=>get("/api/userinfo",params)
/***管理员管理结束 ***/

/****登录接口 ****/
export const reqlogin = params=>post("/api/userlogin",params)
/***登录接口结束***/