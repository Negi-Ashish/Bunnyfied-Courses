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
	$: total = data.questions.length;
	$: progressWidth = (currentQuestionIndex / total) * 100;

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
	<div class="mb-6">
		<div class="flex items-center justify-between mb-3">
			<span class="text-slate-400 text-sm font-medium">{data.name}</span>
			<span class="text-slate-400 text-sm font-medium">
				<span class="text-white font-bold">{currentQuestionIndex + 1}</span> / {total}
			</span>
		</div>

		<div class="w-full h-1.5 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.1);">
			<div
				class="h-full rounded-full transition-all duration-500"
				style="width: {progressWidth}%; background: linear-gradient(to right, #6366f1, #8b5cf6);"
			/>
		</div>

		<div class="flex justify-center mt-3">
			{#each answersValue as answer, i}
				<QuestionProgressCircle isCorrect={answer.isCorrect} isCurrent={i === currentQuestionIndex} />
			{/each}
		</div>
	</div>

	<QuestionText text={question.question} />

	<div class="flex justify-between flex-wrap">
		{#each question.options as option (option.id)}
			<QuestionOption
				{option}
				{selectedOption}
				{handleChangeOption}
				{submitted}
				correctAnswer={question.answer}
			/>
		{/each}
	</div>

	<QuestionButton {handleSubmit} {handleNext} {submitted} />
</div>
