const linkMarkdownRegex = /(?:^|[^!])(?:\[([^\n\]]*)\])(?:\(([^\n\)]*)\))/gim;

// Process the markdown content and find all of the locations where there is an image markdown block
function parse(stringToParse) {
    let links = [];
    let m;

    while ((m = linkMarkdownRegex.exec(stringToParse)) !== null) {
        links.push(m);
    }

    return links;
}

// Figure out the start and end of the selection range for the src in the markdown, so we know what to replace
function getSrcRange(content, index) {
    let links = parse(content);
    let replacement = {href: {}, text: {}};

    if (index > -1) {
        replacement.href.start = content.indexOf('(', links[index].index) + 1;
        replacement.href.end = replacement.href.start + links[index][2].length;
        replacement.text.start = content.indexOf('[', links[index].index) + 1;
        replacement.text.end = replacement.text.start + links[index][1].length;

        return replacement;
    }

    return false;
}

export default {
    getSrcRange
};
