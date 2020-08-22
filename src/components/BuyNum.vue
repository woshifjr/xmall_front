<template>
    <div>
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                num:1
            }   
        },
        components: {

        },
        methods: {
            handleChange(value) {
                this.$emit("handlerValue",value);
            }
        },
    }
</script>

<style lang="scss" scoped>

 
</style>
