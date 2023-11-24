export const load = async (event) => {
	// throw error(401, { message: 'You must be logged in to view this page' });
	return {
		session: event.locals.session
	};
};
