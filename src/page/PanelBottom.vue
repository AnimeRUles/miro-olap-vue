<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled"/>
    </div>
</template>

<script>
    import common from '../common'

    export default {
        name      : 'PanelBottom',
        components: {},

        data() {
            return {}
        },

        computed: {},

        mounted() {
            if (this.isDevelopment() && common.isHotReload()) return
        }
    }
</script>

<style>
    #app {
        display         : flex;
        justify-content : center;
        align-items     : center;
    }
</style>
