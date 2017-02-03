Wafse_client.main = function(){
    'use strict';
    const appDataManager = Wafse_client.AppDataManager();        
    console.log(Wafse_client);
    
    // TODO: make Wafse_client.HtmlTemplateRenderer instance.
    
    // debug of appDataManager.
    // appDataManager.load(false).setItem('LoginAndCoreateAccount.userName', 'ueda').print().save();
    
    Wafse_client.PageView.LoginAndCoreateAccount().renderAll();
    
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