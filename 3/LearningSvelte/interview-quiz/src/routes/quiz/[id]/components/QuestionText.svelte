<script lang="ts">
	export let text: string;

	$: lines = text.split('\n');
	$: prompt = lines[0];
	$: codeLines = lines.slice(1);
	$: hasCode = codeLines.some((l) => l.trim() !== '');
	$: codeText = codeLines.join('\n').replace(/^\n+/, '');
</script>

<div
	class="rounded-2xl mb-6 overflow-hidden"
	style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);"
>
	<p class="text-white text-lg font-semibold leading-relaxed text-center px-6 py-5">{prompt}</p>

	{#if hasCode}
		<div style="border-top: 1px solid rgba(255,255,255,0.08);">
			<div
				class="flex items-center gap-2 px-4 py-2"
				style="background: rgba(0,0,0,0.3);"
			>
				<span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
				<span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
				<span class="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
				<span class="text-xs text-slate-500 ml-2 font-mono">code</span>
			</div>
			<pre
				class="text-sm font-mono leading-relaxed overflow-x-auto px-5 py-4 text-slate-200"
				style="background: rgba(0,0,0,0.35); tab-size: 4;"
			>{codeText}</pre>
		</div>
	{/if}
</div>
