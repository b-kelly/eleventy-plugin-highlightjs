const hljs = require("highlight.js");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function (options = {}) {
    return function (str, language) {
        if (!language) {
            // empty string means defer to the upstream escaping code built into markdown lib.
            return "";
        }

        let split = language.split("/");
        if (split.length) {
            language = split.shift();
        }

        let html;
        if (language === "text") {
            html = str;
        } else {
            html = hljs.highlight(str, { language }).value;
        }

        let hasHighlightNumbers = split.length > 0;
        let highlights = new HighlightLinesGroup(split.join("/"), "/");
        let lines = html.split(/\r?\n/).slice(0, -1); // The last line is empty.

        lines = lines.map(function (line, j) {
            if (options.alwaysWrapLineHighlights || hasHighlightNumbers) {
                let lineContent = highlights.getLineMarkup(j, line);
                return lineContent;
            }
            return line;
        });

        let classString = options.className ? " " + options.className : "";

        return `<pre class="language-${language}${classString}" tabindex="0"><code class="language-${language}${classString}">${lines.join(
            "<br>"
        )}</code></pre>`;
    };
};
