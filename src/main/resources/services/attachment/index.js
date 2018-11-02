var libs = {
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content')
};

function handleGet(req) {
    var content = libs.portal.getContent();

    if (!content.data.media) {
        return null;
    } else {
        var attachment = content.attachments[content.data.media.attachment];
        var stream = libs.content.getAttachmentStream({
            key: content._id,
            name: attachment.name
        });

        return {
            body: stream,
            contentType: attachment.mimeType
        }
    }
}

// Handle GET request
exports.get = handleGet;
