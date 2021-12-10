<script lang="ts" context="module">
	export async function load({ page, fetch, session, stuff }) {
		const url = '/config/index.json';
		const res = await fetch(url);

		if (res.ok) {
			const pageConfig = await res.json();
			return {
				props: {
					pageConfig
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import type { config } from '../interfaces/config.interface';
	import { onMount } from 'svelte';
	export let pageConfig: config.Config;
	import Card from '../components/card.svelte';
	import fetch from 'unfetch';

	let requestData = {};

	onMount(async () => {
		pageConfig.requests.forEach(async (request) => {
			const res = await fetch(request.url, {
				method: request.method
			});
			const config = await res.json();
			requestData[request.key] = config;
		});
	});
</script>

<div class="grid grid-cols-3">
	<Card>
		<div slot="card-header" />
		<div slot="card-body" />
		<div slot="card-footer" />
	</Card>
</div>
