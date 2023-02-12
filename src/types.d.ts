
	// USER
	export type CreateUserData = {
		email:      string,
		password:   string,
		first_name: string,
		last_name:  string,
	}


	// PHOTO
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


	// ALBUMS
	export type CreateAlbumData = {
		title: string,
		user_id: number,
	}

	//JWT
	export type JwtPayload = {
		sub: number,
		name: string,
		email: string,
		user_id: number,
		iat?: number,
		exp?: number,
	}
