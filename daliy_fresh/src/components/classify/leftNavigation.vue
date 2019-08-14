<template>
    <div class="container">
        <div class="nav">
            <ul class="nav-ul">
                <li class="nav-li" v-for="item of list" :key="item.cid" 
                :style="active[item.cid]?bg_color:''"
                 @click="jump(item.cid)" >
                      <i class="iconfont icon-changfangxing"
                      v-show="show[item.cid]"
                      ></i>
                    <div class="text">
                        <span v-text="item.cname"> 
                    </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            show:[true],
            active:[1],
            bg_color:{
                background:"#fff"
             }
                        
        }
    },
    methods:{
        jump(cid){
            for(var i=1;i<=this.list.length;i++){
                if(cid==i){
                    this.show[i]=true;
                    Vue.set(this.show,i,true)
                    this.active[i]=cid;
                    Vue.set(this.active,i,cid);
                    this.$emit("jumpCid",cid)
                }else{
                this.active[i]=0;
                this.show[i]=false;
            } 
        }
    },
    created(){
        this.jump(1);
        // this.loadMore();
    },
},
}
</script>
<style lang="stylus" scoped>
    .container
        width:100%
        .nav
            width:25%
            background:rgb(235, 235, 235)
            position:relative
            float:left
            top:0
            left:0
            .nav-ul
                // padding:.2rem
                .nav-li
                    height:3rem
                    padding:.8rem .5rem
                    .iconfont
                        float:left
                        margin-left:-1.3rem
                        font-size:1.5rem
                        align-content:center
                        color:#eb5790 
                        line-height:3rem
                    .text
                        text-align:center
                        span 
                            font-size:1.4rem
                            line-height:3rem
                            letter-spacing:.1rem
</style>


