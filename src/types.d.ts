	export type CreateUserData = {
		email:      string,
		password:   string,
		first_name: string,
		last_name:  string,
	}


	export type CreatePhoto = {
		title: string,
		url: string,
		comment: string,
		user_id: number,
 	}


	export type UpdatePhotoData = {
		title?: string,
		comment?: string,
	}


	export type JwtPayload = {
		sub: number,
		name: string,
		email: string,
		user_id: number,
		iat?: number,
		exp?: number,
	}
