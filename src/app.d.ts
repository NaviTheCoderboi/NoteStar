// See https://kit.svelte.dev/docs/types#app
import type { Session } from '@auth/core/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
