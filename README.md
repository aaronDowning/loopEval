# Asana Data-Driven Tests

This repo contains a Playwright test suite that performs data-driven testing on Asana using a JSON object for test data.

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- NPM

### Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:aaronDowning/loopEval.git
    cd loopEval
    ```

2. Ensure Playwright browsers are installed:

    ```sh
    npx playwright install
    ```

## Project Structure

- `tests/asana.test.ts`: Contains the Playwright test script.
- `testData.json`: JSON file containing the test data.
- `global.d.ts`: TypeScript declaration for importing JSON modules.
- `tsconfig.json`: TypeScript configuration file.

## Running the Tests

    ```sh
    npx playwright test
    ```

## Configuration

### tsconfig.json

Ensure `tsconfig.json` requires the following settings:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "dist"
  },
  "include": ["tests/**/*.ts"]
}
