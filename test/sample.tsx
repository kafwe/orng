/**
 * orng Theme Test File
 * 
 * This file exercises all major syntax scopes to verify theme coverage.
 * Open this in VS Code with the orng theme active, then use:
 * "Developer: Inspect Editor Tokens and Scopes" to verify highlighting.
 */

// ============================================================================
// IMPORTS & MODULES
// ============================================================================
import React, { useState, useEffect, type FC } from 'react';
import * as utils from './utils';

// ============================================================================
// CONSTANTS & VARIABLES
// ============================================================================
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const isProduction = process.env.NODE_ENV === 'production';

let mutableCounter = 0;
var legacyVariable = 'deprecated';

// ============================================================================
// ENUMS
// ============================================================================
enum Status {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}

enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

// ============================================================================
// INTERFACES & TYPES
// ============================================================================
interface User {
  id: number;
  name: string;
  email: string;
  status: Status;
  metadata?: Record<string, unknown>;
}

type UserRole = 'admin' | 'editor' | 'viewer';

type ApiResponse<T> = {
  data: T;
  error: string | null;
  timestamp: Date;
};

// ============================================================================
// CLASSES
// ============================================================================
class BaseService {
  protected readonly baseUrl: string;
  private static instance: BaseService;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance(): BaseService {
    if (!BaseService.instance) {
      BaseService.instance = new BaseService(API_URL);
    }
    return BaseService.instance;
  }

  async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
}

class UserService extends BaseService {
  constructor() {
    super(API_URL);
  }

  async getUser(id: number): Promise<User> {
    return this.fetch<User>(`/users/${id}`);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    // Using 'this' keyword
    console.log(this.baseUrl);
    return { id, ...data } as User;
  }
}

// ============================================================================
// FUNCTIONS
// ============================================================================
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const add = (a: number, b: number): number => a + b;

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Higher-order function
function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES
): () => Promise<T> {
  return async () => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (e) {
        if (i === retries - 1) throw e;
      }
    }
    throw new Error('Unreachable');
  };
}

// ============================================================================
// OPERATORS & EXPRESSIONS
// ============================================================================
function demonstrateOperators(): void {
  // Arithmetic
  const sum = 10 + 5;
  const diff = 10 - 5;
  const product = 10 * 5;
  const quotient = 10 / 5;
  const remainder = 10 % 3;
  const power = 2 ** 8;

  // Comparison
  const isEqual = sum === 15;
  const isNotEqual = sum !== 10;
  const isGreater = sum > 10;
  const isLessOrEqual = sum <= 20;

  // Logical
  const and = true && false;
  const or = true || false;
  const not = !true;
  const nullish = null ?? 'default';

  // Bitwise
  const bitwiseAnd = 0b1010 & 0b1100;
  const bitwiseOr = 0b1010 | 0b1100;
  const bitwiseXor = 0b1010 ^ 0b1100;
  const leftShift = 1 << 4;

  // Ternary
  const result = isEqual ? 'yes' : 'no';

  // Optional chaining & nullish coalescing
  const obj = { nested: { value: 42 } };
  const value = obj?.nested?.value ?? 0;
}

// ============================================================================
// REGEX & STRINGS
// ============================================================================
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[\d\s-]{10,}$/g;
const urlPattern = /https?:\/\/[\w.-]+(?:\/[\w.-]*)*\/?/i;

const templateString = `
  Hello ${greet('World')}!
  The answer is ${40 + 2}.
  Escaped: \${notInterpolated}
  Newline: \n\tTab
`;

const rawString = String.raw`This is a raw string with \n no escapes`;

// ============================================================================
// OBJECTS & PROPERTIES
// ============================================================================
const config = {
  apiUrl: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token',
  },
  retry: {
    maxAttempts: 3,
    backoff: 1000,
  },
};

const { apiUrl, timeout, headers: { Authorization: authHeader } } = config;

// ============================================================================
// ARRAYS & ITERATION
// ============================================================================
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

for (const num of numbers) {
  console.log(num);
}

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// ============================================================================
// CONTROL FLOW
// ============================================================================
function processStatus(status: Status): string {
  switch (status) {
    case Status.Pending:
      return 'Waiting...';
    case Status.Active:
      return 'In progress';
    case Status.Completed:
      return 'Done!';
    case Status.Failed:
      return 'Error occurred';
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

// Labels (rare but valid)
outerLoop: for (let i = 0; i < 10; i++) {
  innerLoop: for (let j = 0; j < 10; j++) {
    if (i * j > 50) {
      break outerLoop;
    }
    if (j > 5) {
      continue innerLoop;
    }
  }
}

// ============================================================================
// REACT COMPONENT (JSX)
// ============================================================================
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log('Button mounted');
    return () => {
      console.log('Button unmounted');
    };
  }, []);

  return (
    <button
      className={`btn btn-${variant} ${isHovered ? 'hovered' : ''}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      data-testid="custom-button"
    >
      {label}
    </button>
  );
};

const App: FC = () => {
  const handleClick = () => {
    console.log('Clicked!');
  };

  return (
    <div className="app">
      <h1>Welcome to orng</h1>
      <p>A Cloudflare-inspired theme for VS Code</p>
      <Button
        label="Click me"
        onClick={handleClick}
        variant="primary"
      />
      {/* This is a JSX comment */}
      {isProduction && <span>Production mode</span>}
    </div>
  );
};

// ============================================================================
// ERROR HANDLING
// ============================================================================
class CustomError extends Error {
  constructor(
    message: string,
    public code: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

async function riskyOperation(): Promise<void> {
  try {
    await fetchData(API_URL);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`Error ${error.code}: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  } finally {
    console.log('Cleanup complete');
  }
}

// ============================================================================
// GENERICS
// ============================================================================
function identity<T>(value: T): T {
  return value;
}

function mapObject<K extends string, V, U>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => U
): Record<K, U> {
  const result = {} as Record<K, U>;
  for (const key in obj) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

// ============================================================================
// DECORATORS (experimental)
// ============================================================================
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

// ============================================================================
// EXPORTS
// ============================================================================
export {
  User,
  UserRole,
  Status,
  UserService,
  Button,
  App,
  greet,
  fetchData,
  config,
};

export default App;
