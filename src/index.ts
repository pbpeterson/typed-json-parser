const JSON_WHITESPACE = new Set([" ", "\n", "\r", "\t"]);
const JSON_SYNTAX = new Set(["{", "}", "[", "]", ",", ":"]);

interface LexResult<T> {
	value: T | null;
	rest: string;
}

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
	if (jsonString === null) {
		return {
			data: null,
			error: { name: "NullError", message: "jsonString value is null" },
		};
	}

	try {
		const parsed = JSON.parse(jsonString); // TODO: Replace with own parse method
		return {
			data: parsed as T,
			error: null,
		};
	} catch (err) {
		return {
			data: null,
			error: new Error(),
		};
	}

	return {
		data: "" as T,
		error: null,
	};
}

function lex(input: string) {
	const tokens: (string | number | boolean | null)[] = [];

	while (input.length > 0) {
		if (JSON_WHITESPACE.has(input[0])) {
			input = input.slice(1);
			continue;
		}
	}
}
