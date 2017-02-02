Wafse_client.main = function(){
    'use strict';
    console.log(Wafse_client);
    // todo: create data Manager;
    let data = {userNameInput:'Wafse_client.main '};    
    Wafse_client.PageView.LoginAndCoreateAccount(data).render();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});