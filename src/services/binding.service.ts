import get from 'lodash.get';

export class BindingService {
	constructor() {}

	public getBinding(prop: string, object: any) {
		return get(object, prop);
	}

	getBindingByRegex(regexPattern: string, data: any) {
		const matches = regexPattern.match(/%(.*?)%/gi);
		if (!matches) return regexPattern;
		matches.forEach((match) => {
			const a = this.replaceRegex(match, '%', '');
			const boundValue = get(data, a, '');
			regexPattern = regexPattern.replace(new RegExp(match), boundValue ? boundValue : data);
		});
		return regexPattern;
	}

	replaceRegex(str: string, legacy: string, newValue: string) {
		const regex = new RegExp(`${legacy}`, 'g');
		return str.replace(regex, newValue);
	}
}
