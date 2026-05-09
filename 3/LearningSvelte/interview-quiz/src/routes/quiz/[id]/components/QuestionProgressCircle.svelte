<script lang="ts">
	export let isCorrect: boolean | null;
	export let isCurrent: boolean = false;
</script>

<div
	class={`w-3 h-3 rounded-full mx-1 transition-all duration-300
		${isCurrent ? 'scale-125' : ''}
		${isCorrect === null ? (isCurrent ? 'bg-indigo-400 shadow-md shadow-indigo-400/50' : 'bg-white/20') : isCorrect === true ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-red-500 shadow-sm shadow-red-500/50'}
	`}
/>
