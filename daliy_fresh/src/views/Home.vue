<template>
  <div class="container">
    <!-- 1:定位查询 -->
    <div class="header">
        <div class="logo">
          <i class="iconfont icon-dingweiweizhi1"></i>
          <span>1小时达</span>
        </div>
        <!-- <div class="search"> -->
        <my-search class="search" ></my-search>
        <!-- </div> -->
    </div>
    <!-- 2：主体内容 -->
    <div>
      <!-- 2.1轮播图 -->
      <my-carousel style="margin-top:3rem" :pic="pic" :scale="0.25"></my-carousel>
      <!-- 2.2保障条 -->
      <div class="safe-guard">
        <ul>
          <li>
            <i class="iconfont icon-jisu"></i>
            <span>极速送达</span>
          </li>
          <li>
            <i class="iconfont icon-jiancebaoyang"></i>
            <span>100%检测</span>
          </li>
          <li>
            <i class="iconfont icon-quanqiuzhicai"></i>
            <span>产地直采</span>
          </li>
        </ul>
      </div>
      <!-- 2.3图片分类索引区 -->
      <div class="img-nav">
        <ul>
          <li v-for="item of res1" :key="item.id">
            <img :src="item.pic">
            <p v-text="item.title"></p>
          </li>
        </ul>
        <ul>
          <li v-for="item of res2" :key="item.id">
            <img :src="item.pic">
            <p v-text="item.title"></p>
          </li>
        </ul>
      </div>
      <!-- 商品分类 -->
      <div>
        <my-product
        :list="list"
        @chooseCid="chooseCid"
        ></my-product>
      </div>
    </div>

    <!-- 3：底部导航栏 -->
    <tabBar></tabBar>
  </div>
</template>

<script>
//引入组件
  import myCarousel from "../components/carousel.vue";
  import myProduct from "../components/home/product.vue";
  import mySearch from "../components/search.vue";
export default {
 
  data(){
    return{
      kwd:"大荔冬枣",
      pic:"carousel/header1.jpg&carousel/header2.jpg&carousel/header3.jpg",
      list:[],
      res1:[
        {
          id:1,
          pic:"/img/img-nav/c1.jpg",
          title:"时令水果",
          path:"/"
        },
        {
          id:2,
          pic:"/img/img-nav/c2.jpg",
          title:"新鲜蔬菜",
          path:"/"
        },
        {
          id:3,
          pic:"/img/img-nav/c3.jpg",
          title:"肉蛋水产",
          path:"/"
        },
        {
          id:4,
          pic:"/img/img-nav/c4.jpg",
          title:"乳品雪糕",
          path:"/"
        },
        {
          id:5,
          pic:"/img/img-nav/c5.jpg",
          title:"酒饮零食",
          path:"/"
        },
        
      ],
       res2:[
        {
          id:6,
          pic:"/img/img-nav/c6.jpg",
          title:"素食粮油",
          path:"/"
        },
        {
          id:7,
          pic:"/img/img-nav/c7.jpg",
          title:"日用品",
          path:"/"
        },
        {
          id:8,
          pic:"/img/img-nav/c8.jpg",
          title:"方便素食",
          path:"/"
        },
        {
          id:9,
          pic:"/img/img-nav/c9.jpg",
          title:"乳品雪糕",
          path:"/"
        },
        {
          id:10,
          pic:"/img/img-nav/c10.jpg",
          title:"酒饮零食",
          path:"/"
        },
       ],
    }
  },
  methods:{
    toSearch(){
      console.log("跳转到查询界面");
      // this.$router.push("/search")
    },
    //加载界面后就发送请求
    loadMore() {
      var url = "/product/homeProduct";
      var obj = { cno: "1" };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data;
        // console.log(result.data);
      });
    },
    chooseCid(cid){
      console.log(cid);
       var url = "/product/homeProduct";
       var obj={cno:cid+1};
        this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data;
      });
    }
  },
  //注册子组件
  components:{
    myCarousel,
    myProduct,
    mySearch
  },
  created() {
    this.loadMore();
  },
}
</script>


<style scoped>
  .container{
    width:100%;
  }
/* 1:定位查询 */
  .header{
    align-content: center;
    top:0;
    background:#fff;
    width:100%;
    height:3rem;
    color:#EB5790;
    position:fixed;
    z-index:300;
  }
  .header>.logo{
    padding-left:0.5rem;
    float:left;
    width:23%;
    height:3rem;
  }
  .header>.logo>i{
    font-size:2rem;
    line-height:3rem;
  }
  .header>.logo>span{
    display:inline-block;
    margin-left:0.5rem;
    font-size:1.5rem;
    font-weight:600;
    line-height:3rem;
  }
 .header>.search{
   margin:0.3rem auto;
   float:left;
   width:74%;
 }
/* 2.轮播图 
  .carousel{
    margin-top:3rem !important;
  } */
/* 2.2保障条 */
  .safe-guard{
    width:100%;
  }
  .safe-guard ul{
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  .safe-guard li{
    padding:0.4rem 0.2rem;
    color:#EB5790;
  }
  .safe-guard i{
    font-size:1.2rem;
  }
  .safe-guard span{
    display:inline-block;
    margin-left:0.5rem;
    font-size:1.2rem;
  }


/* 2.3图片分类索引区 */
  .img-nav{
    width:100%;
  }
  .img-nav ul{
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  .img-nav li{
    padding:0.4rem 0.2rem;
  }
  .img-nav img{
    width:3.5rem;
    height:3.5rem;
    border-radius:50%;
  }

</style>
