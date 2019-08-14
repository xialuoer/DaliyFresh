<template>
    <div class="container">
        <!-- 1：商品分类导航 -->
        <div class="pro_bar">
            <ul>
                <li v-for="item of bars" :key="item.bid" @click="handerChoose(item.bid)">
                    <div>
                         <h3 :style="isSelect[item.bid]==true?selected_h3:''" v-text="item.title"></h3>
                         <p :style="isSelect[item.bid]==true?selected_p:''" v-text="item.subtitle"></p>
                    </div>
                    
                </li>
            </ul>
        </div>
        <!-- 2:商品展示列表 -->
        <div class="pro_list">
            <div class="content" v-for="item of list" :key="item.pid">
                <div>
                    <div class="img-div">
                        <img :src="baseUrl+item.pic" >
                    </div>
                    <p v-text="item.title" class="title"></p>
                    <p v-text="item.subtitle" class="subtitle"></p>
                    <div class="price">
                        <span>￥{{item.price}}</span>
                        <i class="iconfont icon-jia2"></i>
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
        list:{
        type:Array,
        default:[]
        }
     },
  data() {
    return {
      cid:'',
      isSelect:[true,false,false,false,false,false],
      selected_h3:{
        color:"#eb5790"
    },
        selected_p:{
        color:"#fff",
        background:"#eb5790",
        borderRadius:"2rem" 
    },
    //用class的时候这样写，并写相应样式
    // selected_h3:"selected_h3",
    // selected_p:"selected_p",
      baseUrl,
      bars: [
        {
          bid: 0,
          title: "推荐",
          subtitle: "猜你喜欢"
        },
        {
          bid: 1,
          title: "热销爆品",
          subtitle: "必买榜单"
        },
        {
          bid: 2,
          title: "0元菜场",
          subtitle: "免费领菜"
        },
        {
          bid: 3,
          title: "本周新品",
          subtitle: "应季推荐"
        },
        {
          bid: 4,
          title: "优先冰铺",
          subtitle: "五折开抢"
        },

        {
          bid: 5,
          title: "爆品囤货",
          subtitle: "更划算"
        }
      ]
    };
  },
  methods: {
    
    handerChoose(bid){
        //1:选中的标题变色
       for(var i=0;i<this.bars.length;i++){
           if(bid==i){
               this.isSelect[i]=true;
               Vue.set(this.isSelect,i,true);
            //    this.cid=bid;
            //    console.log(this.cid)
            this.$emit("chooseCid",bid);
            // console.log(bid);
            //    console.log(`第${i}个按钮被点击,${this.isSelect[i]}`)
           }else{
                this.isSelect[i]=false;
            //    console.log(`第${i}个按钮不被点击`)
           }
       }
    //    window.location.reload();
    //    console.log(this.isSelect)

    //     console.log("跳转到对应this.bid版块")

    }
  },
  created() {
    // this.loadMore();
  },
   mounted(){
    //  this.handerChoose(bid);
  }
};

</script>
<style scoped>
.container {
  width: 100%;
  background: rgb(235, 235, 235);
}
/* 1:商品分类导航 */
    .pro_bar{
        height:6rem;
        width:100%;
        overflow:Scroll;
        /* overflow:-Scroll; */
        /* overflow-x:hidden; */
        /* overflow-y:hidden; */
    }
    .pro_bar ul{
        height:6rem;
        width:130%; 
    }
    .pro_bar li{
        float:left;
        width:6rem;
        padding:1rem;
        text-align:center;
        /* border:.1rem solid #f00; */
    }
    .pro_bar h3{
        font-size:1.5rem;
        font-weight:600;
    }
   
    .pro_bar p{
        margin-top:0.5rem;
        padding:0.2rem;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size:1.1rem;
        letter-spacing:0.1rem;
    }
    /* .selected_h3{
        color:#eb5790;
    }
    .selected_p{
        color:"#fff";
        background:#eb5790;
        border-radius:2rem;
    } */

/* 2:商品展示列表 */
    .pro_list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5rem;
    }
    .content {
    width: 48%;
    background: #fff;
    border-radius: 0.5rem;
    margin: 0.3rem 0;
    }
    .content > div {
    padding: 0.8rem 0.5rem 0.5rem;
    }
    .content .img-div {
    text-align: center;
    }
    .content img {
    width: 8rem;
    height: 8rem;
    }
    .content .title {
    margin-top: 1rem;
    font-size: 1.5rem;
    }
    .content .subtitle {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #a8a8a8;
    }
    .content .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    color: #eb5790;
    font-size: 1.6rem;
    }
    .price i {
    font-size: 2rem;
    }
</style>

