 // config-overrides.js
 module.exports = function override(config, env) {
    if (env === "production") {
            config.output.filename = 'modal.js'; // Set your static name here
            config.output.chunkFilename = 'modal.js'; // Optional: if you have code splitting
    }
    return config;
};
