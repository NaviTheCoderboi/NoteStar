import { getNote } from '$lib/utils/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (locals.session?.user) {
		const note = await getNote(locals.session.user.id, params.note);
		if (!note) {
			throw error(404, 'Note not found');
		}
		return {
			note
		};
	}
};
