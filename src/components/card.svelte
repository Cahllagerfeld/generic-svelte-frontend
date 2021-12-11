<script lang="ts">
	import type { config as configTypes } from '../interfaces/config.interface';
	import get from 'lodash.get';
	import { each } from 'svelte/internal';
	export let config: configTypes.Tile;
	export let data: any;
</script>

<div style={`border-left: 8px solid ${config.color}`} class="card">
	<div class="card-inner">
		<div class="card-header">
			{get(data, config.headline)}
		</div>
		{#if config.lines}
			<div class="card-body">
				{#each config.lines as line}
					{get(data, line.binding)}
				{/each}
			</div>
			<div class="card-footer" />
		{/if}
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
