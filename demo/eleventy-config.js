const syntaxHighlight = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight, {
        className: "hljs",
    });

    eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
