<script lang="ts">
	export let handleSubmit: () => void;
	export let handleNext: () => void;
	export let submitted: boolean;
</script>

<div class="text-center mt-2">
	{#if submitted}
		<button
			class="text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
			style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
			on:click={handleNext}
		>
			Next &rarr;
		</button>
	{:else}
		<button
			class="text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
			style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
			on:click={handleSubmit}
		>
			Submit Answer
		</button>
	{/if}
</div>
