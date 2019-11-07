import Vue    from 'vue'
import App    from './Index.vue'
import common from './common'

common.registerHotReload('index')

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
