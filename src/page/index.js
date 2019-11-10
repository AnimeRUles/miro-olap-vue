import Vue         from 'vue'
import App         from './Index.vue'
import common      from '@/common'
import globalMixin from '@/mixin/global'

common.registerHotReload()

Vue.config.productionTip = false

Vue.mixin(globalMixin)

new Vue({
    render: h => h(App),
}).$mount('#app')
