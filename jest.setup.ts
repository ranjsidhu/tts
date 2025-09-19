import "@testing-library/jest-dom";
require("jest-fetch-mock").enableMocks();
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

// Global test setup
global.console = {
  ...console,
  // Suppress console.error and console.warn in tests unless explicitly needed
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock IntersectionObserver with proper typing
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: class IntersectionObserver implements globalThis.IntersectionObserver {
    root: Element | Document | null = null;
    rootMargin: string = "";
    thresholds: ReadonlyArray<number> = [];

    constructor(
      _callback: IntersectionObserverCallback,
      _options?: IntersectionObserverInit
    ) {
      // Mock implementation
    }

    disconnect(): void {
      // Mock implementation
    }

    observe(_target: Element): void {
      // Mock implementation
    }

    unobserve(_target: Element): void {
      // Mock implementation
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  },
});

// Mock ResizeObserver with proper typing
Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: class ResizeObserver implements globalThis.ResizeObserver {
    constructor(_callback: ResizeObserverCallback) {
      // Mock implementation
    }

    disconnect(): void {
      // Mock implementation
    }

    observe(_target: Element, _options?: ResizeObserverOptions): void {
      // Mock implementation
    }

    unobserve(_target: Element): void {
      // Mock implementation
    }
  },
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
