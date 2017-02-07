Wafse_client.main = function(){

    'use strict';
    
    const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['LoginAndCoreateAccount']).load(false),
          appBody = Wafse_client.Activator.AppBody(appDataManager),
          appNavigation = Wafse_client.Activator.AppNavigation(appDataManager),
          appDrawer = Wafse_client.Activator.AppDrawer(appNavigation, appDataManager),
          router = Wafse_client.Router(appBody, appNavigation, appDrawer, appDataManager)
    ;

    console.log(Wafse_client);
    router.start();
    
    // debug
    // appDataManager.print().setItem('LoginAndCoreateAccount.userName', '{ueda}').print().save();
    
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