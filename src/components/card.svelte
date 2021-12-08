<div class="card">
	<div class="card-inner">
		<div class="card-header">
			<slot name="card-header" />
		</div>
		<div class="card-body">
			<slot name="card-body" />
		</div>
		<div class="card-footer">
			<slot name="card-footer" />
		</div>
	</div>
</div>

<style lang="postcss">
	.card {
		@apply py-4 px-8 bg-white shadow-lg rounded-lg flex;
	}
	.card-inner {
		@apply flex flex-col;
	}
	.card-footer {
		@apply mt-auto;
	}
</style>
