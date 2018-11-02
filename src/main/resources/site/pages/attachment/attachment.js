var libs = {
    content: require('/lib/xp/content'),
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf')
};

function handleGet(req) {
    var content = libs.portal.getContent();

    if (!content.data.media) {
        return null;
    } else {
        var attachment = content.attachments[content.data.media.attachment];

        // Don't display Microsoft Word documents in Content Studio preview window, since Chrome/Firefox will download instead of view them
        // application/vnd.openxmlformats-officedocument.wordprocessingml.document
        if ((req.mode === 'edit' || req.mode === 'preview') && (attachment.mimeType.startsWith('application/msword') || attachment.mimeType.startsWith('application/vnd.'))) {
            return {
                body: '[Microsoft Office document. Preview not supported.]'
            };
        } else {
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
}

// Handle GET request
exports.get = handleGet;
