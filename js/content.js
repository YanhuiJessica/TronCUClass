const courseId = window.location.pathname.split('/')[2];

let xhr = new XMLHttpRequest(), xhrDl = new XMLHttpRequest();
var uploads = [];

xhr.onload = function() {
    const data = JSON.parse(this.responseText);
    var coursewares = data['activities'];
    for (let c of coursewares) {
        if (c['uploads'].length > 0) {
            for (let u of c['uploads']) {
                uploads.push(u);
            }
        }
    }
};
xhr.onerror = function() {
    console.log('An error occurred fetching the JSON');
};

xhr.open('GET', `http://courses.cuc.edu.cn/api/courses/${courseId}/activities`, true);
xhr.send();

xhrDl.onload = function() {
    const data = JSON.parse(this.responseText);
    var url = data['url'];
    chrome.runtime.sendMessage({from: 'content', url: url});
};

function startDownload(reference_id) {
    xhrDl.open('GET', `http://courses.cuc.edu.cn/api/uploads/reference/document/${reference_id}/url?preview=true`, true);
    xhrDl.send();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.from === 'popup' && request.subject === 'getUploads') {
        sendResponse({uploads: uploads});
    }
    if (request.from === 'popup' && request.subject === 'startDownloads') {
        startDownload(request.reference_id);
    }
});