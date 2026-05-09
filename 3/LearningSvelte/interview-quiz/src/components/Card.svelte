<script lang="ts">
	import * as images from '../assets';
	import { goto } from '$app/navigation';

	interface Quiz {
		id: number;
		name: string;
		imageUrl: keyof typeof images;
		questions: {
			id: number;
			text: string;
			answer: string;
			options: { id: number; text: string; label: string }[];
		}[];
	}

	export let quiz: Quiz;
</script>

<button
	class="group w-[220px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
	style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);"
	on:click={() => goto(`/quiz/${quiz.id}`)}
>
	<div class="relative overflow-hidden h-40">
		<img
			class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
			src={images[quiz.imageUrl]}
			alt=""
		/>
		<div
			class="absolute inset-0"
			style="background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%);"
		></div>
	</div>
	<div class="p-4 text-left">
		<h1 class="font-bold text-white text-lg">{quiz.name}</h1>
		<p class="text-indigo-400 text-sm mt-1">{quiz.questions.length} questions</p>
	</div>
</button>
