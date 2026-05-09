<script lang="ts">
	import QuestionText from './components/QuestionText.svelte';
	import QuestionOption from './components/QuestionOption.svelte';
	import QuestionButton from './components/QuestionButton.svelte';
	import QuestionProgressCircle from './components/QuestionProgressCircle.svelte';
	import { answers, type Answer } from '../../../store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: any;

	let currentQuestionIndex = 0;
	$: question = data.questions[currentQuestionIndex];

	let answersValue: Answer[];
	answers.subscribe((value) => {
		answersValue = value;
	});

	let selectedOption: null | string = null;
	let submitted = false;

	const handleChangeOption = (label: string) => {
		if (!submitted) selectedOption = label;
	};

	const handleSubmit = () => {
		if (!selectedOption) return;
		submitted = true;
		answers.update((currentState) => {
			const updated = [...currentState];
			updated[currentQuestionIndex] = {
				...updated[currentQuestionIndex],
				selectedOption,
				isCorrect: selectedOption === question.answer
			};
			return updated;
		});
	};

	const handleNext = () => {
		submitted = false;
		selectedOption = null;
		if (currentQuestionIndex === data.questions.length - 1) {
			goto('/results');
		} else {
			currentQuestionIndex++;
		}
	};

	onMount(() => {
		answers.set(
			data.questions.map((q: any) => ({
				id: q.id,
				questionText: q.question,
				options: q.options,
				selectedOption: null,
				correctAnswer: q.answer,
				isCorrect: null,
				explanation: q.explanation ?? ''
			}))
		);
	});
</script>

<div class="w-full">
	<div class="flex justify-center">
		{#each answersValue as answer}
			<QuestionProgressCircle isCorrect={answer.isCorrect} />
		{/each}
	</div>
	<QuestionText text={question.question} />
	<div class="flex justify-between flex-wrap cursor-pointer">
		{#each question.options as option (option.id)}
			<QuestionOption
				{option}
				{selectedOption}
				{handleChangeOption}
				{submitted}
			/>
		{/each}
	</div>
	<QuestionButton {handleSubmit} {handleNext} {submitted} />
</div>
