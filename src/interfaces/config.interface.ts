export module config {
	export interface Request {
		key: string;
		url: string;
		method: string;
	}

	export interface Config {
		requests: Request[];
	}
}
