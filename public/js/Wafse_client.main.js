Wafse_client.main = function(){
    'use strict';
    console.log(Wafse_client);
    Wafse_client.PageView.LoginAndCoreateAccount({userNameInput:'Wafse_client.main '}).render();
};

//////////////////////////////////////////////
//////////////////////////////////////////////

$(function(){
    'use strict';
    Wafse_client.main();
});