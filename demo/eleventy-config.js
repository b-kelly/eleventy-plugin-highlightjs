const syntaxHighlight = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
