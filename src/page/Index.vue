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
            this.init()
        },

        destroyed(){
            miro.removeListener('SELECTION_UPDATED', this.showHideLine)
        },

        methods: {
            async init() {
                miro.onReady(async () => {
                    let svgIcon = (this.isDevelopment()
                        ? '<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874000000013, 1.81897438000000000, 3.63794874000000013;stroke-dashoffset:0;paint-order:normal;opacity:0.32"/>' +
                            '<text xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" id="text9036" y="21.706474" x="-13.797913" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;line-height:1.25;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.40363145" xml:space="preserve"><tspan style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:16.14533424px;font-family:Consolas;-inkscape-font-specification:\'Consolas, Bold\';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;writing-mode:lr-tb;text-anchor:start;stroke-width:0.40363145" y="21.706474" x="-13.797913" id="tspan9034">dev</tspan></text>'
                        : '<path xmlns="http://www.w3.org/2000/svg" transform="matrix(1.0649522,0,0,1.0657413,-0.79179574,-0.82116488)" d="m 11.014246,12.038388 c 0.308522,0.518181 -0.546283,0.671534 -0.86125,0.512784 C 9.2994549,12.120971 9.4478638,10.925582 9.9886778,10.315888 10.956067,9.2252893 12.678826,9.5056897 13.597996,10.500036 14.946915,11.959279 14.52035,14.27062 13.065382,15.483388 11.126139,17.099817 8.2085378,16.521157 6.7079963,14.602309 4.8197179,12.187634 5.5530784,8.6563815 7.9375413,6.8708886 10.825445,4.7084174 14.97415,5.5978085 17.042996,8.4488994 19.481058,11.808811 18.434875,16.577188 15.116519,18.928388 11.285345,21.642941 5.8958848,20.439493 3.2629965,16.653445 0.27134146,12.351498 1.6323696,6.3399979 5.8864048,3.4258888 10.658789,0.15669878 17.293006,1.6755245 20.487995,6.397763 c 3.547044,5.24258 1.870263,12.500011 -3.32034,15.975625" id="path863" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.81897438;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:14.55179499, 3.63794874, 1.81897438, 3.63794874;stroke-dashoffset:0;paint-order:normal"/>'
                    )

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

            openBottomPanel(){
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
