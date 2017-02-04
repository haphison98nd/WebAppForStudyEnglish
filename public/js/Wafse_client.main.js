Wafse_client.main = function(){

    'use strict';
    
    const appDataManager = Wafse_client.JsonLocalStrageManager('appData', Wafse_client.appDataTemplate, ['LoginAndCoreateAccount']).load(),
          appBody = Wafse_client.Activator.Root.AppBody(appDataManager)
    ;
    
    console.log(Wafse_client);
    
    // TODO: make Wafse_client.HtmlTemplateRenderer instance.
    
    // debug code JsonLocalStrageManager.
    // appDataManager.print().setItem('LoginAndCoreateAccount.userName', '{ueda}').print().save();
    
    Wafse_client.Renderer.LoginAndCoreateAccount(appBody, appDataManager).renderAll();
    
    $(window).on('beforeunload', function(e) {
        appDataManager.save();
        return '';
    });
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});