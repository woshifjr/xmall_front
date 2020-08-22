import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Goods from '@/views/Goods'
import Thanks from '@/views/Thanks'
import GoodsDetail from '@/views/GoodsDetail'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: '/home',
        name:'home',
        component:Index,
        children:[
            {
                path:'home',
                component:Home
            },
            {
                path:'goods',
                component:Goods
            },
            {
                path:'thanks',
                component:Thanks
            },
            {
                path:'goodsDetail',
                name:'goodsDetail',
                component:GoodsDetail
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
