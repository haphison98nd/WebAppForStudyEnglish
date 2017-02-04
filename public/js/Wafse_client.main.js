Wafse_client.main = function(){

    'use strict';
    
    const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['LoginAndCoreateAccount']).load(),
          appBody = Wafse_client.Activator.Root.AppBody(appDataManager),
          router = Wafse_client.Router(appBody, appDataManager)
    ;
    
    // debug
    // console.log(Wafse_client);
    // const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['LoginAndCoreateAccount']).load();
    // appDataManager.print().setItem('LoginAndCoreateAccount.userName', '{ueda}').print().save();

    router.changePage('/login-and-coreate-account');
    // Wafse_client.Renderer.LoginAndCoreateAccount(appBody, appDataManager, router).renderAll();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});