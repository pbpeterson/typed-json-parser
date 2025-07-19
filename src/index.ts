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
  return {
    data: "" as T,
    error: null,
  };
}
