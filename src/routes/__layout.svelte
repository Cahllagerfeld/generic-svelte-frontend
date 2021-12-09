<script>
	import { onMount } from 'svelte';
	import fetch from 'unfetch';

	import '../app.css';

	onMount(async () => {
		const configResponse = await fetch('/config.json');
		const response = await configResponse.json();
	});
</script>

<slot />
