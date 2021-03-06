Wafse_client.main = function(){

    'use strict';
    
    const appDataManagerProtectedKeys = ['Config', 'PostQuery', 'Config.LoginAndCoreateAccount', 'Config.QuestionForm'],
          appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, appDataManagerProtectedKeys).load(true),
          appBody = Wafse_client.Activator.AppBody(appDataManager),
          appNavigation = Wafse_client.Activator.AppNavigation(appDataManager),
          appDrawer = Wafse_client.Activator.AppDrawer(appNavigation, appDataManager),
          appModal = Wafse_client.Activator.AppModal(appDataManager),
          router = Wafse_client.Router(appBody, appNavigation, appDrawer, appDataManager, appModal)
    ;
    
    let userAgent = Wafse_client.Util.UserAgentDetector();
    
    console.log(Wafse_client);
    
    ///*
    appNavigation.showProgressSpinner();
    setTimeout(function(){
        appNavigation.hiddenProgressSpinner();
        router.start();
    }, 1000);

    appDataManager.setItem('Config.userAgent', userAgent);
    if (userAgent !== 'chrome') {
        toastr.options = {'positionClass':'toast-bottom-right'};
        toastr.error('このアプリケーションは PC版 Google Chrome 専用です．他のブラウザでは音声認識/再生を利用できません．', '警告', {timeOut: 20000});
    }
    //*/
        
    // debug code Wafse_client.Util.SentenceTransformer
    // console.log(Wafse_client.Util.SentenceTransformer.transform("i'm he's you're can't wasn't that’s that’d would’ve might’ve"));

    // debug code of Wafse_client.ComponentCreator.BootStrapTable
    /*
    let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, null, 'mainContainerMiddle', 'test', null);
    let table = Wafse_client.ComponentCreator.BootStrapTable();
    table.appendThead(['test', 'aaa', 'bbb']).appendTbody(['test', 'aaa', 'bbb']);
    console.log(table.jQueryObj.html());
    mainContainer.appendRender(table.jQueryObj);
    appBody.appendRender(mainContainer.jQueryObj);
    */

    
    // debug code of Wafse_client.WebSpeechRecognizer
    /*
    Wafse_client.Util.WebSpeechRecognizer.startRec(function(result){
        console.log(result);
        console.log(result.toLowerCase().split(' ').join(''));
        Wafse_client.Util.WebSpeechRecognizer.stopRec();
    });
    */
    
    
    // debug code of Web Speech Synthes API
    /*
    setTimeout(function(){
        Wafse_client.Util.WebSpeechSynthes.speechTextInEnglish('Did you make her clean your room?');
        // Wafse_client.Util.WebSpeechSynthes.speechTextInJapanese('あなたは彼女に部屋の掃除をさせましたか?');
    }, 500);
    */
    

    // debug code of Wafse_client.appDataManager
    /*
    appDataManager.print()
    setTimeout(function () {
         appDataManager.setItem('Config.LoginAndCoreateAccount.test.gsr', {testKey:10}).print()
    }, 3000);
    */
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});