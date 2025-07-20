module.exports = (api) => {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@api": "./src/api",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@contexts": "./src/contexts",
            "@utils": "./src/utils",
            "@navigation": "./src/navigation",
            "@constants": "./src/constants",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  }
}
