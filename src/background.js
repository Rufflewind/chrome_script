chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.tab && request.action == "insertCSS") {
        chrome.tabs.insertCSS(sender.tab.id, request.details);
    }
});
