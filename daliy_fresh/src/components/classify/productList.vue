<template>
    <div class="container">
        <div class="content">
            <div class="leftImg">
                <img :src="baseUrl+pic">
            </div>
            <div class="rightText">
                <h5 class="title" v-text="title"></h5>
                <p class="subtitle" v-text="subtitle"></p>
                <p class="spc">时令爆品</p>
                <div>
                    <div>
                        <span class="discount-price">￥{{price}}</span>
                        <span class="original-price">￥{{original_price}}</span>
                    </div>
                    <div>
                        <i @click.stop="desc(pid)" v-show="this.oneCommodity.count>=1" class="iconfont icon-jian6       "></i>
                        <input type="text"
                        v-show="this.oneCommodity.count>=1"
                         :value="this.count"
                         >
                        <i 
                        @click.stop="addGoodsToCart(pid)"
                        class="iconfont icon-jia5"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {baseUrl} from "../../common"
import Vue from "vue"
export default {
    props:
        ['pid','title','subtitle','pic','price','original_price','count'],
    data(){
        
        return{
            oneCommodity:{
             uid:this.uid,
             pid:this.pid,
             count:this.count,
             title:this.title,
             pic:this.pic,
             price:this.price,
             original_price:this.original_price,
        },
            baseUrl,
            goodsNum:[],
            // data_id:"",
            uid:localStorage.getItem('uid')
        }
    },
    methods:{
        // goToDetailsPage(){
        //     console.log('进入商品详情页')
        // },
        addGoodsToCart (pid) {
            console.log(pid);
            // this.oneCommodity.count++;
            console.log(this.oneCommodity.count)
            this.$store.commit('addGoodsToCart', this.oneCommodity);
            console.log(this.oneCommodity)
            //发送axios请求添加数据到购物车表
             this.axios.get("/cart/addCart",{
            params:{
                sid:'',
                uid:this.uid,
                pid:this.pid,
                count:this.oneCommodity.count,
                title:this.title,
                pic:this.pic,
                price:this.price,
                original_price:this.original_price
            }
        }).then(result=>{
            if(result.data.code==1){
                this.$toast("添加购物车成功");
            }else{
                this.$toast("添加购物车失败")
            }
        })
        },
        desc(pid){
            console.log(pid);
            this.goodsNum[pid-1]-=1;
            Vue.set(this.goodsNum,pid)
            console.log(this.goodsNum);
        }, 
        
  /*
        add(pid){
            console.log(pid);
            console.log(this.products);
            if(!this.goodsNum[pid-1]){
                this.goodsNum[pid-1]=0;
            }
            this.goodsNum[pid-1]+=1;
            var count=this.goodsNum[pid-1];
            console.log(this.goodsNum[pid-1]);
            Vue.set(this.goodsNum,pid)
        //保存选中的商品信息并添加至购物车
        for(var i=0;i<this.products.length;i++){
            if(pid-1==i){
                var pid=this.products[i].pid;
                var title=this.products[i].title;
                var pic=this.products[i].pic;
                var price=this.products[i].price;
                var original_price=this.products[i].original_price; 

                  //发送axios请求添加数据
        //根据条件判断发送的请求
        if(count==1){
          this.axios.get("/cart/addCart",{
            params:{
                sid:'',
                uid:this.uid,
                pid:pid,
                count:count,
                title:title,
                pic:pic,
                price:price,
                original_price:original_price
            }
        }).then(result=>{
            if(result.data.code==1){
                this.$toast("添加购物车成功");
            }else{
                this.$toast("添加购物车失败")
            }
        })
        }else if(count>1){
          this.axios.get("/cart/updateCart",{
            params:{
                uid:this.uid,
                pid:pid,
                count:count,
            }
        }).then(result=>{
            if(result.data.code==1){
                this.$toast("添加购物车成功");
            }else{
                this.$toast("添加购物车失败")
            }
        })   
    }
            }     
        }  
        }
        */
    },
    // mounted() {
    //     this.load()
    // },
    created(){
        console.log(this.count)
    }
}
</script>
<style lang="stylus" scoped>
    .container
         position:relative
         top:0
         right:0
         float:right
         width:75%
         height 8rem
         background:#fff
         .content
            border-bottom:.1rem solid #a8a8a8
            width:100%
            height:8rem
            .leftImg
                padding 1rem
                float:left
                img 
                    width:6rem
                    height:6rem
            .rightText
                padding:1rem
                .title
                    font-size:1.2rem
                .subtitle
                    font-size:.8rem
                    color:#a8a8a8
                    margin-top:.5rem
                .spc
                    font-size:.8rem
                    color:#a8a8a8
                    margin:.5rem 0
                div
                    display:flex;
                    justify-content:space-between
                    align-items:center
                    margin-bottom:0
                    div
                        font-size:1.4rem
                        .discount-price
                            color:#eb5790
                            font-weight:600
                        .original-price
                            text-decoration:line-through
                            color:#a8a8a8
                            font-size 1.2rem
                            margin-left:.2rem
                    div
                        input 
                            width:2rem
                            text-align:center
                        .iconfont 
                            font-size:1.6rem
                            color:#eb5790
</style>
