import common from './common'

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
                    miro.broadcastData(val).then(() => {
                        this.isSettingsBroadcastSet = true
                    })
                }
            },
            deep: true
        }
    },

    mounted() {
        if (common.isHotReload()) return

        miro.onReady(() => {
            miro.addListener('DATA_BROADCASTED', data => {
                this.DATA_BROADCASTED(data)
            })
        })
    },

    methods: {
        log(...val) {
            console.log(this.$el.baseURI, val)
        },

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
    },
}