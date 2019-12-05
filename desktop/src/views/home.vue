<style lang=less scoped>
	@import "../variables.less";

	.home {
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	.summer {
		width: 240px;
		position: absolute;
		top: 100px;
		bottom: 20px;
		right: 20px;
		background-color: @mainBackground;
		display: flex;
		flex-direction: column;
		pointer-events: all;
	}

	.title {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 10px;
		background-color: @darkBackground;

		.titleCount {
			font-size: @fontSizeB;
			line-height: 35px;
			color: white;
			text-align: center;
			flex-grow: 1;
			border-radius: 6px;
			margin: 0 6px;
		}
	}

	.segmentationBlock {
		height: 100%;
		overflow: auto;
		padding: 8px;

		.segmentation {
			padding: 6px 12px;
			color: white;
			display: flex;
			flex-direction: row;
			align-items: center;
			background-color: @infoBlockBackground;
			border: 1px solid #355b6d;
			border-radius: 3px;

			i {
				font-size: 30px;
				display: block;
				margin-right: 10px;
			}

			.numbers {
				font-size: @fontSizeC;
				padding: 2px 6px;
				border-radius: 4px;
				display: block;
				text-align: center;
			}
		}
	}

	.titles {
		font-size: @fontSizeB;
	}
</style>
<template>
	<div class="home">
		<div class="summer">
			<div class="title">
				<span class="titleCount" style="background-color: #007fc8">维保：{{maintenance}}</span>
				<span class="titleCount" style="background-color: #94271c">报警： {{warn}}</span>
			</div>
			<div class="segmentationBlock">
				<div :key="i.id" class="segmentation" v-for="i in segmentation">
					<i class="iconfont" v-html="i.icon" />
					<ul style="flex-grow: 1">
						<li class="titles">{{i.name}}</li>
						<li>{{i.count}}个设备</li>
					</ul>
					<ul style="width: 70px">
						<li>
							<span
								:style="{marginBottom:'6px',backgroundColor: i.warn===0?'#286d39':i.warn<10?'#835820':'#96271d'}"
								class="numbers">
							报警：{{i.warn}}
							</span>
						</li>
						<li>
							<span
								:style="{backgroundColor: i.maintenance===0?'#286d39':i.maintenance<10?'#835820': '#96271d'}"
								class="numbers">
							维保：{{i.maintenance}}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<drag icon="&#xe66c;" v-bind=todayWater>
			<div :id="waterChartId" />
			<div slot=foot style="height: 74px;display: flex;flex-direction: row;align-items: center">
				<div style='text-align: center;width: 150px'>
					本月用水量
					<br>
					<span class="titles">{{(thisMonthWaterUsed+todayWaterUsed).toFixed(2)}}</span><sup>kT</sup>
				</div>
				<div style="height: 50px;width: 1px;border-left: 1px solid #FFF"></div>
				<div style='text-align: center;width: 140px'>
					今日用水量
					<br>
					<span class="titles">{{todayWaterUsed.toFixed(2)}}</span><sup>T</sup>
				</div>
				<div style='text-align: center;flex-grow: 1'>
					环比变化
					<br>
					<span
						:style="{backgroundColor:waterMoM==='-'?'transport':waterMoM>0?'#93261b':'#266c39'}"
						class="titles"
						style='padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;'>
						{{waterMoM==="-"?"-":waterMoM>0?("↑"+Math.abs(waterMoM).toFixed(2)+"%"):("↓"+Math.abs(waterMoM).toFixed(2)+"%")}}
					</span>
				</div>
			</div>
		</drag>
		<drag icon="&#xe604;" v-bind=todayEl>
			<div :id="elChartId" />
			<div slot=foot style="height: 74px;display: flex;flex-direction: row;align-items: center">
				<div style='text-align: center;width: 150px'>
					本月用电量
					<br>
					<span class="titles">{{(thisMonthElUsed+todayElUsed).toFixed(2)}}</span><sup>kW·h</sup>
				</div>
				<div style="height: 50px;width: 1px;border-left: 1px solid #FFF"></div>
				<div style='text-align: center;width: 140px'>
					今日用电量
					<br>
					<span class="titles">{{todayElUsed.toFixed(2)}}</span><sup>kW·h</sup>
				</div>
				<div style='text-align: center;flex-grow: 1'>
					环比变化
					<br>
					<span
						:style="{backgroundColor:elMoM==='-'?'transport':elMoM>0?'#93261b':'#266c39'}"
						class="titles"
						style='padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;'>
						{{elMoM==="-"?"-":elMoM>0?("↑"+Math.abs(elMoM).toFixed(2)+"%"):("↓"+Math.abs(elMoM).toFixed(2)+"%")}}
					</span>
				</div>
			</div>
		</drag>
		<drag icon="&#xe74d;" v-bind=repair>
			<div style="padding: 18px">
				<span
					@click="showRepair(1)"
					style='font-size: 18px;padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;background-color: #95271d;cursor: pointer'>
					新建{{repairCount.newly}}
				</span>
				<span
					@click="showRepair(2)"
					style='font-size: 18px;padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;background-color: #26798b;margin: 0 12px;cursor: pointer'>
					处理中{{repairCount.ing}}
				</span>
				<span
					@click="showRepair(3)"
					style='font-size: 18px;padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;background-color: #256f35;cursor: pointer'>
					已完成{{repairCount.done}}
				</span>
			</div>
			<template slot=foot>
				<Spin fix style="background-color: transparent" v-if="repairLoading" />
				<div style="height: 100%;font-size: 20px;display: flex;justify-content: center;align-items: center"
					v-else-if="repairCount.detail.length===0">
					暂无数据
				</div>
				<template v-else>
					<repair-item :describe="i.describe" :key='i.id'
						:key-string="i.number" :status="currentRepairStatus"
						:time-string="i.createtime|repairTimeString"
						v-for='i in repairCount.detail' />
				</template>
			</template>
		</drag>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import drag from "@/components/drag/drag.vue";
	import request from "@/request";
	import moment from "moment";
	import G2 from "@antv/g2";
	import repairItem from "@/components/repairItem/repairItem.vue";
	import { Spin } from "view-design";
	import axios from "axios";

	const CancelToken = axios.CancelToken;

	interface segmentation {
		id:number,
		name:string,
		warn:number,
		maintenance:number,
		count:number,
		icon?:string
	}

	@Component({
		components: {
			drag,
			repairItem,
			Spin
		},
		filters: {
			repairTimeString (str:string):string {
				return moment(str).format("YYYY-MM-DD HH:mm");
			}
		}
	})
	export default class Home extends Vue {
		maintenance:number = 0;
		warn:number = 0;
		segmentation:segmentation[] = [];
		todayWater = {
			left: document.body.clientWidth - 730,
			top: 400,
			width: 450,
			height: 290,
			title: "今日用水量",
			exportFunction: () => {
				console.log(this.warn);
			}
		};
		readonly waterChartId = "id" + parseInt(Math.random() * 100 + "1").toString(36);
		todayWaterUsed:number = 0;
		thisMonthWaterUsed:number = 0;
		lastMonthWaterUsed:number = 0;
		chart?:G2.Chart;
		todayEl = {
			left: document.body.clientWidth - 730,
			top: 100,
			width: 450,
			height: 290,
			title: "今日用电量",
			exportFunction: () => {
				console.log(this.warn);
			}
		};
		readonly elChartId = "id" + parseInt(Math.random() * 100 + "1").toString(36);
		todayElUsed:number = 0;
		thisMonthElUsed:number = 0;
		lastMonthElUsed:number = 0;
		elChart?:G2.Chart;
		repair = {
			left: document.body.clientHeight >= 920 ? document.body.clientWidth - 730 : document.body.clientWidth - 1200,
			top: document.body.clientHeight >= 920 ? 700 : 100,
			width: 450,
			height: document.body.clientHeight < 920 ? 290 : (document.body.clientHeight - 720),
			title: "报修工单",
			exportFunction: () => {
				console.log(this.warn);
			}
		};
		repairCount = {
			ing: 0,
			newly: 0,
			done: 0,
			detail: []
		};
		repairLoading:boolean = false;
		currentRepairStatus:number = 1;
		private readonly todayMoment = moment();
		private repairCancelToken?:any;

		get waterMoM ():number | "-" {
			if (this.lastMonthWaterUsed === 0) {
				return "-";
			} else {
				return this.todayWaterUsed / this.lastMonthWaterUsed * 100 - 100;
			}
		}

		get elMoM ():number | "-" {
			if (this.lastMonthElUsed === 0) {
				return "-";
			} else {
				return this.todayElUsed / this.lastMonthElUsed * 100 - 100;
			}
		}

		getWater ():void {
			const timestamp = this.todayMoment.format("YYYY-MM-DDT");
			// @ts-ignore
			const timestamp1 = moment().add(-1, "day").format("YYYY-MM-DDT");
			const timestamp2 = this.todayMoment;
			const timestamp3 = moment().add(-29, "day").format("YYYY-MM-DDT");
			const chunk = [
				new Promise(resolve => {
					request({
						url: "/energy/rest/MnitorData/",
						params: {
							WaterCirruit__isnull: false,
							time__range: [ timestamp1 + "00:00:00", timestamp1 + "23:59:59" ].join(),
							pagesize: 999,
							order: "time",
							type: "hour"
						}
					}).then(({ data }) => {
						resolve(this.sortChunk(data.results, "昨日用量"));
					});
				}),
				new Promise(resolve => {
					request({
						url: "/energy/rest/MnitorData/",
						params: {
							WaterCirruit__isnull: false,
							time__range: [ timestamp + "00:00:00", timestamp + "23:59:59" ].join(),
							pagesize: 999,
							order: "time",
							type: "hour"
						}
					}).then(({ data }) => {
						const chunk = this.sortChunk(data.results, "今日用量");
						chunk.forEach(t => {
							this.todayWaterUsed += t.value;
						});
						resolve(chunk);
					});
				})
			];
			Promise.all(chunk).then((value) => {
				const [ yesterday, today ] = (value as any[][]);
				const dataSource = yesterday.concat(today);
				const chart = this.chart;
				if (chart === undefined) return;
				chart.source(dataSource);
				chart.scale("time", {
					range: [ 0, 1 ]
				});
				chart.scale("value", {
					range: [ 0, 1 ],
					alias: "用水量（吨/小时）"
				});
				chart.axis("time", {
					label: {
						textStyle: {
							fill: "#fff"
						}
					}
				});
				chart.axis("value", {
					label: {
						textStyle: {
							fill: "#FFF"
						}
					},
					title: {
						autoRotate: true,
						offset: 30,
						textStyle: {
							fontSize: 12
						}
					}
				});
				chart.area().position("time*value").shape("smooth").color("name");
				chart.legend({
					position: "bottom-center",
					textStyle: {
						fill: "#FFF"
					},
					marker: "square",
					offsetY: -16
				});
				chart.render();
			});
			request({
				url: "/energy/rest/MnitorData/",
				params: {
					WaterCirruit__isnull: false,
					time__range: [
						timestamp2.format("YYYY-MM-01T00:00:00"),
						timestamp2.format("YYYY-MM-DDT23:59:59")
					].join(),
					pagesize: 999,
					order: "time",
					type: "day"
				}
			}).then(({ data }) => {
				data.results.forEach((t:any) => {
					this.thisMonthWaterUsed += t.D_value * 1;
				});
			});
			request({
				url: "/energy/rest/MnitorData/",
				params: {
					WaterCirruit__isnull: false,
					time__range: [
						timestamp3 + "00:00:00",
						timestamp3 + "23:59:59"
					].join(),
					pagesize: 999,
					order: "time",
					type: "day"
				}
			}).then(({ data }) => {
				data.results.forEach((t:any) => {
					this.lastMonthWaterUsed += t.D_value * 1;
				});
			});
		};

		getEle ():void {
			const timestamp = this.todayMoment.format("YYYY-MM-DDT");
			// @ts-ignore
			const timestamp1 = moment().add(-1, "day").format("YYYY-MM-DDT");
			const timestamp2 = this.todayMoment;
			const timestamp3 = moment().add(-29, "day").format("YYYY-MM-DDT");
			const chunk = [
				new Promise(resolve => {
					request({
						url: "/energy/rest/MnitorData/",
						params: {
							EnergyCategory: 5,
							time__range: [ timestamp1 + "00:00:00", timestamp1 + "23:59:59" ].join(),
							pagesize: 999,
							order: "time",
							type: "hour"
						}
					}).then(({ data }) => {
						resolve(this.sortChunk(data.results, "昨日用量"));
					});
				}),
				new Promise(resolve => {
					request({
						url: "/energy/rest/MnitorData/",
						params: {
							EnergyCategory: 5,
							time__range: [ timestamp + "00:00:00", timestamp + "23:59:59" ].join(),
							pagesize: 999,
							order: "time",
							type: "hour"
						}
					}).then(({ data }) => {
						const chunk = this.sortChunk(data.results, "今日用量");
						chunk.forEach(t => {
							this.todayElUsed += t.value;
						});
						resolve(chunk);
					});
				})
			];
			Promise.all(chunk).then((value) => {
				const [ yesterday, today ] = (value as any[][]);
				const dataSource = yesterday.concat(today);
				const chart = this.elChart;
				if (chart === undefined) return;
				chart.source(dataSource);
				chart.scale("time", {
					range: [ 0, 1 ]
				});
				chart.scale("value", {
					range: [ 0, 1 ],
					alias: "用电量kW·h"
				});
				chart.axis("time", {
					label: {
						textStyle: {
							fill: "#fff"
						}
					}
				});
				chart.axis("value", {
					label: {
						textStyle: {
							fill: "#FFF"
						},
						autoRotate: false
					},
					title: {
						autoRotate: true,
						offset: 40,
						textStyle: {
							fontSize: 12
						}
					}
				});
				chart.area().position("time*value").shape("smooth").color("name");
				chart.legend({
					position: "bottom-center",
					textStyle: {
						fill: "#FFF"
					},
					marker: "square",
					offsetY: -16
				});
				chart.render();
			});
			request({
				url: "/energy/rest/MnitorData/",
				params: {
					EnergyCategory: 5,
					time__range: [
						timestamp2.format("YYYY-MM-01T00:00:00"),
						timestamp2.format("YYYY-MM-DDT23:59:59")
					].join(),
					pagesize: 999,
					order: "time",
					type: "day"
				}
			}).then(({ data }) => {
				data.results.forEach((t:any) => {
					this.thisMonthElUsed += t.D_value * 1;
				});
			});
			request({
				url: "/energy/rest/MnitorData/",
				params: {
					EnergyCategory: 5,
					time__range: [
						timestamp3 + "00:00:00",
						timestamp3 + "23:59:59"
					].join(),
					pagesize: 999,
					order: "time",
					type: "day"
				}
			}).then(({ data }) => {
				data.results.forEach((t:any) => {
					this.lastMonthElUsed += t.D_value * 1;
				});
			});
		}

		getRepair ():void {
			const today = this.todayMoment;
			// eslint-disable-next-line camelcase
			const createtime__range = [ today.format("YYYY-MM-DDT00:00:00"), today.format("YYYY-MM-DDT23:59:59") ].join();
			request({
				url: "/repair/rest/projectevent/",
				params: {
					eventtype: 2,
					pagesize: 1,
					"status__in": "2,3"
				}
			}).then(({ data }) => {
				this.repairCount.ing = data.count;
			});
			request({
				url: "/repair/rest/projectevent/",
				params: {
					eventtype: 2,
					pagesize: 1,
					createtime__range
				}
			}).then(({ data }) => {
				this.repairCount.newly = data.count;
				this.showRepair(1);
			});
			request({// done
				url: "/repair/rest/projectevent/",
				params: {
					eventtype: 2,
					pagesize: 1,
					updatetime__range: createtime__range,
					status: 4
				}
			}).then(({ data }) => {
				this.repairCount.done = data.count;
			});
		}

		showRepair (status:number):void {
			const today = this.todayMoment;
			this.repairLoading = true;
			this.currentRepairStatus = status;
			this.repairCancelToken && this.repairCancelToken();
			// eslint-disable-next-line camelcase
			const createtime__range = [ today.format("YYYY-MM-DDT00:00:00"), today.format("YYYY-MM-DDT23:59:59") ].join();
			let params;
			if (status === 1) {
				params = {
					eventtype: 2,
					pagesize: this.repairCount.newly,
					createtime__range
				};
			} else if (status === 2) {
				params = {
					eventtype: 2,
					pagesize: this.repairCount.ing,
					"status__in": "2,3"
				};
			} else {
				params = {
					eventtype: 2,
					pagesize: this.repairCount.done,
					updatetime__range: createtime__range,
					status: 4
				};
			}
			request({
				url: "/repair/rest/projectevent/",
				params,
				cancelToken: new CancelToken((cancelToken) => {
					this.repairCancelToken = cancelToken;
				})
			}).then(({ data }) => {
				this.repairLoading = false;
				this.repairCount.detail = data.results;
			});
		}

		mounted ():void {
			const today:string = this.todayMoment.format("YYYY-MM-DD");
			request({
				url: "/repair/rest/projectevent/",
				params: {
					eventtype: 1,
					pagesize: 1,
					createtime__range: [ today + "T00:00:00", today + "T23:59:59" ].join(),
					sensorwarn__isnull: "True"
				}
			}).then(({ data }) => {
				this.maintenance = data.count;
			});
			const deviceType:segmentation[] = [
				{ id: 2, name: "蒸汽", warn: 0, maintenance: 0, count: 0, icon: "&#xe712;" },
				{ id: 3, name: "空调水", warn: 0, maintenance: 0, count: 0, icon: "&#xe6c5;" },
				{ id: 4, name: "空调新风", warn: 0, maintenance: 0, count: 0, icon: "&#xe688;" },
				{ id: 5, name: "送排风", warn: 0, maintenance: 0, count: 0, icon: "&#xe61c;" },
				{ id: 6, name: "给水", warn: 0, maintenance: 0, count: 0, icon: "&#xe606;" },
				{ id: 9, name: "排水", warn: 0, maintenance: 0, count: 0, icon: "&#xe60e;" },
				{ id: 10, name: "洁净空调", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 11, name: "消防", warn: 0, maintenance: 0, count: 0, icon: "&#xe751;" },
				{ id: 12, name: "电力分项", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 13, name: "医用气体", warn: 0, maintenance: 0, count: 0, icon: "&#xe603;" },
				{ id: 14, name: "电梯", warn: 0, maintenance: 0, count: 0, icon: "&#xe60a;" },
				{ id: 15, name: "污水处理", warn: 0, maintenance: 0, count: 0, icon: "&#xe60e;" },
				{ id: 16, name: "安防", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 17, name: "发电", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 18, name: "机房环控", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 21, name: "建筑信息", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 22, name: "医疗设备", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" },
				{ id: 23, name: "EPS", warn: 0, maintenance: 0, count: 0, icon: "&#xe663;" }
			];
			if (process.env.NODE_ENV !== "production") {
				deviceType.length = 2;
			}
			const baseWarnParams = {
				pagesize: 1,
				// @ts-ignore
				igore_time__lt: moment(new Date()).add(1, "D").format("YYYY-MM-DD"),
				isused: true,
				laststation__in: [ 1, 2, 3 ].join()
			};
			const baseMaintenanceParams = {
				eventtype: 1,
				pagesize: 1,
				createtime__range: [ today + "T00:00:00", today + "T23:59:59" ].join(),
				sensorwarn__isnull: "True"
			};
			let chunk:Promise<void>[] = [];
			deviceType.forEach(t => {
				chunk.push(
					request({
						url: "/device/sensor/",
						params: {
							...baseWarnParams,
							device__devicetype__mepsystemtype: t.id
						}
					}).then(({ data }) => {
						t.warn = data.count;
						this.warn += data.count;
					})
				);
				chunk.push(
					request({
						url: "/repair/rest/projectevent/",
						params: {
							...baseMaintenanceParams,
							systemType: t.id
						}
					}).then(({ data }) => {
						t.maintenance = data.count;
						this.maintenance += data.count;
					})
				);
				chunk.push(
					request({
						url: "/device/sensor/",
						params: {
							device__devicetype__mepsystemtype: t.id,
							pagesize: 1
						}
					}).then(({ data }) => {
						t.count = data.count;
					})
				);
			});
			Promise.all(chunk).then(() => {
				this.segmentation = deviceType;
			});
			this.chart = new G2.Chart({
				container: this.waterChartId,
				height: 160,
				forceFit: true,
				padding: [ 20, 20, 40, 60 ]
			});
			this.elChart = new G2.Chart({
				container: this.elChartId,
				height: 160,
				forceFit: true,
				padding: [ 20, 20, 40, 60 ]
			});
			this.getWater();
			this.getEle();
			this.getRepair();
		}

		private sortChunk (chunk:any[], name:string):{ time:string, value:number, name:string }[] {
			const resource = chunk.sort((a:any, b:any) => {
				return Date.parse(a.time) - Date.parse(b.time);
			});
			const length = resource.length;
			const chart = this.chart;
			let dataSource:{ time:string, value:number, name:string }[] = [];
			if (length > 0 && chart) {
				dataSource = [ {
					time: moment(new Date(resource[ 0 ].time)).format("H"),
					value: resource[ 0 ].D_value * 1,
					name
				} ];
				for (let i = 1; i < length; i++) {
					const time = moment(new Date(resource[ i ].time)).format("H");
					if (resource[ i ].time === resource[ i - 1 ].time) {
						dataSource[ dataSource.length - 1 ].value += resource[ i ].D_value * 1;
					} else {
						dataSource.push({ time, value: resource[ i ].D_value * 1, name });
					}
				}
			}
			return dataSource;
		}
	}
</script>
