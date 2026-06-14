require("react-native-gesture-handler/jestSetup");

beforeEach(() => jest.clearAllMocks());

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));

jest.mock("@/services/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    channel: jest.fn(() => ({ on: jest.fn(), subscribe: jest.fn() })),
  },
}));

jest.mock("expo-sqlite", () => ({
  openDatabaseAsync: jest.fn(),
  openDatabaseSync: jest.fn(() => ({})),
}));

// needed by @expo/vector-icons
jest.mock("expo-font", () => ({ isLoaded: jest.fn(), loadAsync: jest.fn() }));

// replaces async font-loading icon components with a sync stub to silence act() warnings
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const MockIcon = (props) => React.createElement(Text, props);
  return { Ionicons: MockIcon, FontAwesome: MockIcon };
});

// needed by react-native-reanimated
jest.mock("react-native-worklets", () =>
  require("react-native-worklets/lib/module/mock"),
);
require("react-native-reanimated").setUpTests();
