<style lang=less scoped>
	@import "../../variables.less";

	.content {
		border-radius: 6px;
		position: absolute;
		color: white;
		user-select: none;
		pointer-events: all;
		display: flex;
		flex-direction: column;

		.title {
			text-align: center;
			font-size: @fontSizeB;
			line-height: 50px;
			background-color: @mainBackground;
		}

		.body {
			background-color: @lightTitleBackground;
		}

		.foot {
			background-color: @mainBackground;
			flex-grow: 1;
			overflow: auto;
			flex-shrink: 0;
			max-height: 170px;
		}
	}

	.dragIcon {
		float: left;
		font-size: @fontSizeB;
		line-height: 50px;
		margin-left: 18px
	}

	.dragAttachIcon {
		float: right;
		font-size: @fontSizeB;
		margin-right: 18px;
		line-height: 50px;
		cursor: pointer
	}
</style>
<template>
	<div :style="{top:currentTop+'px',left: currentLeft+'px',width:width+'px',height: height+'px'}"
		class=content>
		<div @mousedown="startDrag" class="title">
			<i class="iconfont dragIcon" v-html="icon" />
			{{title}}
			<Icon @click.native="$emit('close')"
				class="dragAttachIcon"
				type="ios-close" v-if=showClose />
			<Icon @click.native="exportFunction"
				class="dragAttachIcon"
				type="ios-share-alt" v-else />
		</div>
		<div class="body">
			<slot />
		</div>
		<div class="foot">
			<slot name="foot" />
		</div>
	</div>
</template>

<script lang=ts>
	import { Component, Prop, Vue } from "vue-property-decorator";
	import { Icon } from "view-design";

	@Component({
		components: {
			Icon
		}
	})
	export default class Drag extends Vue {
		@Prop({ default: 0, type: Number }) readonly width!:number;
		@Prop({ default: 0, type: Number }) readonly height!:number;
		@Prop({ default: 0, type: Number }) readonly left!:number;
		@Prop({ default: 0, type: Number }) readonly top!:number;
		@Prop({ default: false, type: Boolean }) readonly showClose!:boolean;
		@Prop(String) readonly title!:string;
		@Prop(String) readonly icon!:string;
		@Prop(Function) readonly exportFunction!:Function;
		currentLeft:number = this.left;
		currentTop:number = this.top;

		startDrag ():void {
			const mouseMove = (ev:MouseEvent) => {
				this.currentLeft += ev.movementX;
				this.currentTop += ev.movementY;
			};
			document.addEventListener("mousemove", mouseMove);
			document.addEventListener("mouseup", ev => {
				document.removeEventListener("mousemove", mouseMove);
			}, { once: true });
		}
	}
</script>
