import get from 'lodash.get';

export class BindingService {
	constructor() {}

	public getBinding(prop: string, object: any) {
		return get(object, prop);
	}
}
