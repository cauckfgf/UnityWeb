import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes:RouteConfig[] = [
	{
		path: "/",
		name: "root",
		redirect: "/home/"
	},
	{
		path: "/home/",
		name: "home",
		component: () => import("../views/Home.vue")
	},
	{
		path: "/medicalData",
		name: "medicalRoot",
		component: () => import("../views/medicalData/index.vue"),
		children: [
			{
				path: "outpatient/",
				name: "outpatientDeviceData",
				component: () => import("../views/medicalData/outpatient.vue")
			}
		]
	},
	{
		path: "/space/",
		name: "space",
		component: () => import("../views/space/spaceRoot.vue"),
		children: [
			{
				path: "main/",
				name: "spaceMain",
				component: () => import("../views/space/spaceMain.vue")
			}
		]
	}
];

const router = new VueRouter({
	mode: process.env.NODE_ENV === "production" ? "hash" : "history",
	base: process.env.NODE_ENV === "production" ? "/static/UnityWeb/desktop/dist/" : "/",
	routes
});

export default router;
