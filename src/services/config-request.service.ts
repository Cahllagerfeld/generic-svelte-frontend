import type { config as configTypes } from '../interfaces/config.interface';

export class ConfigRequestService {
	constructor() {}

	public async getRequests(fetch: any, url: string) {
		let requestData = {};
		const res = await fetch(url);

		if (res.ok) {
			const pageConfig: configTypes.Config = await res.json();

			pageConfig.requests.forEach(async (request) => {
				const res = await fetch(request.url, {
					method: request.method
				});
				const config = await res.json();
				requestData[request.key] = config;
			});
			return { data: requestData };
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
}
