chrome.storage.sync.get({
    css: "",
    js: ""
}, function(items) {
    eval(items.js);
    chrome.runtime.sendMessage({
        action: "insertCSS",
        code: items.css
    });
});
