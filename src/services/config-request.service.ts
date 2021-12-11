import type { config as configTypes } from '../interfaces/config.interface';

export class ConfigRequestService {
	constructor() {}

	public async getConfig(fetch: any, url: string) {
		const res = await fetch(url);

		if (res.ok) {
			const pageConfig: configTypes.Config = await res.json();
			return { config: pageConfig };
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
}
