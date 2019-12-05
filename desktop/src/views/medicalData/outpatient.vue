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
</style>
<template>
	<div>
		<div class="head">
			<span style="font-size: 22px;color: #FFF">门诊统计</span>
			<div class="attach">
				<div>统计日期</div>
				<div>统计范围</div>
				<div>
					<DatePicker :options="options" @on-change="reset" size=small style="color: initial"
						v-model="countDate" />
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
			<div>全部科室</div>
			<div>
				<ul>
					<li>累计挂号人次：{{registeredCount}}</li>
					<li>累计门诊人次：{{outpatientCount}}</li>
				</ul>
			</div>
		</div>
		<div :id=chartId style="height: 200px"></div>
	</div>
</template>
<script lang=ts>
	import { Component, Vue } from "vue-property-decorator";
	import { DatePicker, DatePickerOptions, Option, Select } from "view-design";
	import G2 from "@antv/g2";
	import request from "@/request";
	import moment from "moment";

	@Component({
		components: {
			DatePicker,
			Select,
			Option
		}
	})
	export default class Outpatient extends Vue {
		dateType:string = "月";
		countDate:Date = new Date();
		registeredCount:number = 0;
		outpatientCount:number = 0;
		readonly options:DatePickerOptions = {
			disabledDate (date:Date):boolean {
				return date && date.valueOf() > Date.now();
			}
		};
		readonly chartId:string = "id" + parseInt(Math.random() * 100 + "1").toString(36);
		chart?:G2.Chart;

		reset ():void {
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
		}

		mounted ():void {
			this.chart = new G2.Chart({
				container: this.chartId,
				height: 200,
				forceFit: true,
				padding: [ 20, 20, 40, 60 ]
			});
			this.reset();
		}
	}
</script>
