import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showType: "room",
		modelValue: "",
		colorType: "category",
		showWalls: true,
		liveStream: ""
	},
	mutations: {
		changeViewByCode (state, payload) {
			state.showType = payload.type;
			state.modelValue = payload.id;
		},
		changeColorType (state, payload) {
			state.colorType = payload;
		},
		changeWall (state, payload) {
			state.showWalls = payload;
		},
		updateLiveStream (state, payload) {
			state.liveStream = payload.split(",")[ 1 ];
		},
		findFloorAndCamera (state, payload) {
			state.modelValue = payload[ 0 ];
		}
	},
	actions: {},
	modules: {}
});
