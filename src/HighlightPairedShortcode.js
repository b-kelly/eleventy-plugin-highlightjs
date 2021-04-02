const hljs = require("highlight.js");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function (content, language, highlightNumbers, options = {}) {
    let highlightedContent;
    if (language === "text") {
        highlightedContent = content.trim();
    } else {
        highlightedContent = hljs.highlight(content.trim(), { language }).value;
    }

    let group = new HighlightLinesGroup(highlightNumbers);
    let lines = highlightedContent.split(/\r?\n/);
    lines = lines.map(function (line, j) {
        if (options.alwaysWrapLineHighlights || highlightNumbers) {
            let lineContent = group.getLineMarkup(j, line);
            return lineContent;
        }
        return line;
    });

    let classString = options.className ? " " + options.className : "";

    return (
        `<pre class="language-${language}${classString}"><code class="language-${language}${classString}">` +
        lines.join("<br>") +
        "</code></pre>"
    );
};
