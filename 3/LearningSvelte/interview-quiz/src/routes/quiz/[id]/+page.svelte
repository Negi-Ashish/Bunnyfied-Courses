<script lang="ts">
	import QuestionText from './components/QuestionText.svelte';
	import QuestionOption from './components/QuestionOption.svelte';
	import QuestionButton from './components/QuestionButton.svelte';
	//This
	import { answers, type Answer } from '../../../store';

	//This
	import { goto } from '$app/navigation';

	export let data: any;

	let currentQuestionIndex = 0;
	$: question = data.questions[currentQuestionIndex];

	let answersValue: Answer[];
	answers.subscribe((value) => {
		answersValue = value;
	});

	let selectedOption: null | string = null;
	const handleChangeOption = (label: string) => {
		selectedOption = label;
	};

	//This
	let showCorrectAnswer = false;
	const handleSubmit = () => {
		//Dont allow function to proceed if option is not selected.
		if (!selectedOption) return;

		showCorrectAnswer = true;
		answers.update((currentState) => {
			const updatedAnswerState = currentState;
			updatedAnswerState[currentQuestionIndex].isCorrect = selectedOption === question.answer;
			return updatedAnswerState;
		});
	};

	const handleNext = () => {
		showCorrectAnswer = false;
		selectedOption = null;
		if (currentQuestionIndex === data.questions.length - 1) {
			goto('/results');
		} else {
			currentQuestionIndex++;
		}
	};
</script>

<div>
	<QuestionText text={question.question} />
	<div class="flex justify-between flex-wrap cursor-pointer">
		{#each question.options as option (option.id)}
			<QuestionOption
				{option}
				{selectedOption}
				{handleChangeOption}
				{showCorrectAnswer}
				answer={question.answer}
			/>
		{/each}
	</div>
	<QuestionButton {handleSubmit} {handleNext} {showCorrectAnswer} />
</div>
