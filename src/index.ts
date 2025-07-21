type ParseResult<T = any> =
	| {
			data: T;
			error: null;
	  }
	| {
			data: null;
			error: Error;
	  };

export function parseJSON<T = any>(jsonString: string): ParseResult<T> {
	try {
		const parsedData = JSON.parse(jsonString) as T;
		return {
			data: parsedData,
			error: null,
		};
	} catch (err) {
		return {
			data: null,
			error: err instanceof Error ? err : new Error(String(err)),
		};
	}
}
