chrome.commands.onCommand.addListener(function(command) {
    switch (command) {
        case "options":
            chrome.runtime.openOptionsPage();
            break;
    }
});
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.tab && request.action == "insertCSS") {
        chrome.tabs.insertCSS(sender.tab.id, request.details, function() {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            }
        });
    }
});
