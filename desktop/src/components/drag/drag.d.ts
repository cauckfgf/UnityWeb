import Vue, { VNode } from "vue";

export declare class Drag extends Vue {
	top?:number;
	left?:number;
	width?:number;
	height?:number;
	exportFunction?:Function;
	title?:string;
	icon?:string;
	showClose?:boolean;
	$slots:{
		default:VNode[];
		foot:VNode[];
	};

	$emit (eventName:"close"):this
}
