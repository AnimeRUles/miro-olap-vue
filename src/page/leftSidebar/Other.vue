<template>
    <el-row :gutter="8">
        <el-col>
            <el-select v-model="widgetTypeSelect" placeholder="type">
                <el-option v-for="widgetType in widgetType_"
                           :key="widgetType.value"
                           :label="widgetType.label"
                           :value="widgetType.value"/>
            </el-select>
            <el-tooltip content="select all widgets by type">
                <el-button @click="selectWidgetType">select</el-button>
            </el-tooltip>
        </el-col>
    </el-row>
</template>

<script>
    import {each}   from 'lodash'
    import constant from '@/constant'

    export default {
        name      : 'Other',
        components: {},

        data() {
            return {
                widgetTypeSelect: '',
                widgetType_     : [
                    {
                        value: constant.widget.type.LINE,
                        label: constant.widget.type.LINE
                    },
                    {
                        value: constant.widget.type.FRAME,
                        label: constant.widget.type.FRAME
                    },
                    {
                        value: constant.widget.type.TEXT,
                        label: constant.widget.type.TEXT
                    },
                ]
            }
        },

        mounted() {

        },

        methods: {
            async selectWidgetType() {
                if (!this.widgetTypeSelect) {
                    miro.showErrorNotification('Select widget type')
                    return
                }

                await miro.board.selection.selectWidgets(
                    await miro.board.widgets.get({type: this.widgetTypeSelect}))
            },
        }
    }
</script>

<style>
</style>
