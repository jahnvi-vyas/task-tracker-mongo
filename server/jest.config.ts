import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: [
        "<rootDir>/src/tests",
    ],
    testMatch: [
        "**/*.test.ts",
    ],
    clearMocks: true,
    verbose: true,
    maxWorkers: 1,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts",
    ],
};

export default config;