<template>
    <div id="app">
        <el-row :gutter="8">
            <el-col style="height: 36pt;"></el-col>
            <el-col style="height: calc(100vh - 48pt);overflow: auto">
                <el-collapse v-model="activeTab_">

                    <el-collapse-item title="Create/Update" name="CreateLine">
                        <CreateLine/>
                    </el-collapse-item>

                    <el-collapse-item title="Hide" name="Hide">
                        <Hide/>
                    </el-collapse-item>

                    <el-collapse-item title="Other" name="Other">
                        <Other/>
                    </el-collapse-item>

                    <el-collapse-item title="Widget" name="Widget">
                        <Widget/>
                    </el-collapse-item>

                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CreateLine from './CreateLine.vue'
    import Hide       from './Hide.vue'
    import Other      from './Other.vue'
    import Widget     from './Widget.vue'

    export default {
        name      : 'LeftSidebar',
        components: {
            CreateLine,
            Hide,
            Other,
            Widget,
        },

        data(){
            return {
                activeTab_: [
                    'CreateLine',
                    // 'Hide',
                    // 'Other',
                    'Widget',
                ]
            }
        }
    }
</script>

<style>
    #app {
        display         : flex;
        justify-content : center;
        align-items     : center;
    }

    .el-row {
        width : 100%;
    }

    .el-col {
        padding    : 4pt;
        text-align : right;
    }

    .el-collapse-item__header {
        height      : 32px;
        line-height : 32px;
    }

    .el-select-dropdown{
        max-width: 300px;
    }
</style>
