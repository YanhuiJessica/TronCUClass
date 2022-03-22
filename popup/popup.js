function onError(error) {
    console.log(`Error: ${error}`);
}

var uploads;
window.addEventListener('load', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'getUploads'},
        function(response) {
            uploads = response.uploads;
            var tb = document.getElementById('uploads');
            if (tb.innerHTML.length == 0) {
                for (let u in uploads) {
                    var tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td><input type="radio" name="courseware" value="${u}" /></td>
                    <td>${uploads[u].name}</td>
                    <td></td>
                    `;
                    tb.appendChild(tr);
                }
            }
        });
    });
});

document.addEventListener("click", (e) => {
    if (e.target.id == "dlbtn") {
        var checkboxes = document.getElementsByName('courseware');
        var ids = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                ids.push(checkboxes[i].value);
            }
        }
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            for (let i of ids) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {from: 'popup', subject: 'startDownloads', reference_id: uploads[i].reference_id}
                ).then().catch(onError);
            }
        });
    }
})