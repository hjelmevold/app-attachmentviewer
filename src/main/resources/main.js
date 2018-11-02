//log.info('Application main.js for ' + app.name + ' started');

/*var libs = {
    content: require('/lib/xp/content'),
    context: require('/lib/xp/context'),
    data: require('/lib/enonic/util/data'),
    node: require('/lib/xp/node'),
    portal: require('/lib/xp/portal'),
    util: require('/lib/enonic/util')
};*/



function isThisApp(siteConfigApp) {
    return (siteConfigApp.applicationKey === app.name);
}

function hasAppOnSite(site) {
    var siteConfigApps = libs.data.forceArray(site.data.siteConfig); // husk å teste site uten innhold (nullverdi på installerte apps);
    //log.info('isAppOnSite siteConfigApps');
    //log.info(JSON.stringify(siteConfigApps, null, 4));
    return siteConfigApps.filter(isThisApp).length;
}

function hasAppPageController(pageController) {
    return (pageController.page.controller === 'com.enonic.app.attachmentviewer:attachment');
}

function hasAppTemplate(template) {
    return (template.page.controller === 'com.enonic.app.attachmentviewer:attachment');
}



/**
 * INIT
 */
function init() {
    var appSites = libs.content.query({
        contentTypes: ['portal:site'],
        count: 1000
    }).hits;//.filter(hasAppOnSite);
    log.info('appSites');
    log.info(JSON.stringify(appSites, null, 4));
    var appTemplates = libs.content.query({
        contentTypes: ['portal:page-template'],
        count: 1000//,
        //query: 'page.controller = "com.enonic.app.attachmentviewer:attachment"' <-- DOESN'T WORK. not indexed?
    }).hits;//.filter(isAppPageController);
    log.info('appTemplates');
    log.info(JSON.stringify(appTemplates, null, 4));
    var draftRepo = libs.node.connect({
        repoId: 'cms-repo',
        branch: 'draft',
        principals: ['role:system.admin']
    });
    log.info('draftRepo');
    log.info(JSON.stringify(draftRepo, null, 4));
    var masterRepo = libs.node.connect({
        repoId: 'cms-repo',
        branch: 'master',
        principals: ['role:system.admin']
    });
    log.info('masterRepo');
    log.info(JSON.stringify(masterRepo, null, 4));

    /*
    var nonInitedSites = [];
    appTemplates.forEach(function (template) {
        if (template._path)
    });
    */

    appSites.forEach(function (site) {
        // retrieve all page templates for this site
        var template = libs.content.getChildren({
            key: site._path + '/_templates/',
            count: 1000
        }).hits.filter(hasAppTemplate); // husk å teste når det bare er 1 page template på siten, om det da likevel er en array
        log.info('template');
        log.info(JSON.stringify(template, null, 4))
        if (!template.length) {
            log.info('No such template exists in cms-repo draft branch. Creating template…');
            draftRepo.create({
                _name: 'attachment-viewer',
                _parentPath: site._path + '/_templates/',
                displayName: 'Attachment Viewer',
                type: 'portal:page-template',
                createdTime: '2017-01-01T17:10:37.478Z',
                modifiedTime: '2017-01-01T17:10:37.478Z',
                hasChildren: false,
                valid: true,
                data: {
                    supports: 'media:document'
                },
                page: {
                    controller: 'com.enonic.app.attachmentviewer:attachment'
                }
            });
            masterRepo.create({
                _name: 'attachment-viewer',
                _parentPath: site._path + '/_templates/',
                displayName: 'Attachment Viewer',
                type: 'portal:page-template',
                createdTime: '2017-01-01T17:10:37.478Z',
                modifiedTime: '2017-01-01T17:10:37.478Z',
                hasChildren: false,
                valid: true,
                data: {
                    supports: 'media:document'
                },
                page: {
                    controller: 'com.enonic.app.attachmentviewer:attachment'
                }
            });
        } else {
            log.info('template already exists');
        }
    });

    log.info('init done');
}

//init();
