import Vue from 'vue'

Vue.filter('strFilter',(oldVal,type)=>{
  if(type=="loca"){
    return oldVal.length>20 ? oldVal.substr(0,20)+"..." : oldVal 
  }else if(type=="cName"){
    return oldVal.length>8 ? oldVal.substr(0,8)+"..." : oldVal
  }
})

Vue.filter('unameFilter',(oldVal,type)=>{
  return oldVal.slice(0,3)+'****'+oldVal.slice(7,11)
})