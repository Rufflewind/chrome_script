var map = [
    [/mail\.google\.com/,"cs-gmail"],
    [/twitter\.com/, "cs-twitter"]
];

var url = window.location.href;
for (var i = 0; i < map.length; i++) {
    if (map[i][0].test(url)) {
        $("html").addClass(map[i][1]);
    }
}
