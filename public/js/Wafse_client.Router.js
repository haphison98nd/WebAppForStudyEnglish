Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager, _appModal) {

    'use strict';
    
    let self, 
        isAuthorized = false,
        appBody, appNavigation, appDrawer, appDataManager, appModal
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    function authorize (callback) {
        if(isAuthorized){
            callback(true);
        } else {
            const userName = appDataManager.getItem('Config.LoginAndCoreateAccount.userName'),
                  userPassWord = appDataManager.getItem('Config.LoginAndCoreateAccount.userPassWord')
            ;        
            if (!userName || !userPassWord) {
                callback(false);
                return 0;
            }
            appNavigation.showProgressSpinner();
            $.ajax({
                type: 'POST',
                url : '/authorize',
                data: {'userName':String(userName), 'userPassWord':String(userPassWord)},
                success: function(authorizationResult){
                    appNavigation.hiddenProgressSpinner();
                    if (authorizationResult.status === 'success') {
                        authorized();
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            });
        }
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function readMe () {
        authorize(function (result) {
            appNavigation.showProgressSpinner();
            if (result) {
                $.ajax({
                    type: 'GET',
                    url : '/markDown',
                    data: {markDownFileName:'README.md'},
                    cache: false,
                    success: function(readMeMarkDown){
                        appNavigation.hiddenProgressSpinner();
                        appModal.setModalTitle('README.md').appendRender(marked(readMeMarkDown)).showModal();
                        // if use markDownWindow to show README.md
                        /*
                        const markDownWindow = Wafse_client.ComponentCreator.MarkDownWindow('README.md', readMeMarkDown);
                        appBody.clearPage().appendRender(markDownWindow.jQueryObj);
                        history.pushState(null, null, '#read-me');
                        */
                    }
                });
            } else {
                loginAndCoreateAccount();
            }
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    function questionForm (postQuery) {
        authorize(function (result) {
            if (result) {
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
                        appDataManager.setItem('Config.QuestionForm.now.pageContents', pageContents);
                        const questionWindow = Wafse_client.ComponentCreator.QuestionWindow(appDataManager, self, pageContents, postQuery);
                        questionWindow.updateQuestionForm();
                        appBody.clearPage().appendRender(questionWindow.jQueryObj).scrollTo(0);;
                    }
                });               
            } else {
                loginAndCoreateAccount();
            }
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function textPageNameList (postQuery) {
        authorize(function (result) {
            if (result) {
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
                        appBody.clearPage().appendRender(textPageNameListJqueryObj.jQueryObj).scrollTo(0); 
                    }
                });                
            } else {
                loginAndCoreateAccount();
            }
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function textPartNameList (postQuery) {     
        authorize(function (result) {
            if (result) {
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
                        appBody.clearPage().appendRender(textPartNameListJqueryObj.jQueryObj).scrollTo(0);
                    }
                });            
            } else {
                loginAndCoreateAccount();
            }
        });
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function textSelectMenu () {        
        authorize(function (result) {
            if (result) {
                appNavigation.showProgressSpinner();
                $.ajax({
                    type: 'GET',
                    url: '/textList',
                    cache: false,
                    success: function(textList){
                        appNavigation.hiddenProgressSpinner();
                        const textSelectMenuJqueryObj = Wafse_client.ComponentCreator.TextSelectMenu(appDataManager, self, textList);
                        appBody.clearPage().appendRender(textSelectMenuJqueryObj.jQueryObj).scrollTo(0);
                    }
                }); 
            } else {
                loginAndCoreateAccount();
            }
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // this metho called from LoginAndCreateAccount
    // public
    function authorized () {
        isAuthorized = true;
        appNavigation.deleteButtons();
        appNavigation.addButton('danger', 'ログアウト' ,function(){ logout(); });
        appNavigation.addButton('success', 'README.md' ,function(){ 
            readMe(); 
        });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function logout () {
        isAuthorized = false;
        appDrawer.hiddenDrawerButton().clearPage();
        appDataManager.setItem('Config.LoginAndCoreateAccount.userName', '');
        appDataManager.setItem('Config.LoginAndCoreateAccount.userPassWord', '');
        loginAndCoreateAccount();
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function loginAndCoreateAccount () {
        history.replaceState(null, null, '#login-and-create-account');
        appNavigation.deleteButtons();
        const loginAndCoreateAccountForm = Wafse_client.ComponentCreator.LoginAndCoreateAccountForm(appNavigation, appDataManager, self);
        appBody.clearPage().appendRender(loginAndCoreateAccountForm.jQueryObj);
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private.
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { boolean }
    function isUrlIncldesQuery (url) {        
        return url.indexOf('?') !== -1 ? true : false; 
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { String }: url path.
    function parseUrlPath (url) {
        return isUrlIncldesQuery(url) ? url.split('?')[0] : url;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // private.
    // @param { String } url: url include query. ex: '/path-name1/path-name2?q1=aaa&q2=bbb'
    // @ return { Object / Boolean }: return object (ex: {q1: 'aaa', q2: 'bbb'}) if url include query.
    function parseUrlQuery (url) { 
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
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    function start () {
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
            loginAndCoreateAccount();
        } else {
            // we should try-catch here, because user may acsess 403 page.
            // ex: self[parseUrlPath('#unknown-hash')]();
            try {
                self[parseUrlPath(location.hash)]();
            } catch (e) {
                loginAndCoreateAccount();
                console.log(e);
            }
        }
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        appDataManager = _appDataManager;
        appBody = _appBody;
        appNavigation = _appNavigation;
        appDrawer = _appDrawer;
        appModal = _appModal;
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {
        start:start, logout:logout, authorized:authorized,
        '#text-select-menu':textSelectMenu, 
        '#login-and-create-account':loginAndCoreateAccount, '#text-part-name-list':textPartNameList,
        '#text-page-name-list':textPageNameList, '#question-form':questionForm, '#read-me':readMe
    };
    return self;
};