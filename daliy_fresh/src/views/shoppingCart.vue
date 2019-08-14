<template>
    <div class="container">
        <router-link to="/login">dneglu</router-link>
        <!-- 头部购物车 -->
        <div class="header">
            <i class="iconfont icon-gouwuchekong"></i>
            <span class="cart">
               &nbsp; 购物车</span>
            <span 
            class="del"
            @click="delAll"
            >删除</span>
        </div>
        <!-- 购物车为空时的显示状态 -->
        <div class="emptyCart" 
        v-if="count== 0"
        >
            <img src="http://127.0.0.1:3000/img/cart/emptyCart.png">
        </div>
        <!-- 中间购物车商品清单 -->
        <div class="cartList" 
        v-if="count>0"
        >
            <div class="content" v-for="(item,i) of list" :key="i">
                <div class="select">
                    <input 
                    type="checkbox" @change="selectItem" v-model="item.cb">
                    <!-- <i class="iconfont icon-search2"></i> -->
                </div>
                <div class="leftImg">
                    <img :src="baseUrl+item.pic">
                </div>
                <div class="rightText">
                    <h5 class="title" v-text="item.title"></h5>
                    <div>
                        <div class="divPrice">
                            <span class="discount-price" v-text="item.price"></span>
                            <span class="original-price" v-text="item.original_price"></span>
                        </div>
                        <div class="divIcon">
                            <i class="iconfont icon-jian-copy"
                            :data-pid="item.pid"
                            @click="delItem(item.pid)"
                            ></i>
                            <span>&nbsp;{{item.count}}&nbsp;</span>
                            <i class="iconfont icon-jia8"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部结算 -->
        <div class="count">
            <div class="selectAll">
                <input 
                type="checkbox"
                @change="selectAll"
                v-model="select_all">
                <span> &nbsp;全选</span>
            </div>
            <div class="countAll">
                <span>合计：￥{{total}}</span>
            </div>
            <div class="countTo">
                <span>去结算 &nbsp;</span>
                <i class="iconfont icon-sanjiaojiantoushang"></i>
            </div>
        </div>
        <!-- 底部导航栏 -->
        <tabBar></tabBar>
    </div>
</template>
<script>
import {baseUrl} from "../common"
export default {
    data(){
        return{
            list:[],
            baseUrl,
            select_all:false
        }
    },
    computed:{
        total(){
            var sum=0;
            for(var p of this.list){
                if(p.cb==true){
                    sum+=p.price*p.count;
                }
            }
            return sum.toFixed(2);
        },
        count(){
            var getcount=0;
            for(var p of this.list){
                    getcount+=p.count;
            }
            console.log(getcount)
            return getcount;
            
        }
    },
    methods:{
        //全选函数
        selectAll(e){
           var cb=e.target.checked;
           for(var item of this.list){
               item.cb=cb;
           }
        },
        //单选函数
        selectItem(){
            var n=0;
            for(var item of this.list){
              if(item.cb==true){
                  n++;
              }
              if(n==this.list.length){
                  this.select_all=true;
              }else{
                  this.select_all=false;
              }
           }
        },
        //-号单个删除函数
        delItem(pid){
            var pid=pid;
            //显示交互提示框提醒
            for(var p of this.list){
                if(pid==p.pid&&p.count==1){
                     this.$messagebox.confirm("您确定删除商品么？").then(action=>{
                this.axios.get("/cart/delItem",{params:{pid:pid}}).then(
                    result=>{
                        //重新加载购物车数据
                        this.loadMore();
                    }
                )
            }).catch(err=>{
                return;
            })
        }else if(pid==p.pid&&p.count>1)
            p.count--;
        }  
        },
        //删除多项数据的函数
        delAll(){
            var ids="";
            //创建循环拼接字符串内容
            for(var p of this.list){
                if(p.cb==true){
                    ids+=p.pid+","
                }
            }
            ids=ids.slice(0,ids.length-1);
            console.log(ids,typeof(ids))
            //判断用户没有选择删除的商品，弹出提示
            if(ids.length==0){
                this.$toast("您尚未选中商品");
                return;
            }
        //发送请求
        this.$messagebox.confirm("您是否要删除已选中的商品").then(action=>{
            this.axios.get("/cart/delAll",{params:{ids:ids}}).then(
                result=>{
                    this.loadMore();
                    console.log('llll')
                }
            )
        }).catch(err=>{
            return;
        })
        },
        //加载购物车数据
        loadMore(){
        var url="/cart/searchCart";
        var uid=localStorage.getItem('uid');
        if(!uid){
            this.$router.push("/login");
        }else{
                this.axios.get(url,{
            params:{
                uid:uid
            }
        }
        ).then(result=>{
            console.log(result)
            if(result.data.code==1){
                console.log(result);
                this.list=result.data.msg;
                console.log(this.list)
            }else if(result.data.code==-1){
                this.list=[]
            }
            
        });
        }
           
        },
    },
    created(){
        this.loadMore();
    }
}
</script>
<style lang="stylus" scoped>
    .container
        background:rgb(235, 235, 235)
        width:100%
        .header  
            background:#fff;
            position:fixed
            top:0
            z-index:300
            width:100%
            height 3rem
            text-align:center
            font-size:1.3rem
            i
                color:#EB5790 
                line-height:3rem
            .cart
                letter spacing 0.1rem
                line-height:3rem
            .del
                font-size:1.2rem
                line-height:3rem
                position:absolute
                right:1rem
                color:#a3a3a3
        .emptyCart
            width:100%;
            img 
                width:100%
        .cartList
            background:#fff;
            width:94%;
            margin:0 auto
            border-radius:.5rem
            margin-bottom:9rem
            margin-top:3rem
            // border:.1rem solid #f00
            .content
                width:94%
                height:8rem
                display:flex
                padding:.8rem .5rem
                border-bottom:.1rem solid #C6C6C6
                .select
                    width:8%
                    display:flex
                    justify-content:center
                    align-items:center
                    color:#a8a8a8
                    i 
                        font-size:1.6rem
                        text-align:center
                .leftImg
                    padding 1rem
                    display:flex
                    img 
                        width:6rem
                        height:6rem
                .rightText
                    padding:1rem
                    display:flex
                    flex:1
                    flex-direction:column
                    justify-content:space-between
                    .title
                        font-size:1.2rem
                    div
                        display:flex;
                        justify-content:space-between
                        align-items:center
                        .divPrice
                            display:flex
                            font-size:1.4rem
                            align-items:baseline
                            .discount-price
                                color:#eb5790
                                font-weight:600
                            .original-price
                                text-decoration:line-through
                                color:#a8a8a8
                                font-size 1.2rem
                                margin-left:.2rem
                        .divIcon
                            display:flex
                            font-size:1.4rem
                            align-items:baseline
                            padding-right:1rem
                            iconfont
                                font-size:1.4rem
        .count
            position:fixed
            bottom:5rem
            width:100%
            background:#fff
            z-index:300
            height:4rem
            display:flex
            justify-content:space-around
            align-items:center
            border-top:.1rem solid #C6C6C6
            .selectAll
                width:30% 
                span 
                    font-size:1.2rem
            .countAll
                width:30%
                font-size 1.4rem
                font-weight:600
            .countTo
                background:#EB5790
                color:#fff
                height 4rem
                width:30%
                text-align:center
                span
                i
                    font-size 1.4rem
                    line-height:4rem

</style>


