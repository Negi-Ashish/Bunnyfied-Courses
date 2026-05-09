<script lang="ts">
	import quizzes from '../questions.json';
	import Card from '../components/Card.svelte';
</script>

<div class="w-full">
	<div class="text-center mb-10">
		<p class="text-indigo-400 uppercase tracking-widest text-xs font-semibold mb-2">
			Sharpen Your Skills
		</p>
		<h1 class="text-4xl font-bold text-white mb-3">Interview Quiz</h1>
		<p class="text-slate-400 text-sm">Choose a topic and test your knowledge</p>
	</div>
	<div class="flex flex-wrap justify-center gap-5">
		{#each quizzes as quiz}
			<Card {quiz} />
		{/each}
	</div>
</div>
