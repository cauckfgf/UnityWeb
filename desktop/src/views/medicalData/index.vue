<style lang=less scoped>
	@import "../../variables.less";

	.index {
		position: absolute;
		top: 100px;
		right: 20px;
		bottom: 20px;
		width: 550px;
		display: flex;
		flex-direction: column;
		background-color: @mainBackground;
		padding: 8px;
		pointer-events: all;
	}
</style>
<template>
	<RouterView class="index" />
</template>
<script lang=ts>
	import { Component, Vue } from "vue-property-decorator";

	@Component
	export default class MedicalDataIndex extends Vue {

	}

</script>
