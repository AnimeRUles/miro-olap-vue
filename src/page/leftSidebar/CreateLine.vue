<template>
    <el-row :gutter="8">
        <el-col>
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
</template>

<script>
    import {each}   from 'lodash'
    import constant from '@/constant'

    export default {
        name      : 'CreateLine',
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
                    this.selectWidgetEnd(wSelect)
                    return
                }
            },

            async selectWidgetEnd(wEnd) {
                let w = await miro.board.widgets.create({
                    type         : constant.widget.type.LINE,
                    startWidgetId: this.wStartSelect.id,
                    endWidgetId  : wEnd.id,
                    style        : {
                        lineEndStyle: 5,
                        lineType    : 2,
                        lineColor   : '#808080',
                    }
                })

                let html       = document.createElement('html')
                html.innerHTML = '<html><head><title>temp</title></head><body>'
                    + wEnd.text
                    + '</body></html>'

                //todo check for duplicates
                // let p_ = html.getElementsByTagName('p');

                let wStart = await this.getWidgetById(this.wStartSelect.id)
                wEnd.text += this.createTagHtmlElement(wStart).outerHTML

                await miro.board.widgets.update(wEnd)

                await miro.board.widgets.sendBackward(w)
                // await miro.board.selection.selectWidgets(w)
            },

            createTagHtmlElement(wTag) {
                let p = document.createElement('p')

                let span                   = document.createElement('span')
                span.style.backgroundColor = wTag.style.borderColor
                span.textContent           = ' #' + wTag.plainText + ' '

                p.appendChild(span)

                return p
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
                let wId_ = []

                let f_ = await miro.board.widgets.get({
                    type: constant.widget.type.FRAME,
                })

                if (!f_.length) return []

                each(f_, f => {
                    if (f.title.charAt(0) === '#') {
                        wId_ = wId_.concat(f.childrenIds)
                    }
                })

                return wId_
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
</style>
