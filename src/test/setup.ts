import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// extends vitest's expect method with methods from react-testing-library
afterEach(() => {
    cleanup();
});
