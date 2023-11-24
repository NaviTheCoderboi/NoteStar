import { error } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.session) {
		throw error(401, { message: 'You must be logged in to view this page' });
	}
};
