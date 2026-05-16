<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import quizzes from '../../../questions.json';
	import { answers, sessionId, currentQuizId, currentQuizName, type Answer } from '../../../store';
	import QuestionText from '../../quiz/[id]/components/QuestionText.svelte';
	import QuestionOption from '../../quiz/[id]/components/QuestionOption.svelte';
	import QuestionButton from '../../quiz/[id]/components/QuestionButton.svelte';
	import QuestionProgressCircle from '../../quiz/[id]/components/QuestionProgressCircle.svelte';

	let loading = true;
	let questions: any[] = [];
	let testName = '';

	let currentQuestionIndex = 0;
	$: question = questions[currentQuestionIndex];
	$: total = questions.length;
	$: progressWidth = total > 0 ? (currentQuestionIndex / total) * 100 : 0;

	let answersValue: Answer[] = [];
	answers.subscribe((v) => {
		answersValue = v;
	});

	let selectedOption: null | string = null;
	let submitted = false;

	onMount(async () => {
		const testId = $page.params.testId;
		const { data, error } = await supabase
			.from('custom_tests')
			.select('*')
			.eq('id', testId)
			.single();

		if (error || !data) {
			goto('/tests');
			return;
		}

		testName = data.name;

		const resolved = (data.question_ids as { quiz_id: number; question_id: number }[])
			.map(({ quiz_id, question_id }) => {
				const quiz = (quizzes as any[]).find((q: any) => q.id === quiz_id);
				return quiz?.questions.find((q: any) => q.id === question_id);
			})
			.filter(Boolean);

		questions = resolved;

		sessionId.set(crypto.randomUUID());
		currentQuizId.set(0);
		currentQuizName.set(testName);
		answers.set(
			resolved.map((q: any) => ({
				id: q.id,
				questionText: q.question,
				options: q.options,
				selectedOption: null,
				correctAnswer: q.answer,
				isCorrect: null,
				explanation: q.explanation ?? ''
			}))
		);

		loading = false;
	});

	const handleChangeOption = (label: string) => {
		if (!submitted) selectedOption = label;
	};

	const handleSubmit = () => {
		if (!selectedOption) return;
		submitted = true;
		answers.update((state) => {
			const updated = [...state];
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
		if (currentQuestionIndex === questions.length - 1) {
			goto('/results');
		} else {
			currentQuestionIndex++;
		}
	};
</script>

{#if loading}
	<div class="text-center py-20">
		<div
			class="inline-block w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mb-4"
		></div>
		<p class="text-slate-400">Loading practice test...</p>
	</div>
{:else if questions.length === 0}
	<div class="text-center py-20">
		<p class="text-slate-300 font-medium mb-1">No questions found in this test.</p>
		<a href="/tests" class="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
			Back to Tests →
		</a>
	</div>
{:else}
	<div class="w-full">
		<div class="mb-6">
			<div class="flex items-center justify-between mb-3">
				<span class="text-slate-400 text-sm font-medium">{testName}</span>
				<span class="text-slate-400 text-sm font-medium">
					<span class="text-white font-bold">{currentQuestionIndex + 1}</span> / {total}
				</span>
			</div>

			<div
				class="w-full h-1.5 rounded-full overflow-hidden"
				style="background: rgba(255,255,255,0.1);"
			>
				<div
					class="h-full rounded-full transition-all duration-500"
					style="width: {progressWidth}%; background: linear-gradient(to right, #6366f1, #8b5cf6);"
				/>
			</div>

			<div class="flex justify-center mt-3">
				{#each answersValue as answer, i}
					<QuestionProgressCircle
						isCorrect={answer.isCorrect}
						isCurrent={i === currentQuestionIndex}
					/>
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
{/if}
