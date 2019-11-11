<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled" />
        <el-button @click="openLeftSidebar"
                   style="margin-left: 8pt"
                   size="mini"
                   round>Create...</el-button>
    </div>
</template>

<script>
    export default {
        name      : 'BottomPanel',
        components: {},

        data() {
            return {}
        },

        mounted() {
            miro.onReady(async () => {
                if (this.isDevelopment()) {
                    this.openLeftSidebar()
                }
            })
        },

        methods: {
            openLeftSidebar() {
                miro.board.ui.openLeftSidebar('left-sidebar.html', {width: 180})
            },
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
