import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from "moment";
moment.locale("zh-cn");
Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
