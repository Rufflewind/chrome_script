function main() {
    addCustomClassToHtml([
        [/https:\/\/mail\.google\.com\//, "cs-gmail"],
        [/https:\/\/(\w+\.)?example\.com\//, "my-custom-class"]
    ]);

    enableMathJax([
        /https:\/\/(\w+\.)?example\.com\//
    ]);

    undisablePasswordPasting([
        /https:\/\/(\w+\.)?example\.com\//
    ]);

    hideableHangoutsThumbnails();

    hideableHangoutsScreenshareBanner();
}

function addCustomClassToHtml(urlClass) {
    var url = window.location.href;
    for (var i = 0; i < urlClass.length; i++) {
        if (urlClass[i][0].test(url)) {
            document.documentElement.className += " " + urlClass[i][1];
        }
    }
}

function enableMathJax(urls) {
    var url = window.location.href;
    for (var i = 0; i < urls.length; i++) {
        if (urls[i].test(url)) {
            var script = document.createElement("script");
            script.textContent =
                "window.MathJax = {tex2jax: {\n" +
                "    inlineMath: [['$','$'], ['\\\\(', '\\\\)']],\n" +
                "    processEscapes: true\n" +
                "}};\n";
            document.documentElement.appendChild(script);
            var script = document.createElement("script");
            script.src =
                "https://cdn.mathjax.org/mathjax/latest/MathJax.js" +
                "?config=TeX-AMS-MML_HTMLorMML";
            document.documentElement.appendChild(script);
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
    document.documentElement.appendChild(script);
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

function hideableHangoutsThumbnails() {
    if (!/hangouts\.google\.com/.test(window.location.href)) {
        return;
    }
    window.addEventListener("keyup", function(e) {
        if (!(e.key == "F7" && !e.shiftKey)) {
            return;
        }
        var elem =
            document.getElementsByClassName('KMD69e-Wa')[0] ||
            document.getElementsByClassName('Wa')[0];
        if (!elem) {
            return;
        }
        if (elem.style.display == "none") {
            elem.style.display = "";
        } else {
            elem.style.display = "none";
        }
    });
}

function hideableHangoutsScreenshareBanner() {
    if (!/hangouts\.google\.com/.test(window.location.href)) {
        return;
    }
    window.addEventListener("keyup", function(e) {
        if (!(e.key == "F7" && e.shiftKey)) {
            return;
        }
        var elem = document.getElementById(':st.zu');
        if (!elem) {
            return;
        }
        if (elem.style.display == "none") {
            elem.style.display = "";
        } else {
            elem.style.display = "none";
        }
    });
}

main();
