import { createNote, getNotes, type Note } from '$lib/utils/db';
import { error, fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	new: async ({ request, locals }) => {
		const _formData = (await request.formData()).get('formData');
		if (_formData && locals.session) {
			if (locals.session.user?.email) {
				const formData = JSON.parse(_formData as string);
				const note: Note = {
					user_id: new ObjectId(locals.session.user.id),
					title: formData.title,
					description: formData.description,
					content: { blocks: [] },
					tags: formData.tags,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				await createNote(note);
				return { success: true };
			} else {
				return fail(401, { message: 'You must be logged in to create a note' });
			}
		} else {
			return fail(400, { message: 'Invalid form data' });
		}
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session?.user) {
		return {
			notes: await getNotes(locals.session.user.id)
		};
	} else {
		throw error(401, { message: 'You must be logged in to view this page' });
	}
};
