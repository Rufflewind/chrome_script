function restore() {
    chrome.storage.sync.get({
        css: "",
        js: ""
    }, function(items) {
        document.getElementById("css").value = items.css;
        document.getElementById("js").value = items.js;
    });
}

function save() {
    chrome.storage.sync.set({
        css: document.getElementById("css").value,
        js: document.getElementById("js").value
    });
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("css").addEventListener("input", save);
document.getElementById("js").addEventListener("input", save);
