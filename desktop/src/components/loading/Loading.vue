<style lang=less scoped>
	@import "../../variables.less";

	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: @darkBackground;
	}
</style>
<template>
	<div class="box">
		<svg :height="height+'px'" :width="width + 'px'" preserveAspectRatio="xMidYMid"
			style="margin:auto;background:#FFF0;display:block;"
			viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<circle cx="6.451612903225806" cy="62.2679" fill="#941946" r="2.64079">
				<animate attributeName="r" begin="-0.5s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="0s" calcMode="spline" dur="2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.5s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="6.451612903225806" cy="37.7321" fill="#a2f0fb" r="3.35921">
				<animate attributeName="r" begin="-1.5s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1s" calcMode="spline" dur="2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.5s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="16.129032258064512" cy="50.0474" fill="#941946" r="2.40079">
				<animate attributeName="r" begin="-0.7s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-0.2s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.7s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="16.129032258064512" cy="49.9526" fill="#a2f0fb" r="3.59921">
				<animate attributeName="r" begin="-1.7s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.2s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.7s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="25.806451612903224" cy="37.7899" fill="#941946" r="2.63921">
				<animate attributeName="r" begin="-0.9s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-0.4s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.9s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="25.806451612903224" cy="62.2101" fill="#a2f0fb" r="3.36079">
				<animate attributeName="r" begin="-1.9s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.4s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-0.9s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="35.48387096774193" cy="32.5337" fill="#941946" r="2.87921">
				<animate attributeName="r" begin="-1.1s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-0.6s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.1s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="35.48387096774193" cy="67.4663" fill="#a2f0fb" r="3.12079">
				<animate attributeName="r" begin="-2.1s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.6s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.1s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="45.16129032258064" cy="32.5191" fill="#941946" r="3.11921">
				<animate attributeName="r" begin="-1.3s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-0.8s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.3s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="45.16129032258064" cy="67.4809" fill="#a2f0fb" r="2.88079">
				<animate attributeName="r" begin="-2.3s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.8s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.3s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="54.838709677419345" cy="37.7321" fill="#941946" r="3.35921">
				<animate attributeName="r" begin="-1.5s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1s" calcMode="spline" dur="2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.5s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="54.838709677419345" cy="62.2679" fill="#a2f0fb" r="2.64079">
				<animate attributeName="r" begin="-2.5s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-2s" calcMode="spline" dur="2s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.5s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="64.51612903225805" cy="49.9526" fill="#941946" r="3.59921">
				<animate attributeName="r" begin="-1.7s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.2s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.7s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="64.51612903225805" cy="50.0474" fill="#a2f0fb" r="2.40079">
				<animate attributeName="r" begin="-2.7s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-2.2s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.7s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="74.19354838709677" cy="62.2101" fill="#941946" r="3.36079">
				<animate attributeName="r" begin="-1.9s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.4s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.9s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="74.19354838709677" cy="37.7899" fill="#a2f0fb" r="2.63921">
				<animate attributeName="r" begin="-2.9s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-2.4s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-1.9s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="83.87096774193547" cy="67.4663" fill="#941946" r="3.12079">
				<animate attributeName="r" begin="-2.1s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.6s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-2.1s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="83.87096774193547" cy="32.5337" fill="#a2f0fb" r="2.87921">
				<animate attributeName="r" begin="-3.1s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-2.6s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-2.1s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
			<circle cx="93.54838709677418" cy="67.4809" fill="#941946" r="2.88079">
				<animate attributeName="r" begin="-2.3s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1"
					values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-1.8s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-2.3s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#941946;#fbacc9;#941946" />
			</circle>
			<circle cx="93.54838709677418" cy="32.5191" fill="#a2f0fb" r="3.11921">
				<animate attributeName="r" begin="-3.3s" dur="2s"
					repeatCount="indefinite" times="0;0.5;1" values="2.4;3.6;2.4" />
				<animate attributeName="cy" begin="-2.8s" calcMode="spline" dur="2s"
					keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
					keyTimes="0;0.5;1" repeatCount="indefinite" values="32;68;32" />
				<animate attributeName="fill" begin="-2.3s" dur="2s" keyTimes="0;0.5;1"
					repeatCount="indefinite" values="#a2f0fb;#164ba3;#a2f0fb" />
			</circle>
		</svg>
	</div>
</template>
<script lang=ts>
	import { Component, Prop, Vue } from "vue-property-decorator";

	@Component
	export default class Loading extends Vue {
		@Prop({ default: 200, type: Number }) readonly width!:number;
		@Prop({ default: 200, type: Number }) readonly height!:number;
	}

</script>
