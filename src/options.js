var statusElem = document.getElementById("status");
var msgElem = document.getElementById("msg");
var cssElem = document.getElementById("css");
var jsElem = document.getElementById("js");

function message(type, text) {
    statusElem.className = type;
    msgElem.textContent = text;
}

function displayRestoreStatus(err) {
    if (err === undefined) {
        message("ok", "Data will be saved as you type.");
    } else {
        message("err", "Error: Your data was not loaded.  "
                     + "You can still try to edit, but it will "
                     + "probably overwrite your old data.  "
                     + "Technical reason: " + err.message);
    }
}

function displaySaveStatus(err) {
    if (err === undefined) {
        message("ok", "Saved.");
    } else {
        var msg = err.message;
        message("err", "Error: Your data was not saved due to an "
                     + "unexpected error: " + msg);
        if (msg.indexOf("QUOTA_BYTES") !== -1) {
            message("err", "Error: Your data was not saved because there is "
                         + "not enough storage space available to the "
                         + "extension.");
        } else if (msg.indexOf("MAX_WRITE_OPERATIONS_PER_HOUR") !== -1) {
            message("err", "Error: Your data was not saved because too many "
                         + "edits were made within the past hour or so.  "
                         + "Please wait an hour before retrying.");
        } else if (msg.indexOf("MAX_WRITE_OPERATIONS_PER_MINUTE") !== -1) {
            message("err", "Error: Your data was not saved because too many "
                         + "edits were made within the past minute or so.  "
                         + "Please wait a minute before retrying.");
        }
    }
}

var saving = false;
var savingItems = null;
var pendingItems = null;

function doSave() {
    message("wait", "Saving...");
    // collect multiple edits in quick succession
    window.setTimeout(function() {
        savingItems = pendingItems;
        pendingItems = null;
        chrome.storage.sync.set(savingItems, function() {
            savingItems = null;
            // always "use" the error even if we don't need it
            var err = chrome.runtime.lastError;
            if (pendingItems === null) {
                displaySaveStatus(err);
            }
            // cooldown to avoid exhausting the quota too quickly
            window.setTimeout(function() {
                if (pendingItems === null) {
                    saving = false;
                } else {
                    doSave();
                }
            }, 500);
        });
    }, 100);
}

function queueSave(items) {
    pendingItems = items;
    if (saving !== true) {
        saving = true;
        doSave();
    }
}

function onStorageChanged(changes, areaName) {
    if (areaName !== "sync") {
        return;
    }
    for (var key in changes) {
        if (savingItems === null ||
            changes[key].newValue !== savingItems[key]) {
            message("err", "Warning: Your data appears to have been changed "
                         + "in another window.  Either refresh to see the new "
                         + "changes, or keep editing to overwrite them.");
            return;
        }
    }
}

function restore() {
    chrome.storage.sync.get({
        css: "",
        js: ""
    }, function(items) {
        displayRestoreStatus(chrome.runtime.lastError);
        cssElem.disabled = false;
        cssElem.value = items.css;
        jsElem.disabled = false;
        jsElem.value = items.js;
    });
}

function save() {
    queueSave({
        css: cssElem.value,
        js: jsElem.value
    });
}

chrome.storage.onChanged.addListener(onStorageChanged);
document.addEventListener("DOMContentLoaded", restore);
cssElem.addEventListener("input", save);
jsElem.addEventListener("input", save);
