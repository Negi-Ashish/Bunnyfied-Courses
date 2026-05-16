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
export const sessionId = writable<string>('');
export const currentQuizId = writable<number>(0);
export const currentQuizName = writable<string>('');
