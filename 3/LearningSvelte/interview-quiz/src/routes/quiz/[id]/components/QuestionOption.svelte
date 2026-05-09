<script lang="ts">
	export let option: { label: string; text: string };
	export let selectedOption: null | string;
	export let handleChangeOption: (label: string) => void;
	export let submitted: boolean;
	export let correctAnswer: string;

	$: isSelected = option.label === selectedOption;
	$: isCorrect = option.label === correctAnswer;

	$: btnClass = submitted && isCorrect
		? 'border-emerald-500 text-emerald-300'
		: submitted && isSelected && !isCorrect
			? 'border-red-500 text-red-300'
			: !submitted && isSelected
				? 'border-indigo-400 text-white'
				: 'border-white/10 text-slate-300';

	$: btnBg = submitted && isCorrect
		? 'rgba(16,185,129,0.12)'
		: submitted && isSelected && !isCorrect
			? 'rgba(239,68,68,0.12)'
			: !submitted && isSelected
				? 'rgba(99,102,241,0.2)'
				: 'rgba(255,255,255,0.04)';

	$: badgeClass = submitted && isCorrect
		? 'bg-emerald-500 text-white'
		: submitted && isSelected && !isCorrect
			? 'bg-red-500 text-white'
			: !submitted && isSelected
				? 'bg-indigo-500 text-white'
				: 'bg-white/10 text-slate-400';

	const labelToLetter: Record<string, string> = { a: 'A', b: 'B', c: 'C', d: 'D' };
</script>

<button
	class={`w-[49%] mb-4 p-4 rounded-xl text-left flex items-center gap-3 border transition-all duration-200 ${btnClass} ${!submitted ? 'hover:border-indigo-400/50 hover:bg-white/5' : ''}`}
	style="background: {btnBg};"
	on:click={() => handleChangeOption(option.label)}
	disabled={submitted}
>
	<span
		class={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${badgeClass}`}
	>
		{#if submitted && isCorrect}
			✓
		{:else if submitted && isSelected && !isCorrect}
			✗
		{:else}
			{labelToLetter[option.label] ?? option.label.toUpperCase()}
		{/if}
	</span>
	<span class="text-sm font-medium leading-snug">{option.text}</span>
</button>
