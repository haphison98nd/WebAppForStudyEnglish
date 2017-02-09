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

    /*
    // debug
    let mainContainer = Wafse_client.ComponentCreator.MainContainer(appDrawer, appNavigation, appDataManager, null, 'mainContainerMiddle', 'test', null);
    let table = Wafse_client.ComponentCreator.BootStrapTable();
    table.appendThead(['test', 'aaa', 'bbb']).appendTbody(['test', 'aaa', 'bbb']);
    console.log(table.jQeryObj.html());
    mainContainer.appendRender(table.jQeryObj);
    appBody.appendRender(mainContainer.jQeryObj);
    */
    
    // debug
    // appDataManager.print().setItem('View.LoginAndCoreateAccount.userName', '{ueda}').print().save();
    
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