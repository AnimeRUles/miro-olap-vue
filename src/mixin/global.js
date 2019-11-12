import common    from '@/common'
import {isEmpty} from 'lodash'

export default {
    data() {
        return {
            isSettingsBroadcastThrow: true,
            isSettingsBroadcastSet  : true,
            settings                : {
                isEnabled: false
            }
        }
    },

    watch: {
        settings: {
            handler(val) {
                if (this.isSettingsBroadcastThrow) {
                    this.isSettingsBroadcastSet = false
                    miro.__setRuntimeState(val)
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
            let state = await miro.__getRuntimeState()
            if (isEmpty(state)) {
                await miro.__setRuntimeState(this.settings)
            } else {
                this.settings = state
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
    },
}