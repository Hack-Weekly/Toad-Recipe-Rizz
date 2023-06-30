declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest
		}
		// interface PageData {}
		// interface Platform {}
	}

	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type UserAttributes = {
			username: string
      email: string
      picture: string
		}
	}
}

export {}
