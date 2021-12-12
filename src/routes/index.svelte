<script lang="ts" context="module">
	import { ConfigRequestService } from '../services/config-request.service';
	const configRequestService = new ConfigRequestService();
	export async function load({ page, fetch }) {
		const data = await configRequestService.getConfig(fetch, '/config/index.json', page.params);
		if (data.error) return data;

		return {
			props: {
				routeConfig: data.config
			}
		};
	}
</script>

<script lang="ts">
	import Card from '../components/card.svelte';
	import type { config as configTypes } from '../interfaces/config.interface';
	import get from 'lodash.get';
	import { onMount } from 'svelte';
	import fetch from 'unfetch';

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

<div class="grid grid-cols-6 gap-4">
	{#each Object.entries(routeConfig.tiles) as [key, config]}
		{#each Object.entries(get(requestData, config.binding, {})) as [key, dataset], i}
			<div class="mb-8">
				<Card {config} data={dataset} />
			</div>
		{/each}
	{/each}
</div>
