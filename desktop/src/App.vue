<style lang="less" scoped>
	#root {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.operationBar {
		position: absolute;
		top: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 90px;
		color: #FFF;

		.logo {
			width: 340px;
			background: url("./assets/logo.png") center;
		}

		.menu {
			width: 100%;
			height: 90px;
			display: flex;
			flex-direction: column;
		}

		.topLevel {
			font-size: 16px;
			background: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .6));
			white-space: nowrap;
			width: 100%;

			nav {
				cursor: pointer;
				display: inline-block;
				width: 100px;
				text-align: center;

				&.active {
					color: #29ac13;

					&::before {
						content: "";
						position: absolute;
						width: 1px;
						height: 50%;
						bottom: -1px;
						border-left: 1px solid #29ac13;
						left: 14px;
					}
				}
			}

			.additional {
				width: 50%;
				overflow: hidden;
				white-space: nowrap;
				display: inline-block;
				vertical-align: bottom;
				text-overflow: ellipsis;
				text-align: right;

				span {
					padding: 0 8px;
				}
			}
		}

		.secondLevel {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			width: 100%;
			height: 100%;
			overflow-y: visible;
			border-top: 2px solid rgba(0, 0, 0, 0.2);

			.active ~ .functions::after, .active.functions::after {
				content: none;
			}

			.functions {
				height: 100%;
				width: 80px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				background: linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
				padding: 0 12px;
				overflow: visible;

				&::after {
					content: "";
					width: 100%;
					height: 1px;
					position: absolute;
					top: -2px;
					left: 0;
					border-top: 2px solid #29ac13;
				}

				&:first-child::after {
					width: 66px;
					left: 14px;
				}

				&.active {
					color: #29ac13;
					background: rgba(0, 0, 0, .3);

					&::before {
						content: "";
						position: absolute;
						width: 1px;
						height: 17px;
						top: -2px;
						border-left: 2px solid #29ac13;
						left: 50%;
					}

					&::after {
						content: "";
						width: 50%;
						position: absolute;
						left: 0;
						top: -2px;
						border-top: 2px solid #29ac13;
					}

					&:first-child::after {
						width: 26px;
						left: 14px;
					}
				}
			}
		}
	}
</style>
<style>
	@import "~view-design/dist/styles/iview.css";
	@import "~vue-draggable-resizable/dist/VueDraggableResizable.css";
	@import "./resource/baseCss.css";

	@font-face {
		font-family: 'iconfont';  /* project id 1531202 */
		src: url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.eot');
		src: url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.woff') format('woff'),
		url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1531202_45b2vi9l7xf.svg#iconfont') format('svg');
	}

	.iconfont {
		font-family: "iconfont";
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.main {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.view {
		width: 100%;
		height: 100%;
	}

	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
		background-color: #1c394b
	}

	::-webkit-scrollbar-thumb {
		width: 5px;
		background-color: #18598f
	}
</style>
<template>
	<div id="root">
		<iframe :src='src' id="frame"
			style="position: absolute;left: 0;top: 0;width: 100%;height: 100%"></iframe>
		<div class="operationBar">
			<div class="logo"></div>
			<div class="menu">
				<div class="topLevel">
					<nav :class='{active:menuActive===index}' :key=index @click='handleMenuClick(i,index)'
						v-for='(i, index) in topLevel'>
						<i class='iconfont'>&#xe8cb;</i>
						{{i.name}}
					</nav>
					<div class="additional">
						<span>当前温度：<!--虚拟数据--> 24℃</span>
						<span>{{time}}</span>
						<span><i class="iconfont">&#xe602; </i>{{unread}} 个通知</span>
					</div>
				</div>
				<div class="secondLevel">
					<div :class="{active:secondActive===i.name}" :key="i.name" @click="handleSecondClick(i)"
						class="functions" v-for="i in secondLevel">
						<i class="iconfont" style="display: block;font-size: 24px" v-html="i.icon"></i>
						<div style="color: white">{{i.name}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="main">
			<RouterView />
		</div>
		<drag :height=150 :left=60 :top=100 :width=290 @close="showAttach = false" showClose title="房间信息"
			v-if="showAttach">
			<ul style="padding: 16px">
				<li :key="i.value" style="font-size: 18px;line-height: 32px" v-for="i in attachInfo">
					{{i.name}}
					<span>{{i.value}}</span>
				</li>
			</ul>
		</drag>
	</div>
</template>

<script lang="ts">
	import { Button } from "view-design";
	import { Component, Vue } from "vue-property-decorator";
	import moment from "moment";
	import request from "@/request";
	import drag from "@/components/drag/drag.vue";
	import axios from "axios";

	const CancelToken = axios.CancelToken;

	interface menu {
		name:string,
		children?:subMenu[]
	}

	interface subMenu {
		name:string,
		icon:string,
		href?:string
	}

	@Component({
		components: {
			Button,
			drag
		}
	})
	export default class App extends Vue {
		public time:string = "";
		public unread:number = 0;
		public menuActive:number = 0;
		public topLevel:menu[] = [];
		public secondActive:string = "";
		public secondLevel:subMenu[] = [];
		public attachInfo:{ name:string, value:any }[] = [];
		public showAttach:boolean = false;
		public src:string = (process.env.NODE_ENV === "production" ? "/static/UnityWeb/Unity/Space/RoomBlocks" : "//about;blank") + "";
		private cancelToken?:any;

		public handleMenuClick (i:menu, index:number) {
			this.menuActive = index;
			if (i.children) {
				this.secondLevel = i.children;
			}
		}

		public handleSecondClick (i:{ icon:string, name:string, href?:string }) {
			this.secondActive = i.name;
			if (i.href) {
				this.$router.push(i.href);
			}
		}

		public getMessage ():void {
			request("/user/message/?user=&status=1&mtype!=1&pagesize=1").then(({ data }) => {
				this.unread = data.count;
				setTimeout(() => {
					this.getMessage();
				}, 15000);
			});
		}

		mounted () {
			this.time = moment(new Date()).format("YYYY年MMMDD日 dddd HH:mm:ss");
			setInterval(() => {
				this.time = moment(new Date()).format("YYYY年MMMDD日 dddd HH:mm:ss");
			}, 1000);
			this.getMessage();
			// mock time
			this.topLevel = [
				{
					"name": "运维总览",
					children: [
						{
							icon: "&#xe749;",
							name: "运维总览",
							href: "/home"
						},
						{
							icon: "&#xe696;",
							name: "空间总览"
						},
						{
							icon: "&#xe601;",
							name: "室内空气"
						},
						{
							icon: "&#xe95e;",
							name: "机房环控"
						},
						{
							icon: "&#xe751;",
							name: "防火分区"
						},
						{
							icon: "&#xe62c;",
							name: "建筑载荷"
						},
						{
							icon: "&#xe609;",
							name: "3D台帐"
						}
					]
				},
				{ "name": "空间管理" },
				{ "name": "维修维保" },
				{ "name": "安防管理" },
				{
					"name": "医疗管理",
					children: [
						{
							icon: "&#xe605;",
							name: "门诊统计",
							href: "/medicalData/outpatient/"
						},
						{
							icon: "&#xe621;",
							name: "住院统计"
						},
						{
							icon: "&#xe74b;",
							name: "医疗设备"
						}
					]
				},
				{ "name": "能耗管理" }
			];
			this.secondLevel = [
				{
					icon: "&#xe749;",
					name: "运维总览",
					href: "/home"
				},
				{
					icon: "&#xe696;",
					name: "空间总览"
				},
				{
					icon: "&#xe601;",
					name: "室内空气"
				},
				{
					icon: "&#xe95e;",
					name: "机房环控"
				},
				{
					icon: "&#xe751;",
					name: "防火分区"
				},
				{
					icon: "&#xe62c;",
					name: "建筑载荷"
				},
				{
					icon: "&#xe609;",
					name: "3D台帐"
				}
			];
			// @ts-ignore
			const frame:HTMLIFrameElement | null = document.getElementById("frame");
			// @ts-ignore
			frame.contentWindow.selected = (id:string) => {
				this.cancelToken && this.cancelToken();
				request({
					url: "/model/rest/pb/guid2obj/",
					params: {
						guid: id
					},
					cancelToken: new CancelToken(cancel => {
						this.cancelToken = cancel;
					})
				}).then(({ data }) => {
					this.attachInfo = [
						{ name: "名称", value: data.rooms[ 0 ].Name },
						{ name: "楼层", value: data.rooms[ 0 ].floor__name },
						{ name: "编号", value: data.rooms[ 0 ].number }
					];
					this.showAttach = true;
				});
			};
		}
	}
</script>
