import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //底部导航面板对应的Id
    barId:1,
    // 表示显示全部分类商品
    GoodsCurrentSelKind:1,
    //商品分类Id,默认为空
    cid:'',
    //商品id
    pid:'',
    //用户id
    uid:'',
    //用户,默认为空
		user:{
			uid:'',
			uname:""
    },
    cartGoods: [], // 添加到购物车中的商品
    cartCounter: 0, // 购物车物品总数
  },
  mutations: {
    //点击tabBar切换id切换面板
    changeBarId(state,id){
      state.barId=id
    },
   
    //添加商品到购物车
    addGoodsToCart(state,item){
      // item.isInCart=true;
      item.count++;
      state.cartGoods.push(item);
      state.cartCounter++;
    },
    //选择不同种类的商品
    changeCurrentSelKind(state, kind){
      state.GoodsCurrentSelKind = kind;
    },
   //点击不同分类商品跳转到对应商品页
    changeCid(state,id){
      state.cid=id
    },
    //切换不同用户
    changeUser(state,user){
      // state.orders.uid=user.uid;
			state.user.uid=user.uid;
			state.user.uname=user.uname;
    },
    addOrder(state,order){
      state.orders=order
    },
    //改变商品id
		changePid(state,id){
			state.pid=id;
		},
  },
  actions: {
    getPid(state){
			return state.pid;
		},
  }
})
