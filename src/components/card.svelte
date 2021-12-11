<script lang="ts">
	import type { config } from '../interfaces/config.interface';
	export let config: config.Tile;
	export let data: any;
</script>

<div style={`border-left: 8px solid ${config.color}`} class="card">
	<div class="card-inner">
		<div class="card-header">
			<slot name="card-header" />
		</div>
		<div class="card-body">
			<slot name="card-body" />
		</div>
		<div class="card-footer">
			<slot name="card-footer" />
		</div>
	</div>
</div>

<style lang="postcss">
	.card {
		@apply py-4 px-8 bg-white shadow-lg rounded-lg flex mb-4;
	}
	.card-body {
		border-top: 1px solid darkgray;
		@apply mt-2 py-2;
	}
	.card-inner {
		@apply flex flex-col w-full;
	}
	.card-footer {
		@apply mt-auto;
	}
</style>
