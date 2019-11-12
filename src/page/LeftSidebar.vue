<template>
    <div id="app">
        <el-row :gutter="8">

            <el-col style="height: 36pt;"></el-col>

            <el-col style="text-align: right;">Create line</el-col>

            <el-col style="text-align: right;">
                <el-dropdown split-button
                             :type="(wStartSelect ? 'info' : '')"
                             @click="selectWidgetStart_begin"
                >{{(wStartSelect ? wStartSelect.name : 'Choose a start widget')}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="tag in wStart_"
                                          :key="tag.id"
                                          @click.native="wStartSelect = getWidgetStartById(tag.id)"
                        >{{tag.name}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

            <el-col style="text-align: right;">
                <el-button @click="selectWidgetEnd_begin">Create line</el-button>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {each} from 'lodash'

    export default {
        name      : 'LeftSidebar',
        components: {},

        data() {
            return {
                wStart_     : [],
                wStartSelect: null,
            }
        },

        mounted() {
            miro.onReady(async () => {
                this.wStart_ = await this.getTagObj_()
            })
        },

        methods: {
            async selectWidgetStart_begin() {
                let wSelect = await this.getWidgetSelectFirst()
                if (wSelect) {
                    this.selectWidgetStart(wSelect.id)
                    return
                }
            },

            async selectWidgetStart(wId) {
                let w      = await this.getWidgetById(wId),
                    wStart = this.getWidgetStartById(w.id)
                if (!wStart) {
                    wStart = this.getWidgetObjCustom(w)
                    this.wStart_.push(wStart)
                }
                this.wStartSelect = wStart
            },

            async selectWidgetEnd_begin() {
                if (!this.wStartSelect) {
                    miro.showErrorNotification('Choose a start widget')
                    return
                }

                let wSelect = await this.getWidgetSelectFirst()
                if (!wSelect) {
                    miro.showErrorNotification('Choose a end widget')
                    return
                }

                if (wSelect) {
                    this.selectWidgetEnd(wSelect.id)
                    return
                }
            },

            async selectWidgetEnd(wId) {
                let wEndSelect = this.getWidgetObjCustom(
                    await this.getWidgetById(wId))

                let w = await miro.board.widgets.create({
                    type           : 'LINE'
                    , startWidgetId: this.wStartSelect.id
                    , endWidgetId  : wEndSelect.id
                    , style        : {
                        lineEndStyle: 1,
                        lineType    : 2,
                    }
                })

                await miro.board.widgets.sendBackward(w)

                await miro.board.selection.selectWidgets(w)
            },

            getWidgetObjCustom(w) {
                if (!w) return null

                return {
                    id  : w.id,
                    name: w.plainText,
                }
            },

            getWidgetStartById(id) {
                return this.wStart_.find((el) => el.id === id) || null
            },

            async getTagId_() {
                let f_ = await miro.board.widgets.get({type: 'FRAME', title: '#'})

                if (!f_.length) return []

                return f_[0].childrenIds
            },

            async getTagObj_() {
                let _ = []

                each(await this.getTagId_(), async wId => {
                    _.push(this.getWidgetObjCustom(
                        await this.getWidgetById(wId)
                    ))
                })

                return _
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
    .el-col{
        padding: 4pt;
    }
</style>
