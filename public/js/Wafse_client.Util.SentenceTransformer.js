Wafse_client.Util.SentenceTransformer = (function () {
    // about RegExp: http://qiita.com/hrdaya/items/291276a5a20971592216
    const headAndTails = {
        secondPerson:{
            heads:["you'", "we'", "they'"],
            tails:['re', 'll', 'd', 've'],
            longTails:['are', 'will', 'would', 'have']
            // 例えば they'd は they would と they had の 2パターンあるが， they would に統一して変換．
        },
        otherPerson:{ // firstPerson or SecondPerson
            heads:["i'", "he'", "she'", "it'", "that'", "that'", "who'", "what'", "where'", "when'", "why'", "how'"], // 短縮系の ' より前の部分. she's なら she' となる．
            tails:['m', 's', 'll', 'd'], // 短縮系の ' より後の部分．
            longTails:['am', 'is', 'will', 'would'] // tails が短縮系でない場合. s は is となる．
            // 例えば he's は he is と he has の 2パターンあるが， he is に統一して変換．he'd も he would と he had があるが he would に統一して変換．
        },
        other:{
            heads:["would'", "should'", "could'", "might'", "must'"],
            tails:['ve'],
            longTails:['have']
        },
        verb:{
            heads:["isn'", "aren'", "wasn'", "weren'", "haven'", "hasn'", "hadn'", "won'", "wouldn'", 
                   "don'", "doesn'", "didn'", "can'", "couldn'", "shouldn'", "mightn'", "mustn'"],
            tails:['t'],
            longTails:['not']
        }
    };

    let self;
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // public
    function transform (str) {
        let transformedStr = str.toLowerCase().replace(/’/g, "'");
        for (let personOrVerb in headAndTails){
            for (let head of headAndTails[personOrVerb].heads) {
                for (let idx in headAndTails[personOrVerb].tails){
                    let replaceResult;
                    if (personOrVerb !== 'verb' || head === "can'") { // この場合，head の末尾は1文字，つまり ' しかカットしてはいけない．
                        replaceResult = head.substr(0, head.length-1) + ' ' + headAndTails[personOrVerb].longTails[idx]
                    } else {
                        replaceResult = head.substr(0, head.length-2) + ' ' + headAndTails[personOrVerb].longTails[idx]
                    }
                    transformedStr = transformedStr.replace(
                        new RegExp(head + headAndTails[personOrVerb].tails[idx], 'g'),
                        replaceResult
                    );
                }
            }        
        }
        transformedStr = transformedStr.replace(/[\-_,."!? ]/g, ''); 
        return transformedStr;
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    
    (function constructor () {
        
    })();

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    self = { transform:transform };
    return self;
})();