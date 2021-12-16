import i18next from 'i18next';
import i18nBackend from 'i18next-http-backend';

class I18NextService {
	i18next;
	initLanguage: string = 'de';
	private static _instance: I18NextService;

	private constructor() {
		this.i18next = i18next;
	}

	public t(key: string, replacements?: Record<string, unknown>): string {
		return this.i18next.t(key, replacements);
	}

	public changeLanguage(language: string) {
		this.i18next.changeLanguage(language);
	}

	public async initialize() {
		await i18next.use(i18nBackend).init({
			lng: 'en',
			fallbackLng: 'en',
			ns: ['common'],
			defaultNS: 'common',
			backend: {
				loadPath: '/locales/{{lng}}/{{ns}}.json'
			}
		});
		i18next.changeLanguage('de');
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

export default I18NextService.Instance;
