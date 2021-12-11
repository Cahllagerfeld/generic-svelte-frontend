<script lang="ts" context="module">
	import { ConfigRequestService } from '../../services/config-request.service';
	const configRequestService = new ConfigRequestService();

	export async function load({ page, fetch, session, stuff }) {
		const data = await configRequestService.getConfig(
			fetch,
			'/config/pokemon/name.json',
			page.params
		);
		if (data.error) return data;

		return {
			props: {
				routeConfig: data.config
			}
		};
	}
</script>

<script lang="ts">
	import type { config as configTypes } from '../../interfaces/config.interface';
	import { onMount } from 'svelte';
	import fetch from 'unfetch';

	export let routeConfig: configTypes.Config;

	console.log(routeConfig);

	onMount(() => {
		routeConfig.requests.forEach(async (request) => {});
	});
</script>
