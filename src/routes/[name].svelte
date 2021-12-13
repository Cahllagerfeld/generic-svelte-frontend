<script lang="ts" context="module">
	import { ConfigRequestService } from '../services/config-request.service';
	const configRequestService = new ConfigRequestService();

	export async function load({ page, fetch }) {
		const data = await configRequestService.getConfig(fetch, '/config/name.json', page.params);
		if (data.error) return data;

		return {
			props: {
				routeConfig: data.config
			}
		};
	}
</script>

<script lang="ts">
	import type { config as configTypes } from '../interfaces/config.interface';
	import { onMount } from 'svelte';
	import get from 'lodash.get';
	import Card from '../components/card.svelte';

	export let routeConfig: configTypes.Config;
	let requestData: any = {};

	onMount(() => {
		routeConfig.requests.forEach(async (request) => {
			const res = await fetch(request.url, {
				method: request.method
			});
			const config = await res.json();
			requestData[request.key] = config;
		});
	});
</script>

<div class="">
	{#each Object.entries(routeConfig.tiles) as [_, config]}
		{#if !config.isObject}
			{#each Object.entries(get(requestData, config.binding, {})) as [_, dataset]}
				<div class="mb-8">
					<Card {config} data={dataset} />
				</div>
			{/each}
		{:else}
			<Card {config} data={get(requestData, config.binding, {})} />
		{/if}
	{/each}
</div>
