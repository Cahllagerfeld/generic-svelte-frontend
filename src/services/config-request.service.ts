import type { config as configTypes } from '../interfaces/config.interface';
import { BindingService } from './binding.service';
import get from 'lodash.get';

export class ConfigRequestService {
	constructor() {}

	public async getConfig(fetch: any, url: string, pageParams: any) {
		const bindingService = new BindingService();
		const res = await fetch(url);

		if (res.ok) {
			let pageConfig: configTypes.Config = await res.json();

			pageConfig.requests.forEach((request) => {
				const boundURL = bindingService.getBindingByRegex(
					request.url,
					get(pageParams, request.parameterBinding)
				);
				request.url = boundURL;
			});

			return { config: pageConfig };
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}

	public getRegexPatternMatches(testString: string) {
		const regex = new RegExp('%[^%]*%', 'gi');
		return testString.match(regex);
	}
}
