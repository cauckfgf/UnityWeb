<style lang=less scoped>
	@import "../../variables.less";
	@import "../../resource/common.less";

	@currentWidth: 500px;
	.camera {
		margin-top: @smallSpace;
		height: 370px;
		flex-shrink: 0;
	}

	.page {
		margin-top: @smallSpace;
	}
</style>
<template>
	<div>
		<div class="mainContent">
			<div class="head">
				视频监控
			</div>
			<div class="blockTitle">
				视频画面
			</div>
			<div class="camera">
				<Loading v-if="loading" />
				<video :id="id" :style="{visibility: loading?'hidden':'visible'}" style="width: 100%;height: 100%" />
			</div>
			<div class="blockTitle">
				监控列表
			</div>
			<Table :columns="columns" :data="data" :height="height" :loading="tableLoading" @on-row-click="onSelect"
				style="margin-top: 4px;">
				<Loading slot="loading" />
			</Table>
			<Page :current.sync="page" :total="total" @on-change="pageChange" class="page" simple
				style="text-align: right" />
		</div>
		<FloorSelector :dataset="floors" style="position: absolute;left: 80px;bottom:20px;pointer-events: all" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import FloorSelector from "../../components/floorSelector/floorSelector.vue";
	import request from "@/request";
	import Hls from "hls.js";
	import Loading from "@/components/loading/Loading.vue";
	import { Page, Table, TableColumn } from "view-design";

	@Component({
		components: {
			FloorSelector,
			Loading,
			Table,
			Page
		}
	})
	export default class SmtMain extends Vue {
		floors:{ name:string, id:number }[] = [];
		loading:boolean = true;
		data:any[] = [];
		tableLoading:boolean = true;
		page:number = 1;
		total:number = 0;
		readonly columns:TableColumn[] = [
			{
				title: "编号",
				key: "code"
			},
			{
				title: "名称",
				key: "name"
			},
			{
				title: "品牌",
				key: "brand"
			},
			{
				title: "类型",
				key: "type"
			},
			{
				title: "在线状态",
				key: "status"
			}
		];
		readonly id:string = "id" + Math.ceil(Math.random() * 1000);
		private hls?:Hls;
		private listeners?:Function;

		get height ():number {
			return document.getElementsByClassName("mainContent")[ 0 ] ? document.getElementsByClassName("mainContent")[ 0 ].clientHeight - 490 : 350;
		}

		pageChange (page:number = 1) {
			this.tableLoading = !0;
			this.page = page;
			this.data = [];
			request({
				url: "/smt/rest/camera/",
				params: {
					floor: this.$store.state.modelValue,
					pagesize: Math.ceil(this.height / 50),
					page
				}
			}).then(({ data }) => {
				this.data = data.results.map((t:any) => ({
					code: t.code,
					name: t.name,
					brand: t.ctype ? t.ctype.brand : "",
					type: t.ctype ? t.ctype.name : "",
					status: [ "离线", "在线" ][ t.onLineStatus ],
					id: t.id,
					cameraUuid: t.cameraUuid,
					floor: t.floor
				}));
				this.total = data.count;
				this.tableLoading = !1;
			});
		}

		onSelect (value:any) {
			this.$store.commit("updateLiveStream", [ value.id, value.cameraUuid ].join());
			if (value.floor) {
				this.$store.commit("findFloorAndCamera", [ value.floor, value.cameraUuid ]);
			}
		}

		mounted () {
			if (this.$store.state.showType !== "room") {
				this.$store.commit("changeViewByCode", { type: "room", id: "" });
			}
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
			// @ts-ignore
			const video:HTMLVideoElement = document.getElementById(this.id);
			if (Hls.isSupported()) {
				const hls = new Hls();
				this.hls = hls;
				hls.loadSource("/mag/hls/dceccaa3251d4e2aa98dbad912bbb365/1/live.m3u8");
				hls.attachMedia(video);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					video.play();
					this.loading = false;
				});
			}
			this.listeners = this.$store.subscribe((mutation) => {
				if (mutation.type === "updateLiveStream") {
					this.hls && this.hls.destroy();
					const hls = new Hls();
					this.hls = hls;
					hls.loadSource(`/mag/hls/${ mutation.payload.split(",")[ 1 ] }/1/live.m3u8`);
					hls.attachMedia(video);
					this.loading = true;
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						video.play();
						this.loading = false;
					});
				} else if (mutation.type === "changeViewByCode") {
					this.pageChange();
				}
			});
			this.pageChange();
		}
	}

</script>
