Wafse_client.ComponentCreator.QuestionWindow = function(_appDataManager, _router, _pageContents, _postQuery, _callback){
    
    'use strict';
    
    let mainContainerMiddle = Wafse_client.ComponentCreator.MainContainer('mainContainerMiddle'),
        questionCount = 0,
        self, conbineComponents, remove, updateQuestionForm,
        appDataManager, router, pageContents, postQuery, callback
    ;
        
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    remove = function () {
        mainContainerMiddle.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    updateQuestionForm = function (){
        // array pageContents.JPN and pageContents.ENG are same length so we just check pageContents.JPN length.
        if (questionCount < pageContents.JPN.length){
            const questionForm = Wafse_client.ComponentCreator.QuestionForm(appDataManager, router, self, pageContents.JPN[questionCount], pageContents.ENG[questionCount]);
            if (questionCount === (pageContents.JPN.length - 1)) questionForm.setNextProblemBtnText('終了');
            mainContainerMiddle.appendRender(questionForm.jQeryObj);
            mainContainerMiddle.setNavigator([
                ['#text-select-menu', postQuery.titleText],
                ['#text-part-name-list', postQuery.textPartName], 
                ['#text-page-name-list', postQuery.textPageName + ' (' + String(questionCount + 1) + '/' + String(pageContents.JPN.length) + ')']]
            );
            questionCount++;
        } else {
            router['#text-page-name-list']();
        }
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        appDataManager = _appDataManager;
        router = _router;
        pageContents = _pageContents;
        postQuery = _postQuery;
        callback = _callback;        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:mainContainerMiddle.jQeryObj, remove:remove, updateQuestionForm:updateQuestionForm};
    return self;
};