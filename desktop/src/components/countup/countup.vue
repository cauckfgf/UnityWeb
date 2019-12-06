<template>
	<span :id=id>0</span>
</template>
<script lang=ts>
	import { Component, Prop, Vue, Watch } from "vue-property-decorator";
	import { CountUp as Count } from "countup.js";

	@Component
	export default class CountUp extends Vue {
		@Prop({ default: 0, type: Number }) readonly start!:number;
		@Prop() readonly end!:number;
		readonly id:string = "countUp" + (parseInt(Math.random() * 100 + "1")).toString(36);
		private count?:Count;

		mounted () {
			this.count = new Count(this.id, this.start);
		}

		@Watch("end")
		onEndChange (value:number) {
			this.count && (this.count.update(value));
		}
	}

</script>
