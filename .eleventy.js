// import hljs and all languges
const hljs = require("highlight.js");
const LiquidHighlightTag = require("./src/LiquidHighlightTag");
const HighlightPairedShortcode = require("./src/HighlightPairedShortcode");
const markdownPrismJs = require("./src/markdownSyntaxHighlightOptions");

function hasTemplateFormat(templateFormats = ["*"], format = false) {
    if (!Array.isArray(templateFormats)) {
        templateFormats = [templateFormats];
    }

    if (Array.isArray(templateFormats)) {
        if (
            templateFormats.indexOf("*") > -1 ||
            templateFormats.indexOf(format) > -1
        ) {
            return true;
        }
    }

    return false;
}

module.exports = {
    initArguments: { hljs },
    configFunction: function (eleventyConfig, options = {}) {
        options = Object.assign(
            { alwaysWrapLineHighlights: false, className: "" },
            options
        );

        // A universal filter for all
        // {{ some_variable | highlight: "html 0 2-3" }}
        eleventyConfig.addFilter("highlight", (content, arguments) => {
            const [language, ...highlightNumbers] = arguments.split(" ");

            return HighlightPairedShortcode(
                content,
                language,
                highlightNumbers.join(" "),
                options,
            );
        });

        if (hasTemplateFormat(options.templateFormats, "liquid")) {
            eleventyConfig.addLiquidTag("highlight", (liquidEngine) => {
                // {% highlight js 0 2 %}
                let highlight = new LiquidHighlightTag(liquidEngine);
                return highlight.getObject(options);
            });
        }

        if (hasTemplateFormat(options.templateFormats, "njk")) {
            eleventyConfig.addPairedNunjucksShortcode(
                "highlight",
                (content, args) => {
                    // {% highlight "js 0 2-3" %}
                    let [language, ...highlightNumbers] = args.split(" ");
                    return HighlightPairedShortcode(
                        content,
                        language,
                        highlightNumbers.join(" "),
                        options
                    );
                }
            );
        }

        if (hasTemplateFormat(options.templateFormats, "md")) {
            eleventyConfig.addMarkdownHighlighter(markdownPrismJs(options));
        }
    },
};
