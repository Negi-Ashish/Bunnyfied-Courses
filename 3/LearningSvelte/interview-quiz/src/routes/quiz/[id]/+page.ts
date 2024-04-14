import quizzes from '../../../questions.json';
import { error } from '@sveltejs/kit';

export function load({ params }: { params: { id: string } }) {
	const quiz = quizzes.find((quiz) => quiz.id === parseInt(params.id));

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	return quiz;
}
