import common   from '@/common'
import {
    isEmpty,
    each
}               from 'lodash'
import constant from '@/constant'

export default {
    data() {
        return {
            isSettingsBroadcastThrow: true,
            isSettingsBroadcastSet  : true,
            settings                : {
                isEnabled: false,
                hide     : {
                    lineTagIs: true
                }
            }
        }
    },

    watch: {
        settings: {
            handler(val) {
                if (this.isSettingsBroadcastThrow) {
                    this.isSettingsBroadcastSet = false
                    sessionStorage.setItem('settings', JSON.stringify(val))
                    // miro.__setRuntimeState(val)
                    miro.broadcastData(val).then(() => {
                        this.isSettingsBroadcastSet = true
                    })
                }
            },
            deep: true
        }
    },

    async mounted() {
        miro.onReady(async () => {
            // let state = await miro.__getRuntimeState()
            let settings = sessionStorage.getItem('settings')
            if (!settings) {
                // await miro.__setRuntimeState(this.settings)
                sessionStorage.setItem('settings', JSON.stringify(this.settings))
            } else {
                this.settings = JSON.parse(settings)
            }

            miro.addListener('DATA_BROADCASTED', this.DATA_BROADCASTED)
        })
    },

    destroyed() {
        miro.removeListener('DATA_BROADCASTED', this.DATA_BROADCASTED)
    },

    methods: {
        DATA_BROADCASTED(data) {
            if (this.isSettingsBroadcastSet) {
                this.isSettingsBroadcastThrow = false
                new Promise(resolve => {
                    this.settings = data.data
                    resolve()
                }).then(result => {
                    this.isSettingsBroadcastThrow = true
                })
            }
        },

        log(...val) {
            console.log(...val, this.$el.baseURI)
        },

        isDevelopment() {
            return (process.env.NODE_ENV === 'development')
        },

        getArray(val) {
            switch (true) {
                case val === null:
                case val === undefined:
                    return []
                case Array.isArray(val):
                    return val
                default :
                    return [val]
            }
        },

        async getWidgetById(id) {
            let w_ = await miro.board.widgets.get({id})

            if (w_.length) {
                return w_[0]
            }

            return null
        },

        async getWidgetSelectFirst() {
            let w_ = await miro.board.selection.get()

            if (w_.length) {
                return w_[0]
            }

            return null
        },

        async getWidgetTagId_() {
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

        async updateWidget(w_) {
            if (!w_) return

            let wPart_ = []
            this.getArray(w_).forEach(w => {
                let wPart = {
                    id           : w.id,
                    clientVisible: w.clientVisible,
                }
                wPart_.push(wPart)
            })

            await miro.board.widgets.update(wPart_)
        },
    },
}