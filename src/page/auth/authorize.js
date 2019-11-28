import Vue         from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/main.scss'

import App         from './Authorize.vue'
import common      from '@/common'
import globalMixin from '@/mixin/global'

common.registerHotReload()

Vue.use( ElementUI );

Vue.config.productionTip = false

Vue.mixin( globalMixin )

new Vue( {
    render: h => h( App ),
} ).$mount( '#app' )
