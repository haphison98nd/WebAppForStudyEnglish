Wafse_client.Router = function (_appBody, _appNavigation, _appDrawer, _appDataManager) {

    'use strict';
    
    let self, textPartNameList, textSelectMenu, textPageNameList, loginAndCoreateAccount, start,
        appBody, appNavigation, appDrawer, appDataManager
    ;

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textPageNameList = function (_postQuery) {
        
        let ajaxSuccessAction, 
            postQuery = _postQuery
        ;
        
        history.pushState('#textPageNameList', 'textPageNameList', '#textPageNameList');
        appNavigation.showProgressSpinner();

        ajaxSuccessAction = function (textPageNameList) {
            
            let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerMiddle', '節を選択', null),
                bootStrapTable = Wafse_client.ComponentCreator.BootStrapTable();
            
            bootStrapTable.appendThead(['節の名前', 'ステータス', 'クリア回数', '最短クリア時間']);
            
            for (let textPageName of textPageNameList){
                bootStrapTable.appendTbody([textPageName, '近日実装', '近日実装', '近日実装'], function(){
                    loginAndCoreateAccount();
                });
            }
            
            mainContainer.appendRender(bootStrapTable.jQeryObj);
            appBody.clearPage().appendRender(mainContainer.jQeryObj);
        };
        
        if (postQuery){
            appDataManager.setItem('PostQuery.TextPageNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPageNameList');
            if (postQuery === null) {
                self['#textSelectMenu']();
            }
        }
        
        $.ajax({
            type: 'POST',
            url : '/textPageNameList',
            data: postQuery,
            success: function (textPageNameList) {
                ajaxSuccessAction(textPageNameList);
                appNavigation.hiddenProgressSpinner();
            }
        });  
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textPartNameList = function (_postQuery) {
        
        let ajaxSuccessAction, 
            postQuery = _postQuery
        ;
        
        history.pushState('#textPartNameList', 'textPartNameList', '#textPartNameList');
        appNavigation.showProgressSpinner();
        
        ajaxSuccessAction = function (textPartNameList) {
            
            let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerMiddle', '章を選択', null),
                bootStrapTable = Wafse_client.ComponentCreator.BootStrapTable();
            
            bootStrapTable.appendThead(['章の名前', 'ステータス', '周回回数']);
            
            for (let textPartName of textPartNameList){
                bootStrapTable.appendTbody([textPartName, '近日実装', '近日実装'], function(){
                    textPageNameList({'titleText':postQuery.titleText, 'textPartName':textPartName});
                });
            }
            
            mainContainer.appendRender(bootStrapTable.jQeryObj);
            appBody.clearPage().appendRender(mainContainer.jQeryObj);
        };
          
        if (postQuery){
            appDataManager.setItem('PostQuery.TextPartNameList', postQuery);
        } else {
            postQuery = appDataManager.getItem('PostQuery.TextPartNameList');
            if (postQuery === null) {
                self['#textSelectMenu']();
            }
        }
        
        $.ajax({
            type: 'POST',
            url : '/textPartNameList',
            data: postQuery,
            success: function (textPartNameList) {
                ajaxSuccessAction(textPartNameList);
                appNavigation.hiddenProgressSpinner();
            }
        });        
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    textSelectMenu = function () {
        
        let ajaxSuccessAction, mdlCardButtonClickAction;

        history.pushState('#textSelectMenu', 'textSelectMenu', '#textSelectMenu');
                
        ajaxSuccessAction = function (textListJson) {
            let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerMiddle', 'テキストを選択');

            
            for (let titleText in textListJson){
                const isButtonClickable = titleText === 'To Be Announced' ? false : true;
                let mdlSquareCardOption = {
                        titleText:titleText,
                        supportingText:textListJson[titleText]['snippet'],
                        backGroundImageUrl:textListJson[titleText]['backGroundImageUrl'],
                        buttonClickAction:function(ss){ textPartNameList({'titleText':titleText}); },
                        isButtonClickable:isButtonClickable
                    },
                    mdlSquareCard = Wafse_client.ComponentCreator.MdlSquareCard(appDrawer, appNavigation, appDataManager, self, mdlSquareCardOption);
                mainContainerMiddle.appendRender(mdlSquareCard.jQeryObj);
            }

            appBody.clearPage().appendRender(mainContainerMiddle.jQeryObj); 
        };

        $.ajax({
          url: '/textList',
          cache: false,
          success: function(textList){
              ajaxSuccessAction(textList);
          }
        });
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    loginAndCoreateAccount = function () {
        let mainContainerSmall = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, self, 'mainContainerSmall', 'ようこそ'),
            loginAndCoreateAccountForm = Wafse_client.ComponentCreator.LoginAndCoreateAccountForm(appNavigation, appDataManager, self, mainContainerSmall)
        ;        

        history.pushState('#login-and-create-account', 'login-and-create-account', '#login-and-create-account');
        mainContainerSmall.appendRender(loginAndCoreateAccountForm.jQeryObj);
        appBody.clearPage().appendRender(mainContainerSmall.jQeryObj);
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

        window.onbeforeunload = function () {
            appDataManager.save();
        };
        
        $(window).on('popstate', function(event){
            console.log('event.originalEvent.state: ' + event.originalEvent.state);
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
             '#textPageNameList':textPageNameList
    };
    return self;
};