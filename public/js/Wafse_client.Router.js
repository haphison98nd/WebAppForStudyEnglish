Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, isUrlIncldesQuery, parseUrlPath, parseUrlQuery, 
        questionForm, textPartNameList, textSelectMenu, textPageNameList, loginAndCoreateAccount, root, start,
        appBody, appNavigation, appDrawer, appDataManager
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    questionForm = function (_postQuery) {
        let postQuery = _postQuery;

        appNavigation.showProgressSpinner();
    
        if (postQuery) {
            appDataManager.setItem('PostQuery.Question', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPageNameList');
            if (postQuery === null) textSelectMenu();
        }
        
        $.ajax({
            type: 'GET',
            url : '/pageContents',
            data: postQuery,
            cache: false,
            success: function (pageContents) {
                appNavigation.hiddenProgressSpinner();
                appDataManager.setItem('View.QuestionForm.now.pageContents', pageContents);
                console.log(appDataManager.getItem('View.QuestionForm.now.pageContents'));
            }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textPageNameList = function (_postQuery) {
        let postQuery = _postQuery;
        appNavigation.showProgressSpinner();
        if (postQuery) {
            appDataManager.setItem('PostQuery.TextPageNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPageNameList');
            if (postQuery === null) textSelectMenu();
        }
        $.ajax({
            type: 'GET',
            url : '/textPageNameList',
            data: postQuery,
            cache: false,
            success: function (textPageNameList) {
                appNavigation.hiddenProgressSpinner();
                const textPageNameListJqueryObj = Wafse_client.ComponentCreator.TextPageNameList(appDataManager, self, textPageNameList, postQuery);
                appBody.clearPage().appendRender(textPageNameListJqueryObj.jQeryObj); 
            }
        });  
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textPartNameList = function (_postQuery) { 
        let postQuery = _postQuery;
        appNavigation.showProgressSpinner();
        // If user accesses /textPartNameList from browser back button,
        // postQuery will be null.
        // In that situation, load postQuery from localStrage.
        if (postQuery){
            appDataManager.setItem('PostQuery.TextPartNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPartNameList');
            if (postQuery === null) textSelectMenu();
        }        
        $.ajax({
            type: 'GET',
            url : '/textPartNameList',
            data: postQuery,
            cache: false,
            success: function (textPartNameList) {
                appNavigation.hiddenProgressSpinner();
                const textPartNameListJqueryObj = Wafse_client.ComponentCreator.TextPartNameList(appDataManager, self, textPartNameList, postQuery);
                appBody.clearPage().appendRender(textPartNameListJqueryObj.jQeryObj);
            }
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textSelectMenu = function () {        
        appNavigation.showProgressSpinner();
        $.ajax({
            type: 'GET',
            url: '/textList',
            cache: false,
            success: function(textList){
                appNavigation.hiddenProgressSpinner();
                const textSelectMenuJqueryObj = Wafse_client.ComponentCreator.TextSelectMenu(appDataManager, self, textList);
                appBody.clearPage().appendRender(textSelectMenuJqueryObj.jQeryObj); 
            }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        history.replaceState(null, null, '#login-and-create-account');
        const loginAndCoreateAccountForm = Wafse_client.ComponentCreator.LoginAndCoreateAccountForm(appNavigation, appDataManager, self);
        appBody.clearPage().appendRender(loginAndCoreateAccountForm.jQeryObj);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    root = function () {
        loginAndCoreateAccount();
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // private.
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { boolean }
    isUrlIncldesQuery = function (url) {        
        return url.indexOf('?') !== -1 ? true : false; 
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { String }: url path.
    parseUrlPath = function(url){
        return isUrlIncldesQuery(url) ? url.split('?')[0] : url;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private.
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { Object / Boolean }: return object (ex: {q1: 'aaa', q2: 'bbb'}) if url include query.
    parseUrlQuery = function (url) { 
        if (isUrlIncldesQuery(url)) {
            let queryList = url.split('?')[1].split('&'),
                queryObj = {}
            ;
            for (let query of queryList) {
                let parsedQuery = query.split('=');
                queryObj[String(parsedQuery[0])] = parsedQuery[1];
            }
            return queryObj;
        } else {
            return false;
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    start = function () {
        
        window.onbeforeunload = function () { appDataManager.save(); };
        
        $(window).on('popstate', function(e){
            // we should try-catch here, because user may acsess 403 page.
            // ex: self[parseUrlPath('#unknown-hash')]();
            try {
                if(location.hash !== '#login-and-create-account') self[parseUrlPath(location.hash)]();
            } catch (e) {
                console.log(e);
            }
        });
        
        if(location.hash === '' ){
            root();
        } else {
            // we should try-catch here, because user may acsess 403 page.
            // ex: self[parseUrlPath('#unknown-hash')]();
            try {
                self[parseUrlPath(location.hash)]();
            } catch (e) {
                root();
                console.log(e);
            }
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        appDataManager = _appDataManager;
        appBody = _appBody;
        appNavigation = _appNavigation;
        appDrawer = _appDrawer;
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {
             start:start, '#root':root, '#text-select-menu':textSelectMenu, 
             '#login-and-create-account':loginAndCoreateAccount, '#text-part-name-list':textPartNameList,
             '#text-page-name-list':textPageNameList, '#question-form':questionForm
    };
    return self;
};