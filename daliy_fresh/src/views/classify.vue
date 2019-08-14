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
        <div v-for="(item,i) of this.products" :key="i"
        >
            <product-list
             :pid="item.pid"
             :title="item.title"
             :subtitle="item.subtitle"
             :pic="item.pic"
             :price="item.price"
             :original_price="item.original_price"
             :count='item.count'
             :key="item.pid">
            </product-list>
        </div>
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
            counts:[]
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
        load(){
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
            if(result.data.code==1){
                console.log(result);
                this.counts=result.data.msg;
                console.log(this.counts)
            }else if(result.data.code==-1){
                this.counts=[]
            }
            
             this.products.forEach((elem)=>{
                    this.counts.forEach((elemc)=>{
                        if(elemc.pid==elem.pid){
                            elem.count=elemc.count
                        }
                    })
                })
                console.log(this.products)
            
        });
        }
        },
        // c(pid){
        //     this.counts.forEach((elem)=>{
        //         return elem.pid==pid ? elem.count : 0
        //     })
        // },
        loadMore(){
            //侧边栏加载请求
            var url="/product/classify";
            this.axios.get(url).then(result=>{
                this.list=result.data;

            });
        },
        jumpCid(cid){
             //右边商品显示请求
            //  this.this.$store.state.GoodsCurrentSelKind =cid;
            //  this.$store.commit('changeCurrentSelKind',cid);
        
            var url = "/product/homeProduct";
            var obj = { cno: cid };
            this.axios.get(url, { params: obj }).then(result => {
                this.products = result.data;
                console.log(this.products);
                this.products.forEach((elem)=>{
                elem.count=0
            })
            this.load()
            console.log("我不希望被再次执行")
            });
        },
    },
    created() {
    this.loadMore();
    this.jumpCid(1);

    
    },
    // computed:{
    //     c(pid){

    //     }
    // },
    // updated(){
    //     this.load()
       
    // }

}
</script>
<style lang="stylus" scoped>
 
</style>

