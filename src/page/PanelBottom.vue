<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled"/>
    </div>
</template>

<script>
    export default {
        name      : 'PanelBottom',
        components: {},

        data() {
            return {}
        },

        computed: {},

        mounted() {}
    }
</script>

<style>
    #app {
        display         : flex;
        justify-content : center;
        align-items     : center;
    }
</style>
