<template>
    <div>
        <m-header></m-header>
        <!-- 子路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from '@/common/Header'
    export default {
        data () {
            return {

            }
        },
        components: {
            'm-header':Header
        }
    }
</script>

<style>

 
</style>
