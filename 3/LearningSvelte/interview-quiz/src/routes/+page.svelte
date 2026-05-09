<script lang="ts">
	import quizzes from '../questions.json';
	import Card from '../components/Card.svelte';
</script>

{#each quizzes.filter((q) => q.id >= 4) as quiz}
	<Card {quiz} />
{/each}

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
