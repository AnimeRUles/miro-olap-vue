<template>
    <div id="app"></div>
</template>

<script>
    import common   from '../common'
    import constant from '@/constant'

    export default {
        name      : 'Index',
        components: {},

        data: function () {
            return {
                enable: false,
            }
        },

        mounted() {
            this.init()
        },

        destroyed() {
            miro.removeListener('SELECTION_UPDATED', this.showHideLine)
        },

        methods: {
            async init() {
                miro.onReady(async () => {
                    let svgIcon = (this.isDevelopment()
                        ? constant.icon.appDev
                        : constant.icon.app)

                    let self = this

                    if (!common.isHotReload()) {
                        await miro.initialize({
                            extensionPoints: {
                                bottomBar: {
                                    title  : 'AnimeRUles',
                                    svgIcon,
                                    onClick: function () {
                                        self.openBottomPanel()
                                    },
                                }
                            }
                        })
                    }

                    miro.addListener('SELECTION_UPDATED', this.showHideLine)

                    if (this.isDevelopment()) {
                        this.openBottomPanel()
                    }
                })
            },

            openBottomPanel() {
                miro.board.ui.openBottomPanel('bottom-bar.html', {width: 160})
            },

            async showHideLine(e) {
                if (this.settings.isEnabled) {
                    if (!e.data.length) {
                        await this.showWidget()
                        return
                    }

                    let widget_ = []
                    for (let i = 0; i < e.data.length; i++) {
                        let widgetData = e.data[i]

                        if (widgetData.type === constant.widget.type.LINE) {
                            widget_ = widget_.concat(
                                await miro.board.widgets.get({id: widgetData.id}),
                            )
                        } else {
                            widget_ = widget_.concat(
                                await miro.board.widgets.get({endWidgetId: widgetData.id}),
                                await miro.board.widgets.get({startWidgetId: widgetData.id})
                            )
                        }
                    }

                    this.hideWidget(widget_)
                }
            },

            async hideWidget(widget_) {
                const wTagId_     = await this.getWidgetTagId_()
                const widgetLine_ = await miro.board.widgets.get({
                    type: constant.widget.type.LINE
                })
                widgetLine_.forEach(wLine => {
                    wLine.clientVisible = false

                    if (this.settings.hide.lineTagIs
                        && (wTagId_.includes(wLine.startWidgetId)
                            || wTagId_.includes(wLine.endWidgetId))
                    ) {
                        wLine.clientVisible = false
                    } else {
                        widget_.forEach(widget => {
                            if (wLine.id === widget.id) {
                                wLine.clientVisible = true
                                return
                            }
                        })
                    }
                })
                this.update(widgetLine_)
            },

            async showWidget() {
                const wTagId_     = await this.getWidgetTagId_()
                const widgetLine_ = await miro.board.widgets.get({
                    type: constant.widget.type.LINE
                })
                widgetLine_.forEach(wLine => {
                    if (this.settings.hide.lineTagIs
                        && (wTagId_.includes(wLine.startWidgetId)
                            || wTagId_.includes(wLine.endWidgetId))
                    ) {
                        wLine.clientVisible = false
                    } else {
                        wLine.clientVisible = true
                    }
                })
                this.update(widgetLine_)
            },

            update(widget_) {
                if (!widget_) return

                let widgetPart_ = []
                this.getArray(widget_).forEach(widget => {
                    let widgetPart = {
                        id           : widget.id,
                        clientVisible: widget.clientVisible,
                    }
                    widgetPart_.push(widgetPart)
                })

                miro.board.widgets.update(widgetPart_)
            },
        },
    }
</script>

<style>
</style>
