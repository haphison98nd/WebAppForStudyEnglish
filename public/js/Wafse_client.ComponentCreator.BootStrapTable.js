Wafse_client.ComponentCreator.BootStrapTable = function(){
    
    'use strict';
    
    const bootStrapTable = $($('.htmlTemplate.bootStrapTable').clone().html()).find('#bootStrapTable'),
          thead = bootStrapTable.find('thead'),
          tbody = bootStrapTable.find('tbody')
    ;
    
    let self,
        callback
    ;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function appendThead (theadLabelList, __callback) {
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
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    // public
    function appendTbody (tbodyLabelList, __callback) {
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
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function remove () {
        bootStrapTable.remove();
        return self;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    (function constructor () {
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    self = {jQueryObj:bootStrapTable, appendThead:appendThead, appendTbody:appendTbody, remove:remove};
    return self;
};