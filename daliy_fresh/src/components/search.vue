<template>
    <div class="container">
        <div class="search"  @click="toSearch">
          <div>
            <i class="iconfont icon-fangdajing"></i>
            <span>大荔冬枣</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        toSearch(){
            console.log("跳转到搜索框")
        }
    }
}
</script>
<style lang="stylus" >
.container
    // width:100%
    height:2rem;
    .search
        display: flex;
        justify-content:center;
        align-content:center;
        margin:0 auto;
        width:96%
        text-align:center
        background:rgb(235, 235, 235)
        border-radius:0.3rem
        height:2rem;
        div
            padding:0.2rem
            color:#A8A8A8
            i
                font-size:1.2rem
                line-height:1.2rem
            span
                display: inline-block
                letter-spacing: 0.1rem
                margin-left:0.8rem
                font-size:1.2rem
                line-height:1.2rem
</style>

