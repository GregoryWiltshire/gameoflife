var gen = 0;
function createTable(dim) {
	var body = document.getElementsByTagName("body")[0];
	var table = document.createElement('TABLE');
	var tb = document.createElement('TBODY');
	table.appendChild(tb);

	for (var i = 0; i < dim; i++) {
		var tr = document.createElement('TR');
		tb.appendChild(tr);
		for (var j = 0; j < dim; j++) {
			var td = document.createElement('TD');
			tr.appendChild(td);
		}
	}
	body.appendChild(table);
	document.getElementsByTagName('table')[0].setAttribute('id', 'ourTable');
	document.getElementsByTagName('table')[0].setAttribute('width', '650');
	document.getElementsByTagName('table')[0].setAttribute('height', '650');
	document.getElementsByTagName('table')[0].setAttribute('border', '1');
}
function next_state(matrix) {
	new_matrix = create_matrix(matrix.length, matrix[1].length);
	for (let i = 2; i < matrix.length - 2; i++) {
		for (let j = 2; j < matrix[0].length - 2; j++) {
			let bitvalue = matrix[i][j];
			let neighbors = sum_neighbors(i, j, matrix);
			if (bitvalue == 1) {
				if (neighbors < 2 || neighbors > 3) {
					bitvalue = 0;
				}
			}
			else {
				if (neighbors == 3) {
					bitvalue = 1;
				}
			}
			new_matrix[i][j] = bitvalue;
		}
	}
	for (let i = 0; i < new_matrix.length; i++) {
		new_matrix[i][0] = 0;
		new_matrix[i][1] = 0;
		new_matrix[i][new_matrix[i].length - 1] = 0;
		new_matrix[i][(new_matrix[i].length - 2)] = 0;
	}
	for (let j = 0; j < new_matrix.length; j++) {
		new_matrix[new_matrix.length - 1][j] = 0;
		new_matrix[new_matrix.length - 2][j] = 0;
		new_matrix[0][j] = 0;
		new_matrix[1][j] = 0;
	}

	return new_matrix;
}

function sum_neighbors(x, y, matrix) {
	//visit each of the surrounding elements of the point
	let sum = 0;
	//go up
	sum += matrix[x - 1][y + 1];
	sum += matrix[x][y + 1];
	sum += matrix[x + 1][y + 1];
	//go down
	sum += matrix[x - 1][y - 1];
	sum += matrix[x][y - 1];
	sum += matrix[x + 1][y - 1];
	//goleft goright
	sum += matrix[x - 1][y];
	sum += matrix[x + 1][y];
	return sum;
}
function create_matrix(rows, columns) {
	let matrix = new Array(rows);
	for (let i = 0; i < columns; i++) {
		matrix[i] = new Array(columns);
	}
	return matrix;
}

function populate_matrix(matrix) {
	//for each row
	for (let i = 0; i < matrix.length; i++) {
		//for each column
		for (let j = 0; j < matrix[0].length - 1; j++) {
			matrix[i][j] = Math.round(Math.random());
		}
	}
	//overwrite the outer two elements for each side
	for (let i = 0; i < matrix.length; i++) {
		matrix[i][0] = 0;
		matrix[i][1] = 0;
		matrix[i][matrix[i].length - 1] = 0;
		matrix[i][(matrix[i].length - 2)] = 0;
	}
	for (let j = 0; j < matrix.length; j++) {
		matrix[matrix.length - 1][j] = 0;
		matrix[matrix.length - 2][j] = 0;
		matrix[0][j] = 0;
		matrix[1][j] = 0;
	}
}
createTable(20);
var matrix = create_matrix(20, 20);
populate_matrix(matrix);
console.table(matrix);
var newmatrix = next_state(matrix);
console.table(new_matrix);
var table = $("#ourTable")[0];
var cell = table.rows[0].cells[0];

function color() {
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[0].length; j++) {
			if (matrix[i][j] == 1) {
				cell = table.rows[i].cells[j];
				$(cell).css('background-color', 'white');
			}
			else {
				cell = table.rows[i].cells[j];
				$(cell).css('background-color', 'black');
			}
		}
	}
}
color();
var intervalID = null;
var counter = 0;
var twentyThree = function () {
	if (counter < 23) {
		counter++;
		tick();
		document.getElementById('gen').innerHTML = gen;
	}
	else {
		clearInterval(intervalID);
	}
}
function twentythreebutton() {
	counter = 0;
	var intervalID = setInterval(twentyThree, 250);

}

function tick(interval) {
	matrix = next_state(matrix);
	color();
	gen++;
	document.getElementById('gen').innerHTML = gen;

}
var intervalIDStartGame = null;
var gameStopped = true;
var startGame = function () {
	if (!gameStopped) {
		tick();
		document.getElementById('gen').innerHTML = gen;
	}
	else {
		clearInterval(intervalIDStartGame);
	}
}
function startButton() {
	gameStopped = false;
	var intervalIDStartGame = setInterval(startGame, 250);
}

function stopButton() {
	gameStopped = true;
}

function zeroMatrix() {
	matrix = create_matrix(matrix.length, matrix[0].length);
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			matrix[i][j] = 0;
		}
	}
	tick();
	gen = 0;
	document.getElementById('gen').innerHTML = gen;
}

$('td').click(function () {
	var row = $("#ourTable tr").index($(this).closest('tr'));
	var col = $(this).closest("td").index();
	var cells = table.rows[row].cells[col];
	if (matrix[row][col] == 0) {
		matrix[row][col] = 1;
		$(cells).css('background-color', 'white');
	}
	else {
		matrix[row][col] = 0;
		$(cells).css('background-color', 'black');
	}
});

function setSize(dimension) {
	$('#ourTable').remove();
	var dim = parseInt(dimension);
	createTable(dim);
	matrix = create_matrix(dim, dim);
	populate_matrix(matrix);
	newmatrix = next_state(matrix);
	table = $("#ourTable")[0];
	cell = table.rows[0].cells[0];
	$('td').click(function () {
		var row = $("#ourTable tr").index($(this).closest('tr'));
		var col = $(this).closest("td").index();
		var cells = table.rows[row].cells[col];

		if (matrix[row][col] == 0) {
			matrix[row][col] = 1;
			$(cells).css('background-color', 'white');
		}
		else {
			matrix[row][col] = 0;
			$(cells).css('background-color', 'black');
		}
	});
	color();
}

function lineShape() {
	matrix[3][3] = 1;
	matrix[3][4] = 1;
	matrix[3][5] = 1;
	color();
}
function blockShape() {
	matrix[7][7] = 1;
	matrix[8][7] = 1;
	matrix[8][6] = 1;
	matrix[7][6] = 1;
	color();
}
function blinkerShape() {
	matrix[10][10] = 1;
	matrix[11][10] = 1;
	matrix[10][11] = 1;
	matrix[12][13] = 1;
	matrix[13][12] = 1;
	matrix[13][13] = 1;
	color();
}
function glider() {
	matrix[5][5] = 1;
	matrix[5][6] = 1;
	matrix[5][7] = 1;
	matrix[4][7] = 1;
	matrix[3][6] = 1;
	color();
}
