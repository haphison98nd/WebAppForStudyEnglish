Wafse_client.main = function(){

    'use strict';
    
    const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['View', 'LoginAndCoreateAccount', 'PostQuery', 'Config']).load(true),
          appBody = Wafse_client.Activator.AppBody(appDataManager),
          appNavigation = Wafse_client.Activator.AppNavigation(appDataManager),
          appDrawer = Wafse_client.Activator.AppDrawer(appNavigation, appDataManager),
          router = Wafse_client.Router(appBody, appNavigation, appDrawer, appDataManager)
    ;
    
    // /*
    console.log(Wafse_client);
    if (Wafse_client.Util.UserAgentDetector() === 'chrome'){
        appNavigation.showProgressSpinner();
        setTimeout(function(){
            appNavigation.hiddenProgressSpinner();
            router.start();
        }, 2000);
    } else {
        toastr.error('このアプリケーションは Google Chrome 専用です．', 'エラー');
    }
    // */
    
    // debug code of Wafse_client.ComponentCreator.QuestionForm
    /*
    const timer = Wafse_client.Util.Timer(),
          timeLimit = appDataManager.getItem('Config.QuestionForm.timeLimit')
    ;
    timer.start(timeLimit, function(progressTime, remainTime){
        questionForm.setProgressBarValue(((timeLimit - progressTime) / timeLimit) * 100, parseInt(remainTime, 10) + 1);
    }, function(){ console.log('timer finished.');});
    */
    /*
    $.ajax({
        type: 'GET',
        url : '/pageContents',
        data: {'titleText':'どんどん話すための瞬間英作文トレーニング', 'textPageName':'人称代名詞の独立所有格'},
        cache: false,
        success: function (pageContents) {
            const questionForm = Wafse_client.ComponentCreator.QuestionForm(appDataManager, router, pageContents.ENG[0], pageContents.JPN[0]);
            appBody.appendRender(questionForm.jQeryObj);
        }
    });
    */
    
    
    // debug code of Wafse_client.ComponentCreator.BootStrapTable
    /*
    let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, null, 'mainContainerMiddle', 'test', null);
    let table = Wafse_client.ComponentCreator.BootStrapTable();
    table.appendThead(['test', 'aaa', 'bbb']).appendTbody(['test', 'aaa', 'bbb']);
    console.log(table.jQeryObj.html());
    mainContainer.appendRender(table.jQeryObj);
    appBody.appendRender(mainContainer.jQeryObj);
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
    // appDataManager.print().setItem('View.LoginAndCoreateAccount.userName', '{ueda}').print().save();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});