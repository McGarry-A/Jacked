// eslint-disable-next-line no-undef
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    extensions: [
                        ".ios.js",
                        ".android.js",
                        ".ios.jsx",
                        ".android.jsx",
                        ".js",
                        ".jsx",
                        ".json",
                        ".ts",
                        ".tsx",
                    ],
                    root: ["."],
                    alias: {
                        "@Components": "./components",
                        "@Supabase": "./supabase",
                        "@Store": "./store",
                        "@Navigation": "./navigation",
                        "@Hooks": "./hooks",
                        "@Constants": "./constants",
                    },
                },
            ],
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
        ],
    };
};
