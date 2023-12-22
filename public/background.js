chrome.tabs.onUpdated.addListener((tabID,tab)=>{
    if(tab.url){
        console.log(tab.url);
    }

});