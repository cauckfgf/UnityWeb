<style lang=less scoped>
	@import "../../variables.less";

	.head {
		line-height: 32px;
	}

	.attach {
		width: 260px;
		float: right;
		color: #FFF;

		> div {
			width: 50%;
			padding: 0 8px;
			display: inline-block;
		}
	}

	.summary {
		color: #FFF;
		margin: @bigSpace 0;

		> div {
			width: 50%;
			display: inline-block;
			text-align: center;
			vertical-align: top;

			&:first-child {
				font-size: @fontSizeA;
				line-height: 55px;
			}

			&:last-child {
				font-size: @fontSizeB;
			}
		}
	}

	.chartTitle {
		font-size: @fontSizeC;
		margin-left: @middleSpace;
		border-bottom: 1px solid #FFF;
		color: white;
	}

	.departments {
		width: 50%;
		display: inline-block;
		padding: @smallSpace;

		&.active {
			ul {
				background-color: lighten(@infoBlockBackground, 20%);
			}
		}

		ul {
			background-color: @infoBlockBackground;
			color: white;
			font-size: @fontSizeD;
			padding: @middleSpace;
		}

		label {
			display: inline-block;
			width: 50%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			float: left;
		}

		div {
			margin-left: 50%;
		}

		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			cursor: pointer;
		}
	}

	.departmentBox {
		margin-top: @bigSpace;
		flex-grow: 1;
		overflow: auto;
		padding: 0 @bigSpace;
	}

	.childrenCharts {
		width: 50%;
		display: inline-block;
		height: 100%;
		padding: 0 @smallSpace;
		float: left;
	}
</style>
<template>
	<div>
		<div class="head">
			<span style="font-size: 22px;color: #FFF">门诊统计</span>
			<div class="attach">
				<div>统计日期</div>
				<div>统计范围</div>
				<div>
					<DatePicker :format="timeFormat" :options="options" :type="selectorType" @on-change="reset"
						size=small v-model="countDate" />
				</div>
				<div>
					<Select @on-change="reset" size=small v-model="dateType">
						<Option value="日">日</Option>
						<Option value="周">周</Option>
						<Option value="月">月</Option>
						<Option value="年">年</Option>
					</Select>
				</div>
			</div>
		</div>
		<div class="summary">
			<div>
				<i @click="resetActive" class="iconfont"
					style="position: absolute;left: 12px;top:-10px;line-height: 1.5;cursor: pointer"
					v-if="currentDepartment!=='全部科室'">&#xe607;</i>
				{{currentDepartment}}
			</div>
			<div>
				<ul>
					<li>累计挂号人次：
						<CountUp :end="registeredCount" />
					</li>
					<li>累计门诊人次：
						<CountUp :end="outpatientCount" />
					</li>
				</ul>
			</div>
		</div>
		<div class="chartTitle">
			门急诊人次统计
		</div>
		<div :style="{height: showChildren?'400px':'200px'}" style="overflow: hidden;flex-shrink: 0">
			<div :style="{transform: `translateX(${showChildren?'-50%':0})`}"
				style="width: 200%;transition: all 0.5s;height: 100%">
				<div :id=chartId style="height: 200px;width: 50%;display: inline-block;float:left;"></div>
				<div class="childrenCharts">
					<Loading v-if="childrenLoading" />
					<div class="chartTitle">
						挂号人次
					</div>
					<div :id="childrenChartIdA" style="height: 184px"></div>
					<div class="chartTitle">
						就诊人次
					</div>
					<div :id="childrenChartIdB" style="height: 184px"></div>
				</div>
			</div>
		</div>
		<div class="departmentBox">
			<Loading v-if="loading" />
			<template v-else>
				<div :class="{active:i.active}" :key="i.name" @click="getChildren(i)" class="departments"
					v-for="i in departments">
					<ul>
						<li>
							<label>{{i.name}}</label>
							<div>挂号：{{i.registeredCount}}</div>
						</li>
						<li>
							<label>{{i.children}}个细分科室</label>
							<div>就诊：{{i.outpatientCount}}</div>
						</li>
					</ul>
				</div>
			</template>
		</div>
	</div>
</template>
<script lang=ts>
	import { Component, Vue } from "vue-property-decorator";
	import { DatePicker, DatePickerOptions, Option, Select } from "view-design";
	import G2 from "@antv/g2";
	import request from "@/request";
	import moment from "moment";
	import Loading from "@/components/loading/Loading.vue";
	import CountUp from "@/components/countup/countup.vue";

	interface department {
		name:string,
		children:number,
		registeredCount:number,
		outpatientCount:number,
		active:boolean
	}

	interface appartDepartment {
		// eslint-disable-next-line camelcase
		GHRQ__sum:number,
		// eslint-disable-next-line camelcase
		JZRC__sum:number,
		datestr:string,
		FLMC:string,
		GHKS:string
	}

	@Component({
		components: {
			DatePicker,
			Select,
			Option,
			Loading,
			CountUp
		}
	})
	export default class Outpatient extends Vue {
		dateType:string = "月";
		countDate:Date = new Date();
		registeredCount:number = 0;
		outpatientCount:number = 0;
		departments:department[] = [];
		loading:boolean = true;
		showChildren:boolean = false;
		currentDepartment:string = "全部科室";
		childrenLoading:boolean = false;
		readonly options:DatePickerOptions = {
			disabledDate (date:Date):boolean {
				return date && date.valueOf() > Date.now();
			}
		};
		readonly chartId:string = "id" + parseInt(Math.random() * 100 + "1").toString(36);
		readonly childrenChartIdA:string = "idA" + parseInt(Math.random() * 100 + "1").toString(36);
		readonly childrenChartIdB:string = "idB" + parseInt(Math.random() * 100 + "1").toString(36);
		private chart?:G2.Chart;
		private chartA?:G2.Chart;
		private chartB?:G2.Chart;

		get timeFormat ():string {
			let timeType = this.dateType;
			switch (timeType) {
				case "年" :
					return "yyyy";
				case "月":
					return "yyyy-MM";
				default:
					return "yyyy-MM-DD";
			}
		}

		get selectorType ():string {
			let timeType = this.dateType;
			switch (timeType) {
				case "年" :
					return "year";
				case "月":
					return "month";
				default:
					return "date";
			}
		}

		reset ():void {
			this.loading = true;
			let old:string = "";
			if (this.currentDepartment !== "全部科室") {
				const department = this.departments.find(t => t.active);
				// @ts-ignore
				this.getChildren(department);
				// @ts-ignore
				old = department.name;
			}
			request({
				url: "/his/rest/menzhen/quxian/",
				params: {
					ordering: "create_datetime",
					date: moment(this.countDate).format("YYYY-MM-DD"),
					type: this.dateType,
					is_zong: true
				}
			}).then(({ data }) => {
				let chunk:{ time:string, value:number, name:string }[] = [];
				let chunk1:{ time:string, value:number, name:string }[] = [];
				this.outpatientCount = 0;
				this.registeredCount = 0;
				// eslint-disable-next-line camelcase
				const dataSource:{ GHRQ__sum:number, JZRC__sum:number, datestr:string, FLMC:string }[] = data.data;
				dataSource.forEach((t, index) => {
					const type = this.dateType === "日" ? "FLMC" : "datestr";
					this.outpatientCount += t.JZRC__sum;
					this.registeredCount += t.GHRQ__sum;
					if (index !== 0 && dataSource[ index - 1 ][ type ] === t[ type ]) {
						chunk[ chunk.length - 1 ].value += t.GHRQ__sum;
						chunk1[ chunk1.length - 1 ].value += t.JZRC__sum;
					} else {
						const time = t[ type ] + (type === "FLMC" ? "时" : "");
						let data1 = { time, value: t.GHRQ__sum, name: "挂号人次" };
						let data2 = { time, value: t.JZRC__sum, name: "就诊人次" };
						chunk.push(data1);
						chunk1.push(data2);
					}
				});
				if (this.chart) {
					let chart = this.chart;
					if (this.dateType === "周") {
						let pin = 1;
						while (chunk1.length <= 7) {
							// @ts-ignore
							const time = moment().add(pin, "Day").format("YYYY-MM-DD");
							chunk.push({ time, value: 0, name: "挂号人次" });
							chunk1.push({ time, value: 0, name: "就诊人次" });
							pin++;
						}
					} else if (this.dateType === "日") {
						let pin = chunk.length + 1;
						while (pin <= 24) {
							// @ts-ignore
							const time = pin + "时";
							chunk.push({ time, value: 0, name: "挂号人次" });
							chunk1.push({ time, value: 0, name: "就诊人次" });
							pin++;
						}
					}
					chart.source(chunk1.concat(chunk));
					chart.scale(this.dateType === "日" ? "identity" : "time", {
						range: [ 0, 1 ]
					});
					chart.scale("value", {
						range: [ 0, 1 ],
						alias: "就诊人次/h"
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
							autoRotate: false,
							formatter (value) {
								const temp = parseInt(value);
								if (temp >= 1e5) {
									return temp / 1e5 + "万";
								} else {
									return value;
								}
							}
						},
						title: {
							autoRotate: true,
							offset: 40,
							textStyle: {
								fontSize: 12
							}
						}
					});
					chart.line().position("time*value").shape("smooth").color("name");
					chart.legend({
						position: "bottom-center",
						textStyle: {
							fill: "#FFF"
						},
						marker: "square",
						offsetY: -16
					});
					chart.render();
				}
			});
			request({
				url: "/his/rest/menzhen/tongji/",
				params: {
					date: moment(this.countDate).format("YYYY-MM-DD"),
					type: this.dateType
				}
			}).then(({ data }) => {
				// eslint-disable-next-line camelcase
				const dataSource:{ GHRQ__sum:number, JZRC__sum:number, KSMC:string, 细分科室:string[] }[] = data.data;
				this.departments = dataSource.map(t => {
					return {
						name: t.KSMC,
						children: t.细分科室.length,
						registeredCount: t.GHRQ__sum,
						outpatientCount: t.JZRC__sum,
						active: old === t.KSMC
					};
				});
				this.loading = false;
			});
		}

		getChildren (department:department):void {
			let old = this.departments.find(t => t.active);
			if (old && old.name !== department.name) {
				old.active = false;
			}
			department.active = true;
			this.currentDepartment = department.name;
			this.showChildren = true;
			this.childrenLoading = true;
			request({
				url: "/his/rest/menzhen/quxian/",
				params: {
					order: "GHKS",
					date: moment(this.countDate).format("YYYY-MM-DD"),
					type: this.dateType,
					is_zong: false,
					KSMC: department.name
				}
			}).then(({ data }) => {
				// eslint-disable-next-line camelcase
				const dataSource:appartDepartment[] = data.data;
				const chunk:appartDepartment[][] = [];
				dataSource.forEach(t => {
					if (chunk.length === 0) {
						chunk.push([ t ]);
					} else if (chunk[ chunk.length - 1 ][ 0 ].GHKS === t.GHKS) {
						chunk[ chunk.length - 1 ].push(t);
					} else {
						chunk.push([ t ]);
					}
				});
				const timeline = this.getTimeline();
				let result:{
					name:string,
					time:string,
					valueG:number,
					valueJ:number
				}[] = [];
				chunk.forEach(t => {
					result = result.concat(this.sortChunk(t, timeline));
				});
				if (this.chartA && this.chartB) {
					this.chartA.source(result);
					this.chartB.source(result);
					[ this.chartA, this.chartB ].forEach((chart, index) => {
						const valueKey = [ "valueG", "valueJ" ][ index ];
						chart.scale({
							time: {
								range: [ 0, 1 ],
								type: "cat",
								values: timeline,
								tickCount: 10
							},
							[ valueKey ]: {
								range: [ 0, 1 ],
								type: "linear",
								alias: "人次/h"
							}
						});
						chart.axis("time", {
							label: {
								textStyle: {
									fill: "#fff"
								}
							}
						});
						chart.axis(valueKey, {
							label: {
								textStyle: {
									fill: "#FFF"
								},
								autoRotate: false,
								formatter (value) {
									const temp = parseInt(value);
									if (temp >= 1e5) {
										return temp / 1e5 + "万";
									} else {
										return value;
									}
								}
							},
							title: {
								autoRotate: true,
								offset: 40,
								textStyle: {
									fontSize: 12
								}
							}
						});
						chart.line().position(`time*${ valueKey }`).shape("smooth").color("name");
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
					this.childrenLoading = false;
				}
			});
		};

		resetActive () {
			this.departments.forEach(t => {
				t.active = false;
			});
			this.currentDepartment = "全部科室";
			this.showChildren = false;
		}

		mounted ():void {
			this.chart = new G2.Chart({
				container: this.chartId,
				height: 200,
				forceFit: true,
				padding: [ 20, 40, 40, 60 ]
			});
			this.chartA = new G2.Chart({
				container: this.childrenChartIdA,
				height: 184,
				forceFit: true,
				padding: [ 20, 40, 55, 60 ]
			});
			this.chartB = new G2.Chart({
				container: this.childrenChartIdB,
				height: 184,
				forceFit: true,
				padding: [ 20, 40, 55, 60 ]
			});
			this.reset();
		}

		private sortChunk (value:appartDepartment[], timeline:string[]):{
			name:string,
			time:string,
			valueG:number,
			valueJ:number
		}[] {
			const departmentName = value[ 0 ].GHKS;
			let chunk = timeline.map(t => {
				return {
					name: departmentName,
					time: t,
					valueG: 0,
					valueJ: 0
				};
			});
			const key = this.dateType === "日" ? "FLMC" : "datestr";
			value.forEach(t => {
				let temp = chunk.find(d => d.time.toString() === t[ key ].toString());
				if (temp) {
					temp.valueG += t.GHRQ__sum;
					temp.valueJ += t.JZRC__sum;
				}
			});
			return chunk;
		}

		private getTimeline ():string[] {
			let timeline:string[] = [];
			if (this.dateType === "日") {
				timeline = new Array(25).fill(1).map((value, index) => index.toString());
			} else if (this.dateType === "周") {
				let t = moment(this.countDate).day(0);
				for (let i = 0; i < 7; i++) {
					timeline.push(t.add(1, "day").format("YYYY-MM-DD"));
				}
			} else if (this.dateType === "月") {
				let t = moment(this.countDate).date(0);
				const count = moment(this.countDate).add(1, "M").date(0).get("date");
				for (let i = 0; i < count; i++) {
					timeline.push(t.add(1, "day").format("YYYY-MM-DD"));
				}
			} else {
				let t = moment(this.countDate).month(-1);
				for (let i = 0; i < 12; i++) {
					timeline.push(t.add(1, "M").format("YYYY-MM"));
				}
			}
			return timeline;
		}
	}
</script>
