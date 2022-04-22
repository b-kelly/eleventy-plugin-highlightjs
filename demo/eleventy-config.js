const syntaxHighlight = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight, {
        className: "hljs",
        preAttributes: {
            tabindex: "0",
        },
        codeAttributes: {
            "data-foo": "bar",
        },
    });

    eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
