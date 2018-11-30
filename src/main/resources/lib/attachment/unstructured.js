var libs = {
    portal: require('/lib/xp/portal')
};

function handleGet(request) {
    var content = libs.portal.getContent();

    // View unstructured content as JSON in plain text
    if (content && content.type === 'base:unstructured') {
        return {
            body: JSON.stringify(content, null, 4),
            contentType: 'text/plain; charset=utf-8'
        }
    }
}

exports.get = handleGet;
