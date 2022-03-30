const courseId = window.location.pathname.split('/')[2];

let xhr = new XMLHttpRequest(),
    xhrDl = new XMLHttpRequest();
let uploads = [], uindex;

xhr.onload = function() {
    const data = JSON.parse(this.responseText);
    var coursewares = data['activities'];
    for (let c of coursewares) {
        if (c['uploads'].length > 0) {
            for (let u of c['uploads']) {
                uploads.push({cwid: c['id'], fileInfo: u});
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
    let url = data['url'];
    chrome.runtime.sendMessage({from: 'content', url: url},
        function(response) {
            if (response.state) {
                if (uploads[uindex].fileInfo.type != 'video') {
                    let markReadUrl = `http://courses.cuc.edu.cn/api/course/activities-read/${uploads[uindex].cwid}`;
                    fetch(markReadUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "upload_id": uploads[uindex].fileInfo.id,
                        }),
                    })
                }
            }
        }
    );
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
        uindex = request.uindex;
        startDownload(request.reference_id);
    }
    return true; // make sendResponse() work asynchronously
});