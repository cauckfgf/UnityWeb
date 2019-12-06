import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showType: "room",
		modelValue: ""
	},
	mutations: {
		changeViewByCode (state, payload) {
			state.showType = payload.type;
			state.modelValue = payload.id;
		}
	},
	actions: {},
	modules: {}
});
