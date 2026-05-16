<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50"
	style="background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.07);"
>
	<div class="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
		<a href="/" class="text-white font-semibold text-sm tracking-tight">Interview Quiz</a>
		{#if $page.url.hostname === 'localhost' || $page.url.hostname === '127.0.0.1'}
			<div class="flex gap-5">
				<a
					href="/progress"
					class="text-xs font-medium uppercase tracking-wider transition-colors {$page.url.pathname.startsWith('/progress')
						? 'text-indigo-400'
						: 'text-slate-500 hover:text-slate-300'}"
				>
					Progress
				</a>
				<a
					href="/tests"
					class="text-xs font-medium uppercase tracking-wider transition-colors {$page.url.pathname.startsWith('/tests') || $page.url.pathname.startsWith('/practice')
						? 'text-indigo-400'
						: 'text-slate-500 hover:text-slate-300'}"
				>
					Tests
				</a>
			</div>
		{/if}
	</div>
</nav>

<div class="w-full max-w-2xl mx-auto px-4 pt-16 pb-10 min-h-screen flex flex-col justify-center">
	<slot />
</div>

<style>
	:global(html) {
		background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
		background-attachment: fixed;
		min-height: 100vh;
		color: #f1f5f9;
	}
	:global(body) {
		min-height: 100vh;
	}
</style>
