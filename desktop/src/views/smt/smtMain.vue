<style lang=less scoped>
	@import "../../variables.less";
	@import "../../resource/common.less";
	@currentWidth :400px;
</style>
<template>
	<div>
		<div class="mainContent">
			<div class="head">
				视频监控
			</div>
		</div>
		<FloorSelector :dataset="floors" style="position: absolute;left: 80px;bottom:20px;pointer-events: all" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import FloorSelector from "../../components/floorSelector/floorSelector.vue";
	import request from "@/request";

	@Component({
		components: {
			FloorSelector
		}
	})
	export default class SmtMain extends Vue {
		floors:{ name:string, id:number }[] = [];

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
		}
	}

</script>
