export module config {
	export interface Request {
		key: string;
		url: string;
		method: string;
		parameterBinding?: string;
	}

	export interface Line {
		binding: string;
	}

	export interface Tile {
		binding: string;
		headline: string;
		isObject: boolean;
		color: string;
		link?: string;
		hoverColor?: string;
		lines?: Line[];
	}

	export interface Config {
		headline: string;
		requests: Request[];
		tiles: Tile[];
	}
}
