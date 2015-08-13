function main() {
    addCustomClassToHtml([
        [/mail\.google\.com/,"cs-gmail"],
        [/twitter\.com/, "cs-twitter"]
    ]);

    undisablePasswordPasting([
    ]);
}

function addCustomClassToHtml(mapping) {
    var url = window.location.href;
    for (var i = 0; i < mapping.length; i++) {
        if (mapping[i][0].test(url)) {
            $("html").addClass(mapping[i][1]);
        }
    }
}

function delayUntil(condition, action, interval) {
    if (condition()) {
        action();
        return;
    }
    function callback() { delayUntil(condition, action, interval); }
    setTimeout(callback, interval);
}

function addDelayedScript(scriptText) {
    var script = document.createElement("script");
    script.text = scriptText;
    document.getElementsByTagName("html")[0].appendChild(script);
}

function stageDelayedScript(scriptText) {
    delayUntil(
        function() { return document.getElementsByTagName("body").length; },
        function() { addDelayedScript(scriptText); },
        100
    );
}

function undisablePasswordPasting(urls) {
    var url = window.location.href;
    for (var i = 0; i < urls.length; i++) {
        if (urls[i].test(url)) {
            stageDelayedScript(
                "Array.prototype.forEach.call(" +
                    "document.querySelectorAll('input[type=password]')," +
                    "function(e) { e.removeAttribute('onpaste'); }" +
                    ");"
            );
        }
    }
}

main();
