import {
	AUTHJS_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import MongoDBClientPromise from '$lib/utils/mongodbPromise';
import Discord from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

import type { AdapterUser } from '@auth/core/adapters';
import type { JWT } from '@auth/core/jwt';
import type { Session } from '@auth/core/types';
import type { Handle } from '@sveltejs/kit';

const authHook = SvelteKitAuth({
	providers: [
		Discord({
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		}),
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	adapter: MongoDBAdapter(MongoDBClientPromise, {
		databaseName: 'notestar'
	}),
	session: {
		strategy: 'database',
		maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days,
		updateAge: 0
	},
	secret: AUTHJS_SECRET,
	callbacks: {
		session: async (
			params: {
				session: Session;
				token: JWT;
				user: AdapterUser;
			} & {
				newSession: undefined;
				trigger: 'update';
			}
		) => {
			if (params.session.user) {
				params.session.user.id = params.user.id;
			}
			return params.session;
		}
	}
});

const authSetup: Handle = async ({ event, resolve }) => {
	event.locals.session = await event.locals.getSession();
	return await resolve(event);
};

export const handle = sequence(authHook, authSetup);
