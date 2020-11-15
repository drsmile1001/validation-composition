import Vue from "vue"
import CompositionApi from "@vue/composition-api"
import App from "./App.vue"
import router from "./router"

Vue.use(CompositionApi)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount("#app")
