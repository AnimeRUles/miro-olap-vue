<template>
    <div id="app">
        <el-row :gutter="8">
            <el-col style="height: 36pt;"></el-col>
            <el-col>
                <el-collapse v-model="activeTab_">

                    <el-collapse-item title="Create line" name="CreateLine">
                        <CreateLine/>
                    </el-collapse-item>

                    <el-collapse-item title="Hide" name="Hide">
                        <Hide/>
                    </el-collapse-item>

                    <el-collapse-item title="Other" name="Other">
                    </el-collapse-item>

                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CreateLine from './CreateLine.vue'
    import Hide       from './Hide.vue'

    export default {
        name      : 'LeftSidebar',
        components: {
            CreateLine,
            Hide,
        },

        data(){
            return {
                activeTab_: [
                    'CreateLine',
                    'Hide',
                    'Other',
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
</style>
