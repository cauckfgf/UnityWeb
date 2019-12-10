<style lang=less scoped>
	@import "../../variables.less";

	.floor {
		width: 80px;
		cursor: pointer;
		height: 6px + @smallSpace;
		color: #FFF;

		.colorBar {
			background-color: rgba(255, 255, 255, 0.6);
			height: 6px;
		}

		.info {
			display: none;
			background-image: url("./pin.png");
			padding-left: 18px;
			position: absolute;
			left: 100%;
			width: 80px;
			top: -7px
		}

		&:hover {
			.info {
				display: block;
				z-index: 999;
			}

			&, & ~ .floor:not(:last-child) {
				.colorBar {
					background-color: rgba(30, 144, 255, 0.6);
				}
			}
		}

		&.active {
			.info {
				display: block;
			}

			&.active, & ~ .floor:not(:last-child) {
				.colorBar {
					background-color: rgba(0, 255, 154, .6);
				}
			}
		}
	}

	.allFloor {
		color: white;
		height: 20px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.6);
		cursor: pointer;

		&.active {
			background-color: rgba(0, 255, 154, .6);
		}
	}
</style>
<template>
	<div style="width: 80px;overflow: visible;pointer-events: all">
		<div :class="{active: i.active}" :key="i.id" @click="setActive(i.id)" class="floor" v-for='i in currentDataset'>
			<div class="colorBar"></div>
			<div class="info">
				{{i.name}}
			</div>
		</div>
		<div :class="{active:showAllFloor}" @click="showAll" class="allFloor">
			全部楼层
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Prop, Vue, Watch } from "vue-property-decorator";

	@Component
	export default class FloorSelector extends Vue {
		@Prop() readonly dataset!:{ name:string, id:number }[];
		currentDataset = this.dataset.map((t) => {
			return {
				...t,
				active: false
			};
		});
		showAllFloor:boolean = true;

		setActive (id:number) {
			const old = this.currentDataset.find(t => t.active);
			if (old) {
				old.active = false;
			}
			const data = this.currentDataset.find(t => t.id === id);
			if (data) {
				data.active = true;
			} else {
				throw new Error("no specific data find");
			}
			this.$store.commit("changeViewByCode", { type: "room", id });
		}

		showAll () {
			this.currentDataset.forEach(t => {
				t.active = false;
			});
			this.showAllFloor = true;
			this.$store.commit("changeViewByCode", { type: "room", id: "" });
		}

		@Watch("dataset")
		onDatasetChange (value:{ name:string, id:number }[]) {
			const active = this.$store.state.modelValue;
			this.currentDataset = value.map((t) => {
				return {
					...t,
					active: t.id === active
				};
			});
		}
	}
</script>
