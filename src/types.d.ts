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
