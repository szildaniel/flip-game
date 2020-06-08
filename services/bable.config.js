module.export = {
    presets: [
        "@bable/preset-env",
        {
            targets: {
                node: "current",
            },
        }
    ]
}