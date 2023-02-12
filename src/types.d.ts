	export type CreateUserData = {
		email:      string,
		password:   string,
		first_name: string,
		last_name:  string,
	}


	export type JwtPayload = {
		sub: number,
		name: string,
		email: string,
		iat?: number,
		exp?: number,
	}
