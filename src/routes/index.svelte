<script lang="ts" context="module">
	import { ConfigRequestService } from '../services/config-request.service';
	const configRequestService = new ConfigRequestService();
	export async function load({ page, fetch, session, stuff }) {
		const data = await configRequestService.getConfig(fetch, '/config/index.json');
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
	onMount(async () => {
		routeConfig.requests.forEach(async (request) => {
			const res = await fetch(request.url, {
				method: request.method
			});
			const config = await res.json();
			requestData[request.key] = config;
		});
	});
</script>

<h3>{routeConfig.headline}</h3>
{#each Object.entries(routeConfig.tiles) as [key, config]}
	{#each Object.entries(get(requestData, config.binding, {})) as [key, dataset], i}
		<div class="mb-8">
			<Card {config} data={dataset}>
				<div slot="card-header">Text</div>
				<div slot="card-body">Body</div>
			</Card>
		</div>
	{/each}
{/each}

<span class="font-mono">Test</span>
