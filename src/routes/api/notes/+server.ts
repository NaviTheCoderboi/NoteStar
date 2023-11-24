import { deleteNote, updateNote } from '$lib/utils/db';
import type { OutputData } from '@editorjs/editorjs';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const {
		action
	}: { action: 'update-title' | 'update-description' | 'delete-note' | 'update-note' } = body;
	if (!locals.session) {
		return json({ error: 'not logged in' }, { status: 401 });
	}
	if (action == 'update-title') {
		const { note_id, title }: { title: string; note_id: string } = body.data;
		if (locals.session.user?.id) {
			const result = await updateNote(locals.session.user?.id, note_id, { title });
			if (!result) {
				return json({ error: 'not found' }, { status: 404 });
			}
			return json({ success: true });
		} else {
			return json({ error: 'not logged in' }, { status: 401 });
		}
	} else if (action == 'update-description') {
		const { note_id, description }: { description: string; note_id: string } = body.data;
		if (locals.session.user?.id) {
			const result = await updateNote(locals.session.user?.id, note_id, { description });
			if (!result) {
				return json({ error: 'not found' }, { status: 404 });
			}
			return json({ success: true });
		} else {
			return json({ error: 'not logged in' }, { status: 401 });
		}
	} else if (action == 'delete-note') {
		const { note_id }: { note_id: string } = body.data;
		if (locals.session.user?.id) {
			const result = await deleteNote(locals.session.user?.id, note_id);
			if (!result) {
				return json({ error: 'not found' }, { status: 404 });
			}
			return json({ success: true });
		} else {
			return json({ error: 'not logged in' }, { status: 401 });
		}
	} else if (action == 'update-note') {
		const {
			note_id,
			title,
			description,
			content
		}: { title: string; description: string; note_id: string; content: OutputData } = body.data;
		if (locals.session.user?.id) {
			const result = await updateNote(locals.session.user?.id, note_id, {
				title,
				description,
				content
			});
			if (!result) {
				return json({ error: 'not found' }, { status: 404 });
			}
			return json({ success: true });
		} else {
			return json({ error: 'not logged in' }, { status: 401 });
		}
	}
	return json('ok');
};
