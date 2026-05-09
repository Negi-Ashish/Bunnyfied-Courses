<script lang="ts">
	import { answers, type Answer } from '../../store';
	import { goto } from '$app/navigation';

	let answersValue: Answer[] = [];
	answers.subscribe((value) => {
		answersValue = value;
	});

	$: score = answersValue.filter((a) => a.isCorrect).length;
	$: total = answersValue.length;
	$: percentage = total > 0 ? Math.round((score / total) * 100) : 0;

	const getOptionText = (answer: Answer, label: string) =>
		answer.options.find((o) => o.label === label)?.text ?? label;

	const radius = 54;
	const circumference = 2 * Math.PI * radius;
	$: strokeDashoffset = circumference - (percentage / 100) * circumference;

	$: scoreLabel =
		percentage >= 80
			? 'Excellent!'
			: percentage >= 60
				? 'Good job!'
				: percentage >= 40
					? 'Keep practicing'
					: 'Keep going!';

	$: scoreColor =
		percentage >= 80
			? '#10b981'
			: percentage >= 60
				? '#6366f1'
				: percentage >= 40
					? '#f59e0b'
					: '#ef4444';
</script>

<div class="w-full max-w-2xl">
	<div
		class="rounded-2xl p-8 mb-6 text-center"
		style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);"
	>
		<p class="text-slate-400 text-xs uppercase tracking-widest mb-5">Your Score</p>

		<div class="flex justify-center mb-5">
			<div class="relative w-32 h-32">
				<svg class="w-full h-full -rotate-90" viewBox="0 0 128 128">
					<circle
						cx="64"
						cy="64"
						r={radius}
						fill="none"
						stroke="rgba(255,255,255,0.08)"
						stroke-width="10"
					/>
					<circle
						cx="64"
						cy="64"
						r={radius}
						fill="none"
						stroke={scoreColor}
						stroke-width="10"
						stroke-linecap="round"
						stroke-dasharray={circumference}
						stroke-dashoffset={strokeDashoffset}
						style="transition: stroke-dashoffset 1s ease, stroke 1s ease;"
					/>
				</svg>
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="text-3xl font-bold text-white">{percentage}%</span>
				</div>
			</div>
		</div>

		<h1 class="text-2xl font-bold text-white mb-1">{scoreLabel}</h1>
		<p class="text-slate-400">{score} out of {total} correct</p>
	</div>

	<div class="space-y-3 mb-6">
		{#each answersValue as answer, i}
			<div
				class={`rounded-xl p-4 ${answer.isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'}`}
				style={`border: 1px solid; background: ${answer.isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'};`}
			>
				<div class="flex items-start gap-3">
					<span
						class={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${answer.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
					>
						{answer.isCorrect ? '✓' : '✗'}
					</span>
					<div class="flex-1 min-w-0">
						<p class="text-white text-sm font-semibold mb-2">{i + 1}. {answer.questionText}</p>
						<div class="flex flex-wrap gap-2 mb-2">
							{#each answer.options as option}
								<div
									class={`rounded-lg px-3 py-1.5 text-xs font-medium
										${option.label === answer.correctAnswer ? 'text-emerald-300' : ''}
										${option.label === answer.selectedOption && !answer.isCorrect ? 'text-red-300' : ''}
										${option.label !== answer.correctAnswer && option.label !== answer.selectedOption ? 'text-slate-500' : ''}
									`}
									style={`border: 1px solid; ${
										option.label === answer.correctAnswer
											? 'background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.4);'
											: option.label === answer.selectedOption && !answer.isCorrect
												? 'background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4);'
												: 'background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08);'
									}`}
								>
									{option.text}
								</div>
							{/each}
						</div>
						{#if answer.explanation}
							<div
								class="rounded-lg p-3 text-xs text-slate-300"
								style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);"
							>
								<span class="text-indigo-400 font-semibold">Explanation: </span>{answer.explanation}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="text-center">
		<button
			class="text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
			style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
			on:click={() => goto('/')}
		>
			Back to Home
		</button>
	</div>
</div>
