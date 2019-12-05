<style>

</style>
<template>
	<div style="padding: 8px">
		<ul>
			<li style="font-size: 12px">{{keyString}}<span style="float: right">{{timeString}}</span></li>
			<li style="font-size: 16px;line-height: 30px" class="clearfix">
				<label class="ivu-form-item-label" style="width: 80px;">
					<span
						:style="{backgroundColor:['0','#95271d','#26798b','#256f35'][status]}"
						style='font-size: 18px;padding: 2px 6px;border-radius: 4px;display: inline-block;text-align: center;float: right'>
					{{["","新建","处理中","已完成"][status]}}
				</span>
				</label>
				<div style="margin-right: 80px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
					{{describe}}
				</div>
			</li>
		</ul>
		<div style="width: 80%;margin-left: 10px;border-bottom: 1px solid #FFF;height: 1px;margin-top: 4px;"></div>
	</div>
</template>
<script lang=ts>
	import { Component, Prop, Vue } from "vue-property-decorator";

	@Component
	export default class RepairItem extends Vue {
		@Prop(String) readonly keyString!:string;
		@Prop(String) readonly timeString!:string;
		@Prop(Number) readonly id!:number;
		@Prop(String) readonly describe!:string;
		@Prop(Number) readonly status!:number;
	}
</script>
