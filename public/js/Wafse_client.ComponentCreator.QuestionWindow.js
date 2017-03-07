Wafse_client.ComponentCreator.QuestionWindow = function(_appDataManager, _router, _pageContents, _postQuery, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        qCount = 0,
        self,
        appDataManager, router, pageContents, postQuery, callback
    ;
        
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        mainContainerMiddle.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function updateQuestionForm () {
        // array pageContents.JPN and pageContents.ENG are same length so we just check pageContents.JPN length.
        if (qCount < pageContents.JPN.length){
            const isFinalQ = qCount === (pageContents.JPN.length - 1) ? true : false,
                  questionForm = Wafse_client.ComponentCreator.QuestionForm(appDataManager, router, self, pageContents.JPN[qCount], pageContents.ENG[qCount], isFinalQ)
            ;
            mainContainerMiddle.appendRender(questionForm.jQueryObj);
            mainContainerMiddle.setNavigator([
                ['#text-select-menu', 'ホーム'],
                ['#text-part-name-list', postQuery.titleText], 
                ['#text-page-name-list', postQuery.textPartName],
                ['#text-page-name-list', postQuery.textPageName + ' (' + String(qCount + 1) + '/' + String(pageContents.JPN.length) + ')']]
            );
            console.log(questionForm);
            qCount++;
        } else {
            router['#text-page-name-list']();
        }
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        appDataManager = _appDataManager;
        router = _router;
        pageContents = _pageContents;
        postQuery = _postQuery;
        callback = _callback;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQueryObj:mainContainerMiddle.jQueryObj, remove:remove, updateQuestionForm:updateQuestionForm};
    return self;
};