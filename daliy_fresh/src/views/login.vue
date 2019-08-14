<template>
    <div class="container">
        <my-header class="header">用户登录</my-header>
        <div class="logo">
          <i class="iconfont icon-shengxiangou"></i>
        </div>
        <div class="reg">
          <!--手机号-->
           <mt-field  label="账号：" type="number" v-model="phone" placeholder="请输入您的手机号">
           </mt-field>
           <!--密码 -->
            <mt-field 
           label="密码：" type="password" v-model="upwd" placeholder="请输入密码">
            </mt-field>
            <!-- 登录 -->
            <mt-button size="large" class="Btn" @click = "log">登&nbsp;&nbsp;录</mt-button>
             <h3>没有账号？<router-link :to="`reg`">立即注册</router-link></h3>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      phone:"",
      upwd:""
    }
  },
  methods: {
    log() {
        var url="/user/login";
        var obj={uname:this.phone,upwd:this.upwd};
        this.axios.post(url,qs.stringify(obj)).then(
          result=>{
            if(result.data.code>0){
              console.log(result.data.uid);
              this.$store.commit("changeUser",{uid:result.data.uid,uname:this.phone});
              localStorage.setItem("uid",result.data.uid);
              localStorage.setItem("uname",this.phone)
              setTimeout(()=>{
                this.$messagebox("登录成功！");
                setTimeout(()=>{
                  this.$router.push("/user");
                },1500)
              },20)   
            }else{
              this.$messagebox("提示","用户名或密码有误")
            }
          }
        )
    }
  }
 
};
</script>
<style scoped>
  .container{
    position:relative;
  }
  .container>.header{
    font-size:1.5rem; 
    letter-spacing:.1rem;
  }
  /* logo图标显示 */
    .container>.logo{
      margin:0 auto;
      width:10rem;
      height:10rem;
      /* border:0.1rem solid #c63b2d; */
    }
    .container>.logo>i{
      display: inline-block; 
      position:absolute;
      color:#EB5790;
      font-size:6rem;
      top:6rem;
      left:12.5rem;
    }
    /* 主体样式 */
    .container>.reg{
      margin:4rem auto; 
      padding:0.5rem;
      width:90%;
      /* border:0.1rem solid #c63b2d; */
    }
    
    .container>.reg>h3{
        font-size:1.16rem;
        text-align:center;
        margin-top:1.16rem;
    }
    .container>.reg>h3>a{
        color:#EB5790;
    }
    
    .Btn{
      margin-top:2rem;
      color:#000;
      background:#C6C6C6;
    }


</style>

