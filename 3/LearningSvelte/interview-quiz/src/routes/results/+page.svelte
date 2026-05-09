<script lang="ts">
	import { answers, type Answer } from '../../store';
	import { goto } from '$app/navigation';

	let answersValue: Answer[] = [];
	answers.subscribe((value) => {
		answersValue = value;
	});

	$: score = answersValue.filter((a) => a.isCorrect).length;
	$: total = answersValue.length;

	const getOptionText = (answer: Answer, label: string) =>
		answer.options.find((o) => o.label === label)?.text ?? label;
</script>

<div class="max-w-2xl mx-auto p-6">
	<h1 class="text-3xl font-bold text-center mb-2">Quiz Results</h1>
	<p class="text-center text-xl mb-8">
		Score: <span class="font-bold text-blue-900">{score} / {total}</span>
	</p>

	{#each answersValue as answer, i}
		<div class="bg-white rounded shadow p-4 mb-4">
			<p class="font-semibold mb-3">{i + 1}. {answer.questionText}</p>
			<div class="flex flex-wrap gap-2 mb-3">
				{#each answer.options as option}
					<div
						class={`rounded w-[48%] text-center p-2 py-3 text-sm
							${option.label === answer.correctAnswer ? 'bg-green-300 font-bold' : ''}
							${option.label === answer.selectedOption && !answer.isCorrect ? 'bg-red-300' : ''}
							${option.label !== answer.correctAnswer && option.label !== answer.selectedOption ? 'bg-gray-100' : ''}
						`}
					>
						{option.text}
					</div>
				{/each}
			</div>

			<p class="text-sm text-gray-600">
				Correct answer:
				<span class="font-semibold text-green-700">{getOptionText(answer, answer.correctAnswer)}</span>
			</p>
			{#if answer.selectedOption && !answer.isCorrect}
				<p class="text-sm text-gray-600">
					Your answer:
					<span class="font-semibold text-red-600"
						>{getOptionText(answer, answer.selectedOption)}</span
					>
				</p>
			{/if}

			{#if answer.explanation}
				<div class="mt-3 bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
					<span class="font-bold">Explanation: </span>{answer.explanation}
				</div>
			{/if}
		</div>
	{/each}

	<div class="text-center mt-6">
		<button class="bg-blue-900 text-white font-bold p-4 rounded px-16" on:click={() => goto('/')}>
			Back to Home
		</button>
	</div>
</div>
