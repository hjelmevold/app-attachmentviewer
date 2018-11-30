# Attachment Viewer app for Enonic XP

This [Enonic XP](https://github.com/enonic/xp) application extends the amount of file types that can be viewed directly in the browser, both in the preview window in Content Studio and even on a site, if enabled. This includes the following file types:

* Audio files
* Documents and PDFs (1)
* Plain text files
* Unstructured files (JSON data with content type 'base:unstructured')
* Video files

(1) Also Microsoft Office files, but those won't show in preview mode (only on a site, if enabled) and are only supported in Internet Explorer

## Installation

Go into the Enonic XP Application admin tool and install the app from the [Enonic Market](https://market.enonic.com/).

The **Attachment viewer** app will then be available to add to your websites through the Content Studio admin tool in Enonic XP. Edit your site content to add this app. Remember to save the site after you've configured the app.

## How to use this app

After adding this app to any site inside your Enonic XP environment, all supported attachments are shown inside Content Studio right away. However, you may also enable viewing attachments on the site that the app has been added to.

### App settings

**"Allow viewing on site"**  
If enabled, links of type "content" can be used to view attachments in the browser instead of downloading them. Example: Inside an HTML area, you can add dynamic links. Without this app, the only way to add a link to a PDF would be by using the "Attachment" option, which would cause the user to download the PDF when following the link. With this app and with this setting enabled, you may also successfully choose to add a link using the "Content" option.  This will cause the user to view the PDF in the browser when following the link, provided that the browser supports this.

All modern browsers support viewing PDFs directly, it's mostly older versions of Internet Explorer (IE 8 or 9 in Compatibility Mode and earlier versions) that will download the file instead. On the flip side, Internet Explorer supports viewing Office Documents direcly in the browser, but all other browsers will download those files instead.

The Content Studio in Enonic XP does not support Internet Explorer, so Office Documents can't be shown inside the Content Studio preview window.

## Releases and Compatibility

| App version | XP version |
| ------------- | ------------- |
| 2.0.0 | 6.13.0 |
| 1.0.0 | 6.15.4 |

## Changelog

### Version 2.0.0

* Added support for viewing the 'base:unstructured' content type, shown as plain text with indentation
* Removed the included page template in favor of using automatic controller mappings (Old page tempaltes using this app will no longer work)

### Version 1.0.0

* Initial release
