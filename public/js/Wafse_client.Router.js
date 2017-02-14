Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, questionForm, textPartNameList, textSelectMenu, textPageNameList, loginAndCoreateAccount, start,
        appBody, appNavigation, appDrawer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    questionForm = function (_postQuery) {
        let postQuery = _postQuery;
        
        history.pushState('#questionForm', 'questionForm', '#questionForm');
        appNavigation.showProgressSpinner();
    
        if (postQuery){
            appDataManager.setItem('PostQuery.Question', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPageNameList');
            if (postQuery === null) self['#textSelectMenu']();
        }
        
        $.ajax({
            type: 'POST',
            url : '/pageContents',
            data: postQuery,
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
        history.pushState('#textPageNameList', 'textPageNameList', '#textPageNameList');
        
        if (postQuery){
            appDataManager.setItem('PostQuery.TextPageNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPageNameList');
            if (postQuery === null) self['#textSelectMenu']();
        }
        
        $.ajax({
            type: 'POST',
            url : '/textPageNameList',
            data: postQuery,
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
        history.pushState('#textPartNameList', 'textPartNameList', '#textPartNameList');

        // If user accesses #textPartNameList from browser back button,
        // postQuery will be null.
        // In that situation, load postQuery from localStrage.
        if (postQuery){
            appDataManager.setItem('PostQuery.TextPartNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPartNameList');
            if (postQuery === null) self['#textSelectMenu']();
        }
        
        $.ajax({
            type: 'POST',
            url : '/textPartNameList',
            data: postQuery,
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
        history.pushState('#textSelectMenu', 'textSelectMenu', '#textSelectMenu');       
                
        $.ajax({
          url: '/textList',
          cache: false,
          success: function(textList){
              appNavigation.hiddenProgressSpinner();
              const textSelectMenuJqueryObj = Wafse_client.ComponentCreator.TextSelectMenu(appDataManager, self, textList)
              appBody.clearPage().appendRender(textSelectMenuJqueryObj.jQeryObj); 
          }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        const loginAndCoreateAccountForm = Wafse_client.ComponentCreator.LoginAndCoreateAccountForm(appNavigation, appDataManager, self);
        history.pushState('#login-and-create-account', 'login-and-create-account', '#login-and-create-account');
        appBody.clearPage().appendRender(loginAndCoreateAccountForm.jQeryObj);
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    start = function () {
        // console.log('location.hash: ' + location.hash);
        if(location.hash === '' || location.hash === null || location.hash === undefined){ 
            self['#login-and-create-account']();
        } else {
            try {
                self[location.hash]();
            } catch (e) {
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

        window.onbeforeunload = function () { appDataManager.save(); };
        
        $(window).on('popstate', function(event){
            try {
                self[event.originalEvent.state]();
            } catch (e) {
                console.log(e);
            }
        });
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {
             start:start, '#textSelectMenu':textSelectMenu, 
             '#login-and-create-account':loginAndCoreateAccount, '#textPartNameList':textPartNameList,
             '#textPageNameList':textPageNameList, '#questionForm':questionForm
    };
    return self;
};