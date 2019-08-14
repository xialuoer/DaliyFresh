<template>
  <div>
    <!-- 轮播组件 -->
    <div class="carousel" :style="carouselStyle">
      <div 
        class="container" 
        :style="conStyle" 
        :class="{transClass:hasTrans}"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        ref="con"
      >
        <img 
          v-for="(p,i) of pics" 
          :key="i" :src="baseUrl+p" 
          :style="{width:innerWidth+'px',height:scale*innerWidth+'px'}"
        >
        <img 
          :src="baseUrl+pics[0]" 
          :style="{width:innerWidth+'px',height:scale*innerWidth+'px'}"
        >
      </div>
      <ul class="carouselIndex" :style="indexStyle">
        <li 
          v-for="(pic,idx) of pics" 
          :key="idx" :class="idx==i||(i==pics.length&&idx==0) ? 'active' : ''">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {baseUrl} from "../common"
export default {
  name:"carousel",
  props:{
    pic:String,
    scale:Number
  },
  data(){
    return {
      innerWidth:window.innerWidth,
      canMove:true,
      hasTrans:true,
      i:0,
      indexClass:false,
      timer:null,
      startX:0,
      touchStatus:false,
      moveLen:0,
      baseUrl
    }
  },
  computed:{
    pics(){
      return this.pic.split("&")
    },
    conStyle(){
      let width=this.innerWidth*(this.pics.length+1)+"px"
      let marginLeft=-this.i*this.innerWidth+"px"
      return {width,marginLeft}
    },
    carouselStyle(){
      return {paddingBottom:this.scale*100+"%"}
    },
    indexStyle(){
      let width=this.pics.length*8
      let marginLeft=-width/2
      return {width:width+"%",marginLeft:marginLeft+"%"}
    }
  },
  methods:{
    move(i){
      if(this.canMove){
        this.canMove=false
        if(i==-1&&this.i==0){
          this.hasTrans=false
          this.i=this.pics.length
          setTimeout(()=>{
            this.hasTrans=true
            this.i+=i
            setTimeout(()=>{
              this.canMove=true
            },400)
          },50)
        }else if(i==1&&this.i==this.pics.length-1){
          this.i+=i
          setTimeout(()=>{
            this.hasTrans=false
            this.i=0
            setTimeout(()=>{
              this.hasTrans=true
              this.canMove=true            
            },50)    
          },400)
        }else{
          this.i+=i
          setTimeout(()=>{
            this.canMove=true
          },400)
        }
      }     
    },
    start(){
      this.timer=setInterval(()=>{
        this.move(1)
      },3000)
    },
    stop(){
      clearInterval(this.timer)
    },
    handleTouchStart(e){
      this.stop()
      this.touchStatus=true
      this.startX=e.touches[0].clientX
      console.log("触摸开始的坐标"+this.startX)
    },
    handleTouchEnd(){
      this.touchStatus=false
      this.start()
      if(Math.abs(this.moveLen)<this.innerWidth/2){
        this.hasTrans=true
        this.$refs.con.style.marginLeft=this.conStyle.marginLeft
      }
    },
    handleTouchMove(e){
      if(this.touchStatus){
        this.hasTrans=false
        let moveX=e.touches[0].clientX
        this.moveLen=moveX-this.startX
        let marginLeft=parseInt(this.conStyle.marginLeft.slice(0,-2))
        if(this.i==0&&this.moveLen>0){
          this.hasTrans=false
          this.i=this.pics.length
        }
        this.$refs.con.style.marginLeft=marginLeft+this.moveLen+"px"
        if(-this.moveLen>=this.innerWidth/2){
          if(this.i==this.pics.length-1){
            this.hasTrans=true
            this.i++
            setTimeout(()=>{
              this.hasTrans=false
              this.i=0
              setTimeout(()=>{
                this.hasTrans=true
              },20)
            },200)
            this.touchStatus=false
          }else{
            this.hasTrans=true
            this.i++
            this.touchStatus=false
          }
        }else if(this.moveLen>=this.innerWidth/2){
          this.hasTrans=true
          this.i--
          this.touchStatus=false
        }
      }
    }
  },
  created(){
    window.onresize=function(){
      this.innerWidth=window.innerWidth
    }
  },
  mounted(){
    this.start()   
  },

  beforeDestroy(){
    window.onresize=null
    this.stop()
  }
}
</script>


<style scoped lang="stylus">
  $n=8.3333333
  // 轮播样式
  .carousel
    width: 100%
    height: 0
    overflow: hidden
    // padding-bottom: 50%
    position: relative
    .container
      // 解决图片之间一个字节空隙问题
      font-size: 0
      margin-left: 0
    div.transClass
      transition: all .4s ease
      // 轮播小圆点样式
    .carouselIndex
      height: 6%
      position: absolute
      bottom: 10%
      left: 50%
      display: flex
      justify-content: space-around
      li
        width: .8rem
        height: .8rem
        background: #f9f9f9
        border-radius: 50%
      li.active
        background: #e71a0f
</style>
