import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login:false,//是否登录
        userInfo:null,//用户信息
        cartList:[],//加入购物车商品
        showCart:false,//是否显示购物车
    },
    mutations: {
        SHOWCART(state,{showCart}){
            state.showCart = showCart;
        }
    },
    actions: {
    },
    modules: {
    }
})
