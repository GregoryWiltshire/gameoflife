var arr = [];
var table = $("#ourTable")[0];
var cell = table.rows[0].cells[0];
function s() {
    // Creates all lines:
    for (var i = 0; i < 100; i++) {
        // Creates an empty line
        arr.push([]);
        // Adds cols to the empty line:
        arr[i].push(new Array(100));
        for (var j = 0; j < 100; j++) {
            // Initializes:
            arr[i][j] = Math.round(Math.random());
        }
    }
}