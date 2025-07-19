# Typed JSON Parser

A TypeScript wrapper around `JSON.parse` that returns `{data, error}` instead of throwing exceptions, following Go's error handling pattern.

## 📋 About

`typed-json-parser` is a library that provides a safer alternative to JavaScript's native `JSON.parse`. Instead of throwing exceptions when encountering malformed JSON, the function returns an object with `data` and `error` fields, allowing for more explicit and predictable error handling.

## 🚀 Installation

```bash
npm install typed-json-parser
```

or with pnpm:

```bash
pnpm add typed-json-parser
```

or with yarn:

```bash
yarn add typed-json-parser
```

## 🛠️ Usage

### Import

```typescript
import { parseJSON } from 'typed-json-parser'
```

### Basic Usage

```typescript
// Valid JSON
const { data, error } = parseJSON('{"name": "John", "age": 30}')

if (error) {
  console.error('Error parsing JSON:', error.message)
} else {
  console.log('Data:', data) // { name: "John", age: 30 }
}

// Invalid JSON
const { data: invalidData, error: invalidError } = parseJSON('{"name": "John", age: 30}') // missing quotes around age

if (invalidError) {
  console.error('Malformed JSON:', invalidError.message)
} else {
  console.log('Data:', invalidData)
}
```

### Comparison with Traditional JSON.parse

**Traditional Approach (with try/catch):**
```typescript
try {
  const data = JSON.parse(jsonString)
  // use data
} catch (error) {
  // handle error
  console.error('Error:', error)
}
```

**With typed-json-parser:**
```typescript
const { data, error } = parseJSON(jsonString)

if (error) {
  // handle error
  console.error('Error:', error)
} else {
  // use data
}
```

## 📚 API

### `parseJSON(jsonString: string): ParseResult`

Parses a JSON string and returns an object with `data` or `error`.

#### Parameters

- `jsonString` (string): The JSON string to be parsed

#### Returns

The function returns an object of type `ParseResult` which can be:

```typescript
type ParseResult =
  | {
      data: any;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
```

- **Success**: `{ data: any, error: null }` - contains the parsed data
- **Error**: `{ data: null, error: Error }` - contains the error that occurred

#### Usage Examples

**Parsing Objects:**
```typescript
const { data, error } = parseJSON('{"user": "maria", "active": true}')
// data: { user: "maria", active: true }
```

**Parsing Arrays:**
```typescript
const { data, error } = parseJSON('[1, 2, 3, "test"]')
// data: [1, 2, 3, "test"]
```

**Parsing Primitive Values:**
```typescript
const { data, error } = parseJSON('"hello world"')
// data: "hello world"

const { data, error } = parseJSON('42')
// data: 42

const { data, error } = parseJSON('true')
// data: true
```

**Handling Errors:**
```typescript
const { data, error } = parseJSON('{"malformed": }')
// error: SyntaxError: Unexpected token } in JSON at position...
// data: null
```

## 🎯 Use Cases

### 1. API Input Validation

```typescript
function processRequest(body: string) {
  const { data, error } = parseJSON(body)
  
  if (error) {
    return { status: 400, message: 'Invalid JSON' }
  }
  
  // Process valid data
  return { status: 200, data }
}
```

### 2. Application Configuration

```typescript
function loadConfig(configString: string) {
  const { data: config, error } = parseJSON(configString)
  
  if (error) {
    console.warn('Using default configuration due to error:', error.message)
    return DEFAULT_CONFIG
  }
  
  return { ...DEFAULT_CONFIG, ...config }
}
```

### 3. Batch Data Processing

```typescript
function processBatchJSON(jsonStrings: string[]) {
  return jsonStrings.map(jsonStr => {
    const { data, error } = parseJSON(jsonStr)
    
    return {
      original: jsonStr,
      parsed: data,
      success: !error,
      error: error?.message
    }
  })
}
```

## 🔄 Advantages

- **No Exceptions**: Doesn't throw exceptions, making control flow easier
- **Type Safety**: Explicit types for success and error cases
- **Go Pattern**: Follows Go's familiar error handling pattern
- **Simplicity**: Simple and intuitive API
- **Compatibility**: Works with any valid JSON supported by `JSON.parse`

## 🧪 Testing

Run tests with:

```bash
pnpm test
```

To run in watch mode:

```bash
pnpm test:watch
```

## 🛠️ Development

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Build: `pnpm build`

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Peterson Pereira Bozza** - [petersonbozza7@gmail.com](mailto:petersonbozza7@gmail.com)
- **Guilherme Saliba** - [salibagui19@gmail.com](mailto:salibagui19@gmail.com)

Made with ❤️ for the JavaScript/TypeScript community 