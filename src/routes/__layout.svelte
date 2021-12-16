<script context="module" lang="ts">
	import i18next from '../services/i18next.service';

	export async function load() {
		await i18next.initialize();

		return {
			stuff: {
				i18next
			}
		};
	}
</script>

<script>
	import '../app.css';
</script>

<div class="p-4">
	<slot />
</div>
