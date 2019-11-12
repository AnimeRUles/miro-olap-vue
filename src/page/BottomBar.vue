<template>
    <div id="app">
        <el-switch v-model="settings.isEnabled"
                   title="show only widget lines"/>

        <el-button @click="openLeftSidebar"
                   style="margin-left: 8pt"
                   size="mini"
                   title="create..."
                   icon="el-icon-plus"
                   circle>
        </el-button>

        <el-button @click="selectLineAll"
                   style="margin-left: 8pt"
                   size="mini"
                   title="select all lines"
                   round>sal
        </el-button>
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

            async selectLineAll() {
                await miro.board.selection.selectWidgets(
                    await miro.board.widgets.get({type: 'LINE'}))
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
