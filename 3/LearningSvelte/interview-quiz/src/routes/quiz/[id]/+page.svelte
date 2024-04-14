<script lang="ts">
	import QuestionText from './components/QuestionText.svelte';

	export let data: any;

	let currentQuestionIndex = 0;
	$: question = data.questions[currentQuestionIndex];
</script>

<div>
	{currentQuestionIndex}
	{question.question}

	<button on:click={() => (currentQuestionIndex = 1)}>Next </button>
	<QuestionText />
</div>
