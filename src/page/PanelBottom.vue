<template>
    <div id="app">
        <div class="btn prev-button">
            <el-switch v-model="isEnabled"/>
        </div>
    </div>
</template>

<script>
    import common from './common'

    export default {
        name      : 'PanelBottom',
        components: {},

        data() {
            return {
                isEnabled: false
            }
        },

        computed: {

        },

        watch: {
            isEnabled: function (value) {
                console.log('isEnabled', value)
            }
        },

        mounted() {
            if (common.isHotReload('panelBottom')) return
        }
    }
</script>

<style>
</style>
