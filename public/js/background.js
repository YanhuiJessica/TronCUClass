function getQueryVariable(query, variable)
{
       var query = query.substring(1);
       var vars = query.split("&");
       for (let i in vars) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){ return pair[1]; }
       }
       return false;
}

chrome.runtime.onMessage.addListener(request => {
    if (request.from === 'content') {
        let filename = getQueryVariable(decodeURI(request.url), 'name');
        chrome.downloads.download({
            url: request.url,
            filename: filename,
        });
    }
});