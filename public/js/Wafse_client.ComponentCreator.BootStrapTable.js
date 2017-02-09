Wafse_client.ComponentCreator.BootStrapTable = function(){
    
    'use strict';
    
    const htmlTemplate_bootStrapTable = $($('.htmlTemplate#htmlTemplate_bootStrapTable').clone().html()),
          bootStrapTable = htmlTemplate_bootStrapTable,
          thead = htmlTemplate_bootStrapTable.find('thead'),
          tbody = htmlTemplate_bootStrapTable.find('tbody')
    ;
    
    let self, appendThead, appendTbody, remove,
        callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendThead = function(theadLabelList, __callback){
        let tr = $('<tr></tr>');
        for (let theadLabel of theadLabelList) {
            let th = $('<th>' + theadLabel + '</th>');
            tr.append(th);
        }
        if (__callback) {
            tr.click(__callback);
        }
        thead.append(tr);
        return self;
    };

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    appendTbody = function(tbodyLabelList, __callback){
        let tr = $('<tr></tr>');
        for (let tbodyLabel of tbodyLabelList) {
            let th = $('<th>' + tbodyLabel + '</th>');
            tr.append(th);
        }        
        if (__callback) {
            tr.click(__callback);
        }
        tbody.append(tr);
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    remove = function () {
        bootStrapTable.remove();
        return self;
    };
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor (){
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQeryObj:htmlTemplate_bootStrapTable, appendThead:appendThead, appendTbody:appendTbody, remove:remove};
    return self;
};