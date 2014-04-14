chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.tab && request.action == "insertCSS") {
        chrome.tabs.insertCSS(sender.tab.id, {
            code: request.code,
            allFrames: true
        });
    }
});
