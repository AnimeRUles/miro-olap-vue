<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled"/>
    </div>
</template>

<script>
    import common       from './common'
    import common_mixin from './common_mixin'

    export default {
        name      : 'PanelBottom',
        components: {},
        mixins    : [common_mixin],

        data() {
            return {}
        },

        computed: {},

        mounted() {
            if (common.isHotReload()) return
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
