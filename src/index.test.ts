import { describe, it, expect } from "vitest";
import { parseJSON } from "./";

describe("parseJSON", () => {
  it("should parse valid JSON and return data without error", () => {
    const validJSON = '{"name": "test", "value": 123}';
    const { data, error } = parseJSON(validJSON);

    expect(error).toBeNull();
    expect(data).toEqual({ name: "test", value: 123 });
  });

  it("should handle invalid JSON and return error without throwing", () => {
    const invalidJSON = '{"name": "test", value: 123}'; // missing quotes around value
    const { data, error } = parseJSON(invalidJSON);

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
  });

  it("should handle empty string and return error", () => {
    const { data, error } = parseJSON("");

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
  });

  it("should handle null input and not return error", () => {
    const { data, error } = parseJSON(null as any);

    expect(data).toBeNull();
    expect(error).toBeNull();
  });

  it("should handle undefined input and return error", () => {
    const { data, error } = parseJSON(undefined as any);

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
  });

  it("should parse arrays correctly", () => {
    const validArrayJSON = '[1, 2, 3, {"test": true}]';
    const { data, error } = parseJSON(validArrayJSON);

    expect(error).toBeNull();
    expect(data).toEqual([1, 2, 3, { test: true }]);
  });

  it("should parse primitive values correctly", () => {
    const tests = [
      { input: '"hello"', expected: "hello" },
      { input: "123", expected: 123 },
      { input: "true", expected: true },
      { input: "false", expected: false },
      { input: "null", expected: null },
    ];

    tests.forEach(({ input, expected }) => {
      const { data, error } = parseJSON(input);
      expect(error).toBeNull();
      expect(data).toBe(expected);
    });
  });

  it("should preserve the original error message", () => {
    const malformedJSON = '{"test":}';
    const { data, error } = parseJSON(malformedJSON);

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(SyntaxError);
    expect(error?.name).toBe("SyntaxError");
  });
});
