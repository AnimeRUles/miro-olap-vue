<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled"
                   title="show only widget lines"/>

        <el-button @click="openLeftSidebar"
                   size="mini"
                   title="create..."
                   icon="el-icon-plus"
                   circle />

        <el-button @click="showWidgetAll"
                   size="mini"
                   title="show all widgets"
                   icon="el-icon-view"
                   circle />
    </div>
</template>

<script>
    import constant from '@/constant'

    export default {
        name      : 'BottomBar',
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

            async showWidgetAll() {
                const widgetLine_ = await miro.board.widgets.get()
                widgetLine_.forEach(wLine => {
                    wLine.clientVisible = true
                })
                this.updateWidget(widgetLine_)
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

    .el-button{
        margin-left: 8pt
    }
</style>
