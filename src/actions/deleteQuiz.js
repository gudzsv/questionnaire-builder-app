'use server';

import { APP_ROUTES } from '@/constants/index.js';
import { deleteQuestionnaire } from '@/services/questionnaireService.js';
import { revalidatePath } from 'next/cache.js';

export async function deleteQuiz(id) {
	await deleteQuestionnaire(id);
	revalidatePath(APP_ROUTES.catalog);
}
