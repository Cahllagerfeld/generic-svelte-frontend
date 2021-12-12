<script lang="ts">
	import type { config as configTypes } from '../interfaces/config.interface';
	import get from 'lodash.get';
	import { goto } from '$app/navigation';
	import { BindingService } from '../services/binding.service';

	export let data: any;
	export let config: configTypes.Tile;

	const bindingService = new BindingService();

	const triggerRoute = () => {
		if (!config.link) return;
		const boundLink = bindingService.getBindingByRegex(config.link, data);
		goto(boundLink);
	};
</script>

<div
	style={`border-left: 8px solid ${config.color}`}
	class="py-4 px-8  shadow-lg rounded-lg flex mb-4 cursor-pointer"
	on:click={() => triggerRoute()}
>
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
