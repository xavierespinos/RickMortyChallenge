# Rick & Morty App

A React Native application built with Expo that displays episodes and characters from the Rick and Morty TV series using the [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- Browse episodes with infinite scroll pagination
- View character details for each episode
- Optimized with React Query for data caching
- Custom loading animations with Morty spinner

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Query** for data fetching and caching
- **React Navigation** for navigation
- **React Reanimated** for animations
- **i18next** for internationalization
- **Apisauce** for API client
- **ESLint** and **Prettier** for code quality

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd RickMortyChallenge
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   The `.env` file contains:
   ```
   EXPO_PUBLIC_API_BASE_URL=https://rickandmortyapi.com/api
   ```

## Running the App

### Development Server

Start the Expo development server:

```bash
yarn start
```

This will open the Expo DevTools in your browser where you can:

- Scan the QR code with Expo Go app on your phone
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Press `w` to open in web browser

### Platform-Specific Commands

#### iOS

```bash
yarn ios
```

#### Android

```bash
yarn android
```

#### Web

```bash
yarn web
```

## Available Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `yarn start`      | Start Expo development server |
| `yarn ios`        | Run on iOS simulator          |
| `yarn android`    | Run on Android emulator       |
| `yarn web`        | Run in web browser            |
| `yarn compile`    | Type-check with TypeScript    |
| `yarn lint`       | Run ESLint and fix issues     |
| `yarn lint:check` | Check linting without fixing  |
| `yarn test`       | Run Jest tests                |
| `yarn test:watch` | Run tests in watch mode       |

## Project Structure

```
app/
├── components/        # Reusable UI components
│   ├── atoms/         # Basic components (Text, Screen, etc.)
│   └── molecules/     # Composite components (EpisodeCard, etc.)
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization files
├── navigators/        # Navigation configuration
├── screens/           # Screen components
├── services/          # API services
├── theme/             # Theme configuration
└── utils/             # Utility functions
```

## API Integration

The app uses the Rick and Morty API to fetch:

- **Episodes**: Paginated list with infinite scroll
- **Characters**: Batch fetching for episode characters

All API calls are cached using React Query for optimal performance.

## Internationalization

The app supports multiple languages:

- English (default)
- Spanish
- French

Language files are located in `app/i18n/` and the app automatically detects the device language.

## Development

### Code Quality

The project uses:

- **ESLint** with strict rules
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Themed styling** instead of inline styles
