
![The Daily Log logo](https://i.imgur.com/zcJZEqj.png)
# The Daily Log
The Daily Log is a journaling app by Evgeny Ivanitsky (me) developed with React Native for mobile phones. It has a newspaper-inspired design — entries are stored locally in SQLite and backed by a full Supabase backend with authentication and cloud sync.

The app was developed as a showcase — I wanted to make something that covered the full React Native development pipeline end to end. It includes authentication, local SQLite storage, cloud sync, animations, theming, and a full test suite.

![Main screen and entry editor](https://i.imgur.com/rc216LV.gif)
## Technologies used
- [**Expo**](https://expo.dev/) for the development environment and its ecosystem of libraries
- Written in [TypeScript](https://www.typescriptlang.org/)
- Automatic tests implemented with [Jest](https://jestjs.io/) and [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/)
- Routing done with [**react-navigation**](https://reactnavigation.org/)
- Authentication and cloud sync powered by [**Supabase**](https://supabase.com/)
- Local storage with [**expo-sqlite**](https://docs.expo.dev/versions/latest/sdk/sqlite/) as the primary data layer, backed by cloud sync
- State management with [**Redux Toolkit**](https://redux-toolkit.js.org/)
- Swipe-to-delete animation with [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/) and [**react-native-gesture-handler**](https://docs.swmansion.com/react-native-gesture-handler/)
- Adaptive styling with [**styled-components**](https://styled-components.com/) and [**react-native-size-matters**](https://www.npmjs.com/package/react-native-size-matters)
- Light and dark theming with [**styled-components**](https://styled-components.com/)


## Running locally

You'll need a Supabase project. You can create one for free at [supabase.com](https://supabase.com). The database schema requires an `entries` table — refer to the migration files in `src/services/db/` for the structure.

Once you have a project, create a `.env` file in the root with:

```
EXPO_PUBLIC_SUPABASE_URL=your_project_url_here
```

And a `.env.local` file with:

```
EXPO_PUBLIC_SUPABASE_KEY=your_anon_key_here
```

Then install dependencies and start the app:

```
npm install
npm start
```


## Local storage
Entries are stored locally with [**expo-sqlite**](https://docs.expo.dev/versions/latest/sdk/sqlite/), which means the app is fully functional without a network connection. All reads and writes go through a typed query layer built on top of the SQLite API.
![Entry list](https://i.imgur.com/zODp6S7.png)


## Cloud sync
Authentication and cloud sync are handled by [**Supabase**](https://supabase.com/). When a connection is available, local changes are pushed to a remote Supabase table. The sync state is tracked in Redux and shown in the header. Entries created or edited offline are queued with a pending action flag and synced when the connection is restored.
![Sync status](https://i.imgur.com/nL8MB9k.gif)


## Themes
Light and dark themes are realized with [**styled-components**](https://styled-components.com/). By default the app follows the system theme, but the user can also switch manually.
![Light and dark themes](https://i.imgur.com/GnRy989.png)


## Swipe to delete
Swipe-to-delete is implemented with [**react-native-reanimated**](https://docs.swmansion.com/react-native-reanimated/) and [**react-native-gesture-handler**](https://docs.swmansion.com/react-native-gesture-handler/).
![Swipe to delete](https://i.imgur.com/50XP40Z.gif)


## A couple more screenshots
![Swipe to delete](https://i.imgur.com/DIKKJsC.png)
