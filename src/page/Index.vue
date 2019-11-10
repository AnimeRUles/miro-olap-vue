<template>
    <div id="app"></div>
</template>

<script>
    import common from '../common'

    export default {
        name      : 'Index',
        components: {},

        data: function () {
            return {
                enable: false,
            }
        },

        mounted() {
            if (this.isDevelopment() && common.isHotReload()) return

            this.init()
        },

        methods: {
            init() {
                miro.onReady(() => {
                    if (this.isDevelopment()) {
                        miro.board.ui.openBottomPanel('panelBottom.html', {width: 60})
                    }

                    let svgIcon = (this.isDevelopment()
                        ? '<path xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" sodipodi:type="spiral" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-opacity:0.32775921" id="path5020" sodipodi:cx="11.0625" sodipodi:cy="12.84375" sodipodi:expansion="1" sodipodi:revolution="3" sodipodi:radius="12.268361" sodipodi:argument="-18.037138" sodipodi:t0="0" d="m 11.0625,12.84375 c 0.423043,0.446545 -0.393219,0.790563 -0.742187,0.703125 -0.9456815,-0.23695 -1.0656889,-1.459696 -0.664064,-2.187499 0.718413,-1.301868 2.495494,-1.4086282 3.632812,-0.625002 1.66906,1.150002 1.762178,3.545503 0.585941,5.078124 -1.567739,2.042743 -4.6005788,2.120274 -6.523437,0.546879 C 4.9318443,14.37942 4.8708363,10.701303 6.8437471,8.390628 9.2332066,5.5920907 13.560681,5.5480786 16.257809,7.9218717 19.436281,10.719305 19.463037,15.698515 16.687504,18.781246 13.483041,22.340381 7.8505827,22.349725 4.382817,19.171879 0.44252125,15.561009 0.45068677,9.274282 4.0312452,5.42188 8.0480907,1.1000673 14.98981,1.125808 19.226557,5.1093698 23.93015,9.5318784 23.886788,17.12912 19.500006,21.749994"/>' +
                            '<text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:17.19827652px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000007;fill-opacity:1;stroke:none;stroke-width:0.42995694;" x="-13.269753" y="22.277445" id="text5052" transform="rotate(-40.5)"><tspan xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" sodipodi:role="line" id="tspan5050" x="-13.269753" y="22.277445" style="fill:#000007;stroke-width:0.42995694;fill-opacity:1;">dev</tspan></text>'
                        : '<path xmlns="http://www.w3.org/2000/svg" d="m 11.0625,12.84375 c 0.423043,0.446545 -0.393219,0.790563 -0.742187,0.703125 -0.9456815,-0.23695 -1.0656889,-1.459696 -0.664064,-2.187499 0.718413,-1.301868 2.495494,-1.4086282 3.632812,-0.625002 1.66906,1.150002 1.762178,3.545503 0.585941,5.078124 -1.567739,2.042743 -4.6005788,2.120274 -6.523437,0.546879 C 4.9318443,14.37942 4.8708363,10.701303 6.8437471,8.390628 9.2332066,5.5920907 13.560681,5.5480786 16.257809,7.9218717 19.436281,10.719305 19.463037,15.698515 16.687504,18.781246 13.483041,22.340381 7.8505827,22.349725 4.382817,19.171879 0.44252125,15.561009 0.45068677,9.274282 4.0312452,5.42188 8.0480907,1.1000673 14.98981,1.125808 19.226557,5.1093698 23.93015,9.5318784 23.886788,17.12912 19.500006,21.749994" id="path5020" style="fill:none;fill-rule:evenodd;stroke:#000000"/>'
                    )

                    miro.initialize({
                        extensionPoints: {
                            bottomBar: {
                                title  : 'ОЛАП',
                                svgIcon,
                                onClick: function () {
                                    miro.board.ui.openBottomPanel('panelBottom.html', {width: 60})
                                }
                            }
                        }
                    })

                    miro.addListener('SELECTION_UPDATED', this.SELECTION_UPDATED)
                })
            },

            async SELECTION_UPDATED(e) {
                this.log('this.settings.isEnabled', this.settings.isEnabled)

                if (this.settings.isEnabled) {
                    if (!e.data.length) {
                        await this.showWidget()
                        return
                    }

                    let widget_ = []
                    for (let i = 0; i < e.data.length; i++) {
                        let widgetData = e.data[i]

                        if (widgetData.type === 'LINE') {
                            widget_ = widget_.concat(
                                await miro.board.widgets.get({id: widgetData.id}),
                            )
                        }else {
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
                const widgetAll_ = await miro.board.widgets.get({type: 'LINE'})
                widgetAll_.forEach(widgetAll => {
                    widgetAll.clientVisible = false
                    widget_.forEach(widget => {
                        if (widgetAll.id === widget.id) {
                            widgetAll.clientVisible = true
                            return
                        }
                    })
                })
                this.update(widgetAll_)
            },

            async showWidget() {
                const widgetAll_ = await miro.board.widgets.get({type: 'LINE'})
                widgetAll_.forEach(s => {
                    s.clientVisible = true
                })
                this.update(widgetAll_)
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
