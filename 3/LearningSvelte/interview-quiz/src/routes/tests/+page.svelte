<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	type CustomTest = {
		id: string;
		name: string;
		question_ids: { quiz_id: number; question_id: number; quiz_name: string }[];
		created_at: string;
	};

	let tests: CustomTest[] = [];
	let loading = true;

	onMount(async () => {
		const { data } = await supabase
			.from('custom_tests')
			.select('*')
			.order('created_at', { ascending: false });
		if (data) tests = data;
		loading = false;
	});

	async function deleteTest(id: string) {
		await supabase.from('custom_tests').delete().eq('id', id);
		tests = tests.filter((t) => t.id !== id);
	}

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="w-full">
	<div class="mb-8">
		<p class="text-indigo-400 uppercase tracking-widest text-xs font-semibold mb-2">Teacher View</p>
		<h1 class="text-3xl font-bold text-white">Custom Tests</h1>
		<p class="text-slate-400 text-sm mt-1">Start a test for the student or create one from Progress.</p>
	</div>

	{#if loading}
		<div class="text-center py-20">
			<div
				class="inline-block w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mb-4"
			></div>
			<p class="text-slate-400">Loading tests...</p>
		</div>
	{:else if tests.length === 0}
		<div
			class="rounded-2xl p-10 text-center"
			style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
		>
			<p class="text-slate-300 font-medium mb-1">No custom tests yet</p>
			<p class="text-slate-500 text-sm">Check back later.</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each tests as test}
				<div
					class="rounded-2xl p-5 flex items-center justify-between gap-4"
					style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
				>
					<div class="min-w-0">
						<p class="text-white font-semibold truncate">{test.name}</p>
						<p class="text-slate-500 text-sm mt-0.5">
							{test.question_ids.length} question{test.question_ids.length !== 1 ? 's' : ''} · {formatDate(test.created_at)}
						</p>
					</div>
					<div class="flex gap-2 flex-shrink-0">
						<a
							href="/practice/{test.id}"
							class="text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
							style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
						>
							Start →
						</a>
						<button
							class="text-red-400 text-sm font-medium px-3 py-2 rounded-xl border transition-colors hover:bg-red-500/10"
							style="border-color: rgba(239,68,68,0.25);"
							on:click={() => deleteTest(test.id)}
						>
							Delete
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
