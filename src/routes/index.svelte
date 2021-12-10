<script lang="ts" context="module">
	import { ConfigRequestService } from '../services/config-request.service';

	const configRequestService = new ConfigRequestService();

	export async function load({ page, fetch, session, stuff }) {
		const data = await configRequestService.getRequests(fetch, '/config/index.json');
		if (data.error) return data;

		return {
			props: {
				requestData: data.data,
				routeConfig: data.config
			}
		};
	}
</script>

<script lang="ts">
	import Card from '../components/card.svelte';
	import type { config } from '../interfaces/config.interface';

	export let routeConfig: config.Config;
	export let requestData;
</script>

<div class="grid grid-cols-3">
	<Card>
		<div slot="card-header" />
		<div slot="card-body" />
		<div slot="card-footer" />
	</Card>
</div>
