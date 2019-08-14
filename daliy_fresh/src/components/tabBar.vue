<template>
    <div class="container">
        <ul class="bar">
            <li v-for="item of items" :key="item.id" @click="jump(item.path,item.id)" :style="item.id==$store.state.barId?selected:''">
                <i :class="item.icon"></i>
                <p v-text="item.name"></p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {
                    id:"1",
                    name:"首页",
                    icon:"iconfont icon-yemian-copy-copy",
                    path:"/"

                },
                {
                    id:"2",
                    name:"分类",
                    icon:"iconfont icon-leimupinleifenleileibie",
                    path:"/classify"

                },
                {
                    id:"3",
                    name:"购物车",
                    icon:"iconfont icon-gouwuche2",
                    path:"/shoppingCart"

                },
                {
                    id:"4",
                    name:"我的",
                    icon:"iconfont icon-wode1",
                    path:"/user"

                }
            ],
            selected:{
                color:"#EB5790"
            },
        }
    },
    methods:{
        jump(i,id){
        this.$store.commit("changeBarId",id)
        this.$router.push({path:i,params:id})
            console.log("跳到"+i,"id为"+id)
        }
    }
}
</script>
<style scoped>
    .container{
        position:fixed;
        bottom:0;
        width:100%;
        z-index:300; 
        height:5rem;  
        background-color: #fff;
    }
    .bar{
        display:flex;
        justify-content:space-around;
        align-content: center;
        width:100%;
        height:5rem;
    }
    li{
        padding:0.5rem;
        text-align:center;
        color:#C6C6C6;
    }
    i{
        font-size:2.5rem;
    }
    p{
        font-size:1.2rem;
        margin-top:0.5em;
    }
</style>
