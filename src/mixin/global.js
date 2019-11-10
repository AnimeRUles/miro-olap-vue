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
        })

        if (this.isDevelopment() && common.isHotReload()) return

        miro.onReady(() => {
            miro.addListener('DATA_BROADCASTED', data => {
                this.DATA_BROADCASTED(data)
            })
        })
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
    },
}