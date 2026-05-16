<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import quizzes from '../../questions.json';

	type AttemptRow = {
		session_id: string;
		quiz_id: number;
		quiz_name: string;
		question_id: number;
		question_text: string;
		selected_opt: string | null;
		correct_opt: string;
		is_correct: boolean | null;
		attempted_at: string;
	};

	type Session = {
		session_id: string;
		quiz_name: string;
		attempted_at: string;
		questions: AttemptRow[];
		score: number;
	};

	let sessions: Session[] = [];
	let loading = true;
	let building = false;

	// key = `${quiz_id}-${question_id}`
	let selectedQuestions = new Map<string, { quiz_id: number; question_id: number; quiz_name: string }>();

	onMount(async () => {
		const { data } = await supabase
			.from('quiz_attempts')
			.select('*')
			.order('attempted_at', { ascending: false });

		if (data) {
			const map = new Map<string, Session>();
			for (const row of data as AttemptRow[]) {
				if (!map.has(row.session_id)) {
					map.set(row.session_id, {
						session_id: row.session_id,
						quiz_name: row.quiz_name,
						attempted_at: row.attempted_at,
						questions: [],
						score: 0
					});
				}
				const s = map.get(row.session_id)!;
				s.questions.push(row);
				if (row.is_correct) s.score++;
			}
			sessions = [...map.values()];
		}
		loading = false;
	});

	function toggleQuestion(row: AttemptRow) {
		const key = `${row.quiz_id}-${row.question_id}`;
		if (selectedQuestions.has(key)) {
			selectedQuestions.delete(key);
		} else {
			selectedQuestions.set(key, {
				quiz_id: row.quiz_id,
				question_id: row.question_id,
				quiz_name: row.quiz_name
			});
		}
		selectedQuestions = selectedQuestions;
	}

	function selectAllWrong() {
		for (const session of sessions) {
			for (const q of session.questions) {
				if (!q.is_correct) {
					selectedQuestions.set(`${q.quiz_id}-${q.question_id}`, {
						quiz_id: q.quiz_id,
						question_id: q.question_id,
						quiz_name: q.quiz_name
					});
				}
			}
		}
		selectedQuestions = selectedQuestions;
	}

	function selectAllRight() {
		for (const session of sessions) {
			for (const q of session.questions) {
				if (q.is_correct) {
					selectedQuestions.set(`${q.quiz_id}-${q.question_id}`, {
						quiz_id: q.quiz_id,
						question_id: q.question_id,
						quiz_name: q.quiz_name
					});
				}
			}
		}
		selectedQuestions = selectedQuestions;
	}

	async function deleteSelected() {
		if (selectedQuestions.size === 0) return;
		for (const { quiz_id, question_id } of selectedQuestions.values()) {
			await supabase
				.from('quiz_attempts')
				.delete()
				.eq('quiz_id', quiz_id)
				.eq('question_id', question_id);
		}
		// Remove deleted rows from local state without re-fetching
		for (const session of sessions) {
			session.questions = session.questions.filter(
				(q) => !selectedQuestions.has(`${q.quiz_id}-${q.question_id}`)
			);
			session.score = session.questions.filter((q) => q.is_correct).length;
		}
		sessions = sessions.filter((s) => s.questions.length > 0);
		selectedQuestions = new Map();
	}

	function exportSelected() {
		const quizMap = new Map<number, { id: number; name: string; imageUrl: string; questions: any[] }>();

		for (const { quiz_id, question_id } of selectedQuestions.values()) {
			const quiz = (quizzes as any[]).find((q) => q.id === quiz_id);
			if (!quiz) continue;
			const question = quiz.questions.find((q: any) => q.id === question_id);
			if (!question) continue;

			if (!quizMap.has(quiz_id)) {
				quizMap.set(quiz_id, { id: quiz.id, name: quiz.name, imageUrl: quiz.imageUrl, questions: [] });
			}
			quizMap.get(quiz_id)!.questions.push(question);
		}

		const json = JSON.stringify([...quizMap.values()], null, 2);
		const count = parseInt(localStorage.getItem('sq_export_count') ?? '0') + 1;
		localStorage.setItem('sq_export_count', String(count));
		const filename = count === 1 ? 'selected_questions.json' : `selected_questions${count}.json`;

		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	}

	async function buildTest() {
		if (building) return;
		building = true;
		const questionIds = [...selectedQuestions.values()];
		const name = `Custom Test — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
		const { error } = await supabase.from('custom_tests').insert({ name, question_ids: questionIds });
		building = false;
		if (!error) {
			selectedQuestions = new Map();
			goto('/tests');
		}
	}

	function shortText(text: string) {
		return text.split('\n')[0];
	}

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="w-full pb-24">
	<div class="mb-8">
		<p class="text-indigo-400 uppercase tracking-widest text-xs font-semibold mb-2">Teacher View</p>
		<h1 class="text-3xl font-bold text-white mb-1">Student Progress</h1>
		<p class="text-slate-400 text-sm mb-4">Click questions to select them, then build a custom test.</p>
		<div class="flex gap-2 flex-wrap">
			<button
				class="text-xs font-semibold px-3 py-2 rounded-lg border transition-colors hover:bg-red-500/10"
				style="color: #f87171; border-color: rgba(239,68,68,0.3);"
				on:click={selectAllWrong}
			>
				Select All Wrong
			</button>
			<button
				class="text-xs font-semibold px-3 py-2 rounded-lg border transition-colors hover:bg-emerald-500/10"
				style="color: #34d399; border-color: rgba(16,185,129,0.3);"
				on:click={selectAllRight}
			>
				Select All Right
			</button>
		</div>
	</div>

	{#if loading}
		<div class="text-center py-20">
			<div
				class="inline-block w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mb-4"
			></div>
			<p class="text-slate-400">Loading sessions...</p>
		</div>
	{:else if sessions.length === 0}
		<div
			class="rounded-2xl p-10 text-center"
			style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
		>
			<p class="text-slate-300 font-medium mb-1">No quiz sessions yet</p>
			<p class="text-slate-500 text-sm mb-4">Have the student complete a quiz first.</p>
			<a href="/" class="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
				Go to quizzes →
			</a>
		</div>
	{:else}
		{#each sessions as session}
			<div
				class="rounded-2xl mb-4 overflow-hidden"
				style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
			>
				<!-- Session header -->
				<div class="px-5 py-4 flex items-center justify-between">
					<div>
						<span class="text-white font-bold">{session.quiz_name}</span>
						<span class="text-slate-500 text-xs ml-3">{formatDate(session.attempted_at)}</span>
					</div>
					<span class="text-sm font-medium">
						<span class="text-emerald-400 font-bold">{session.score}</span>
						<span class="text-slate-500">/{session.questions.length} correct</span>
					</span>
				</div>

				<!-- Questions -->
				<div style="border-top: 1px solid rgba(255,255,255,0.06);">
					{#each session.questions as q}
						<button
							class="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white/5 {selectedQuestions.has(`${q.quiz_id}-${q.question_id}`)
								? 'bg-indigo-500/10'
								: ''}"
							on:click={() => toggleQuestion(q)}
						>
							<!-- Correct / wrong badge -->
							<span
								class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold {q.is_correct
									? 'bg-emerald-500/20 text-emerald-400'
									: 'bg-red-500/20 text-red-400'}"
							>
								{q.is_correct ? '✓' : '✗'}
							</span>

							<!-- Question text -->
							<span class="flex-1 text-sm text-slate-300 truncate">{shortText(q.question_text)}</span>

							<!-- Checkbox -->
							<div
								class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all {selectedQuestions.has(`${q.quiz_id}-${q.question_id}`)
									? 'bg-indigo-500 border-indigo-500'
									: 'border-white/20'}"
							>
								{#if selectedQuestions.has(`${q.quiz_id}-${q.question_id}`)}
									<svg
										class="w-3 h-3 text-white"
										viewBox="0 0 12 10"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="1,5 4,8 11,1" />
									</svg>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<!-- Sticky build bar -->
{#if selectedQuestions.size > 0}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
		style="background: rgba(15,23,42,0.96); backdrop-filter: blur(12px); border-top: 1px solid rgba(99,102,241,0.35);"
	>
		<div class="max-w-2xl mx-auto flex items-center justify-between gap-3">
			<span class="text-slate-300 text-sm flex-shrink-0">
				<span class="text-indigo-400 font-bold">{selectedQuestions.size}</span>
				question{selectedQuestions.size !== 1 ? 's' : ''} selected
			</span>
			<div class="flex gap-2">
				<button
					class="text-red-400 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors hover:bg-red-500/10"
					style="border-color: rgba(239,68,68,0.3);"
					on:click={deleteSelected}
				>
					Delete Selected
				</button>
				<button
					class="text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors hover:bg-white/5"
					style="border-color: rgba(255,255,255,0.15);"
					on:click={exportSelected}
				>
					Export JSON
				</button>
				<button
					class="text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
					style="background: linear-gradient(to right, #6366f1, #8b5cf6);"
					on:click={buildTest}
					disabled={building}
				>
					{building ? 'Saving...' : 'Build Test →'}
				</button>
			</div>
		</div>
	</div>
{/if}
