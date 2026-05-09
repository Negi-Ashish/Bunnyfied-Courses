import { writable } from 'svelte/store';

export interface Option {
	id: number;
	label: string;
	text: string;
}

export interface Answer {
	id: number;
	questionText: string;
	options: Option[];
	selectedOption: string | null;
	correctAnswer: string;
	isCorrect: boolean | null;
	explanation: string;
}

export const answers = writable<Answer[]>([]);
