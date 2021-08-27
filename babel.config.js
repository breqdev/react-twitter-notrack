module.exports = function(api) {
    api.cache(true)

    return {
        presets: [ "@babel/preset-env", "@babel/preset-react" ],
        plugins: [ "macros", "babel-plugin-styled-components" ],
    }
}
