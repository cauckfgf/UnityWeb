<style lang=less scoped>
	@import "../../variables.less";
	@import "../../resource/common.less";

	@currentWidth: 600px;
	@attachWidth: 150px;
	.body {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: @bigSpace;
	}

	.info {
		display: flex;
		flex-direction: row;
		margin-top: @middleSpace;

		.roomInfo {
			color: #FFF;
			border-radius: 6px;
			background-color: @lightTitleBackground;
			border: 1px solid lighten(@lightTitleBackground, 50%);
			margin: 0 @middleSpace;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.baseInfo {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 60px;

				&.widthAttach {
					flex-direction: row;
					font-size: 20px;
				}
			}

			.attach {
				text-align: center;
				font-size: @fontSizeD;
				background-color: @darkBackground;
				line-height: 2;
			}
		}
	}

	.table {
		width: 100%;
		color: #FFF;
		text-align: center;
		font-size: @fontSizeD;
		transition: all .3s;
		overflow: hidden;
		margin: @middleSpace 0;
		height: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		table {
			width: 100%;
		}

		tr {
			width: 100%;
			border-bottom: 1px solid #666;

			td, th {
				width: 25%;
			}
		}

		&.roomDetail {
			td, th {
				width: 16.666666%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.tableDetail {
			flex-grow: 1;
			height: 100%;
			overflow: auto;
		}
	}

	.charts {
		height: 300px;

		.chart {
			width: 50%;
			display: inline-block;
		}
	}

	.legends {
		position: absolute;
		width: 500px + 2 * @middleSpace;
		bottom: 0;
		right: 620px;
		background-color: @lightTitleBackground;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		color: #FFF;
		padding: @middleSpace;

		&:empty {
			display: none;
		}

		.legend {
			width: 100px;

			code {
				margin-right: @smallSpace;
			}
		}
	}
</style>
<template>
	<div>
		<div class="mainContent">
			<div class="head">
				<span style="font-size: 22px;color: #FFF">空间总览</span>
				<div class="attach">
					<Select @on-change="changeColor" size="small" v-model="countType">
						<Option value="0">按部门统计</Option>
						<Option value="1">按用途统计</Option>
					</Select>
				</div>
			</div>
			<div class="body">
				<div class="blockTitle">
					房间统计
				</div>
				<div class="info">
					<div class="roomInfo">
						<div class="baseInfo">
							<div>房间数</div>
							<div><span style="font-size: 20px">{{roomCount}}</span> 个</div>
						</div>
					</div>
					<div class="roomInfo">
						<div class="baseInfo">
							<div>使用部门</div>
							<div><span style="font-size: 20px">{{departmentCount}}</span> 个</div>
						</div>
					</div>
					<div class="roomInfo">
						<div class="baseInfo">
							<div>用途种类</div>
							<div style="font-size: 20px">{{usageCount}} 个</div>
						</div>
					</div>
					<div class="roomInfo">
						<div @click="showDetail = !showDetail" class="baseInfo" style="cursor: pointer">
							{{showDetail?"显示总览":"显示详情"}}
						</div>
					</div>
				</div>
				<div :class="{roomDetail:showDetail}" class="table">
					<template v-if="!showDetail">
						<table>
							<thead>
							<tr>
								<th>名称</th>
								<th>房间数</th>
								<th>实际使用面积(㎡)</th>
								<th>建筑总面积(㎡)</th>
							</tr>
							</thead>
						</table>
						<div class="tableDetail">
							<table>
								<tr :key="i.name" v-for="i in tableValue">
									<td>{{i.name}}</td>
									<td>{{i.count}}</td>
									<td>{{i.areaUse}}</td>
									<td>{{i.buildUse}}</td>
								</tr>
							</table>
						</div>
					</template>
					<template v-else>
						<Loading v-if="roomLoading" />
						<template v-else>
							<table>
								<thead>
								<tr>
									<th>房间号</th>
									<th>房间名称</th>
									<th>部门</th>
									<th>用途</th>
									<th>使用状态</th>
									<th>使用面积（㎡）</th>
								</tr>
								</thead>
							</table>
							<div class="tableDetail">
								<table>
									<tr :key="i.id" v-for="i in roomDetail">
										<td>{{i.number}}</td>
										<td>{{i.name}}</td>
										<td>{{i.department_name}}</td>
										<td>{{i.category_name}}</td>
										<td>{{i.department_name?"使用中":"未使用"}}</td>
										<td>{{i.NetArea}}</td>
									</tr>
								</table>
							</div>
							<Page :current.sync="tableCurrent" :total="total" @on-change="pageChange" show-total simple
								size="small" style="text-align: right" />
						</template>
					</template>
				</div>
				<div class="blockTitle">
					运维统计
				</div>
				<div class="info">
					<div class="roomInfo">
						<div class="baseInfo widthAttach">
							<div>{{repairRoom}}</div>
							<div
								style="border-left: 1px solid #FFF;margin-left: 6px;padding-left: 6px">异常率 {{repairRoom|getPresent(roomCount)}}%
							</div>
						</div>
						<div class="attach">
							报修房间
						</div>
					</div>
					<div class="roomInfo">
						<div class="baseInfo widthAttach">
							<div>{{maintenanceCount}}</div>
							<div
								style="border-left: 1px solid #FFF;margin-left: 6px;padding-left: 6px">异常率 {{maintenanceCount|getPresent(roomCount)}}%
							</div>
						</div>
						<div class="attach">
							维保房间
						</div>
					</div>
					<div class="roomInfo">
						<div class="baseInfo widthAttach">
							<div>{{unusedRoomCount}}</div>
							<div
								style="border-left: 1px solid #FFF;margin-left: 6px;padding-left: 6px">闲置率 {{unusedRoomCount|getPresent(roomCount)}}%
							</div>
						</div>
						<div class="attach">
							闲置房间
						</div>
					</div>
				</div>
				<div class="blockTitle">
					房间面积统计
				</div>
				<div class="clearfix" style="text-align: center;color: #FFF;font-size: 18px">
					<div style='width: 50%;float:left;'>用途面积占比</div>
					<div style='width: 50%;float:left;'>部门面积占比</div>
				</div>
				<div class="charts">
					<div :id="chartIdA" class="chart"></div>
					<div :id="chartIdB" class="chart"></div>
				</div>
			</div>
		</div>
		<FloorSelector :dataset="floors" style="position: absolute;left: 80px;bottom:20px;pointer-events: all" />
		<div class="legends">
			<div :key="i.name" class="legend" v-for="i in currentLegend">
				<code :style="{color: i.color}">■</code>
				<span>{{i.name}}</span>
			</div>
		</div>
	</div>
</template>
<script lang=ts>
	import { Component, Vue } from "vue-property-decorator";
	import { Option, Page, Select } from "view-design";
	import request from "@/request";
	import FloorSelector from "@/components/floorSelector/floorSelector.vue";
	import { Route } from "vue-router";
	import G2 from "@antv/g2";
	import Loading from "@/components/loading/Loading.vue";

	@Component({
		components: {
			Select,
			Option,
			FloorSelector,
			Loading,
			Page
		},
		filters: {
			getPresent (value:number, baseValue:number):string {
				if (baseValue === 0) {
					return "0.00";
				} else {
					return (value / baseValue * 100).toFixed(2);
				}
			}
		}
	})
	export default class SpaceMain extends Vue {
		floors:{ name:string, id:number }[] = [];
		countType:"0" | "1" = "1";
		showDetail:boolean = false;
		roomCount:number = 0;
		usageCount:number = 0;
		departmentCount:number = 0;
		repairRoom:number = 0;
		maintenanceCount:number = 0;
		tableSource = {
			usage: [],
			department: []
		};
		roomDetail:any[] = [];
		roomLoading:boolean = true;
		legend:{ usage:{ name:string, color:string }[], department:{ name:string, color:string }[] } = {
			usage: [],
			department: []
		};
		total:number = 0;
		tableCurrent:number = 1;
		readonly chartIdA:string = "id" + parseInt(Math.random() * 100 + "1");
		readonly chartIdB:string = "id" + parseInt(Math.random() * 100 + "1");
		private readonly subscribe = this.$store.subscribe((mutation, state) => {
			if (mutation.type === "changeViewByCode") {
				this.getCount();
			}
		});
		private chartA?:G2.Chart;
		private chartB?:G2.Chart;

		get tableValue () {
			return this.countType === "0" ? this.tableSource.department : this.tableSource.usage;
		}

		get unusedRoomCount ():number {
			let usedCount = 0;
			this.tableSource.usage.forEach((t:any) => {
				usedCount += t.count;
			});
			return this.roomCount - usedCount;
		}

		get currentLegend ():{ name:string, color:string }[] {
			return this.countType === "0" ? this.legend.department : this.legend.usage;
		}

		getCount () {
			const floor = this.$store.state.modelValue;
			this.showDetail = false;
			this.legend = { usage: [], department: [] };
			let room = request({
				url: "/space/room/",
				params: {
					floor: floor,
					pagesize: 1
				}
			});
			room.then(({ data }) => {
				this.roomCount = data.count;
			});
			request({
				url: "/space/room/roominfo/",
				params: {
					floor
				}
			}).then(({ data }) => {
				const usage = data[ "用途" ];
				const department = data[ "部门" ];
				this.departmentCount = department.length;
				this.usageCount = usage.length;
				this.tableSource.department = department.map((t:any) => ({
					name: t.department__name,
					count: t.id__count,
					areaUse: t.NetArea__sum,
					buildUse: t.GrossArea__sum
				}));
				this.tableSource.usage = usage.map((t:any) => ({
					name: t.category__name,
					count: t.id__count,
					areaUse: t.NetArea__sum,
					buildUse: t.GrossArea__sum
				}));
				room.then(() => {
					const roomCount = this.roomCount;
					[ this.chartA, this.chartB ].forEach((chart, index) => {
						if (chart === undefined) return;
						// @ts-ignore
						chart.source(this.tableSource[ [ "usage", "department" ][ index ] ]);
						chart.coord("theta");
						chart.tooltip({
							showTitle: false
						});
						chart.legend({
							textStyle: {
								fill: "#FFF"
							}
						});
						chart.intervalStack()
							.position("count")
							.color("name")
							.label("count", (value:any) => {
								if (value / roomCount < 0.05) return null;
								return {
									offset: -40,
									// autoRotate: false,
									textStyle: {
										textAlign: "center",
										shadowBlur: 2,
										shadowColor: "rgba(0, 0, 0, .45)",
										fill: "#fff"
									}
								};
							})
							.style({
								lineWidth: 1,
								stroke: "#fff"
							});
						chart.render();
					});
				});
			});
			request({
				url: "/repair/rest/projecteventelement/unityinfo/",
				params: {
					t: "房间",
					floor
				}
			}).then(({ data }) => {
				data = data.data;
				this.maintenanceCount = data[ "维保" ].length;
				this.repairRoom = data[ "维修" ].length;
			});
			request({
				url: "/user/department/",
				params: {
					Room__floor: floor
				}
			}).then(({ data }) => {
				this.legend.department = data.map((t:any) => ({
					name: t.name,
					color: t.color_code
				}));
			});
			request({
				url: "/space/category/",
				params: {
					Room__floor: floor
				}
			}).then(({ data }) => {
				this.legend.usage = data.map((t:any) => ({
					name: t.name,
					color: t.color_code
				}));
			});
			this.pageChange(1);
		}

		changeColor (value:number) {
			this.$store.commit("changeColorType", [ "department", "category" ][ value ]);
		}

		pageChange (page:number = 1) {
			this.roomLoading = true;
			this.tableCurrent = page;
			request({
				url: "/space/room/",
				params: {
					floor: this.$store.state.modelValue,
					pagesize: 6,
					page
				}
			}).then(({ data }) => {
				this.total = data.count;
				this.roomDetail = data.results;
				this.roomLoading = false;
			});
		}

		mounted () {
			request({
				url: "/space/floor/",
				params: {
					facility: 1
				}
			}).then(({ data }) => {
				this.floors = data.reverse().map((t:any) => ({
					name: t.name,
					id: t.id
				}));
			});
			this.chartA = new G2.Chart({
				container: this.chartIdA,
				forceFit: true,
				height: 300
			});
			this.chartB = new G2.Chart({
				container: this.chartIdB,
				forceFit: true,
				height: 300
			});
			this.getCount();
			if (this.$store.state.showType !== "room") {
				this.$store.commit("changeViewByCode", { type: "room", id: "" });
			}
			this.$store.commit("changeWall", false);
		}

		beforeRouteLeave (to:Route, from:Route, next:Function) {
			this.subscribe();
			this.$store.commit("changeWall", true);
			next();
		}
	}

</script>
