<template>
    <div class="container">
        <!-- 顶部导航栏 -->
        <my-search class="search"></my-search>
        <!-- 左侧导航 -->
        <left-navigation
            class="nav_left"
            :list="list"
            @jumpCid="jumpCid"
        ></left-navigation>
        <!-- 右侧分类商品列表 -->
        <product-list
            class="pro_list"
            :products="products"
            @addPid="addPid"
        ></product-list>
        <!-- 底部导航 -->
        <tabBar></tabBar>
    </div>
</template>
<script>
import leftNavigation from "../components/classify/leftNavigation.vue"
import productList from "../components/classify/productList.vue"
import mySearch from "../components/search.vue"
export default {
    data(){
        return{
             list:[],
             products:[],
             goodsNum:[],
             uid:localStorage.getItem('uid')
        }
    },
    components:{
        leftNavigation,
        productList,
        mySearch
    },
    methods:{
        //加载界面后就发送请求
        // loadMore1() {
       
        // },
        loadMore(){
            //侧边栏加载请求
            var url="/product/classify";
            this.axios.get(url).then(result=>{
                this.list=result.data;
            });
            //右边商品显示请求
            var url = "/product/homeProduct";
            var obj = { cno: "1" };
            this.axios.get(url, { params: obj }).then(result => {
                this.products = result.data;
            });
        },
        jumpCid(cid){
             //右边商品显示请求
            var url = "/product/homeProduct";
            var obj = { cno: cid };
            this.axios.get(url, { params: obj }).then(result => {
                this.products = result.data;
            });
        },
        addPid(pid){
            //添加商品进购物车
            if(!this.goodsNum[pid-1]){
                this.goodsNum[pid-1]=0;
            }
            this.goodsNum[pid-1]+=1;
            var count=this.goodsNum[pid-1];
            console.log(this.goodsNum[pid-1]);
            Vue.set(this.goodsNum,pid,1);
             //保存选中的商品信息并添加至购物车
        for(var i=0;i<this.products.length;i++){
            if(pid-1==i){
                var pid=this.products[i].pid
                var title=this.products[i].title;
                var pic=this.products[i].pic;
                var price=this.products[i].price;
                var original_price=this.products[i].original_price;
            }
        }
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
    },
    created() {
    this.loadMore();
    }
}
</script>
<style lang="stylus" scoped>
 
</style>

