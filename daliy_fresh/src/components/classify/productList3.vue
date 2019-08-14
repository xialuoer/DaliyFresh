<template>
    <div class="container">
        <div class="content" v-for="item of products" :key="item.pid">
            <div class="leftImg">
                <img :src="baseUrl+item.pic">
            </div>
            <div class="rightText">
                <h5 class="title" v-text="item.title"></h5>
                <p class="subtitle" v-text="item.subtitle"></p>
                <p class="spc">时令爆品</p>
                <div>
                    <div>
                        <span class="discount-price">￥{{item.price}}</span>
                        <span class="original-price">￥{{item.original_price}}</span>
                    </div>
                    <div>
                        <i @click.stop="desc(item.pid)" v-show="goodsNum[item.pid-1]>=1" class="iconfont icon-jian6       "></i>
                        <input type="text"
                        v-show="goodsNum[item.pid-1]>=1"
                         :value="goodsNum[item.pid-1]"
                         >
                        <i @click.stop="add(item.pid)" class="iconfont icon-jia5"></i>
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
    props:{
        products:{
            type:Array,
            default:'',  
        }
    },
    data(){
        return{
            baseUrl,
            // goodsNum:[],
            uid:localStorage.getItem('uid')
        }
    },
    methods:{
        desc(pid){
            console.log(pid);
            // this.goodsNum[pid-1]-=1;
            // Vue.set(this.goodsNum,pid,1)
            // console.log(this.goodsNum);
        },
        add(pid){
            console.log(pid);
            // if(!this.goodsNum[pid-1]){
            //     this.goodsNum[pid-1]=0;
            // }
            // this.goodsNum[pid-1]+=1;
            // var count=this.goodsNum[pid-1];
            // console.log(this.goodsNum[pid-1]);
            // Vue.set(this.goodsNum,pid,1);
            this.$emit("addPid",pid);
        }
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
         height 15rem
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
