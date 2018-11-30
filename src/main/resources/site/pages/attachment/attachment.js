var libs = {
    content: require('/lib/xp/content'),
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf')
};

function handleGet(req) {
    var content = libs.portal.getContent();
    var config = libs.portal.getSiteConfig();

    var isEditOrPreview = (req.mode === 'edit' || req.mode === 'preview');
    var allowViewOnSite = (config && config.allowViewOnSite);

    if (!content.data.media) {
        return null;
    } else {
        var attachment = content.attachments[content.data.media.attachment];

        // Don't display Microsoft Word documents in Content Studio preview window, since Chrome/Firefox will download instead of view them
        // application/vnd.openxmlformats-officedocument.wordprocessingml.document
        if (isEditOrPreview && (attachment.mimeType.startsWith('application/msword') || attachment.mimeType.startsWith('application/vnd.'))) {
            return {
                body: '[Microsoft Office document. Preview not supported.]'
            };
        } else {
            var stream = libs.content.getAttachmentStream({
                key: content._id,
                name: attachment.name
            });

            if (!isEditOrPreview && !allowViewOnSite) {
                // Download attachment
                return {
                    body: stream,
                    contentType: attachment.mimeType,
                    headers: {
                        'Content-Disposition': 'attachment; filename="' + attachment.name + '"' // TODO: check if attachment.name is what's supposed to be written here
                    }
                }
            } else {
                // View attachment
                return {
                    body: stream,
                    contentType: attachment.mimeType
                }
            }
        }
    }
}

// Handle GET request
exports.get = handleGet;
