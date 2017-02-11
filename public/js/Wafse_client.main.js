Wafse_client.main = function(){

    'use strict';
    
    const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['View', 'LoginAndCoreateAccount']).load(false),
          appBody = Wafse_client.Activator.AppBody(appDataManager),
          appNavigation = Wafse_client.Activator.AppNavigation(appDataManager),
          appDrawer = Wafse_client.Activator.AppDrawer(appNavigation, appDataManager),
          router = Wafse_client.Router(appBody, appNavigation, appDrawer, appDataManager)
    ;

    console.log(Wafse_client);
    router.start();
    

    // debug code of Wafse_client.Util.Timer
    /*
    const remainCallback = function (remainSec) {
        console.log('remainSec ' + remainSec);
    };  
    const progressCallback = function (progressSec) {
        console.log('progressSec ' + progressSec);
    };
    const finishCallback = function () {
        console.log('Finish');
    };
    const timer = Wafse_client.Util.Timer();
    timer.start(5, remainCallback, progressCallback, finishCallback);
    setTimeout(timer.stop, 4000);
    */

    
    // debug code of Wafse_client.ComponentCreator.MainContainer
    // let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, null, 'mainContainerMiddle', 'be動詞', null);
    // appBody.appendRender(mainContainer.jQeryObj);

    
    // debug code of Wafse_client.ComponentCreator.BootStrapTable
    /*
    let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, null, 'mainContainerMiddle', 'test', null);
    let table = Wafse_client.ComponentCreator.BootStrapTable();
    table.appendThead(['test', 'aaa', 'bbb']).appendTbody(['test', 'aaa', 'bbb']);
    console.log(table.jQeryObj.html());
    mainContainer.appendRender(table.jQeryObj);
    appBody.appendRender(mainContainer.jQeryObj);
    */
    
    
    // debug code of Wafse_client.appDataManager
    // appDataManager.print().setItem('View.LoginAndCoreateAccount.userName', '{ueda}').print().save();
    
    
    // Test code of Web Synthes API
    /* 
    const synthes = new SpeechSynthesisUtterance();
    synthes.text = 'Is this a pen?';
    synthes.lang = 'en-US';
    speechSynthesis.voice = 'Google US English'
    speechSynthesis.speak(synthes);
    */
    
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});