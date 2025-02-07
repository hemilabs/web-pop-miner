# Web PoP Miner

Web PoP Miner is a lightweight, browser-based application for PoP blockchain mining. It provides an easy way to explore PoP mining directly from your browser, making it accessible for both newcomers and experienced users.

Check out the [live application](https://pop-miner.hemi.xyz/) to see it in action.

For more details on how to use PoP Miner, please refer to our [documentation](https://docs.hemi.xyz).

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**

   Clone the repository to your local machine using Git:

   ```sh
   git clone https://github.com/hemilabs/web-pop-miner.git
   ```

   Alternatively, you can use the GitHub CLI:

   ```sh
   gh repo clone hemilabs/web-pop-miner
   ```

2. **Install Dependencies**

   Navigate into the project directory and install the necessary dependencies:

   ```sh
   npm install
   ```

3. **Start the Development Server**

   Launch the development server with the following command:

   ```sh
   npm run dev
   ```

   Once the server starts, open your browser and navigate to the URL provided in the terminal to access the application.

## Architecture

The project is built with React and Vite and follows a modular structure that leverages the conventions of these frameworks.

### Folder Structure

- **`kubernetes`**: Contains configuration files for deploying and managing the application on Kubernetes.
- **`public`**: Hosts static files that are directly served to the client.
- **`src/assets`**: Stores project assets, such as WebAssembly (wasm) files and other media.
- **`src/components`**: Houses reusable React components that form the building blocks of the UI.
- **`src/context`**: Provides React context implementations to manage and share global state across components.
- **`src/enums`**: Defines enumerations that standardize constant values used throughout the project.
- **`src/hooks`**: Contains custom React hooks that encapsulate and reuse state management and side-effect logic, improving code reuse and component simplicity.
- **`src/icons`**: Includes SVG icons wrapped as TSX components for consistent and scalable iconography.
- **`src/pages`**: Features Next.js page components that define the application’s routing and page structure.
- **`src/services`**: Implements modules that abstract API communication and encapsulate business logic, promoting a clear separation of concerns.
- **`src/styles`**: Contains global and modular styling files that define the visual presentation of the application.
- **`src/types`**: Hosts TypeScript type definitions to ensure type safety and improve developer experience.
- **`src/utils`**: Provides utility functions that offer common helper methods used across the project.
- **`test`**: Includes tests to validate the functionality and integrity of the application components and services.

## NPM Scripts

Below is a brief explanation of each script defined in the `package.json`:

- **build**:  
  Runs a sequence of commands to prepare the production build:

  1. Executes the `copy-popminer-wasm` script to copy the required WebAssembly file.
  2. Runs the TypeScript compiler (`tsc`) in type-check mode without emitting output.
  3. Builds the application using Vite (`vite build`).

- **copy-popminer-wasm**:  
  Creates the `./src/assets` directory (if it doesn't exist) and copies the `popminer.wasm` file from the `@hemilabs/pop-miner` package to `./src/assets/popminer.wasm`, ensuring the necessary file is available.

- **dev**:  
  Runs the `copy-popminer-wasm` script to ensure the WebAssembly file is present, then starts the Vite development server (`vite`).

- **format:check**:  
  Checks that the code adheres to the formatting rules defined by Prettier.

- **format:fix**:  
  Automatically fixes code formatting issues using Prettier.

- **lint**:  
  Runs ESLint to analyze the code for potential issues, utilizing caching to improve performance.

- **test**:  
  Executes the tests for the application using Vitest, ensuring that functionality works as expected.

- **tsc**:  
  Runs the TypeScript compiler in check mode (`--noEmit`), validating the project's type safety without generating output files.

- **preview**:  
  Starts Vite's preview server to locally view the production build.

- **prepare**:  
  Sets up Husky to manage Git hooks, ensuring that pre-commit or pre-push scripts run as configured.

## Testing

The project uses Vitest as the testing framework, which provides a simple and efficient way to write and run tests for React components and services.

### Writing Tests

To create tests for a component or service, add a new file with the `.test.tsx` extension in the `test` directory.

#### Test File Naming

Test file names should reflect the source file’s location and name. For example:

- For a component located in `src/components/Button.tsx`, name the test file `src.components.Button.test.tsx`.
- For a hook in `src/hooks/useBtcBalance.tsx`, name the test file `src.hooks.useBtcBalance.test.tsx`.
- For a hook within a nested directory such as `src/pages/explorer/_hooks/useBtcTransactions.tsx`, name the test file `src.pages.explorer._hooks.useBtcTransactions.test.tsx`.

This naming convention helps maintain a clear mapping between source files and their corresponding tests.

### Running Tests

To run the tests, execute the following command:

```sh
npm test
```

This command will run all the tests in the `test` directory and display the results in the terminal.

## Environment Variables

The following environment variables configure various aspects of the application:

- **VITE_HEMI_CONTRACT_ADDRESS**  
  The address of the PoP contract on the blockchain.  
  _Example:_ `0x4200000000000000000000000000000000000042`

- **VITE_HEMI_DISCORD_URL**  
  The URL to the Hemilabs Discord server.  
  _Example:_ `https://discord.gg/hemixyz`

- **VITE_HEMI_DOCS_URL**  
  The URL to the Hemilabs documentation.  
  _Example:_ `https://docs.hemi.xyz`

- **VITE_HEMI_EXPLORER_URL**  
  The URL to the Hemilabs blockchain explorer.  
  _Example:_ `https://testnet.explorer.hemi.xyz`

- **VITE_MIN_SATOSHIS**  
  The minimum number of satoshis required to mine a block.
  _Example:_ `200000`

- **VITE_PUBLIC_BITCOIN_NETWORK**  
  The Bitcoin network to use; valid values are `mainnet` or `testnet`.

- **VITE_PUBLIC_MEMPOOL_API_URL**  
  The URL of the mempool API to use.  
  _Example:_ `https://mempool.space/testnet`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
