# Trail

Trail is an Expo, React Native and TypeScript app foundation for exploring places and activities in your city. It runs on local mock data and does not need a Supabase project or credentials.

## Project structure

```text
app/                    Expo Router tabs and place-detail routes
components/ui/           Shared cards, chips, buttons, headers and states
constants/               Design tokens and editable discovery categories
features/                 Explore, search, saved, profile and place screens
features/places/data/     Local mock places and experience notes
services/                 Mock search/data access and optional Supabase client
store/                    Persisted city, bookmarks and recent places
types/                    Shared TypeScript domain types
assets/images/places/     Bundled illustrative place photos
```

## Start the app

Install a current Node.js LTS release, then from the project directory:

```sh
npm install
npm start
```

The development server shows a QR code and shortcuts for available emulators.

### Android emulator

Install Android Studio and an Android Virtual Device, start the emulator, then run:

```sh
npm run android
```

You can also start the server with `npm start` and press `a`.

### iOS simulator

The iOS simulator requires macOS and Xcode. On a Mac with Xcode installed:

```sh
npm run ios
```

On Windows, use an iPhone with Expo Go or develop against Android; this project does not create separate native codebases.

### Physical phone with Expo Go

Install Expo Go on the phone and run `npm start` with the computer and phone on the same approved local network. Scan the QR code. If local discovery is blocked, use a network configuration approved by your IT policy rather than bypassing those controls.

Expo Go support depends on the Expo Go app matching this project’s Expo SDK. If a compatible Expo Go build is unavailable, use an Expo development build instead.

## Features

- Explore places by city and configurable category, with bundled image-led cards.
- Search the local mock dataset by name, category, neighbourhood, address or description.
- Save and remove places; bookmarks, city and recent places persist with AsyncStorage.
- Open place details, review mock experience notes and hand off to a maps app.
- Browse a local preview profile and clear recent-place history.

## Backend configuration

Copy `.env.example` to `.env` and add a Supabase project URL and anon key only when backend work begins. The app does not connect to Supabase when either value is missing. Do not put service-role keys or other secrets in `EXPO_PUBLIC_` variables.

## Checks

```sh
npm run typecheck
npx expo export --platform android --platform ios
```
