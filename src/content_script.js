chrome.storage.sync.get({
    css: "",
    js: ""
}, function(items) {
    try {
        eval(items.js);
    } catch (e) {
        console.error(e);
    }
    chrome.runtime.sendMessage({
        action: "insertCSS",
        details: {
            code: items.css,
            allFrames: true
        }
    });
});
