<script lang="ts">
	import type { config } from '../interfaces/config.interface';
	export let config: config.Tile;
	export let data: any;
</script>

<div class="card">
	<div class="card-inner">
		<slot class="card-header" name="card-header" />
		<slot class="card-body" name="card-body" />
		<slot class="card-footer" name="card-footer" />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply py-4 px-8 bg-white shadow-lg rounded-lg flex;
	}
	.card-inner {
		@apply flex flex-col;
	}
	.card-footer {
		@apply mt-auto;
	}
</style>
